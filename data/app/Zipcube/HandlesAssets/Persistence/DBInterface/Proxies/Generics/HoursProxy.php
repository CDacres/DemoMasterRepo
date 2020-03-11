<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics;

use App\ORM\OpeningPeriod;
use App\ORM\HourRate;
use Illuminate\Support\Collection;

class HoursProxy extends BaseProxy {

  const BASECLASS = OpeningPeriod::class;
  protected $placeHolderColumns = ['id'];

  static public function deleteCollection(Collection $collection): void {
    $oldPeriodIds = $collection->map(function (HoursProxy $proxy) {
      return $proxy->id;
    })->all();
    HourRate::whereIn('openingPeriod_id', $oldPeriodIds)->delete();
    OpeningPeriod::whereIn('id', $oldPeriodIds)->delete();
  }

}
