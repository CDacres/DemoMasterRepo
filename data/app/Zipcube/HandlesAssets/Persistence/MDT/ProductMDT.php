<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\Id;
use App\Types\Product;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ProductAliasProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\ProductProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT\FullDayProductMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT\GenericProductMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT\HalfDayProductMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT\HourlyProductMDT;
use App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT\MonthlyProductMDT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;
use Google\Protobuf\Internal\RepeatedField;

class ProductMDT {

  public function mutate(MD $directory, UsageProxy $proxy, RepeatedField $products): void {
    $mutableProducts = collect($products)->map(function (Product $originalProduct) {
      $mutableProduct = new Product();
      $mutableProduct->mergeFromString($originalProduct->serializeToString());
      return $mutableProduct;
    });
    (new HourlyProductMDT())->mutate($directory, $proxy, $mutableProducts);
    (new FullDayProductMDT())->mutate($directory, $proxy, $mutableProducts);
    (new HalfDayProductMDT())->mutate($directory, $proxy, $mutableProducts);
    (new MonthlyProductMDT())->mutate($directory, $proxy, $mutableProducts);
    while ($mutableProducts->count() > 0) {
      (new GenericProductMDT())->mutate($directory, $proxy, $mutableProducts);
    }
  }

  public function build(MD $directory, UsageProxy $proxy): array {
    $products = $directory->useCollection(MD::PRODUCT, ['asset_id' => $proxy->getId()])
      ->keyBy(function (ProductProxy $prodPro) { return $prodPro->id; });
    $aliases = $directory->useCollection(MD::PRODUCTALIAS, ['asset_id' => $proxy->getId()])
      ->keyBy(function (ProductAliasProxy $aliPro) { return $aliPro->internal; });
    $rawProducts = collect();
    $rawProducts = (new MonthlyProductMDT())->build($directory, $proxy)
      ->concat((new HourlyProductMDT())->build($directory, $proxy))
      ->concat((new FullDayProductMDT())->build($directory, $proxy))
      ->concat((new HalfDayProductMDT())->build($directory, $proxy));
    $aliasedProducts = $rawProducts->mapWithKeys(function (Product $product) use($aliases) {
      $rawId = $product->getId()->getValue();
      $alias = $aliases->get($rawId);
      if (is_null($alias)) {
        return [$rawId => $product];
      } else {
        $external = $alias->external;
        $externalId = new Id(['value' => $external]);
        $product->setId($externalId);
        return [$external => $product];
      }
    });
    $allExternals = $products->keys()->concat($aliasedProducts->keys())->unique();
    return $allExternals->map(function (string $key) use($aliasedProducts, $products) {
      $specificProduct = $aliasedProducts->get($key);
      if (is_null($specificProduct)) {
        return $this->productFromJsonProduct($products->get($key));
      } else {
        $jsonProduct = $products->get($key);
        if (is_null($jsonProduct)) {
          return $aliasedProducts->get($key);
        } else {
          $specificProduct->mergeFrom($this->productFromJsonProduct($jsonProduct));
          return $specificProduct;
        }
      }
    })->values()->all();
  }

  private function productFromJsonProduct(ProductProxy $proProx): Product {
    $product = (new Product());
    $product->mergeFromJsonString($proProx->json);
    return $product->setId(new Id(['value' => $proProx->id]));
  }
}
