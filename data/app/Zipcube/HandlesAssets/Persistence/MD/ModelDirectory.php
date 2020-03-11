<?php

namespace App\Zipcube\HandlesAssets\Persistence\MD;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\BaseProxy;
use Closure;
use Illuminate\Support\Collection;
use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory;

abstract class ModelDirectory {

  public function getCollection(string $name): Collection {
    if (!isset($this->models[$name])) {
      $this->setCollection($name, new Collection());
    }
    return $this->models[$name];
  }

  public function setCollection(string $name, Collection $collection): ModelDirectory {
    $this->models[$name] = $collection;
    return $this;
  }

  public function getInsertDirectory(): ModelDirectory {
    return $this->getNewDirectoryFromClosure(function (BaseProxy $proxy) {
      return $proxy->requiresInsert();
    });
  }

  public function getUpdateDirectory(): ModelDirectory {
    return $this->getNewDirectoryFromClosure(function (BaseProxy $proxy) {
      return $proxy->requiresUpdate();
    });
  }

  public function getDeleteDirectory(): ModelDirectory {
    return $this->getNewDirectoryFromClosure(function (BaseProxy $proxy) {
      return $proxy->requiresDeletion();
    });
  }

  private function getNewDirectoryFromClosure(Closure $closure): ModelDirectory {
    $type = get_called_class();
    $newDirectory = new $type();
    $this->fetchModelMap()->each(function ($class, $type) use($newDirectory, $closure) {
      $relevantCollection = $this->getCollection($type)->filter(function (BaseProxy $proxy) use($closure) { return $closure($proxy); });
      $newDirectory->setCollection($type, $relevantCollection);
    })->values();
    return $newDirectory;
  }

  private function throwGenericErrorIfModelNotInMap(string $name): void {
    $this->throwErrorIfModelNotInMap($name, 'No proxy called ' . $name . ' in ' . get_class());
  }

  private function throwErrorIfModelNotInMap(string $name, string $error): void {
    if (!$this->existsInModelMap($name)) {
      throw new \Exception($error);
    }
  }

  private function existsInModelMap(string $name): bool {
    return $this->fetchModelMap()->has($name);
  }

  abstract public function fetchModelMap(): Collection;

  public function upsert(string $type, array $keys, array $attributes) {
    $this->throwGenericErrorIfModelNotInMap($type);
    $collection = $this->getCollection($type);
    $itemKey = $this->getKeyForMatchingModel($collection, $keys);
    if (is_null($itemKey)) {
      $fillData = array_merge($keys, $attributes);
      return $this->insert($type, $fillData);
    } else {
      return $this->internalUpdate($type, $itemKey, $attributes);
    }
  }

  public function update(string $type, array $keys, array $attributes) {
    $this->throwGenericErrorIfModelNotInMap($type);
    $collection = $this->getCollection($type);
    $itemKey = $this->getKeyForMatchingModel($collection, $keys);
    if (!is_null($itemKey)) {
      return $this->internalUpdate($type, $itemKey, $attributes);
    }
  }

  public function ensure(string $type, array $keys, array $attributes = [], bool $forceOnUntouched = false) {
    $this->throwGenericErrorIfModelNotInMap($type);
    $collection = $this->getCollection($type);
    $itemKey = $this->getKeyForMatchingModel($collection, $keys);
    if (is_null($itemKey)) {
      $fillData = array_merge($keys, $attributes);
      return $this->insert($type, $fillData);
    } else {
      $proxy = $this->fetch($type, $itemKey);
      if ($forceOnUntouched && $proxy->isUntouched()) {
        return $this->internalUpdate($type, $itemKey, $attributes);
      } else {
        $proxy->touch();
        return $proxy;
      }
    }
  }

  public function updateMany(string $type, array $keys, array $attributes): void {
    $this->throwGenericErrorIfModelNotInMap($type);
    $collection = $this->getCollection($type);
    $itemKeys = $this->getKeysForMatchingModels($collection, $keys);
    $itemKeys->each(function ($itemKey) use($type, $attributes) {
      $this->internalUpdate($type, $itemKey, $attributes);
    });
  }

  public function insert(string $type, array $fillData) {
    $this->throwGenericErrorIfModelNotInMap($type);
    $collection = $this->getCollection($type);
    $proxyClass = $this->fetchModelMap()->get($type);
    $proxy = new $proxyClass();
    $proxy->fill($fillData);
    $collection->push($proxy);
    $this->setCollection($type, $collection);
    return $proxy;
  }

  public function use(string $type, array $keys) {
    $collection = $this->getCollection($type);
    $index = $this->getKeyForMatchingModel($collection, $keys);
    if (is_null($index)) {
      return null;
    } else {
      return $this->fetch($type, $index);
    }
  }

  public function useCollection(string $type, array $keys): Collection {
    $collection = $this->getCollection($type);
    $normalKeys = $this->generateNormalKeysForMatching($keys);
    return $collection->filter(function (BaseProxy $proxy) use($normalKeys) {
      return $this->checkKeys($proxy, $normalKeys);
    });
  }

  public function useTouchedCollection(string $type, array $keys): Collection {
    return $this->useCollection($type, $keys)->filter(function (BaseProxy $proxy) {
      return !$proxy->isUntouched();
    });
  }

  private function internalUpdate(string $type, int $index, array $fillData, bool $onlyRedundant = false): BaseProxy {
    $collection = $this->getCollection($type);
    $proxy = $collection->get($index);
    if (!$onlyRedundant || $proxy->isUntouched()) {
      $proxy->fill($fillData);
      $this->setCollection($type, $collection);
    }
    return $proxy;
  }

  private function fetch(string $type, int $index): BaseProxy {
    $collection = $this->getCollection($type);
    return $collection->get($index);
  }

  private function getKeysForMatchingModels(Collection $collection, array $keys): Collection {
    $normalKeys = $this->generateNormalKeysForMatching($keys);
    return $collection->filter(function (BaseProxy $proxy) use($normalKeys) {
      return $this->checkKeys($proxy, $normalKeys);
    })->keys();
  }

  private function getKeyForMatchingModel(Collection $collection, array $keys): ?int {
    $normalKeys = $this->generateNormalKeysForMatching($keys);
    $ret = $collection->search(function (BaseProxy $proxy) use($normalKeys) {
      return $this->checkKeys($proxy, $normalKeys);
    });
    return ($ret === false) ? null : $ret;
  }

  private function generateNormalKeysForMatching(array $keys): array {
    return collect($keys)->map(function ($item, $key) {
      return [
        'property' => $key,
        'expected' => $item
      ];
    })->values()->all();
  }

  private function checkKeys(BaseProxy $proxy, array $normalKeys): bool {
    if (count($normalKeys) > 0) {
      $key = array_pop($normalKeys);
      return $proxy->checkAttribute($key['property'], $key['expected']) && $this->checkKeys($proxy, $normalKeys);
    } else {
      return true;
    }
  }

}
