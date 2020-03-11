<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface;

use App\Types\Asset;
use App\Types\Id;
use App\Types\ImageEdge;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageEdgeProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\AmenityProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HourRateProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HoursProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\GroupProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\References\VatRateProxy;

class VenueInterface extends GenericsInterface {

  public function buildMutationModels(Asset $asset): MD {
    $id = $asset->getId();
    $venue = $this->venueFromId($id);
    $md = new MD();
    if (!is_null($venue)) {
      $venueIds = collect([$venue->peekAttribute('id')]);
      $usages = UsageProxy::fetchForVenuesAll($venueIds);
      $parentIds = collect([$venue->peekAttribute('parent_id')]);
      $allUsageIds = $usages->map(function (UsageProxy $proxy) { return $proxy->peekAttribute('id'); })->values();
      $venueUsageIds = $usages
        ->filter(function (UsageProxy $proxy) { return !is_null($proxy->peekAttribute('venue_usage_token')); })
        ->map(function (UsageProxy $proxy) { return $proxy->peekAttribute('id'); })
        ->values();
      $allAssetIds = $allUsageIds->concat($venueIds);
      $venueAssetIds = $venueUsageIds->concat($venueIds);
      $imageCollection = collect($asset->getImages());
      $imageTokens = $imageCollection->map(function (ImageEdge $imageEdge) {
        return $imageEdge->getImageId()->getValue();
      });
      $md
        ->setCollection(MD::VENUE, collect([$venue]))
        ->setCollection(MD::GROUPREF, GroupProxy::fetchByAssetIds($parentIds))
        ->setCollection(MD::USAGE, $usages)
        ->setCollection(MD::IMAGE, ImageEdgeProxy::fetchByAssetIdsAndTokens($venueIds, $imageTokens))
        ->setCollection(MD::AMENITY, AmenityProxy::fetch($allAssetIds))
        ->setCollection(MD::HOUR, HoursProxy::fetch($allAssetIds))
        ->setCollection(MD::HOURRATE, HourRateProxy::fetch($allAssetIds));
      $this->appendToModelsForGenericAssets($md, $venueAssetIds);
    }
    $md->setCollection(MD::VATREF, VatRateProxy::fetch());
    $this->appendReferenceCollections($md);
    return $md;
  }

  public function buildModels(Id $id): MD {
    $venue = $this->venueFromId($id);
    $md = new MD();
    if (!is_null($venue)) {
      $venueIds = collect([$venue->peekAttribute('id')]);
      $usages = UsageProxy::fetchForVenuesUsages($venueIds);
      $usageAssetIds = $usages->map(function (UsageProxy $usage) { return $usage->peekAttribute('id'); })->values();
      $assetIds = $usageAssetIds->concat($venueIds);
      $md
        ->setCollection(MD::VENUE, collect([$venue]))
        ->setCollection(MD::USAGE, $usages)
        ->setCollection(MD::IMAGE, ImageEdgeProxy::fetch($venueIds))
        ->setCollection(MD::AMENITY, AmenityProxy::fetch($assetIds))
        ->setCollection(MD::HOUR, HoursProxy::fetch($venueIds));
      $this->appendToModelsForGenericAssets($md, $assetIds);
    }
    return $md;
  }

  private function venueFromId(Id $id): ?VenueProxy {
    $token = $id->getValue();
    return VenueProxy::fetchNullOrOne($token);
  }
}
