<?php

namespace App\Zipcube\HandlesAssets;

use App\ZipcubeInterface\DomainCommand;

use App\Zipcube\_Messages\AssetUpsertRequested;
use App\Zipcube\_Messages\AssetUpsertApproved;
use App\Zipcube\_Messages\AssetUpserted;
use App\Zipcube\_Messages\AssetNested;
use App\Zipcube\_Messages\AssetNestingApproved;

use App\Zipcube\HandlesAssets\HandlesAssetsPersistence as Persist;

use App\Types\AssetI_UserI;
use App\Types\Asset;
use App\Types\AssetNesting;
use App\Types\Asset_UserClaims;
use App\Types\CAssetIdMap;
use App\Types\UserClaims;
use Google\Protobuf\BoolValue;
use App\Types\CAsset;
use App\Types\Id;
use App\Types\CId;

class HandlesAssetsService extends DomainCommand {

  public $eventMap = [
    [AssetUpsertRequested::class, 'hydrateAsset'],
    [AssetUpsertApproved::class, 'confirmUpsert'],
    [AssetNestingApproved::class, 'nestAsset'],
  ];

  private function handleState($state) {
    if ($state->has('asset') && $state->has('confirmed') && $state->confirmed) {
      $this->upsertAsset($state);
    } else {
      $this->suspendState($state);
    }
  }

  public function mapFromHumanRefs(CId $ids): CAssetIdMap {
    return (new Persist())->mapFromHumanRefs($ids);
  }

  public function assetsByCId(CId $ids): CAsset {
    return (new Persist())->serveAssets($ids);
  }

  public function assetById(Id $id): ?Asset {
    $ids = new CId(['collection' => [$id]]);
    $cAsset = $this->assetsByCId($ids);
    return $cAsset->getCollection()->count() === 0 ? null : $cAsset->getCollection()[0];
  }

  public function assetExistsById(Id $id): BoolValue {
    $asset = $this->assetById($id);
    return new BoolValue(['value' => (!is_null($asset))]);
  }

  public function confirmUpsert(AssetI_UserI $payload) {
    $state = $this->getOrCreateState($payload->getUserId()->getValue(), $payload->getAssetId()->getValue());
    $state->confirmed = true;
    $this->handleState($state);
  }

  public function hydrateAsset(Asset_UserClaims $payload) {
    $this->hydrate($payload->getAsset(), $payload->getUserClaims());
  }

  public function nestAsset(AssetNesting $payload) {
    (new Persist())->nestAsset($payload);
    $this->fireEvent(AssetNested::class, $payload);
  }

  public function serveAssetNesting(Id $id): AssetNesting {
    return (new Persist())->serveAssetNesting($id);
  }

  private function hydrate(Asset $asset, UserClaims $claims) {
    $state = $this->getOrCreateState($claims->getUser()->getId()->getValue(), $asset->getId()->getValue());
    $state->asset = $asset;
    $this->handleState($state);
  }

  private function upsertAsset($state) {
    $asset = $state->asset;
    (new Persist())->upsertAsset($asset);
    $this->fireEvent(AssetUpserted::class, $asset->getId());
  }
}
