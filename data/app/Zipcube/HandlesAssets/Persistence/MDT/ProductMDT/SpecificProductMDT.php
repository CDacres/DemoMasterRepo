<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;

use App\Experts\ProductExpert;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use Illuminate\Support\Collection;

use App\Types\Product;
use App\Types\Id;

abstract class SpecificProductMDT extends BaseProductMDT {

  abstract protected function imprintProduct(Product $product, MD $directory, UsageProxy $proxy): void;

  abstract protected function confirmNoTrace(MD $directory, UsageProxy $proxy): void;

  abstract protected function productIsValid(Product $product): bool;

  abstract protected function calculateScore(Product $product, Id $internalId): int;

  abstract protected function returnProductType(): string;

  public function mutate(MD $directory, UsageProxy $proxy, Collection $products): void {
    $internalId = $this->calculateInternalProductToken($proxy);
    $product = $this->findBestCandidate($products, $internalId);
    if (!is_null($product)) {
      $this->imprintProduct($product, $directory, $proxy);
      $this->handleProductRemnants($product);
      $this->populateProductMirrors($product, $directory, $internalId, $proxy);
    } else {
      $this->confirmNoTrace($directory, $proxy);
    }
  }

  protected function calculateInternalProductToken(UsageProxy $proxy): Id {
    $type = $this->returnProductType();
    $token = $proxy->token;
    $verticalId = $proxy->primary_vertical_id;
    return (new ProductExpert())->generate($token, $type, $verticalId);
  }

  private function findBestCandidate(Collection $products, Id $internalId): ?Product {
    $wrapper = $products
      ->filter(function (Product $product) { return $this->productIsValid($product); })
      ->map(function (Product $product) use ($internalId) {
      return [
        'score' => $this->calculateScore($product, $internalId),
        'product' => $product
      ]; })
      ->sortByDesc('score')->first();
    if (!is_null($wrapper)) {
      $product = $wrapper['product'];
      $this->pluckProduct($products, $product);
      return $product;
    }
    return null;
  }

  protected function populateProductMirrors(Product $product, MD $directory, Id $internalId, UsageProxy $proxy): void {
    $this->populateAlias($product, $directory, $internalId, $proxy);
    $this->populateProduct($product, $directory, $proxy);
  }

  private function populateAlias(Product $product, MD $directory, Id $internalId, UsageProxy $proxy): void {
    $externalId = $product->getId();
    if ($internalId != $externalId) {
      $directory->upsert(MD::PRODUCTALIAS, ['asset_id' => $proxy->id, 'external' => $externalId->getValue()], ['internal' => $internalId->getValue()]);
    }
  }

}
