<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Maps\DayMap;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\HoursProxy;
use Illuminate\Support\Collection;

class ScheduleMDTT extends BaseMDTT {

  public function toEloquent(DaySpan $daySpan): array {
    return [
      'start' => $this->int($daySpan->getStart(), true),
      'end' => $this->int($daySpan->getEnd(), true)
    ];
  }

  public function fromEloquent(Collection $relPros, int $dayId): DailyHours {
    return (new DailyHours())
      ->setDay((new DayMap())->typeFromId($dayId))
      ->setSpans($this->generateSpans($relPros));
  }

  private function generateSpans(Collection $relPros): array {
    return $relPros->map(function (HoursProxy $proxy) {
      return (new DaySpan())
        ->setStart($proxy->start)
        ->setEnd($proxy->end);
    })->values()->all();
  }
}
