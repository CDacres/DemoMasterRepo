<?php

namespace App\Zipcube\AggregatesAssets;

use App\ZipcubeInterface\DomainCommand;
use App\Zipcube\HandlesAssets\HandlesAssetsService as AssetService;

use App\Types\Id;
use App\Types\Asset;
use App\Zipcube\HandlesAssets\HandlesAssetsService;

class AggregatesAssetsService extends DomainCommand {

  public function AssetById(Id $id): ?Asset {
    $asset = $this->querySiblingMethod(AssetService::class, $id, 'assetById');
    if (is_null($asset)) {
      return null;
    }
    return $asset;
  }
}
