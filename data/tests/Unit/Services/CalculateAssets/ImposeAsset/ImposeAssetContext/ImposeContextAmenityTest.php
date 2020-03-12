<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\AssetAmenityEdges as AmenityProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\ProductContext;

class ImposeContextAmenitiesTest extends TestCase
{
  /**
   * @dataProvider imposeContextAmenitiesDataProvider
   * @group imposeAsset
   */
  public function testImposeContextAmenities(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeContextAmenities');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeContextAmenitiesDataProvider() {
    $amenityProvider = new AmenityProvider();
    $context1 = new ProductContext();
    $context2 = new ProductContext();
    $context3 = new ProductContext();
    $context4 = new ProductContext();
    $context5 = new ProductContext();
    $context1->setAmenities([$amenityProvider->buildAmenityEdge(1, 'Test Amenity')]);
    $context2->setAmenities([$amenityProvider->buildAmenityEdge(1, 'Different Test Amenity - Same Id'), $amenityProvider->buildSuppressedAmenityEdge(2, 'Suppressed Amenity')]);
    $context3->setAmenities([$amenityProvider->buildAmenityEdge(1, 'Test Amenity')]);
    $context4->setAmenities([$amenityProvider->buildAmenityEdge(2, 'Test Amenity 2')]);
    $context5->setAmenities([$amenityProvider->buildAmenityEdge(1, 'Test Amenity'), $amenityProvider->buildAmenityEdge(2, 'Test Amenity 2')]);
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
            'context' => $context2,
          ]),
          'target' => new Asset([
            'context' => $context1,
          ]),
        ],
        'expected' => new Asset([
          'context' => $context3,
        ]),
      ],
      'combine' => [
        'input' => [
          'template' => new Asset([
            'context' => $context4,
          ]),
          'target' => new Asset([
            'context' => $context1,
          ]),
        ],
        'expected' => new Asset([
          'context' => $context5,
        ]),
      ],
    ];
  }
}