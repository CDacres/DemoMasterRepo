<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance;

use Exception;
use Tests\TestCase;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\CurrencyAmount;
use App\Types\Menu;
use App\Types\MenuGroup;
use App\Types\MenuItem;
use App\Types\MenuPriceOption;
use App\Types\ProductContext;

class MenuInheritanceTest extends TestCase
{
  /**
   * @dataProvider testMenuInheritanceDataProvider
   * @group assetInheritance
   * @group contextInheritance
   */
  public function testMenuInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'handleMenuInheritance');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testMenuInheritanceDataProvider() {
    return [
      'inherit' => [
        'input' => [
          'parent' => [new Menu([
            'description' => 'Test Menu',
            'groups' => [new MenuGroup([
              'description' => 'Example Menu Group',
              'orderIndex' => 1,
              'items' => [new MenuItem(['description' => 'Example Menu Group', 'orderIndex' => 1, 'priceOptions' => [new MenuPriceOption(['kind' => '', 'description' => 'Menu Price Description', 'price' => new CurrencyAmount(['value' => 12.34, 'currency' => 1])])]])]])],
          ])],
          'child' => [new Menu([
            'description' => 'Test Menu 2',
            'groups' => [new MenuGroup([
              'description' => 'Example Menu Group 2',
              'orderIndex' => 2,
              'items' => [new MenuItem(['description' => 'Example Menu Group 2', 'orderIndex' => 2, 'priceOptions' => [new MenuPriceOption(['kind' => '', 'description' => 'Menu Price Description 2', 'price' => new CurrencyAmount(['value' => 21.34, 'currency' => 1])])]])]])],
          ])],
        ],
        'expected' => [
          new Menu([
            'description' => 'Test Menu',
            'groups' => [new MenuGroup([
              'description' => 'Example Menu Group',
              'orderIndex' => 1,
              'items' => [new MenuItem(['description' => 'Example Menu Group', 'orderIndex' => 1, 'priceOptions' => [new MenuPriceOption(['kind' => '', 'description' => 'Menu Price Description', 'price' => new CurrencyAmount(['value' => 12.34, 'currency' => 1])])]])]])],
          ]),
          new Menu([
            'description' => 'Test Menu 2',
            'groups' => [new MenuGroup([
              'description' => 'Example Menu Group 2',
              'orderIndex' => 2,
              'items' => [new MenuItem(['description' => 'Example Menu Group 2', 'orderIndex' => 2, 'priceOptions' => [new MenuPriceOption(['kind' => '', 'description' => 'Menu Price Description 2', 'price' => new CurrencyAmount(['value' => 21.34, 'currency' => 1])])]])]])],
          ])
        ],
      ],
    ];
  }
}