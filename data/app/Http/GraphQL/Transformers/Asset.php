<?php

namespace App\Http\GraphQL\Transformers;
use App\Types\Asset as AssetObject;

class Asset {

  public function argsToType($args): AssetObject {
    $asset = new AssetObject();
    $asset->mergeFromJsonString(json_encode($args));
    return $asset;
  }
}
