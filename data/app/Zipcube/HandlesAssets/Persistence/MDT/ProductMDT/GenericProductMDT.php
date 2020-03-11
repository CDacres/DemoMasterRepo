<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ProductMDT;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\UsageProxy;
use Illuminate\Support\Collection;

use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory as MD;

class GenericProductMDT extends BaseProductMDT {

  public function mutate(MD $directory, UsageProxy $proxy, Collection $products): void {
    $product = $products->first();
    $this->pluckProduct($products, $product);
    if (!is_null($product)) {
      $this->handleProductRemnants($product);
      $this->populateProduct($product, $directory, $proxy);
    }
  }

}
