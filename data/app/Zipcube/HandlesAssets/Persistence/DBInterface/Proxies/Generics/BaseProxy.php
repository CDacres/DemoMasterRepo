<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\SimpleProxy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseProxy extends SimpleProxy {

  static public function fetch(Collection $assetIds): Collection {
    $ORM = static::staticGetClass();
    $models = $ORM::whereIn('asset_id', $assetIds)->get();
    return $models->map(function (Model $model) {
      return new static($model);
    });
  }
}
