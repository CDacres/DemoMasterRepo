<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\Currency;

class ImposeAssetCurrencyTest extends TestCase
{
  /**
   * @dataProvider imposeAssetCurrencyDataProvider
   * @group imposeAsset
   */
  public function testImposeAssetCurrency(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeAssetCurrency');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeAssetCurrencyDataProvider() {
    return [
      'impose' => [
        'input' => [
          'template' => new Asset([
              'currency' => Currency::GBP,
          ]),
          'target' => new Asset(),
        ],
        'expected' => new Asset([
            'currency' => Currency::GBP,
        ]),
      ],
      'dontImpose' => [
        'input' => [
          'template' => new Asset([
            'currency' => Currency::GBP,
        ]),
          'target' => new Asset([
            'currency' => Currency::EUR,
        ]),
        ],
        'expected' => new Asset([
            'currency' => Currency::EUR,
        ]),
      ],
    ];
  }
}