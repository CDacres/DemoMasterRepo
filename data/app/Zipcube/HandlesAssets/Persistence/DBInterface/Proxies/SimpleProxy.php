<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use Illuminate\Support\Collection;

abstract class SimpleProxy extends BaseProxy {


  protected function validateModels(Collection $models) {
    if ($models->count() > 1) {
      throw new \Exception('Simple Proxies should only receive a single Model.');
    }
    $modelClass = get_class($models->first());
    if (get_class($models->first()) !== $this->getClass()) {
      throw new \Exception(get_called_class() . ' can only accept ' . $this->getClass() . ' models. Received ' . $modelClass);
    }
  }
}
