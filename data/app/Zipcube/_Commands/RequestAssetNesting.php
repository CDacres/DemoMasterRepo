<?php

namespace App\Zipcube\_Commands;

use App\ZipcubeInterface\GatewayCommand;
use App\Types\AssetNesting;
use App\Zipcube\_Messages\AssetNestingRequested;

class RequestAssetNesting extends GatewayCommand {
  public function handle(AssetNesting $payload) {
    return $this->fireEvent(AssetNestingRequested::class, $payload);
  }
}
