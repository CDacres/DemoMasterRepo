<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics;

use App\ORM\AssetAmenity;
use Illuminate\Support\Collection;

class AmenityProxy extends BaseProxy {
  const BASECLASS = AssetAmenity::class;

  protected function setupNew() {
    $this->available = 1;
  }

  static public function fetchSuppressed(Collection $assetIds): Collection {
    $models = AssetAmenity::whereIn('asset_id', $assetIds)->where('available', false)->get();
    return $models->map(function (AssetAmenity $model) {
      return new static($model);
    });
  }

  static public function fetchEnabled(Collection $assetIds): Collection {
    $models = AssetAmenity::whereIn('asset_id', $assetIds)->where('enabled', true)->get();
    return $models->map(function (AssetAmenity $model) {
      return new static($model);
    });
  }

  protected function save(): void {
    $model = $this->retrieveModel(AssetAmenity::class);
    $model->enabled = 1;
    $this->saveModel($model);
  }

  public function delete(): void {
    $model = $this->retrieveModel(AssetAmenity::class);
    $model->enabled = 0;
    $model->save();
  }

}
