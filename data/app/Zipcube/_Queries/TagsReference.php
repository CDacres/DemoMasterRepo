<?php

namespace App\Zipcube\_Queries;

use App\ZipcubeInterface\GatewayQuery;
use App\Zipcube\HandlesTags\HandlesTagsService;

use Google\Protobuf\GPBEmpty;
use App\Types\CTagCatalogItem;

class TagsReference extends GatewayQuery {
  public function handle(GPBEmpty $payload): CTagCatalogItem {
    return $this->querySiblingMethod(HandlesTagsService::class, $payload, 'tagsReference');
  }
}
