<?php

namespace App\Experts;

use App\Maps\VerticalMap;
use App\Maps\ProductTypeMap;

use App\Types\Id;

class ProductExpert {

  public function generate(string $token, string $type, int $verticalId): ?Id {
    $productSuffix = (new ProductTypeMap())->suffixFromType($type);
    $verticalSuffix = (new VerticalMap())->productSuffixFromId($verticalId);
    $component = $verticalSuffix . $productSuffix;
    $token = strrev(substr($token, 0, -4));
    return new Id(['value' => $token . $component]);
  }
}
