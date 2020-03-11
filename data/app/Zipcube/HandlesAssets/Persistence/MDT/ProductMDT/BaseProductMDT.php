<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;

use App\Types\DailyHours;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use Illuminate\Support\Collection;

use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use App\Types\Product;

use App\Types\ProductContext;

abstract class BaseProductMDT {

  protected function populateProduct(Product $product, MD $directory, UsageProxy $proxy): void {
    $externalId = $product->getId();
    $product->setId(null);
    $productJson = $product->serializeToJsonString();
    if (!empty(json_decode($productJson, true))) {
      $directory->upsert(MD::PRODUCT, ['asset_id' => $proxy->getId(), 'id' => $externalId->getValue()], ['json' => $productJson]);
    }
  }

  protected function handleProductRemnants(Product $product): void {
    $this->handleParams($product);
    $this->handleContext($product);
    $this->handlePrices($product);
  }

  protected function pluckProduct(Collection $products, Product $product): void {
    $prodKey = $products->search($product);
    $products->forget($prodKey);
  }

  private function handleParams(Product $product): void {
    $params = $product->getParameters();
    if (empty($params) || empty(json_decode($params->serializeToJsonString(), true))) {
      $product->setParameters(null);
    }
  }

  private function handleContext(Product $product): void {
    $context = $product->getContext();
    if (!is_null($context)) {
      $this->handleSchedules($context);
      $contextJson = $context->serializeToJsonString();
      if (empty(json_decode($contextJson, true))) {
        $product->setContext(null);
      }
    }
  }

  private function handleSchedules(ProductContext $context): void {
    $schedule = !is_null($context) ? $context->getSchedule() : null;
    if (!is_null($schedule)) {
      $original = collect($context->getSchedule()->getDays()->getIterator());
      $filtered = $original->filter(function (DailyHours $day) {
        return !empty(json_decode($day->serializeToJsonString(), true));
      });
      $schedule->setDays($filtered->all());
      $scheduleJson = $schedule->serializeToJsonString();
      if (empty(json_decode($scheduleJson, true))) {
        $context->setSchedule(null);
      }
    }
  }

  private function handlePrices(Product $product): void {
    $unitPrice = $product->getUnitPrice();
    if (!is_null($unitPrice)) {
      $priceJson = $unitPrice->serializeToJsonString();
      if (empty(json_decode($priceJson, true))) {
        $product->setUnitPrice(null);
      }
    }
  }

}
