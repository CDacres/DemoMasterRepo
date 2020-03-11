<?php

namespace Tests\Unit\Services\CalculateAssets;

use Exception;

use Tests\TestCase;
use Tests\_Providers\CalculatedAssets as Provider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;

class CalculateAssetTest extends TestCase
{
  /**
   * @dataProvider dataProvider
   * @group calculateAssets
   * @group build
   */
  public function testBuild(...$providedData) {
    $expected = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'calculatedAssetFromAsset');
    $calculatedAsset = $testMethod->invokeArgs($builder, $providedData);
    $this->assertEquals($expected, $calculatedAsset->serializeToJsonString());
  }

  public function dataProvider() {
    $pro = new Provider();
    return [
      $pro->fetchDataNoContext(),
      $pro->fetchDataAssetHasContextOnly(),
      $pro->fetchDataUsageHasContextOnly(),
      $pro->fetchDataProductHasContextOnly(),
      $pro->fetchDataAssetAllWeek9To5Usage1AllWeek8To6Product3AllWeek8To6(),
      $pro->fetchDataAssetAllWeek9To5Usage1Friday8To11Product1Friday8To6Usage2ClosedWeekendProduct3Friday8To11(),
      $pro->fetchDataAssetMonToFri9To5Weekend10To4Usage1ClosedWeekendProduct1Friday8To11Usage2AllWeek8To6(),
    ];
  }
}