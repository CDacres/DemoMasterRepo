<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance;

use Exception;
use Tests\TestCase;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\AssetAmenityEdge;
use App\Types\CurrencyAmount;
use App\Types\Id;

class AmenityInheritanceTest extends TestCase
{
  /**
   * @dataProvider testAmenityInheritanceDataProvider
   * @group assetInheritance
   * @group contextInheritance
   */
  public function testAmenityInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'handleAmenityInheritance');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testAmenityInheritanceDataProvider() {
    return [
      'inherit' => [
        'input' => [
          'parent' => [new AssetAmenityEdge([
            'amenityId' => new Id(['value' => '19']),
            'price' => new CurrencyAmount(['value' => 5.67, 'currency' => 1]),
            'note' => 'This is a test amenity for whiteboards.',
            'suppressed' => false,
            'description' => 'Whiteboards',
          ])],
          'child' => [new AssetAmenityEdge([
            'amenityId' => new Id(['value' => '18']),
            'price' => new CurrencyAmount(['value' => 12.34, 'currency' => 1]),
            'note' => 'This is a test amenity for a video conference phone.',
            'suppressed' => false,
            'description' => 'Video Conference Phone',
          ])],
        ],
        'expected' => [
          new AssetAmenityEdge([
            'amenityId' => new Id(['value' => '19']),
            'price' => new CurrencyAmount(['value' => 5.67, 'currency' => 1]),
            'note' => 'This is a test amenity for whiteboards.',
            'suppressed' => false,
            'description' => 'Whiteboards',
          ]),
          new AssetAmenityEdge([
            'amenityId' => new Id(['value' => '18']),
            'price' => new CurrencyAmount(['value' => 12.34, 'currency' => 1]),
            'note' => 'This is a test amenity for a video conference phone.',
            'suppressed' => false,
            'description' => 'Video Conference Phone',
          ])
        ],
      ],
    ];
  }
}