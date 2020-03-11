<?php

namespace App\Zipcube\HandlesImages\Persistence;

use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageUploadProxy;
use Illuminate\Support\Collection;

class ImageUploadMD extends ModelDirectory {

  const IMAGE = 'Images';

  public function fetchModelMap(): Collection {
    return collect([
      self::IMAGE => ImageUploadProxy::class,
    ]);
  }
}
