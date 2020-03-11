<?php

namespace App\Zipcube\Persistence\_\Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\CalculatesAssets\CalculatesAssetsService;

use App\Types\CAsset;

class CalculateAssets extends GatewayQuery {
  public function handle(CAsset $payload): ?CAsset {
    return $this->querySiblingMethod(CalculatesAssetsService::class, $payload, 'calculatedAssetsFromAssets');
  }
}
