<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;

use App\Experts\ProductExpert;
use App\Types\CurrencyAmount;
use App\Types\DaySpan;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\DayRateProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ProductMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

use App\Types\DailyHours;
use App\Types\Day;
use App\Types\Product;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\Id;

use App\Maps\ProductTypeMap;
use Illuminate\Support\Collection;

class HalfDayProductMDT extends SpecificProductMDT {

  protected function imprintProduct(Product $product, MD $directory, UsageProxy $proxy): void {
    $transformer = new ProductMDTT();
    $directory->upsert(
      MD::DAYRATE,
      ['asset_id' => $proxy->getId()],
      $transformer->toHalfDay($product)
    );
    $spans = $transformer->toHalfDay($product);
    $product->getContext()->getSchedule()->getDays()[0]->setSpans([]);
    $product->getUnitPrice()->setValue(0);
    $product->setUnit(TimeUnit::NOTIMEUNIT);
    $product->setCoverage(PriceCoverage::NOPRICECOVERAGE);
  }

  protected function productIsValid(Product $product): bool {
    return $product->getUnit() === TimeUnit::SPAN
      && $product->getCoverage() === PriceCoverage::ALLIN
      && !is_null($product->getContext())
      && !is_null($product->getContext()->getSchedule())
      && $product->getContext()->getSchedule()->getDays()->count() > 0
      && $this->hasSuitableDay($product);
  }

  private function hasSuitableDay(Product $product): bool {
    $result = $this->findSuitableDayKey($product) !== null;
    return $result;
  }

  private function findSuitableDayKey(Product $product): ?int {
    $key = collect($product->getContext()->getSchedule()->getDays()->getIterator())->search(function (DailyHours $day) {
      return $day->getSpans()->count() === 2
        && $day->getDay() === Day::NODAY;
    });
    return ($key === false)? null : $key;
  }

  protected function calculateScore(Product $product, Id $internalId): int {
    $score = 0;
    if ($product->getId() == $internalId) {
      $score += 1;
    }
    return $score;
  }

  protected function returnProductType(): string {
    return ProductTypeMap::HALFDAY;
  }

  private function buildCondition(?DayRateProxy $eDR): bool {
    return (!is_null($eDR) && (
      !is_null($eDR->halfday_rate_first)
      || !is_null($eDR->halfday_rate_second)
    ));
  }

  public function build(MD $directory, UsageProxy $proxy): Collection {
    $eDR = $directory->use(MD::DAYRATE, ['asset_id' => $proxy->getId()]);
    if ($this->buildCondition($eDR)) {
      if ($eDR->halfday_rate_first === $eDR->halfday_rate_second) {
        return $this->buildTrueHalfDay($eDR, $proxy);
      } else {
        $products = $this->buildFirstHalfCustom($eDR, $proxy);
        return $products->merge($this->buildSecondHalfCustom($eDR, $proxy));
      }
    } else {
      return collect();
    }
  }

  private function buildFirstHalfCustom(DayRateProxy $eDR, UsageProxy $proxy): Collection {
    $token = $proxy->token;
    $verticalId = $proxy->primary_vertical_id;
    $internal = (new ProductExpert())->generate($token, ProductTypeMap::FIRSTHALFCUSTOM, $verticalId);
    $span = new DaySpan();
    $span->setStart($eDR->half_day_time_first_start);
    $span->setEnd($eDR->half_day_time_first_end);
    $product = (new Product())
      ->setUnitPrice((new CurrencyAmount())
      ->setValue((float)$eDR->halfday_rate_first))
      ->setCoverage(PriceCoverage::ALLIN)
      ->setUnit(TimeUnit::SPAN)
      ->setContext($this->generateSpans([$span]))
      ->setId($internal);
    return collect([$internal->getValue() => $product]);
  }

  private function buildSecondHalfCustom(DayRateProxy $eDR, UsageProxy $proxy): Collection {
    $token = $proxy->token;
    $verticalId = $proxy->primary_vertical_id;
    $internal = (new ProductExpert())->generate($token, ProductTypeMap::SECONDHALFCUSTOM, $verticalId);
    $span = new DaySpan();
    $span->setStart($eDR->half_day_time_second_start);
    $span->setEnd($eDR->half_day_time_second_end);
    $product = (new Product())
      ->setUnitPrice((new CurrencyAmount())
      ->setValue((float)$eDR->halfday_rate_second))
      ->setCoverage(PriceCoverage::ALLIN)
      ->setUnit(TimeUnit::SPAN)
      ->setContext($this->generateSpans([$span]))
      ->setId($internal);
    return collect([$internal->getValue() => $product]);
  }

  private function buildTrueHalfDay(DayRateProxy $eDR, UsageProxy $proxy): Collection {
    $internal = $this->calculateInternalProductToken($proxy);
    $product = (new Product())
      ->setUnitPrice((new CurrencyAmount())
      ->setValue((float)$eDR->halfday_rate_first))
      ->setCoverage(PriceCoverage::ALLIN)
      ->setUnit(TimeUnit::SPAN)
      ->setContext($this->generateHalfDayContext($eDR))
      ->setId($internal);
    return collect([$internal->getValue() => $product]);
  }

  private function generateHalfDayContext(DayRateProxy $eDR): ProductContext {
    $early = new DaySpan();
    $late = new DaySpan();
    $early->setStart($eDR->half_day_time_first_start);
    $early->setEnd($eDR->half_day_time_first_end);
    $late->setStart($eDR->half_day_time_second_start);
    $late->setEnd($eDR->half_day_time_second_end);
    return $this->generateSpans([$early, $late]);
  }

  private function generateSpans(array $spans): ProductContext {
    $context = new ProductContext();
    $schedule = new ProductPriceSchedule();
    $noDay = new DailyHours();
    $noDay->setDay(Day::NODAY);
    $noDay->setSpans($spans);
    $schedule->setDays([$noDay]);
    $context->setSchedule($schedule);
    return $context;
  }

  protected function confirmNoTrace(MD $directory, UsageProxy $proxy): void {
    $directory->update(
      MD::DAYRATE,
      ['asset_id' => $proxy->getId()],
      (new ProductMDTT())->clearHalfDay()
    );
  }
}
