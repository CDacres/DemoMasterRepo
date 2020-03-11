<?php

namespace App\ORM\Transformers;

use App\Experts\ProductExpert;

use Illuminate\Support\Collection;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\Product;
use App\Types\Id;
use App\Types\CurrencyAmount;

use App\ORM\Transformers\Currency;

use App\ORM\Asset as EAsset;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;

use App\Maps\ProductTypeMap;

class Room {

  public function generateProducts(EAsset $eAsset, ERoom $eRoom, EVenue $eVenue): Collection {
    if (is_null($eRoom->listing_hourly_rate)) {
      return collect();
    }
    $product = $this->buildProduct($eAsset, $eRoom, $eVenue);
    return collect([$product]);
  }

  private function calculateInternalProductToken(EAsset $eAsset, ERoom $eRoom): Id {
    // TODO: Will disappear when building done in same place as dismantling.
    return (new ProductExpert())->generate($eAsset->token, ProductTypeMap::HOURLY, $eRoom->primary_vertical_id);
  }

  private function buildProduct(EAsset $eAsset, ERoom $eRoom, EVenue $eVenue) {
    $product = new Product();
    $currency = (new Currency())->enumFromRoomAndVenue($eRoom, $eVenue);
    $priceType = new CurrencyAmount();
    $priceType->setValue($eRoom->listing_hourly_rate);
    $priceType->setCurrency($currency);
    $product->setId($this->calculateInternalProductToken($eAsset, $eRoom));
    $product->setUnit(TimeUnit::HOUR);
    $product->setCoverage(PriceCoverage::ALLIN);
    $product->setUnitPrice($priceType);
    return $product;
  }
}
