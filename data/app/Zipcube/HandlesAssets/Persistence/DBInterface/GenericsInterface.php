<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\DBInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ConfigProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\DayRateProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\TagProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ProductAliasProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ProductProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\References\AmenityRefProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use Illuminate\Support\Collection;

class GenericsInterface extends DBInterface {

  protected function appendToModelsForGenericAssets(MD $md, Collection $assetIds): MD {
    $md->setCollection(MD::DAYRATE, DayRateProxy::fetch($assetIds))
      ->setCollection(MD::PRODUCT, ProductProxy::fetch($assetIds))
      ->setCollection(MD::TAG, TagProxy::fetch($assetIds))
      ->setCollection(MD::PRODUCTALIAS, ProductAliasProxy::fetch($assetIds))
      ->setCollection(MD::CONFIG, ConfigProxy::fetch($assetIds));
    return $md;
  }

  protected function appendReferenceCollections(MD $md): MD {
    $md
      ->setCollection(MD::AMENITYREF, AmenityRefProxy::fetch());
    return $md;
  }

}
