<?php
namespace App\Zipcube\HandlesAssets;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\AssetInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\GroupInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\AssetProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\SpaceInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\VenueInterface;
use App\Zipcube\HandlesAssets\Persistence\MDT\AssetMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\DerivationMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\GroupMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\SpaceMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\VenueMDT;

use App\Experts\EAssetExpert;

use App\Types\Asset;
use App\Types\AssetNesting;
use App\Types\CAsset;
use App\Types\Id;
use App\Types\CId;
use App\Types\CAssetIdMap;

class HandlesAssetsPersistence {

  public function serveAssets(CId $payload): CAsset {
    $assets = collect($payload->getCollection())->map(function (Id $id) {
      return $this->buildAsset($id);
    });
    return new CAsset(['collection' => $assets->values()->filter()->all()]);
  }

  public function upsertAsset(Asset $asset): void {
    $token = $asset->getId()->getValue();
    if (!is_null($asset->getSpaceDetails())) {
      $this->upsertSpace($asset);
    } else if (!is_null($asset->getVenueDetails())) {
      $this->upsertVenue($asset);
    } else if (!is_null($asset->getGroupDetails())) {
      $this->upsertGroup($asset);
    }
  }

  public function buildAsset(Id $id): ?Asset {
    $proxy = AssetProxy::fetch($id->getValue())->first();
    if (is_null($proxy)) {
      return null;
    } else if ($proxy->isSpace()) {
      $md = (new SpaceInterface())->buildModels($id);
      return (new SpaceMDT())->build($md, $id);
    } else if ($proxy->isVenue()) {
      $md = (new VenueInterface())->buildModels($id);
      return (new VenueMDT())->build($md, $id);
    } else if ($proxy->isGroup()) {
      $md = (new GroupInterface())->buildModels($id);
      return (new GroupMDT())->build($md, $id);
    } else {
      return null;
    }
  }

  public function nestAsset(AssetNesting $payload): void {
    $interface = new AssetInterface();
    $md = $interface->buildNestingModels($payload);
    (new AssetMDT())->mutateNesting($md, $payload);
    $interface->persist($md);
  }

  public function serveAssetNesting(Id $id): AssetNesting {
    $md = (new AssetInterface())->buildModelsForId($id);
    return (new AssetMDT())->buildNesting($md, $id);
  }

  public function mapFromHumanRefs(CId $payload): CAssetIdMap {
    return (new EAssetExpert())->mapByShortIds($payload);
  }

  public function getShortIdFromId(Id $id): ?string {
    return (new EAssetExpert())->shortIdFromId($id);
  }

  private function upsertSpace(Asset $asset): void {
    $iSpace = new SpaceInterface();
    $md = $iSpace->buildMutationModels($asset);
    (new SpaceMDT())->mutate($md, $asset);
    (new DerivationMDT())->mutateSpace($md, $asset->getId());
    $iSpace->persist($md);
  }

  private function upsertVenue(Asset $asset): void {
    $interface = new VenueInterface();
    $md = $interface->buildMutationModels($asset);
    (new VenueMDT())->mutate($md, $asset);
    (new DerivationMDT())->mutateVenue($md, $asset->getId());
    (new DerivationMDT())->mutateVenueSpaces($md, $asset->getId());
    $interface->persist($md);
  }

  private function upsertGroup(Asset $asset): void {
    $interface = new GroupInterface();
    $md = $interface->buildModels($asset->getId());
    (new GroupMDT())->mutate($md, $asset);
    (new DerivationMDT())->mutateGroupVenues($md, $asset->getId());
    $interface->persist($md);
  }
}
