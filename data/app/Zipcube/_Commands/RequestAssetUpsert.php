<?php

namespace App\Zipcube\_Commands;

use App\ZipcubeInterface\GatewayCommand;
use App\Types\Asset_UserClaims;
use App\Zipcube\_Messages\AssetUpsertRequested;

class RequestAssetUpsert extends GatewayCommand {
  public function handle(Asset_UserClaims $payload) {
    return $this->fireEvent(AssetUpsertRequested::class, $payload);
  }
}
