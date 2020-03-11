<?php

namespace Tests\Unit\Projections\Assets;

use App\Zipcube\HandlesAssets\Persistence\ProductBuilder;
use Exception;
use Tests\TestCase;
use Tests\_Providers\Products as Provider;

class ProductBuildTest extends TestCase
{

  /**
   * @dataProvider dataProvider
   * @group products
   * @group build
   */
  public function testBuild(...$providedData) {
    $expected = array_pop($providedData);
    $builder = new ProductBuilder();
    $products = $builder->productsFromEloquent(...$providedData);
    $this->assertEquals($expected, $products);
  }

  /**
   * @group products
   * @group build
   */
  public function testExceptionOnBadAsset() {
    $this->expectException(Exception::class);
    $builder = new ProductBuilder();
    $pro = new Provider();
    $products = $builder->productsFromEloquent($pro->badAsset(), $pro->roomWithHourly(), $pro->anyVenue(), collect(), collect(), null);
  }

  /**
   * @group products
   * @group build
   */
  public function testExceptionOnBadDayRate() {
    $this->expectException(Exception::class);
    $builder = new ProductBuilder();
    $pro = new Provider();
    $products = $builder->productsFromEloquent($pro->badAsset(), $pro->roomWithHourly(), $pro->anyVenue(), collect(), collect(), $pro->badDayRate());
  }

  public function dataProvider() {
    $pro = new Provider();
    return [
      'Hourly' => $pro->fetchHourly(),
      'Daily' => $pro->fetchDaily(),
      'Hourly & Daily' => $pro->fetchHourlyAndDaily(),
      'Custom First Half' => $pro->fetchCustomFirst(),
      'Custom Second Half' => $pro->fetchCustomSecond(),
      'Two Span Not Half Day' => $pro->fetchTwoSpanNotHalfDay(),
      'Half Day' => $pro->fetchHalfDay(),
      'Combined Not Half Day' => $pro->fetchCombinedNotHalfDay(),
      'Combined Half Day' => $pro->fetchCombinedHalfDay(),
      'Combined Half Day With Alias' => $pro->fetchCombinedHalfDayWithAlias(),
      'Combined Not Half Day With Alias' => $pro->fetchCombinedNotHalfDayWithAlias(),
      'Combined Half-day With Alias and New Product ' => $pro->fetchCombinedHalfDayWithAliasAndNewProduct(),
      'Meeting Hourly with Product Composition' => $pro->fetchMeetingHourlyWithProductComposition(),
      'Meeting Hourly with Alias and Product Composition' => $pro->fetchMeetingHourlyWithAliasAndProductComposition(),
      'Office Monthly With Alias' => $pro->fetchOfficeMonthlyWithAlias(),
    ];
  }

}
