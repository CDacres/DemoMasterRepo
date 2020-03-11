<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\References;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\SimpleProxy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class ReferenceProxy extends SimpleProxy {

  static public function fetch(): Collection {
    $models = static::fetchModels();
    return $models->map(function (Model $model) {
      return new static($model);
    });
  }

  static public function fetchModels(): Collection {
    $ORM = static::staticGetClass();
    return $ORM::get();
  }
}
