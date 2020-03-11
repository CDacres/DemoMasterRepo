<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;

use App\Types\BookingConstraints;
use App\Types\CurrencyAmount;
use App\Types\ProductBookingParameters;
use App\Types\TimeBookingConstraints;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ProductMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

use App\Types\Product;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\Id;

use App\Maps\ProductTypeMap;
use Illuminate\Support\Collection;

class MonthlyProductMDT extends SpecificProductMDT {

  protected function imprintProduct(Product $product, MD $directory, UsageProxy $proxy): void {
    $directory->upsert(
      MD::DAYRATE,
      ['asset_id' => $proxy->getId()],
      (new ProductMDTT())->toMonthly($product)
    );
    $directory->upsert(
      MD::USAGE,
      ['id' => $proxy->getId()],
      (new ProductMDTT())->toUsage($product)
    );
    $product->getUnitPrice()->setValue(0);
    $product->setUnit(TimeUnit::NOTIMEUNIT);
    $product->setCoverage(PriceCoverage::NOPRICECOVERAGE);
  }

  protected function productIsValid(Product $product): bool {
    return $product->getUnit() === TimeUnit::MONTH
      && $product->getCoverage() === PriceCoverage::ALLIN;
  }

  protected function calculateScore(Product $product, Id $internalId): int {
    $score = 0;
    if ($product->getId() == $internalId) {
      $score += 1;
    }
    return $score;
  }

  protected function returnProductType(): string {
    return ProductTypeMap::MONTHLY;
  }

  public function build(MD $directory, UsageProxy $proxy): Collection {
    $eDR = $directory->use(MD::DAYRATE, ['asset_id' => $proxy->getId()]);
    if (!is_null($eDR) && !is_null($eDR->monthly_price)) {
      $internal = $this->calculateInternalProductToken($proxy);
      $product = (new Product())
        ->setUnitPrice((new CurrencyAmount())
          ->setValue((float)$eDR->monthly_price))
        ->setCoverage(PriceCoverage::ALLIN)
        ->setUnit(TimeUnit::MONTH)
        ->setId($internal);
      $eUsage = $directory->use(MD::USAGE, ['id' => $proxy->getId()]);
      if (!is_null($eUsage->monthly_minimum_months)) {
        $product->setParameters(
          (new ProductBookingParameters())->setConstraints(
            (new BookingConstraints())->setDuration(
              (new TimeBookingConstraints())->setMinDuration($eUsage->monthly_minimum_months)
            )
          )
        );
      }
      if (!is_null($eUsage->num_of_desks)) {
        $product->setStock($eUsage->num_of_desks);
      }
      return collect([$internal->getValue() => $product]);
    } else {
      return collect();
    }
  }

  protected function confirmNoTrace(MD $directory, UsageProxy $proxy): void {
    $directory->update(
      MD::DAYRATE,
      ['asset_id' => $proxy->getId()],
      (new ProductMDTT())->clearMonthly()
    );
    $directory->update(
      MD::USAGE,
      ['id' => $proxy->getId()],
      (new ProductMDTT())->clearMonthlyMinimum()
    );
  }

}
