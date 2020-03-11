<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\Asset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageEdgeProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ImageMDTT;

class ImagesMDT {

  public function mutate(MD $directory, RepresentsAsset $proxy, Asset $asset): void {
    $images = collect($asset->getImages());
    if ($images->count() > 0) {
      $images->each(function ($image) use($proxy, $directory) {
        $directory->upsert(MD::IMAGE, ['token' => $image->getImageId()->getValue()], (new ImageMDTT())->toEloquent($image, $proxy->getId()));
      });
    }
  }

  public function build(MD $directory, RepresentsAsset $proxy): array {
    return $directory->useCollection(MD::IMAGE, [
      'asset_id' => $proxy->getId(),
      'enabled' => 1
    ])->map(function (ImageEdgeProxy $imPro) {
      return (new ImageMDTT())->fromEloquent($imPro);
    })->values()->all();
  }
}
