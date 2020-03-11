<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT;

use App\Maps\DayMap;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HoursProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ScheduleMDTT;
use Illuminate\Support\Collection;

class ScheduleMDT {

  public function build(MD $directory, RepresentsAsset $proxy): ?ProductPriceSchedule {
    if ($proxy->isSpace()) {
      return null;
    }
    $schedule = new ProductPriceSchedule();
    $days = $directory->useCollection(MD::HOUR, [
      'asset_id' => $proxy->getId(),
      'enabled' => 1
    ])->groupBy(function (HoursProxy $hourPro) {
      return $hourPro->day_id;
    })->map(function (Collection $relevantPros, int $dayId) {
      return (new ScheduleMDTT())->fromEloquent($relevantPros, $dayId);
    })->values()->all();
    return $schedule->setDays($days);
  }

  public function mutate(MD $directory, RepresentsAsset $proxy, ProductContext $context): void {
    $schedule = $context->getSchedule();
    if (!is_null($schedule)) {
      collect($schedule->getDays())->each(function (DailyHours $dailyHours) use($proxy, $directory) {
        $dayId = (new DayMap())->idFromType($dailyHours->getDay());
        collect($dailyHours->getSpans())->each(function (DaySpan $daySpan) use ($proxy, $directory, $dayId) {
          $data = array_merge([
            'asset_id' => $proxy->getId(),
            'day_id' => $dayId
          ], (new ScheduleMDTT())->toEloquent($daySpan));
          $directory->upsert(MD::HOUR, $data, ['enabled' => 1]);
        });
      });
    }
  }
}
