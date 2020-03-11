<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;

use App\Types\CurrencyAmount;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ProductMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

use App\Types\Product;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\Id;

use App\Maps\ProductTypeMap;
use Illuminate\Support\Collection;

class HourlyProductMDT extends SpecificProductMDT {

  protected function imprintProduct(Product $product, MD $directory, UsageProxy $proxy): void {
    $directory->upsert(
      MD::USAGE,
      ['id' => $proxy->getId()],
      (new ProductMDTT())->toHourly($product)
    );
    /* $directory->updateMany( */
    /*   MD::HOUR, */
    /*   ['asset_id' => $proxy->getId()], */
    /*   (new ProductMDTT())->toHourRate($product) */
    /* ); */
    $product->getUnitPrice()->setValue(0);
    $product->setUnit(TimeUnit::NOTIMEUNIT);
    $product->setCoverage(PriceCoverage::NOPRICECOVERAGE);
  }

  protected function productIsValid(Product $product): bool {
    return $product->getUnit() === TimeUnit::HOUR
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
    return ProductTypeMap::HOURLY;
  }

  public function build(MD $directory, UsageProxy $proxy): Collection {
    if (!is_null($proxy->listing_hourly_rate)) {
      $internal = $this->calculateInternalProductToken($proxy);
      $product = (new Product())
        ->setUnitPrice((new CurrencyAmount())
          ->setValue($proxy->listing_hourly_rate))
        ->setCoverage(PriceCoverage::ALLIN)
        ->setUnit(TimeUnit::HOUR)
        ->setId($internal);
      return collect([$internal->getValue() => $product]);
    } else {
      return collect();
    }
  }

  protected function confirmNoTrace(MD $directory, UsageProxy $proxy): void {
    $directory->update(
      MD::USAGE,
      ['asset_id' => $proxy->getId()],
      (new ProductMDTT())->clearHourly()
    );
  }
}
