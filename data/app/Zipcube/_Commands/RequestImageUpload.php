<?php

namespace App\Zipcube\_Commands;

use App\ZipcubeInterface\GatewayCommand;
use App\Types\ImageUpload;
use App\Zipcube\_Messages\ImageUploadApproved;

class RequestImageUpload extends GatewayCommand {
  public function handle(ImageUpload $payload) {
    return $this->fireEvent(ImageUploadApproved::class, $payload);
  }
}
