<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\Usages as UsageProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\ProductCategory;

class ImposeAssetNameTest extends TestCase
{
  /**
   * @dataProvider imposeAssetNameDataProvider
   * @group imposeAsset
   */
  public function testImposeAssetName(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeAssetName');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeAssetNameDataProvider() {
    $usageProvider = new UsageProvider();
    return [
      'impose' => [
        'input' => [
          'template' => new Asset([
            'name' => 'Template Asset',
            'usages' => [$usageProvider->buildUsage(ProductCategory::MEETING)]
          ]),
          'target' => new Asset(),
        ],
        'expected' => new Asset([
          'name' => 'Template Asset'.' - '.ProductCategory::name(ProductCategory::MEETING),
        ]),
      ],
      'dontImpose' => [
        'input' => [
          'template' => new Asset([
            'name' => 'Template Asset',
            'usages' => [$usageProvider->buildUsage(ProductCategory::MEETING)]
          ]),
          'target' => new Asset([
            'name' => 'Target Asset'
          ]),
        ],
        'expected' => new Asset([
          'name' => 'Target Asset'
        ]),
      ],
    ];
  }
}