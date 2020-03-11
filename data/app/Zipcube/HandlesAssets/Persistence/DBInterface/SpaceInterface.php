<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface;

use App\Types\Asset;
use App\Types\Id;
use App\Types\ImageEdge;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\TagProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageEdgeProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\AmenityProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HourRateProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HoursProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;

class SpaceInterface extends GenericsInterface {

  private function UsageFromId(Id $id): ?UsageProxy {
    $token = $id->getValue();
    return UsageProxy::fetchNullOrOneForSpace($token);
  }

  public function buildMutationModels(Asset $asset): MD {
    $id = $asset->getId();
    $usage = $this->usageFromId($id);
    $md = new MD();
    if (!is_null($usage)) {
      $usageIds = collect([$usage->peekAttribute('id')]);
      $venueIds = collect([$usage->peekAttribute('parent_id')]);
      $venues = VenueProxy::fetchManyFromIds($venueIds);
      $hours = HoursProxy::fetch($usageIds);
      $hourRates = HourRateProxy::fetch($usageIds);
      $imageCollection = collect($asset->getImages());
      $imageTokens = $imageCollection->map(function (ImageEdge $imageEdge) {
        return $imageEdge->getImageId()->getValue();
      });
      $md
        ->setCollection(MD::USAGE, collect([$usage]))
        ->setCollection(MD::HOUR, $hours)
        ->setCollection(MD::HOURRATE, $hourRates)
        ->setCollection(MD::AMENITY, AmenityProxy::fetch($usageIds))
        ->setCollection(MD::TAG, TagProxy::fetch($usageIds))
        ->setCollection(MD::IMAGE, ImageEdgeProxy::fetchByAssetIdsAndTokens($usageIds, $imageTokens))
        ->setCollection(MD::VENUEREF, $venues)
        ->setCollection(MD::PARENTAMENITYREF, AmenityProxy::fetchEnabled($venueIds))
        ->setCollection(MD::PARENTOHREF, HoursProxy::fetch($venueIds));
      $this->appendToModelsForGenericAssets($md, $usageIds);
    }
    $this->appendReferenceCollections($md);
    return $md;
  }

  public function buildModels(Id $id): MD {
    $usage = $this->usageFromId($id);
    $md = new MD();
    if (!is_null($usage)) {
      $usageAssetIds = collect([$usage->peekAttribute('id')]);
      $md
        ->setCollection(MD::USAGE, collect([$usage]))
        ->setCollection(MD::IMAGE, ImageEdgeProxy::fetch($usageAssetIds))
        ->setCollection(MD::AMENITY, AmenityProxy::fetchSuppressed($usageAssetIds));
      $this->appendToModelsForGenericAssets($md, $usageAssetIds);
    }
    return $md;
  }
}
