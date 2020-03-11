<?php

namespace Tests\Unit\ORMTransformers;

use App\ORM\Transformers\Currency;

use Exception;
use Tests\TestCase;
use App\Types\Currency as CurrencyType;

class CurrencyTest extends TestCase
{

  /**
   * @group currency
   **/
  public function testBadString() {
    $this->expectException(Exception::class);
    $trans = new Currency();
    $enum = $trans->enumFromLc('Bobbins');
  }

  /**
   * @dataProvider emptyStrings
   * @group currency
   */
  public function testEmptyString($str) {
    $trans = new Currency();
    $enum = $trans->enumFromLc($str);
    $this->assertEquals(CurrencyType::NOCURRENCY, $enum);
  }

  /**
   * @group currency
   **/
  public function testGoodStrings() {
    $trans = new Currency();
    $enum = $trans->enumFromLc("gbp");
    $this->assertEquals(CurrencyType::GBP, $enum);
    $enum = $trans->enumFromUc("GBP");
    $this->assertEquals(CurrencyType::GBP, $enum);
  }

  /**
   * @group currency
   **/
  public function testGoodEnums() {
    $trans = new Currency();
    $id = $trans->lcFromEnum(CurrencyType::GBP);
    $this->assertEquals("gbp", $id);
    $id = $trans->ucFromEnum(CurrencyType::GBP);
    $this->assertEquals("GBP", $id);
    $id = $trans->ucFromEnum(CurrencyType::NOCURRENCY);
    $this->assertNull($id);
  }

  public function emptyStrings() {
    return [
      'Empty' => [""],
      'Null' => [null],
    ];
  }

}
