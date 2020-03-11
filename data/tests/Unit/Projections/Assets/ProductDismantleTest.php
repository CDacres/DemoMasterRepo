<?php

namespace Tests\Unit\Projections\Assets;

use App\Zipcube\HandlesAssets\Persistence\ProductDismantler\Deconstruction;
use App\Zipcube\HandlesAssets\Persistence\ProductDismantler\ProductDismantler;
use Exception;
use Tests\TestCase;

use App\ORM\Asset as EAsset;
use App\ORM\Room as ERoom;
use App\ORM\DayRate as EDayRate;
use App\ORM\Venue as EVenue;
use App\Types\CProduct;
use App\Types\CurrencyAmount;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\Id;
use App\Types\Product;
use App\Types\ProductBookingParameters;
use App\Types\ProductPriceSchedule;
use App\Types\ProductContext;

class ProductDismantleTest extends TestCase
{
  const HOURLY = 'HOURLY';
  const BADASSET = 'BADASSET';
  const HALFDAY = 'HALFDAY';

  private $assetId = '12345678901234567890123456789012';
  private $tokenRoot = '001122334455667788999876543210';

  private function seeds($type) {
    $product1   = new Product();
    $id1        = new Id();
    $unitPrice1 = new CurrencyAmount;
    $params1    = new ProductBookingParameters;
    $context1   = new ProductContext;
    $id1->setValue("13579098765432123456789098765432");
    $unitPrice1->setValue(16.34);
    $unitPrice1->setCurrency(1);
    $context1->setWebsite("test.com");
    $product1->setId($id1);
    $product1->setUnitPrice($unitPrice1);
    $product1->setCoverage(1);
    $product1->setUnit(8);
    $product1->setParameters($params1);
    $product1->setContext($context1);

    $product2   = new Product();
    $id2        = new Id();
    $unitPrice2 = new CurrencyAmount;
    $params2    = new ProductBookingParameters;
    $context2   = new ProductContext;
    $schedule   = new ProductPriceSchedule;
    $days       = new DailyHours;
    $daySpan1   = new DaySpan;
    $daySpan2   = new DaySpan;
    $id2->setValue("01112222333354445555666677778801");
    $unitPrice2->setValue(13.24);
    $unitPrice2->setCurrency(1);
    $daySpan1->setStart(720);
    $daySpan1->setEnd(900);
    $daySpan2->setStart(960);
    $daySpan2->setEnd(1240);
    $days->setSpans([$daySpan1, $daySpan2]);
    $schedule->setDays([$days]);
    $context2->setSchedule($schedule);
    $product2->setId($id2);
    $product2->setUnitPrice($unitPrice2);
    $product2->setCoverage(1);
    $product2->setUnit(8);
    $product2->setContext($context2);
    $product2->setParameters($params2);

    $seeds = [
      self::BADASSET => [
        'asset' => ['id' => 1, 'token' => '123143242'],
      ],
      self::HOURLY => [
        'products' => $product1->serializeToJsonString(),
      ],
      self::HALFDAY => [
        'products' => implode(",", [$product1->serializeToJsonString(),$product2->serializeToJsonString()]),
      ],
    ];
    return $seeds[$type];
  }

  private function results(string $type, string $modelName) {
    $results = [
      self::HOURLY => [
        'products' => '[{"asset_id":1,"id":"13579098765432123456789098765432","json":"{\"context\":{\"website\":\"test.com\"}}"}]',
        'aliases' => '[{"asset_id":1,"external":"13579098765432123456789098765432","internal":"21098765432109876543210987654321"}]',
        'room' => '{"id":2,"asset_id":1,"primary_vertical_id":1,"listing_hourly_rate":16.34}',
        'dayrate' => '{"token_root":"001122334455667788999876543210"}',
      ],
      self::HALFDAY => [
        'products' => '[{"asset_id":1,"id":"13579098765432123456789098765432","json":"{\"context\":{\"website\":\"test.com\"}}"}]',
        'aliases' => '[{"asset_id":1,"external":"13579098765432123456789098765432","internal":"21098765432109876543210987654321"},{"asset_id":1,"external":"01112222333354445555666677778801","internal":"00112233445566778899987654321001"}]',
        'room' => '{"id":2,"asset_id":1,"primary_vertical_id":1,"listing_hourly_rate":16.34}',
        'dayrate' => '{"token_root":"001122334455667788999876543210","halfday_rate_first":13.24,"halfday_rate_second":13.24,"half_day_time_first_start":720,"half_day_time_first_end":900,"half_day_time_second_start":960,"half_day_time_second_end":1240}',
      ],
    ];
    return $results[$type][$modelName];
  }

  public function data() {
    return [
      'Hourly' => $this->getArgs(self::HOURLY),
      'Half Day' => $this->getArgs(self::HALFDAY),
    ];
  }

  /**
   * @group products
   * @group dismantle
   * @dataProvider data
   */
  public function testDismantle(...$args) {
    $type = array_pop($args);
    $builder = new ProductDismantler();
    $decon = $builder->productsToEloquent(...$args);
    $this->checkDecon($decon, $type);
  }

  /**
   * @group products
   * @group dismantle
   */
  public function testExceptionOnBadAsset() {
    $this->expectException(Exception::class);
    $builder = new ProductDismantler();
    $args = $this->getArgs(self::BADASSET);
    $products = $builder->productsToEloquent(...$args);
  }

  private function checkDecon(Deconstruction $decon, string $type) {
    $this->assertJsonStringEqualsJsonString($this->results($type, 'products'), $decon->getFinalEProducts()->toJson());
    $this->assertJsonStringEqualsJsonString($this->results($type, 'aliases'), $decon->getFinalEAliases()->toJson());
    $this->assertJsonStringEqualsJsonString($this->results($type, 'room'), $decon->getERoom()->toJson());
    $this->assertJsonStringEqualsJsonString($this->results($type, 'dayrate'), $decon->getEDayRate()->toJson());
  }

  private function getArgs(string $type) {
    $seed = $this->seeds($type);
    $products = new CProduct();
    $productData = $this->arrayIndexOr($seed, 'products', '');
    $json = '{"collection":[' . $productData . ']}';
    $products->mergeFromJsonString($json);
    return [
      $products,
      $this->populate(EAsset::class, $seed, 'asset', ['id' => 1, 'token' => $this->assetId]),
      $this->populate(ERoom::class, $seed, 'room', ['id' => 2, 'asset_id' => 1, 'primary_vertical_id' => 1]),
      $this->populate(EVenue::class, $seed, 'venue', ['id' => 1, 'currency' => 'GBP', 'minimum_minutes' => 120]),
      collect(),
      collect(),
      $this->populate(EDayRate::class, $seed, 'dayRate', ['token_root' => $this->tokenRoot]),
      $type,
    ];
  }

  private function arrayIndexOr($array, $index, $or = null) {
    return (isset($array[$index])) ? $array[$index] : $or;
  }

  private function populate($class, $seed, $index, $merge = []) {
    $data = $this->arrayIndexOr($seed, $index, []);
    if (is_null($data)) {
      return null;
    }
    $data = array_merge($merge, $data);
    return new $class($data);
  }

}
