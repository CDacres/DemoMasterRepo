<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\Menus as MenuProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\ProductContext;

class ImposeContextMenusTest extends TestCase
{
  /**
   * @dataProvider imposeContextMenusDataProvider
   * @group imposeAsset
   */
  public function testImposeContextMenus(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeContextMenus');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeContextMenusDataProvider() {
    $menuProvider = new MenuProvider();
    $context1 = new ProductContext();
    $context2 = new ProductContext();
    $context1->setMenus([$menuProvider->buildMenu()]);
    $context2->setMenus([$menuProvider->buildMenu(), $menuProvider->buildMenu()]);
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
      'combine' => [
        'input' => [
          'template' => new Asset([
            'context' => $context1,
          ]),
          'target' => new Asset([
            'context' => $context1,
          ]),
        ],
        'expected' => new Asset([
          'context' => $context2,
        ]),
      ],
    ];
  }
}