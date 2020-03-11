<?php

namespace App\Zipcube\HandlesTags;

use App\ZipcubeInterface\DomainCommand;
use App\Zipcube\HandlesTags\HandlesTagsPersistence as Persist;

use Google\Protobuf\GPBEmpty;
use App\Types\CTagCatalogItem;

class HandlesTagsService extends DomainCommand {

  public function tagsReference(GPBEmpty $payload): CTagCatalogItem {
    return (new Persist())->serveTagsReference($payload);
  }
}
