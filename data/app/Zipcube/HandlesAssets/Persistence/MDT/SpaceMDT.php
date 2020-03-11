<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\Asset;
use App\Types\Id;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\AssetMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

class SpaceMDT {

  public function mutate(MD $directory, Asset $target): void {
    $usage = $target->getUsages()[0];
    $token = $target->getId()->getValue();
    $atts = (new AssetMDTT())->toSpaceRoom($target);
    $originalProxy = $directory->use(MD::USAGE, ['token' => $token]);
    $proxy = $directory->upsert(MD::USAGE, ['token' => $token], $atts);
    (new UsageMDT())->mutate($directory, $proxy, $usage);
    (new ImagesMDT())->mutate($directory, $proxy, $target);
  }

  public function build(MD $directory, Id $id): Asset {
    $proxy = $directory->use(MD::USAGE, ['token' => $id->getValue()]);
    $asset = (new AssetMDTT())->fromRoomUsageProxy($proxy);
    $usage = (new UsageMDT())->build($directory, $proxy);
    $asset->setUsages([$usage]);
    $asset->setImages((new ImagesMDT())->build($directory, $proxy));
    return $asset;
  }
}
