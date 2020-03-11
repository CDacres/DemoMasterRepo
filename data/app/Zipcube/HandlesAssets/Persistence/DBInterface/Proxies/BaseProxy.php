<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class PlaceHolder {
  private $value;
  public $temp;
  private $isResolved = false;

  public function __construct($val) {
    $this->temp = $val;
  }

  public function getValue() {
    return $this->value;
  }

  public function resolve($value): void {
    $this->isResolved = true;
    $this->value = $value;
  }

  public function isResolved(): bool {
    return $this->isResolved;
  }

  public function __toString(): string {
    return $this->temp;
  }
}

abstract class BaseProxy {

  const UNTOUCHED = 'UNTOUCHED';
  const INSERT = 'INSERT';
  const UPDATE = 'UPDATE';
  const TOUCHED = 'TOUCHED';

  const BASECLASS = null;

  protected $placeHolderColumns = [];
  protected $overrideMap = [];

  public $models;
  private $placeHolders = [];
  private $baseClassMap = [];
  private $attributeMap;
  private $status = self::UNTOUCHED;

  abstract protected function validateModels(Collection $models);

  protected function setupNew() { } // to be overwritten by children if needed

  protected function generatePlaceholder(): PlaceHolder {
    return new PlaceHolder(substr(md5(uniqid(rand())), -5));
  }

  public function __construct(...$models) {
    if (count($models) > 0) {
      $this->setModels(collect($models));
    } else {
      $this->setupNew();
      $this->setInsert();
    }
  }

  static public function updateCollection(Collection $collection): void {
    $collection->each(function (BaseProxy $proxy) {
      $proxy->update();
    });
  }

  static public function insertCollection(Collection $collection): void {
    $collection->each(function (BaseProxy $proxy) {
      $proxy->insert();
    });
  }

  static public function deleteCollection(Collection $collection): void {
    $collection->each(function (BaseProxy $proxy) {
      $proxy->delete();
    });
  }

  protected function save(): void {
    $this->retrieveModels()->each(function (Model $model) {
      $this->saveModel($model);
    });
  }

  public function touch(): void {
    $this->setTouched();
  }

  public function update(): void {
    $this->save();
  }

  public function insert(): void {
    $this->save();
  }

  public function delete(): void {
    $this->retrieveModels()->each(function (Model $model) {
      $model->delete();
    });
  }

  protected function saveModel(Model $model): void {
    $model->save();
    $this->updateModelPlaceholders($model);
  }

  protected function updateModelPlaceholders(Model $model): void {
    $class = get_class($model);
    $this->getModelPlaceholders($class)->each(function (PlaceHolder $holder, string $key) use($model) {
      $value = $model->getAttribute($key);
      if (!is_null($value)) {
        $holder->resolve($value);
      }
    });
  }

  private function establishModelPropertyFromKey(string $modelClass, string $key): ?string {
    $tuple = $this->getAttributeMaps()->get($key);
    if (!is_null($tuple) && $tuple['class'] === $modelClass) {
      return $tuple['property'];
    } else {
      return null;
    }
  }

  protected function retrieveModel(string $modelClass): Model {
    return $this->retrieveModels()->get($modelClass);
  }

  protected function retrieveModels(): Collection {
    $this->replaceResolvedPlaceHolders();
    return $this->getModels();
  }

  private function getModels(): Collection {
    return collect($this->models);
  }

  protected function getModelPlaceholders($modelClass): Collection {
    return $this->getPlaceHolders()->map(function (PlaceHolder $holder, string $key) use($modelClass) {
      $modelProp = $this->establishModelPropertyFromKey($modelClass, $key);
      if (is_null($modelProp)) {
        return null;
      } else {
        return ['prop' => $modelProp, 'holder' => $holder];
      }
    })->filter()->mapWithKeys(function (array $item) { return [$item['prop'] => $item['holder']]; });
  }

  private function replaceResolvedPlaceHolders(): void {
    $this->getPlaceHolders()->each(function (PlaceHolder $pH, $key) {
      if ($pH->isResolved()) {
        $this->setAttribute($key, $pH->getValue());
      }
    });
  }

  private function setInsert(): void {
    $this->status = self::INSERT;
  }

  private function setUpdate(): void {
    $this->status = ($this->status === self::UNTOUCHED || $this->status === self::TOUCHED) ? self::UPDATE : $this->status;
  }

  private function setTouched(): void {
    $this->status = ($this->status === self::UNTOUCHED) ? self::TOUCHED : $this->status;
  }

  public function isUntouched(): bool {
    return $this->status === self::UNTOUCHED;
  }

  public function requiresDeletion(): bool {
    return $this->isUntouched();
  }

  public function requiresInsert(): bool {
    return $this->status === self::INSERT;
  }

  public function requiresUpdate(): bool {
    return $this->status === self::UPDATE;
  }

  private function setPlaceHolder(string $key, PlaceHolder $placeHolder): void {
    $this->placeHolders[$key] = $placeHolder;
  }

  private function getPlaceHolders(): Collection {
    return collect($this->placeHolders);
  }

  private function setModels(Collection $models): void {
    $this->validateModels($models);
    $this->models = $models->filter()->mapWithKeys(function (Model $model) {
      return [get_class($model) => $model];
    });
  }

  protected function getModel($class): Model {
    if (!isset($this->models[$class])) {
      $newModel = new $class();
      $this->models[$class] = $newModel;
    }
    return $this->models[$class];
  }

  private function getAttributes(): Collection {
    return $this->getAttributeMaps()->mapWithKeys(function ($details, $key) {
      return [$key => $this->getModelAttribute($details['class'], $details['property'], $key)];
    });
  }

  private function getPlaceHolderColumns(): Collection {
    return collect($this->placeHolderColumns);
  }

  protected function getAttributeMaps(): Collection {
    if (is_null($this->attributeMap)) {
      $this->buildAttributeMap();
    }
    return $this->attributeMap;
  }

  protected function buildAttributeMap(): void {
    $baseClassMap = collect($this->baseClassMap)->flatMap(function (array $props, string $class) {
      return collect($props)->flatMap(function (string $prop) use($class) {
        return [$prop => ['class' => $class, 'property' => $prop]];
      });
    });
    $override = collect($this->overrideMap)->flatMap(function (array $props, string $class) {
      return collect($props)->flatMap(function (string $prop, $key) use($class) {
        $proxyProp = $prop;
        if (is_string($key)) {
          $proxyProp = $key;
        }
        return [$proxyProp => ['class' => $class, 'property' => $prop]];
      });
    });
    $this->attributeMap = $baseClassMap->merge($override);
  }

  protected function resetAttributeMap(): void {
    $this->attributeMap = null;
  }

  public function toArray() {
    return $this->getAttributes()->all();
  }

  public function fill(array $attributes)
  {
    foreach ($attributes as $key => $value) {
      $this->setAttribute($key, $value);
    }
    $this->setUpdate();
    return $this;
  }

  public function __get($key)
  {
    return $this->getAttribute($key);
  }

  public function __set($key, $value)
  {
    $this->setAttribute($key, $value);
  }

  public function checkAttribute(string $key, $expected) {
    return $this->appendAndGetAttribute($key) === $expected;
  }

  public function getAttribute(string $key) {
    $result = $this->appendAndGetAttribute($key);
    $this->setTouched();
    return $result;
  }

  public function peekAttribute(string $key) {
    return $this->appendAndGetAttribute($key);
  }

  private function appendAndGetAttribute(string $key) {
    try {
      return $this->internalGetAttribute($key);
    } catch (ProxyException $ex) {
      $this->appendAttributeToMaps($key);
    }
    return $this->internalGetAttribute($key);
  }

  protected function setAttribute(string $key, $value): void {
    try {
      $this->internalSetAttribute($key, $value);
    } catch (ProxyException $ex) {
      $this->appendAttributeToMaps($key);
    }
    $this->internalSetAttribute($key, $value);
  }

  private function appendAttributeToMaps(string $property) {
    $class = $this->getClass();
    $this->baseClassMap[$class][] = $property;
    $this->resetAttributeMap();
  }

  protected function getClass(): string {
    return static::staticGetClass();
  }

  protected static function staticGetClass(): string {
    if (is_null(static::BASECLASS)) {
      throw new \Exception('Proxies must be assigned a base class');
    }
    return static::BASECLASS;
  }

  private function internalGetAttribute(string $key) {
    $map = $this->getAttributeMaps()->get($key);
    if (!($map)) {
      throw new ProxyException($key . ' does not exist for ' . get_called_class());
    }
    $att = $this->getModelAttribute($map['class'], $map['property']);
    if (is_null($att)) {
      if ($this->getPlaceHolders()->has($key)) {
        $att = $this->getPlaceHolders()->get($key);
      } else if ($this->getPlaceHolderColumns()->contains($key)) {
        $placeHolder = $this->generatePlaceholder();
        $this->setPlaceHolder($key, $placeHolder);
        $att = $placeHolder;
      }
    }
    return $att;
  }

  private function internalSetAttribute($key, $value) {
    $map = $this->getAttributeMaps()->get($key);
    if (!($map)) {
      throw new ProxyException($key . ' does not exist for ' . get_called_class());
    }
    if (is_a($value, PlaceHolder::class)) {
      $this->setPlaceHolder($key, $value);
    } else {
      $this->setModelAttribute($map['class'], $map['property'], $value);
    }
  }

  private function getModelAttribute(string $class, string $property) {
    return $this->getModel($class)->getAttribute($property);
  }

  private function setModelAttribute(string $class, string $property, $value): void {
    $this->getModel($class)->setAttribute($property, $value);
  }

}
