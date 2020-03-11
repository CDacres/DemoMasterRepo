<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface;

use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory as BMD;

class DBInterface {

  public function persist(BMD $dir): void {
    $this->delete($dir->getDeleteDirectory());
    $this->insert($dir->getInsertDirectory());
    $this->update($dir->getUpdateDirectory());
  }

  private function delete(BMD $dir): void {
    $dir->fetchModelMap()->each(function ($class, $name) use($dir) {
      $class::deleteCollection($dir->getCollection($name));
    });
  }

  private function insert(BMD $dir): void {
    $dir->fetchModelMap()->each(function ($class, $name) use($dir) {
      $class::insertCollection($dir->getCollection($name));
    });
  }

  private function update(BMD $dir): void {
    $dir->fetchModelMap()->each(function ($class, $name) use($dir) {
      $class::updateCollection($dir->getCollection($name));
    });
  }
}
