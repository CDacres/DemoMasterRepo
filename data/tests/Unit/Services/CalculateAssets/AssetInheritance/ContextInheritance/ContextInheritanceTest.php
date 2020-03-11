<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance;

use Exception;
use Tests\TestCase;
use Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance\AmenityInheritanceTest;
use Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance\ConfigurationInheritanceTest;
use Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance\MenuInheritanceTest;
use Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance\ScheduleInheritanceTest;
use Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance\TagInheritanceTest;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\AssetAmenityEdge;
use App\Types\AssetConfiguration;
use App\Types\CurrencyAmount;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\Id;
use App\Types\Menu;
use App\Types\MenuGroup;
use App\Types\MenuItem;
use App\Types\MenuPriceOption;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Types\TagEdge;

class ContextInheritanceTest extends TestCase
{
  /**
   * @dataProvider testContextInheritanceDataProvider
   * @group assetInheritance
   * @group contextInheritance
   */
  public function testContextInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'handleContextInheritence');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testContextInheritanceDataProvider() {
    return [
      'empty' => [
        'input' => [
          'parent' => new ProductContext(),
          'child' => new ProductContext(),
        ],
        'expected' => new ProductContext(),
      ],
      'inherit' => [
        'input' => [
          'parent' => new ProductContext([
            'website' => 'www.zipcube.com',
            'schedule' => ScheduleInheritanceTest::testScheduleInheritanceDataProvider()['inherit']['input']['parent'],
            'configurations' => ConfigurationInheritanceTest::testConfigurationInheritanceDataProvider()['inherit']['input']['parent'],
            'amenities' => AmenityInheritanceTest::testAmenityInheritanceDataProvider()['inherit']['input']['parent'],
            'tags' => TagInheritanceTest::testTagInheritanceDataProvider()['inherit']['input']['parent'],
            'menus' => MenuInheritanceTest::testMenuInheritanceDataProvider()['inherit']['input']['parent'],
          ]),
          'child' => new ProductContext([
            'website' => 'www.zipcube.com',
            'schedule' => ScheduleInheritanceTest::testScheduleInheritanceDataProvider()['inherit']['input']['child'],
            'configurations' => ConfigurationInheritanceTest::testConfigurationInheritanceDataProvider()['inherit']['input']['child'],
            'amenities' => AmenityInheritanceTest::testAmenityInheritanceDataProvider()['inherit']['input']['child'],
            'tags' => TagInheritanceTest::testTagInheritanceDataProvider()['inherit']['input']['child'],
            'menus' => MenuInheritanceTest::testMenuInheritanceDataProvider()['inherit']['input']['child'],
          ]),
        ],
        'expected' => new ProductContext([
          'website' => 'www.zipcube.com',
          'schedule' => ScheduleInheritanceTest::testScheduleInheritanceDataProvider()['inherit']['expected'],
          'configurations' => ConfigurationInheritanceTest::testConfigurationInheritanceDataProvider()['inherit']['expected'],
          'amenities' => AmenityInheritanceTest::testAmenityInheritanceDataProvider()['inherit']['expected'],
          'tags' => TagInheritanceTest::testTagInheritanceDataProvider()['inherit']['expected'],
          'menus' => MenuInheritanceTest::testMenuInheritanceDataProvider()['inherit']['expected'],
        ]),
      ],
    ];
  }
}