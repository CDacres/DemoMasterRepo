<?php

namespace App\ORM\Transformers\DayRate;

use App\Experts\ProductExpert;
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
use App\ORM\Asset as EAsset;

class CustomTime {

  public function generateCustomFirstProducts(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    return $this->generateProducts($eDR, $eRoom, $eVenue, $eAsset, ProductTypeMap::FIRSTHALFCUSTOM);
  }

  public function generateCustomSecondProducts(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset): Collection {
    return $this->generateProducts($eDR, $eRoom, $eVenue, $eAsset, ProductTypeMap::SECONDHALFCUSTOM);
  }

  private function generateProducts(EDayRate $eDR, ERoom $eRoom, EVenue $eVenue, EAsset $eAsset, string $type): Collection {
    $currency = (new Currency())->enumFromRoomAndVenue($eRoom, $eVenue);
    $product = new Product();
    $product->setId($this->calculateInternalProductToken($eAsset, $type, $eRoom));
    $rate = ($type === Types::FIRSTHALFCUSTOM) ? $eDR->halfday_rate_first : $eDR->halfday_rate_second;
    $start = ($type === Types::FIRSTHALFCUSTOM) ? $eDR->half_day_time_first_start : $eDR->half_day_time_second_start;
    $end = ($type === Types::FIRSTHALFCUSTOM) ? $eDR->half_day_time_first_end : $eDR->half_day_time_second_end;
    $schedule = new ProductPriceSchedule();
    $hours = new DailyHours();
    $span = new DaySpan(['start' => $start, 'end' => $end]);
    $hours->setSpans([$span]);
    $schedule->setDays([$hours]);
    $context = new ProductContext;
    $context->setSchedule($schedule);
    $priceType = new CurrencyAmount();
    $priceType->setValue($rate);
    $priceType->setCurrency($currency);
    $product->setUnit(TimeUnit::HOUR);
    $product->setCoverage(PriceCoverage::ALLIN);
    $product->setUnitPrice($priceType);
    $product->setContext($context);
    return collect([$product]);
  }

  private function calculateInternalProductToken(EAsset $eAsset, string $type, ERoom $eRoom): Id {
    // TODO: Will disappear when building done in same place as dismantling.
    return (new ProductExpert())->generate($eAsset->token, $type, $eRoom->primary_vertical_id);
  }

}
