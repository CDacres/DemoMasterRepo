<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\ImageEdge;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageEdgeProxy;

class ImageMDTT extends BaseMDTT {

  public function toEloquent(ImageEdge $imageEdge, $assetId): array {
    $eloquent = [
      'asset_id' => $assetId,
      'token' => $imageEdge->getImageId()->getValue(),
    ];
    if (!is_null($imageEdge->getOrderIndex())) {
      $eloquent['order_index'] = $imageEdge->getOrderIndex();
      $eloquent['is_featured'] = ($imageEdge->getOrderIndex() === 0) ? true : false;
    }
    if (!is_null($imageEdge->getDescription())) {
      $eloquent['comments'] = $imageEdge->getDescription();
    }
    return $eloquent;
  }

  public function fromEloquent(ImageEdgeProxy $proxy): ImageEdge {
    $imageEdge = new ImageEdge(['imageId' => $this->buildNewId($proxy->token)]);
    if (!is_null($proxy->order_index)) {
      $imageEdge->setOrderIndex($proxy->order_index);
    }
    if (!is_null($proxy->comments)) {
      $imageEdge->setDescription($proxy->comments);
    }
    return $imageEdge;
  }
}
