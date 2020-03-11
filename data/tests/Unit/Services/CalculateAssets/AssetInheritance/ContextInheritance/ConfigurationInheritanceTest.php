<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance;

use Exception;
use Tests\TestCase;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\AssetConfiguration;

class ConfigurationInheritanceTest extends TestCase
{
  /**
   * @dataProvider testConfigurationInheritanceDataProvider
   * @group assetInheritance
   * @group contextInheritance
   */
  public function testConfigurationInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'handleConfigurationInheritance');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testConfigurationInheritanceDataProvider() {
    return [
      'inherit' => [
        'input' => [
          'parent' => [new AssetConfiguration(['kind' => 8, "maxPax" => 50])],
          'child' => [],
        ],
        'expected' => [new AssetConfiguration(['kind' => 8, "maxPax" => 50])]
      ],
      'dontInherit' => [
        'input' => [
          'parent' => [new AssetConfiguration(['kind' => 8, "maxPax" => 50])],
          'child' => [new AssetConfiguration(['kind' => 5, "maxPax" => 45])],
        ],
        'expected' => [new AssetConfiguration(['kind' => 5, "maxPax" => 45])],
      ],
    ];
  }
}