<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\ProductPriceSchedules as ScheduleProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\ProductContext;

class ImposeContextScheduleTest extends TestCase
{
  /**
   * @dataProvider imposeContextScheduleDataProvider
   * @group imposeAsset
   */
  public function testImposeContextSchedule(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeContextSchedule');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeContextScheduleDataProvider() {
    $scheduleProvider = new ScheduleProvider();
    $context1 = new ProductContext();
    $context2 = new ProductContext();
    $context3 = new ProductContext();
    $context4 = new ProductContext();
    $context1->setSchedule($scheduleProvider->buildScheduleMonToFri9To5());
    $context2->setSchedule($scheduleProvider->buildScheduleMonToFri8To6());
    $context3->setSchedule($scheduleProvider->buildScheduleSatSun9To5());
    $context4->setSchedule($scheduleProvider->buildScheduleEveryday9To5());
    return [
      'impose' => [
        'input' => [
          'template' => new Asset([
              'context' => $context1,
          ]),
          'target' => new Asset([
            'context' => new ProductContext(),
          ]),
        ],
        'expected' => new Asset([
            'context' => $context1,
        ]),
      ],
      'dontImpose' => [
        'input' => [
          'template' => new Asset([
              'context' => $context1,
          ]),
          'target' => new Asset([
            'context' => $context2,
          ]),
        ],
        'expected' => new Asset([
            'context' => $context2,
        ]),
      ],
      'combine' => [
        'input' => [
          'template' => new Asset([
              'context' => $context3,
          ]),
          'target' => new Asset([
            'context' => $context1,
          ]),
        ],
        'expected' => new Asset([
            'context' => $context4,
        ]),
      ],
    ];
  }
}