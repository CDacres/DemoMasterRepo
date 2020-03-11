<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics;

use App\ORM\HourRate;
use App\ORM\OpeningPeriod;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\SimpleProxy;
use Illuminate\Support\Collection;

class HourRateProxy extends SimpleProxy {

  const BASECLASS = HourRate::class;

  static public function fetch(Collection $usageIds): Collection {
    $periodIds = OpeningPeriod::whereIn('asset_id', $usageIds->all())->get()->pluck('id');
    $models = HourRate::whereIn('openingPeriod_id', $periodIds)->get();
    return $models->map(function (HourRate $model) {
      return new static($model);
    });
  }

  static public function deleteCollection(Collection $collection): void {
    $oldIds = $collection->map(function (HourRateProxy $proxy) {
      return $proxy->id;
    })->all();
    HourRate::whereIn('id', $oldIds)->delete();
  }
}
