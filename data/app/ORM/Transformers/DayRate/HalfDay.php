<?php

namespace App\ORM\Transformers\DayRate;

//use App\ORM\Transformers\DayRate\Types;
use App\ORM\Transformers\DayRate\CustomTime;

use App\ORM\Transformers\Currency;

use Illuminate\Support\Collection;

use App\ORM\DayRate as EDayRate;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;
use App\ORM\Asset as EAsset;

class HalfDay {

//  private $typesToDismantle = [
//    Types::HALFDAY,
//    Types::FIRSTHALFCUSTOM,
//    Types::SECONDHALFCUSTOM
//  ];

  public function generateProducts(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    $products = collect();
    $currency = (new Currency())->enumFromRoomAndVenue($eRoom, $eVenue);
    if (!is_null($eDR->halfday_rate_first)) {
      if (!is_null($eDR->halfday_rate_second)) {
        $products = $products->merge($this->handlePotentialHalfDay($eDR, $eRoom, $eVenue, $eAsset));
      } else {
        $products = $products->merge((new CustomTime())->generateCustomFirstProducts($eDR, $eRoom, $eVenue, $eAsset));
      }
    } elseif (!is_null($eDR->halfday_rate_second)) {
      $products = $products->merge((new CustomTime())->generateCustomSecondProducts($eDR, $eRoom, $eVenue, $eAsset));
    }
    return $products;
  }

  private function handlePotentialHalfDay(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    $products = collect();
    if ($eDR->halfday_rate_first != $eDR->halfday_rate_second) {
      $products = $products->merge((new CustomTime())->generateCustomFirstProducts($eDR, $eRoom, $eVenue, $eAsset));
      $products = $products->merge((new CustomTime())->generateCustomSecondProducts($eDR, $eRoom, $eVenue, $eAsset));
    } else {
      $products = $products->merge((new GenuineHalfDay())->generateProducts($eDR, $eRoom, $eVenue, $eAsset));
    }
    return $products;
  }
}
