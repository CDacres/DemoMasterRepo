<?php

namespace App\Zipcube\HandlesUserAssets;

use App\Experts\EAssetExpert;
use App\ZipcubeInterface\DomainCommand;

use App\ORM\Asset as EAsset;
use App\ORM\Venue as EVenue;
use App\ORM\UserAsset as EUserAsset;
use App\ORM\User as EUser;

use Illuminate\Database\Eloquent\Collection;
use App\Types\AssetI_AssetType;
use App\Types\AssetI_UserI_Permissions;
use App\Types\AssetPermissions;
use App\Types\AssetI_UserI;
use App\Types\CAssetI_AssetType;
use App\Types\CAssetI_UserI_Permissions;
use App\Types\CId;
use App\Types\Id;

class HandlesUserAssetsPersistence {

  const APPROVAL = 1;
  const MAKE_BOOKING = 1;
  const UPDATE = 2;
  const INSERTCHILD = 4;
  const NOTIFY = 8;
  const DELETE = 16;

  public function serveAssetPermissions(Id $id): CAssetI_UserI_Permissions {
    $shortId = (new EAssetExpert())->shortIdFromToken($id->getValue());
    $results = $this->getAssetPermissions($shortId);
    $permArray = $results->map(function ($eUserAsset) use ($id) {
      $permissions = $this->generatePermissionsFromMask($eUserAsset->privileges_mask);
      return new AssetI_UserI_Permissions(['userId' => new Id(['value' => $eUserAsset->user_id]), 'assetId' => $id, 'permissions' => $permissions]);
    })->toArray();
    return new CAssetI_UserI_Permissions(['collection' => $permArray]);
  }

  public function fetchUserAssetSummary(Id $userId): CAssetI_AssetType {
    $piv = EUserAsset::with('asset')->whereHas('asset', function ($query) {
      $query->withTrashed(false);
    })->where(['user_id' => $userId->getValue()])->get();
    $hints = $piv->map(function ($item) { return new AssetI_AssetType(['assetId' => new Id(['value' => $item->asset->token]), 'type' => $item->asset->asset_type_id]); })->toArray();
    return new CAssetI_AssetType(['collection' => $hints]);
  }

  public function fetchPermissions(AssetI_UserI $payload): AssetPermissions {
    $shortId = (new EAssetExpert())->shortIdFromToken($payload->getAssetId()->getValue());
    if ($shortId) {
      $permsPivot = $this->getPermissionsPivot($payload->getUserId()->getValue(), $shortId);
      if ($permsPivot) {
        return $this->generatePermissionsFromMask($permsPivot->privileges_mask);
      }
    }
    return new AssetPermissions();
  }

  public function updatePermissions(AssetI_UserI_Permissions $payload) {
    $legacyId = (new EAssetExpert())->shortIdFromToken($payload->getAssetId()->getValue());
    if (!is_null($legacyId)) {
      $userId = $payload->getUserId()->getValue();
      $perm = $this->getPermissionsPivot($userId, $legacyId);
      if (is_null($perm)) {
        $data = ['user_id' => $userId, 'asset_id' => $legacyId];
        $perm = new EUserAsset($data);
      }
      $perm->privileges_mask = $this->generateMaskFromPermissions($payload->getPermissions());
      $perm->save();
      $this->legacyUpdateMainContact($legacyId, $userId);
    }
  }

  public function fetchAssetInterestedParties(Id $id): CId {
    $shortId = (new EAssetExpert())->shortIdFromToken($id->getValue());
    $piv = EUserAsset::where(['asset_id' => $shortId])->get();
    $collection = new CId();
    $collection->setCollection($piv->map(function ($item) { return new Id(['value' => $item->user_id]); })->toArray());
    return $collection;
  }

  private function getPermissionsPivot(string $userId, string $assetId): ?EUserAsset {
    return EUserAsset::where(['user_id' => $userId, 'asset_id' => $assetId])->first();
  }

  private function getAssetPermissions(string $assetId): Collection {
    return EUserAsset::where(['asset_id' => $assetId])->get();
  }

  private function generateMaskFromPermissions(AssetPermissions $perms) {
    $mask = 0;
    $mask += ($perms->getCanApprove() ? self::APPROVAL : 0);
    $mask += ($perms->getCanUpdate() ? self::UPDATE : 0);
    $mask += ($perms->getCanNest() ? self::INSERTCHILD : 0);
    $mask += ($perms->getCanDelete() ? self::NOTIFY : 0);
    $mask += ($perms->getGetsNotified() ? self::DELETE : 0);
    return $mask;
  }

  private function generatePermissionsFromMask($mask): AssetPermissions {
    $perms = new AssetPermissions();
    $perms->setCanApprove($this->maskSaysYes($mask, self::APPROVAL));
    $perms->setCanUpdate($this->maskSaysYes($mask, self::UPDATE));
    $perms->setCanNest($this->maskSaysYes($mask, self::INSERTCHILD));
    $perms->setGetsNotified($this->maskSaysYes($mask, self::NOTIFY));
    $perms->setCanDelete($this->maskSaysYes($mask, self::DELETE));
    return $perms;
  }

  private function maskSaysYes($mask, $permission) {
    return ($mask & $permission) == $permission;
  }

  private function legacyUpdateMainContact($legacyId, $userId) {
    $eAsset = EAsset::find($legacyId);
    if ($eAsset->asset_type_id == EAsset::VENUE) {
      $eVenue = EVenue::where(['asset_id' => $legacyId])->first();
      if (is_null($eVenue->main_contact)) {
        $eVenue->main_contact = $userId;
        $eVenue->save();
      }
      $eUser = EUser::find($userId);
      $eUser->userType_id = 1;
      $eUser->save();
    }
  }

}
