<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\Locations as LocationProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;

class ImposeAssetLocationTest extends TestCase
{
  /**
   * @dataProvider imposeAssetLocationDataProvider
   * @group imposeAsset
   */
  public function testImposeAssetLocation(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeAssetLocation');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeAssetLocationDataProvider() {
    $locationProvider = new LocationProvider();
    return [
      'impose' => [
        'input' => [
          'template' => new Asset([
              'location' => $locationProvider->buildEmptyLocation(),
          ]),
          'target' => new Asset(),
        ],
        'expected' => new Asset([
            'location' => $locationProvider->buildEmptyLocation(),
        ]),
      ],
      'dontImpose' => [
        'input' => [
          'template' => new Asset([
            'location' => $locationProvider->buildEmptyLocation(),
        ]),
          'target' => new Asset([
            'location' => $locationProvider->buildLocationEmptySubTypes(),
        ]),
        ],
        'expected' => new Asset([
            'location' => $locationProvider->buildLocationEmptySubTypes(),
        ]),
      ],
    ];
  }
}