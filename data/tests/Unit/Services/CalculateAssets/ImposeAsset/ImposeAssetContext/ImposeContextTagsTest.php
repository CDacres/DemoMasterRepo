<?php

namespace Tests\Unit\Services\CalculateAssets\ImposeAsset;

use Exception;
use Tests\TestCase;
use Tests\_Providers\App\Types\TagEdges as TagProvider;

use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Types\Asset;
use App\Types\ProductContext;

class ImposeContextTagsTest extends TestCase
{
  /**
   * @dataProvider imposeContextTagsDataProvider
   * @group imposeAsset
   */
  public function testImposeContextTags(...$providedData) {
    $expected = array_pop($providedData);
    $input = array_pop($providedData);
    $builder = new CalculatesAssetsService(null);
    $testMethod = $this->getMethod('App\Zipcube\CalculatesAssets\CalculatesAssetsService', 'imposeContextTags');
    $testMethod->invokeArgs($builder, $input);
    $this->assertEquals($expected, $input['target']);
  }

  public function imposeContextTagsDataProvider() {
    $tagProvider = new TagProvider();
    $context1 = new ProductContext();
    $context2 = new ProductContext();
    $context3 = new ProductContext();
    $context1->setTags([$tagProvider->buildTagEdge(1)]);
    $context2->setTags([$tagProvider->buildTagEdge(1), $tagProvider->buildSuppressedTagEdge(2)]);
    $context3->setTags([$tagProvider->buildTagEdge(1)]);
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
      'dontImpose' => [
        'input' => [
          'template' => new Asset([
            'context' => $context2,
          ]),
          'target' => new Asset([
            'context' => $context1,
          ]),
        ],
        'expected' => new Asset([
          'context' => $context3,
        ]),
      ],
    ];
  }
}