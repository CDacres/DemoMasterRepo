<?php

namespace App\ORM\Transformers\DayRate;

use App\Interfaces\ProductInterface;
use App\Maps\ProductTypeMap;

use Illuminate\Support\Collection;

use App\ORM\Transformers\Currency;

use App\Types\Id;
use App\Types\Product;
use App\Types\ProductPriceSchedule;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\ProductContext;
use App\Types\CurrencyAmount;

use App\ORM\DayRate as EDayRate;
use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;
use App\ORM\Venue as EAsset;

class GenuineHalfDay {

  public function generateProducts(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    $currency = (new Currency())->enumFromRoomAndVenue($eRoom, $eVenue);
    $product = new Product();
    $product->setId($this->calculateInternalProductToken($eAsset, $eRoom));
    $rate = $eDR->halfday_rate_first;
    $schedule = new ProductPriceSchedule();
    $hours = new DailyHours();
    $firstSpan = new DaySpan(['start' => $eDR->half_day_time_first_start, 'end' => $eDR->half_day_time_first_end]);
    $secondSpan = new DaySpan(['start' => $eDR->half_day_time_second_start, 'end' => $eDR->half_day_time_second_end]);
    $hours->setSpans([$firstSpan, $secondSpan]);
    $schedule->setDays([$hours]);
    $context = new ProductContext;
    $context->setSchedule($schedule);
    $priceType = new CurrencyAmount();
    $priceType->setValue($rate);
    $priceType->setCurrency($currency);
    $product->setUnit(TimeUnit::SPAN);
    $product->setCoverage(PriceCoverage::ALLIN);
    $product->setUnitPrice($priceType);
    $product->setContext($context);
    return collect([$product]);
  }

  private function calculateInternalProductToken(EAsset $eAsset, ERoom $eRoom): Id {
    // TODO: Will disappear when building done in same place as dismantling.
    return (new ProductInterface())->generate($eAsset->token, ProductTypeMap::HALFDAY, $eRoom->primary_vertical_id);
  }

}
