<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Maps\VerticalMap;
use App\Types\Usage;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\UsageMDTT;

class UsageMDT {

  public function mutate(MD $directory, RepresentsAsset $proxy, Usage $usage): void {
    $directory->upsert(MD::USAGE, ['id' => $proxy->getId()], (new UsageMDTT())->toUsageProxy($usage));
    (new ContextMDT())->mutate($directory, $proxy, $usage->getContext());
    (new ProductMDT())->mutate($directory, $proxy, $usage->getProducts());
  }

  public function build(MD $directory, RepresentsAsset $proxy): Usage {
    return (new Usage())
      ->setCategory((new VerticalMap())->categoryFromIdAndOfficeType($proxy->primary_vertical_id, $proxy->office_type_id))
      ->setContext((new ContextMDT())->build($directory, $proxy))
      ->setProducts((new ProductMDT())->build($directory, $proxy));
  }

}
