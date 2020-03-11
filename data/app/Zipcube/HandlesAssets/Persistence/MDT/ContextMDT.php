<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\ProductContext;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT\AmenitiesMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT\ConfigurationsMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT\TagsMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT\ScheduleMDT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

class ContextMDT {

  public function mutate(MD $directory, RepresentsAsset $proxy, ?ProductContext $context): void {
    if (!is_null($context)) {
      (new ConfigurationsMDT())->mutate($directory, $proxy, $context);
      (new AmenitiesMDT())->mutate($directory, $proxy, $context);
      (new ScheduleMDT())->mutate($directory, $proxy, $context);
      (new TagsMDT())->mutate($directory, $proxy, $context);
    }
  }

  public function build(MD $directory, RepresentsAsset $proxy): ProductContext {
    $context = new ProductContext();
    $context->setAmenities((new AmenitiesMDT())->build($directory, $proxy));
    $context->setConfigurations((new ConfigurationsMDT())->build($directory, $proxy));
    $context->setSchedule((new ScheduleMDT())->build($directory, $proxy));
    $context->setTags((new TagsMDT())->build($directory, $proxy));
    return $context;
  }

}
