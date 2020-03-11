<?php

namespace App\Zipcube\HandlesImages\Persistence;

use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageBuildProxy;
use Illuminate\Support\Collection;

class ImageBuildMD extends ModelDirectory {

  const IMAGE = 'Images';

  public function fetchModelMap(): Collection {
    return collect([
      self::IMAGE => ImageBuildProxy::class,
    ]);
  }
}
