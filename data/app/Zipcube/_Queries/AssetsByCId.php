<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\HandlesAssets\HandlesAssetsService;

use App\Types\CId;
use App\Types\CAsset;

class AssetsByCId extends GatewayQuery {
  public function handle(CId $payload): CAsset {
    return $this->querySiblingMethod(HandlesAssetsService::class, $payload, 'assetsByCId');
  }
}
