<?php

namespace App\ORM\Transformers\DayRate;

use App\ORM\Transformers\DayRate\FullDay;
use App\ORM\Transformers\DayRate\HalfDay;
use App\ORM\Transformers\DayRate\Monthly;

use Illuminate\Support\Collection;

use App\ORM\DayRate as EDayRate;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;
use App\ORM\Asset as EAsset;

class DayRate {

  public function generateProducts(?EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    $products = collect();
    if (is_null($eDR)) {
      return $products;
    }
    $products = $products->merge((new FullDay())->generateProducts($eDR, $eRoom, $eVenue, $eAsset));
    $products = $products->merge((new HalfDay())->generateProducts($eDR, $eRoom, $eVenue, $eAsset));
    $products = $products->merge((new Monthly())->generateProducts($eDR, $eRoom, $eVenue, $eAsset));
    return $products;
  }

}
