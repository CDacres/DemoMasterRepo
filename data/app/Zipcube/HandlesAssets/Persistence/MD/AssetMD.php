<?php

namespace App\Zipcube\HandlesAssets\Persistence\MD;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\AssetProxy;
use Illuminate\Support\Collection;
use App\Zipcube\HandlesAssets\Persistence\MD\ModelDirectory;

class AssetMD extends ModelDirectory {

  const ASSET = 'Assets';

  public function fetchModelMap(): Collection {
    return collect([
      self::ASSET => AssetProxy::class,
    ]);
  }
}
