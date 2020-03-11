<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\HandlesCalculatedAssets\HandlesCalculatedAssetsService;

use App\Types\Id;
use App\Types\CAsset;

class CalculatedAssetById extends GatewayQuery {
  public function handle(Id $payload): CAsset {
    return $this->querySiblingMethod(HandlesCalculatedAssetsService::class, $payload, 'calculatedAssetById');
  }
}
