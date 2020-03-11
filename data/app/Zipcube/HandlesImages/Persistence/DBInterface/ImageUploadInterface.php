<?php

namespace App\Zipcube\HandlesImages\Persistence\DBInterface;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\DBInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageUploadProxy;
use App\Zipcube\HandlesImages\Persistence\ImageUploadMD as MD;

use App\Types\Id;
use Illuminate\Support\Collection;

class ImageUploadInterface extends DBInterface {

  public function buildModel(Id $tokenId): MD {
    $images = ImageUploadProxy::fetchForToken(new Collection([$tokenId->getvalue()]));
    $md = (new MD())->setCollection(MD::IMAGE, $images);
    return $md;
  }
}