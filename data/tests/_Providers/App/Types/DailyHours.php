<?php

namespace Tests\_Providers\App\Types;

use App\Types\DailyHours as DailyHoursType;
use App\Types\DaySpan;

class DailyHours {

  public function buildEmptyDailyHours(): DailyHoursType {
    return new DailyHoursType();
  }

  public function buildDailyHours9To5(int $day): DailyHoursType {
    return new DailyHoursType([
      'day' => $day,
      'spans' => [new DaySpan([
        'start' => 540,
        'end' => 1020
      ])]
    ]);
  }

  public function buildDailyHours8To6(int $day): DailyHoursType {
    return new DailyHoursType([
      'day' => $day,
      'spans' => [new DaySpan([
        'start' => 480,
        'end' => 1080
      ])]
    ]);
  }
}