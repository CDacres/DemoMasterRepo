<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\HandlesAssets\HandlesAssetsService;

use App\Types\CId;
use App\Types\CAssetIdMap;

class AssetIdMapFromHumanRefs extends GatewayQuery {
  public function handle(CId $payload): ?CAssetIdMap {
    return $this->querySiblingMethod(HandlesAssetsService::class, $payload, 'mapFromHumanRefs');
  }
}
