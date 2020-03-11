<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface;

use App\Types\AssetNesting;
use App\Types\Id;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\DBInterface;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\AssetProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\AssetMD as MD;

class AssetInterface extends DBInterface {

  public function buildNestingModels(AssetNesting $nesting): MD {
    $parent = $nesting->getContainer()->getAssetId()->getValue();
    $child = $nesting->getAssetId()->getValue();
    $assets = AssetProxy::fetch($parent)->concat(AssetProxy::fetch($child));
    $md = (new MD())->setCollection(MD::ASSET, $assets);
    return $md;
  }

  public function buildModelsForId(Id $id): MD {
    $assets = AssetProxy::fetchWithParentAndChildren($id->getValue());
    $md = (new MD())->setCollection(MD::ASSET, $assets);
    return $md;
  }
}
