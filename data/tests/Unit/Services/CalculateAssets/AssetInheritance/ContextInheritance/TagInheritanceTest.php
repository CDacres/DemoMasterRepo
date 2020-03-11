<?php

namespace Tests\Unit\Services\CalculateAssets\AssetInheritance\ContextInheritance;

use Exception;
use Tests\TestCase;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Id;
use App\Types\ProductContext;
use App\Types\TagEdge;

class TagInheritanceTest extends TestCase
{
  /**
   * @dataProvider testTagInheritanceDataProvider
   * @group assetInheritance
   * @group contextInheritance
   */
  public function testTagInheritance(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'handleTagInheritance');
    $inherited = $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $inherited);
  }

  public function testTagInheritanceDataProvider() {
    return [
      'inherit' => [
        'input' => [
          'parent' => [new TagEdge(['tagId' => new Id(['value' => '1'])])],
          'child' => [new TagEdge(['tagId' => new Id(['value' => '2'])])],
        ],
        'expected' => [
          new TagEdge(['tagId' => new Id(['value' => '1'])]),
          new TagEdge(['tagId' => new Id(['value' => '2'])])
        ],
      ],
    ];
  }
}