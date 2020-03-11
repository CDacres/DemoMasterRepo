<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance;

use Exception;
use Tests\TestCase;
use Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance\ContextInheritanceTest;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\CAsset;

class AssetInheritanceTest extends TestCase
{
  /**
   * @dataProvider testAssetInheritanceDataProvider
   * @group assetInheritance
   */
  public function testAssetInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'inheritFromParentAsset');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testAssetInheritanceDataProvider() {
    return [
      'inherit' => [
        'input' => [new CAsset([
          'collection' => [
            new Asset(['context' => ContextInheritanceTest::testContextInheritanceDataProvider()['inherit']['input']['child']]),
            new Asset(['context' => ContextInheritanceTest::testContextInheritanceDataProvider()['inherit']['input']['parent']])
          ]
        ])],
        'expected' => new Asset(['context' => ContextInheritanceTest::testContextInheritanceDataProvider()['inherit']['expected']])
      ],
    ];
  }
}