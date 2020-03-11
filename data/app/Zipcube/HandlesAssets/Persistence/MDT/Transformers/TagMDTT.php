<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\Id;
use App\Types\TagEdge;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\TagProxy;

class TagMDTT extends BaseMDTT {

  public function toEloquent(TagEdge $config): array {
    return [
      'suppressed' => $config->getSuppressed(),
    ];
  }

  public function fromEloquent(TagProxy $proxy): TagEdge {
    $edge = new TagEdge();
    return $edge
      ->setTagId(new Id(['value' => $proxy->tag_id]))
      ->setSuppressed($proxy->suppressed);
  }
}
