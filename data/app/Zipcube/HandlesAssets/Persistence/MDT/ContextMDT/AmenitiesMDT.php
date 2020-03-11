<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT;

use App\Types\AssetAmenityEdge;
use App\Types\ProductContext;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\AmenityProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\AmenityMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

class AmenitiesMDT {

  public function build(MD $directory, RepresentsAsset $proxy): array {
    return $directory->useCollection(MD::AMENITY, [
      'asset_id' => $proxy->getId(),
      'enabled' => 1
    ])->filter(function (AmenityProxy $amPro) use($proxy) {
      return !$proxy->isSpace() || !$amPro->available;
    })->map(function (AmenityProxy $amPro) {
      return (new AmenityMDTT())->fromEloquent($amPro);
    })->values()->all();
  }

  public function mutate(MD $directory, RepresentsAsset $proxy, ProductContext $context): void {
    $amenities = $context->getAmenities();
    if ($amenities->count() > 0) {
      collect($amenities)->each(function (AssetAmenityEdge $edge) use($proxy, $directory) {
        $amenityId = (int)$edge->getAmenityId()->getValue();
        $amenity = $directory->use(MD::AMENITYREF, ['id' => $amenityId]);
        $updateData = array_merge([
          'amenity_type_id' => (int)$amenity->amenity_types_id,
          'name' => $amenity->desc,
          'allows_price' => $amenity->allow_price
        ], (new AmenityMDTT())->toEloquent($edge));
        $directory->upsert(MD::AMENITY, [
          'asset_id' => $proxy->getId(),
          'amenity_id' => (int)$amenityId, // TODO update with IntId
        ], $updateData);
      });
    }
  }
}
