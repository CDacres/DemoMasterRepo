<?php

namespace App\Zipcube\HandlesImages\Persistence\DBInterface;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\DBInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy\ImageBuildProxy;
use App\Zipcube\HandlesImages\Persistence\ImageBuildMD as MD;

use App\Types\CId;
use App\Types\Id;

class ImageBuildInterface extends DBInterface {

  public function buildModel(CId $cId): MD {
    $tokenIds = collect($cId->getCollection())->map(function (Id $id) { return $id->getValue(); });
    $images = ImageBuildProxy::fetchForToken($tokenIds);
    $md = (new MD())->setCollection(MD::IMAGE, $images);
    return $md;
  }
}