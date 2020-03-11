<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class ComplexProxy extends BaseProxy {

  protected function validateModels(Collection $models) {
    $validClasses = $this->getAttributeMaps()
     ->map(function ($item) {
      return $item['class'];
     })
     ->unique()
     ->merge(collect($this->getClass()));
    $models->each(function (?Model $model) use($validClasses) {
      if (!is_null($model)) {
        $modelClass = get_class($model);
        if (!$validClasses->contains($modelClass)) {
          throw new \Exception('Proxy ' . get_called_class() . ' does not accept ' . $modelClass . ' types');
        }
      }
    });
  }

}
