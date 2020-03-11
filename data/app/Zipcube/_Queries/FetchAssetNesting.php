<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\HandlesAssets\HandlesAssetsService;

use App\Types\Id;
use App\Types\AssetNesting;

class FetchAssetNesting extends GatewayQuery {
  public function handle(Id $payload): AssetNesting {
    return $this->querySiblingMethod(HandlesAssetsService::class, $payload, 'serveAssetNesting');
  }
}
