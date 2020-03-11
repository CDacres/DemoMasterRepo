<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\AggregatesAssets\AggregatesAssetsService;

use App\Types\Id;
use App\Types\Asset;

class AssetById extends GatewayQuery {
  public function handle(Id $payload): ?Asset {
    return $this->querySiblingMethod(AggregatesAssetsService::class, $payload, 'assetById');
  }
}
