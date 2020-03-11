<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance;

use Exception;
use Tests\TestCase;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\ProductPriceSchedule;

class ScheduleInheritanceTest extends TestCase
{
  /**
   * @dataProvider testScheduleInheritanceDataProvider
   * @group assetInheritance
   * @group contextInheritance
   */
  public function testScheduleInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'handleScheduleInheritance');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testScheduleInheritanceDataProvider() {
    return [
      //TODO: Confirm rules for schedule inheritance
      'inherit' => [
        'input' => [
          'parent' => new ProductPriceSchedule(['days' => [
            new DailyHours(['day' => 2, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
            new DailyHours(['day' => 3, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
            new DailyHours(['day' => 4, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
            new DailyHours(['day' => 5, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
            new DailyHours(['day' => 6, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
          ]]),
          'child' => new ProductPriceSchedule(['days' => [
            new DailyHours(['day' => 1, 'spans' => [new DaySpan(['start' => 660, 'end' => 960])]]),
            new DailyHours(['day' => 6, 'spans' => [new DaySpan(['start' => 540, 'end' => 1020])]]),
            new DailyHours(['day' => 7, 'spans' => [new DaySpan(['start' => 600, 'end' => 1200])]]),
          ]]),
        ],
        'expected' => new ProductPriceSchedule(['days' => [
          new DailyHours(['day' => 1, 'spans' => [new DaySpan(['start' => 660, 'end' => 960])]]),
          new DailyHours(['day' => 6, 'spans' => [new DaySpan(['start' => 540, 'end' => 1020])]]),
          new DailyHours(['day' => 7, 'spans' => [new DaySpan(['start' => 600, 'end' => 1200])]]),
          new DailyHours(['day' => 2, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
          new DailyHours(['day' => 3, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
          new DailyHours(['day' => 4, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
          new DailyHours(['day' => 5, 'spans' => [new DaySpan(['start' => 480, 'end' => 1080])]]),
          ]]),
      ],
    ];
  }
}