<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\HandlesImages\HandlesImagesService;

use App\Types\CId;
use Illuminate\Support\Collection;

class ImageCollectionByCId extends GatewayQuery {
  public function handle(CId $payload): Collection {
    return $this->querySiblingMethod(HandlesImagesService::class, $payload, 'imageCollectionByCId');
  }
}