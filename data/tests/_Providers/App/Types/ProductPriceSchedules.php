<?php

namespace Tests\_Providers\App\Types;

use Tests\_Providers\App\Types\DailyHours;

use App\Types\Day;
use App\Types\ProductPriceSchedule;

class ProductPriceSchedules {

  public function buildEmptySchedule(): ProductPriceSchedule {
    return new ProductPriceSchedule();
  }

  public function buildScheduleMonToFri9To5(): ProductPriceSchedule {
    return new ProductPriceSchedule([
      'days' => [
        DailyHours::buildDailyHours9To5(Day::MONDAY),
        DailyHours::buildDailyHours9To5(Day::TUESDAY),
        DailyHours::buildDailyHours9To5(Day::WEDNESDAY),
        DailyHours::buildDailyHours9To5(Day::THURSDAY),
        DailyHours::buildDailyHours9To5(Day::FRIDAY),
      ]
    ]);
  }

  public function buildScheduleMonToFri8To6(): ProductPriceSchedule {
    return new ProductPriceSchedule([
      'days' => [
        DailyHours::buildDailyHours8To6(Day::MONDAY),
        DailyHours::buildDailyHours8To6(Day::TUESDAY),
        DailyHours::buildDailyHours8To6(Day::WEDNESDAY),
        DailyHours::buildDailyHours8To6(Day::THURSDAY),
        DailyHours::buildDailyHours8To6(Day::FRIDAY),
      ]
    ]);
  }

  public function buildScheduleSatSun9To5(): ProductPriceSchedule {
    return new ProductPriceSchedule([
      'days' => [
        DailyHours::buildDailyHours9To5(Day::SATURDAY),
        DailyHours::buildDailyHours9To5(Day::SUNDAY),
      ]
    ]);
  }

  public function buildScheduleEveryday9To5(): ProductPriceSchedule {
    return new ProductPriceSchedule([
      'days' => [
        DailyHours::buildDailyHours9To5(Day::MONDAY),
        DailyHours::buildDailyHours9To5(Day::TUESDAY),
        DailyHours::buildDailyHours9To5(Day::WEDNESDAY),
        DailyHours::buildDailyHours9To5(Day::THURSDAY),
        DailyHours::buildDailyHours9To5(Day::FRIDAY),
        DailyHours::buildDailyHours9To5(Day::SATURDAY),
        DailyHours::buildDailyHours9To5(Day::SUNDAY),
      ]
    ]);
  }
}