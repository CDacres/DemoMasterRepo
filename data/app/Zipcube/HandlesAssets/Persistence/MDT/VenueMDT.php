<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Maps\VerticalMap;

use App\Types\Asset;
use App\Types\Id;
use App\Types\Usage;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\AssetMDTT;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ContextMDTT;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\LocationMDTT;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\UsageMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use Illuminate\Support\Collection;

class VenueMDT {

  public function mutate(MD $directory, Asset $target): void {
    $this->validate($target);
    $token = $target->getId()->getValue();
    $originalProxy = $directory->use(MD::VENUE, ['token' => $token]);
    $venueAtts = array_merge(
      ['token' => $token],
      (new AssetMDTT())->toVenueProxy($target),
      (new ContextMDTT())->toVenueProxy($target->getContext()),
      (new LocationMDTT())->toVenueProxy($target->getLocation())
    );
    $proxy = $directory->upsert(MD::VENUE, ['token' => $token], $venueAtts);
    (new ContextMDT())->mutate($directory, $proxy, $target->getContext());
    (new ImagesMDT())->mutate($directory, $proxy, $target);
    $this->mutateUsages($directory, $proxy, $target);
  }

  public function build(MD $directory, Id $id): Asset {
    $proxy = $directory->use(MD::VENUE, ['token' => $id->getValue()]);
    $asset = (new AssetMDTT())->fromVenueProxy($proxy)
      ->setContext((new ContextMDTT())->fromVenueProxy($proxy))
      ->setLocation((new LocationMDTT())->fromVenueProxy($proxy));
    $asset->getContext()->mergeFrom((new ContextMDT())->build($directory, $proxy));
    $asset->setUsages($this->buildUsages($directory, $proxy));
    $asset->setImages((new ImagesMDT())->build($directory, $proxy));
    return $asset;
  }

  private function validate(Asset $asset): void {
    if (collect($asset->getUsages())->groupBy(function (Usage $usage) {
      return $usage->getCategory();
    })->contains(function (Collection $group) {
      return $group->count() > 1;
    })) {
      throw new \Exception('Poorly formed venue usages');
    }
  }

  private function mutateUsages(MD $directory, VenueProxy $proxy, Asset $target): void {
    $usages = $target->getUsages();
    if ($usages->count() > 0) {
      collect($usages)->each(function (Usage $usage) use($directory, $proxy, $target) {
        $aliasProxy = $directory->upsert(MD::USAGE, [
          'venue_usage_token' => $proxy->token,
          'parent_id' => $proxy->id,
          'venue_id' => $proxy->venue_id,
          'primary_vertical_id' => (new VerticalMap())->idFromCategory($usage->getCategory())
        ], (new UsageMDTT())->toVenueUsageProxy($usage));
        (new UsageMDT())->mutate($directory, $aliasProxy, $usage, $target->getContext());
      });
    }
  }

  private function buildUsages(MD $directory, VenueProxy $proxy): array {
    return $directory->useCollection(MD::USAGE, [
      'venue_usage_token' => $proxy->getToken(),
      'enabled' => 1
    ])->map(function (UsageProxy $usageProxy) use($directory) {
      $usage = (new UsageMDT())->build($directory, $usageProxy);
      $usage->mergeFrom((new UsageMDTT())->fromVenueUsageProxy($usageProxy));
      return $usage;
    })->values()->all();
  }
}
