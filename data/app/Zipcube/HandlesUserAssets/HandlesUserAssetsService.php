<?php

namespace App\Zipcube\HandlesUserAssets;

use App\Types\UserClaim;
use App\Types\UserRole;
use App\ZipcubeInterface\DomainCommand;

use App\Zipcube\_Messages\AssetNestingRequested;

use App\Zipcube\_Messages\AssetUpsertApproved;
use App\Zipcube\_Messages\AssetUpsertDenied;
use App\Zipcube\_Messages\AssetUpsertRequested;
use App\Zipcube\_Messages\AssetNested;
use App\Zipcube\_Messages\AssetUpserted;
use App\Zipcube\_Messages\AssetNestingApproved;

use App\Zipcube\HandlesAssets\HandlesAssetsService;
use App\Zipcube\HandlesUserAssets\HandlesUserAssetsPersistence as Persist;

use App\Types\Asset;
use App\Types\AssetI_AssetType;
use App\Types\AssetNesting;
use App\Types\AssetType;
use App\Types\Asset_UserClaims;
use App\Types\Container;
use App\Types\GroupDetails;
use App\Types\Id;
use App\Types\AssetI_UserI;
use App\Types\AssetI_UserI_Permissions;
use App\Types\AssetPermissions;

class HandlesUserAssetsService extends DomainCommand {

  const UNCLAIMED = 'UNCLAIMED';
  const NESTSTAGEONE = 'NESTSTAGEONE';
  const NESTSTAGETWO = 'NESTSTAGETWO';

  public $eventMap = [
    [AssetUpsertRequested::class, 'handleAssetUpsertRequest'],
    [AssetUpserted::class, 'handleAssetUpsert'],
    [AssetNestingRequested::class, 'handleAssetNestingRequest'],
    [AssetNested::class, 'handleAssetNesting'],
  ];

  public function handleAssetUpsertRequest(Asset_UserClaims $payload): void {
    $userAssetTuple = $this->generateAssetUserTuple($payload);
    if ($this->userCanClaimAsset($payload)) {
      $this->claimAssetForUser($payload);
      $this->fireEvent(AssetUpsertApproved::class, $userAssetTuple);
    } else if ($this->userCanUpdateAsset($payload)) {
      $this->fireEvent(AssetUpsertApproved::class, $userAssetTuple);
    } else {
      $this->fireEvent(AssetUpsertDenied::class, $userAssetTuple);
    }
  }

  public function handleAssetUpsert(Id $id): void {
    if ($this->assetIsUnclaimed($id)) {
      $state = $this->getOrCreateState(self::UNCLAIMED, $id);
      $state->confirmed = true;
      $this->handleOwnershipState($state);
    }
    $stageTwoState = $this->getState(self::NESTSTAGETWO, $id);
    if (!is_null($stageTwoState)) {
      $this->fireAssetNesting($stageTwoState->childId, $stageTwoState->parentId);
    } else {
      $this->setNestingStageOnConfirmationSide($id);
    }
  }

  public function handleAssetNestingRequest(AssetNesting $nesting): void {
    // TODO: Urgent - some logic!
    $this->fireEvent(AssetNestingApproved::class, $nesting);
  }

  public function handleAssetNesting(AssetNesting $payload): void {
    $response = (new Persist())->serveAssetPermissions($payload->getContainer()->getAssetId());
    $assetId = $payload->getAssetId();
    collect($response->getCollection()->getIterator())->each(function (AssetI_UserI_Permissions $perms) use ($assetId) {
      $newPerms = (new AssetI_UserI_Permissions())
        ->setUserId($perms->getUserId())
        ->setAssetId($assetId)
        ->setPermissions($perms->getPermissions());
      $this->updatePermissionsWithCascade($newPerms);
    });
  }

  private function userClaimsAdmin(UserClaim $claim): bool {
    return collect($claim->getRoles())->contains(UserRole::ADMIN);
  }

  private function userCanClaimAsset(Asset_UserClaims $payload): bool {
    return !$this->userClaimsAdmin($payload->getUserClaims()->getUser())
      && $this->assetIsUnclaimed($payload->getAsset()->getId());
  }

  private function userCanUpdateAsset(Asset_UserClaims $payload): bool {
    if ($this->userClaimsAdmin($payload->getUserClaims()->getUser())) {
      if ($this->assetIsUnclaimed($payload->getAsset()->getId())) {
        return false;
      } else {
        return true;
      }
    }
    $userAssetTuple = $this->generateAssetUserTuple($payload);
    $response = (new Persist())->fetchPermissions($userAssetTuple);
    return $response->getCanUpdate();
  }

  private function claimAssetForUser(Asset_UserClaims $payload): void {
    $state = $this->getOrCreateState(self::UNCLAIMED, $payload->getAsset()->getId());
    $state->payload = $payload;
    $this->handleOwnershipState($state);
    $this->ensureAssetNesting($payload);
  }

  private function ensureAssetNesting(Asset_UserClaims $payload): void {
    if (!is_null($payload->getAsset()->getVenueDetails())) {
      $this->setNestingStageOnAssetSide($payload);
    }
  }

  private function setNestingStageOnAssetSide(Asset_UserClaims $payload): void {
    $asset = $payload->getAsset();
    $assetId = $asset->getId();
    $nesting = $this->querySiblingMethod(HandlesAssetsService::class, $assetId, 'serveAssetNesting');
    $state = $this->getOrCreateState(self::NESTSTAGEONE, $assetId);
    $state->asset = $asset;
    $state->userClaims = $payload->getUserClaims();
    $state->requiresNesting = is_null($nesting->getContainer());
    $this->handleStageOneState($state);
  }

  private function setNestingStageOnConfirmationSide(Id $assetId): void {
    $stageOneState = $this->getOrCreateState(self::NESTSTAGEONE, $assetId);
    $stageOneState->confirmed = true;
    $this->handleStageOneState($stageOneState);
  }

  private function handleOwnership(Asset_UserClaims $payload): void {
    $permissions = (new AssetPermissions())
      ->setGetsNotified(true)
      ->setCanApprove(true)
      ->setCanDelete(true)
      ->setCanNest(true)
      ->setCanUpdate(true);
    $payload = (new AssetI_UserI_Permissions())
      ->setUserId($payload->getUserClaims()->getUser()->getId())
      ->setAssetId($payload->getAsset()->getId())
      ->setPermissions($permissions);
    $this->updatePermissionsWithCascade($payload);
  }

  private function handleStageOneState($state): void {
    if ($state->has('requiresNesting') && $state->has('confirmed')) {
      if ($state->requiresNesting) {
        $this->handleNesting($state);
      }
    } else {
      $this->suspendState($state);
    }
  }

  private function handleNesting($state): void {
    $userAssetSummary = (new Persist())->fetchUserAssetSummary($state->userClaims->getUser()->getId());
    $group = collect($userAssetSummary->getCollection()->getIterator())->filter(function (AssetI_AssetType $item) {
      return $item->getType() === AssetType::GROUP;
    })->first();
    if (!is_null($group)) {
      $this->fireAssetNesting($state->asset->getId(), $group->getAssetId());
    } else {
      $this->requestNewGroup($state);
    }
  }

  private function requestNewGroup($state): void {
    $groupUpsertPayload = new Asset_UserClaims();
    srand((double)microtime() * 1000000);
    $groupId = new Id(['value' => md5(uniqid(rand()))]);
    $group = new Asset(['id' => $groupId, 'name' => $state->asset->getName()]);
    $group->setGroupDetails(new GroupDetails());
    $groupUpsertPayload->setAsset($group);
    $groupUpsertPayload->setUserClaims($state->userClaims);
    $stageTwoState = $this->getOrCreateState(self::NESTSTAGETWO, $groupId);
    $stageTwoState->childId = $state->asset->getId();
    $stageTwoState->parentId = $groupId;
    $stageTwoState->userClaims = $state->userClaims;
    $this->suspendState($stageTwoState);
    $this->fireEvent(AssetUpsertRequested::class, $groupUpsertPayload);
  }

  private function fireAssetNesting(Id $childId, Id $parentId): void {
    $nesting = new AssetNesting();
    $nesting->setAssetId($childId);
    $container = new Container();
    $container->setAssetId($parentId);
    $container->setLayoutId($parentId);
    $nesting->setContainer($container);
    $this->fireEvent(AssetNestingApproved::class, $nesting);
  }

  private function handleOwnershipState($state): void {
    if ($state->has('payload') && $state->has('confirmed')) {
      $this->handleOwnership($state->payload);
    } else {
      $this->suspendState($state);
    }
  }

  private function updatePermissionsWithCascade(AssetI_UserI_Permissions $payload): void {
    (new Persist())->updatePermissions($payload);
    $userId = $payload->getUserId();
    $permissions = $payload->getPermissions();
    $nesting = $this->querySiblingMethod(HandlesAssetsService::class, $payload->getAssetId(), 'serveAssetNesting');
    collect($nesting->getLayouts()->getIterator())->each(function ($layout) use($userId, $permissions) {
      collect($layout->getChildren()->getIterator())->each(function ($child) use($userId, $permissions) {
        $payload = new AssetI_UserI_Permissions(['userId' => $userId, 'assetId' => $child, 'permissions' => $permissions]);
        $this->updatePermissionsWithCascade($payload);
      });
    });
  }

  private function generateAssetUserTuple(Asset_UserClaims $payload): AssetI_UserI {
    return new AssetI_UserI(['userId' => $payload->getUserClaims()->getUser()->getId(),
      'assetId' => $payload->getAsset()->getId()]);
  }

  private function assetIsUnclaimed(Id $id): bool {
    $result = (new Persist())->fetchAssetInterestedParties($id);
    return ($result->getCollection()->count() === 0);
  }

}
