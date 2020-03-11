<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\AssetAmenityEdge;
use App\Types\CurrencyAmount;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\AmenityProxy;

class AmenityMDTT extends BaseMDTT {

  public function toEloquent(AssetAmenityEdge $edge): array {
    return [
      'available' => (int)!$edge->getSuppressed(),
      'cost' => !is_null($edge->getPrice()) ? (float)$edge->getPrice()->getValue() : null,
      'instructions' => $edge->getNote() === '' ? null : $edge->getNote()
    ];
  }

  public function fromEloquent(AmenityProxy $proxy): AssetAmenityEdge {
    $edge = new AssetAmenityEdge();
    $edge->setAmenityId($this->buildNewId($proxy->amenity_id))
      ->setSuppressed(!$proxy->available);
    if (!is_null($proxy->cost)) {
      $edge->setPrice(new CurrencyAmount(['value' => $proxy->cost]));
    }
    if (!is_null($proxy->instructions)) {
      $edge->setNote($proxy->instructions);
    }
    return $edge;
  }
}
