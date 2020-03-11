<?php

namespace App\ORM\Transformers\DayRate;

use App\Experts\ProductExpert;
use App\Maps\ProductTypeMap;

use App\ORM\Transformers\Currency;

use Illuminate\Support\Collection;
use App\Types\Id;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\Product;
use App\Types\CurrencyAmount;

use App\ORM\DayRate as EDayRate;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;
use App\ORM\Asset as EAsset;

class FullDay {

  public function generateProducts(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    $products = collect();
    if (!is_null($eDR->standard_day_rate)) {
      $currency = (new Currency())->enumFromRoomAndVenue($eRoom, $eVenue);
      $product = new Product();
      $product->setId($this->calculateInternalProductToken($eAsset, $eRoom));
      $priceType = new CurrencyAmount();
      $priceType->setValue($eDR->standard_day_rate);
      $priceType->setCurrency($currency);
      $product->setUnit(TimeUnit::DAY);
      $product->setCoverage(PriceCoverage::ALLIN);
      $product->setUnitPrice($priceType);
      $products->push($product);
    }
    return $products;
  }

  private function calculateInternalProductToken(EAsset $eAsset, ERoom $eRoom): Id {
    // TODO: Will disappear when building done in same place as dismantling.
    return (new ProductExpert())->generate($eAsset->token, ProductTypeMap::DAILY, $eRoom->primary_vertical_id);
  }
}
