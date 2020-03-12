<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\ProductContexts as ContextProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;

class ImposeAssetContextTest extends TestCase
{
  /**
   * @dataProvider imposeAssetContextDataProvider
   * @group imposeAsset
   */
  public function testImposeAssetContext(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeAssetContext');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeAssetContextDataProvider() {
    $contextProvider = new ContextProvider();
    return [
      'impose' => [
        'input' => [
          'template' => new Asset([
              'context' => $contextProvider->buildProductContext(),
          ]),
          'target' => new Asset(),
        ],
        'expected' => new Asset([
            'context' => $contextProvider->buildProductContext(),
        ]),
      ],
    ];
  }
}