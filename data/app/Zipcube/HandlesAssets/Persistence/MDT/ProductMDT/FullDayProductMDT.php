<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;


use App\Types\CurrencyAmount;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\ProductMDTT;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

use App\Types\Product;
use App\Types\TimeUnit;
use App\Types\PriceCoverage;
use App\Types\Id;

use App\Maps\ProductTypeMap;
use Illuminate\Support\Collection;

class FullDayProductMDT extends SpecificProductMDT {

  protected function imprintProduct(Product $product, MD $directory, UsageProxy $proxy): void {
    $directory->upsert(MD::DAYRATE, ['asset_id' => $proxy->getId()], (new ProductMDTT())->toFullDay($product));
    $product->getUnitPrice()->setValue(0);
    $product->setUnit(TimeUnit::NOTIMEUNIT);
    $product->setCoverage(PriceCoverage::NOPRICECOVERAGE);
  }

  protected function productIsValid(Product $product): bool {
    return $product->getUnit() === TimeUnit::DAY
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
    return ProductTypeMap::DAILY;
  }

  public function build(MD $directory, UsageProxy $proxy): Collection {
    $eDR = $directory->use(MD::DAYRATE, ['asset_id' => $proxy->getId()]);
    if (!is_null($eDR) && !is_null($eDR->standard_day_rate)) {
      $internal = $this->calculateInternalProductToken($proxy);
      $product = (new Product())
        ->setUnitPrice((new CurrencyAmount())
          ->setValue((float)$eDR->standard_day_rate))
        ->setCoverage(PriceCoverage::ALLIN)
        ->setUnit(TimeUnit::DAY)
        ->setId($internal);
      return collect([$internal->getValue() => $product]);
    } else {
      return collect();
    }
  }

  protected function confirmNoTrace(MD $directory, UsageProxy $proxy): void {
    $directory->update(
      MD::DAYRATE,
      ['asset_id' => $proxy->getId()],
      (new ProductMDTT())->clearFullDay()
    );
  }
}
