<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\Product;
use Illuminate\Support\Collection;

class ProductMDTT extends BaseMDTT {

  public function toHalfDay(Product $product): array {
    $rate = $this->float($product->getUnitPrice()->getValue());
    $spans = $this->toHalfDaySpans($product);
    $first = $spans->shift();
    $second = $spans->shift();
    return [
      'halfday_rate_first' => $rate,
      'halfday_rate_second' => $rate,
      'half_day_time_first_start' => $this->int($first->getStart(), true),
      'half_day_time_first_end' => $this->int($first->getEnd(), true),
      'half_day_time_second_start' => $this->int($second->getStart(), true),
      'half_day_time_second_end' => $this->int($second->getEnd(), true),
    ];
  }

  private function toHalfDaySpans(Product $product): Collection {
    return collect($product->getContext()->getSchedule()->getDays()[0]->getSpans());
  }

  public function clearHalfDay(): array {
    return [
      'halfday_rate_first' => null,
      'halfday_rate_second' => null,
      'half_day_time_first_start' => 600,
      'half_day_time_first_end' => 840,
      'half_day_time_second_start' => 900,
      'half_day_time_second_end' => 1140,
    ];
  }

  public function toFullDay(Product $product): array {
    return [
      'standard_day_rate' => $this->float($product->getUnitPrice()->getValue())
    ];
  }

  public function clearFullDay(): array {
    return [
      'standard_day_rate' => null
    ];
  }

  public function toHourly(Product $product): array {
    return [
      'listing_hourly_rate' => $this->float($product->getUnitPrice()->getValue())
    ];
  }

  public function toHourRate(Product $product): array {
    return [
      'hour_rate' => $this->float($product->getUnitPrice()->getValue())
    ];
  }

  public function clearHourly(): array {
    return [
      'listing_hourly_rate' => null
    ];
  }

  public function toMonthly(Product $product): array {
    return [
      'monthly_price' => $this->float($product->getUnitPrice()->getValue())
    ];
  }

  public function toUsage(Product $product): array {
    $retArr = ['monthly_minimum_months' => null];
    if (!is_null($product->getParameters())
      && !is_null($product->getParameters()->getConstraints())
      && !is_null($product->getParameters()->getConstraints()->getDuration())
      && ($product->getParameters()->getConstraints()->getDuration()->getMinDuration() !== 0)) {
      $retArr['monthly_minimum_months'] = $product->getParameters()->getConstraints()->getDuration()->getMinDuration();
      $product->getParameters()->getConstraints()->getDuration()->setMinDuration(0);
    }
    if ($product->getStock() !== 0) {
      $retArr['num_of_desks'] = $product->getStock();
      $product->setStock(0);
    }
    return $retArr;
  }

  public function clearMonthly(): array {
    return [
      'monthly_price' => null
    ];
  }

  public function clearMonthlyMinimum(): array {
    return [
      'monthly_minimum_months' => null
    ];
  }
}
