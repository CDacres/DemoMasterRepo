<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT;

use App\Types\AssetNesting;
use App\Types\Container;
use App\Types\Id;
use App\Types\Layout;
use App\Zipcube\HandlesAssets\Persistence\MD\AssetMD as MD;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\AssetProxy;

class AssetMDT {

  public function mutateNesting(MD $directory, AssetNesting $nesting) : void {
    $parent = $directory->ensure(MD::ASSET, ['token' => $nesting->getContainer()->getAssetId()->getValue()]);
    $directory->upsert(MD::ASSET, ['token' => $nesting->getAssetId()->getValue()], ['parent_id' => $parent->id]);
  }

  public function buildNesting(MD $directory, Id $id): AssetNesting {
    $pivot = $directory->use(MD::ASSET, ['token' => $id->getValue()]);
    $nesting = new AssetNesting();
    $nesting->setAssetId($id);
    if (is_null($pivot)) {
      return $nesting;
    }
    $parent = $directory->use(MD::ASSET, ['id' => $pivot->parent_id]);
    if (!is_null($parent)) {
      $container = new Container([
        'assetId' => new Id(['value' => $parent->token]),
        'layoutId' => new Id(['value' => $parent->token])
      ]);
      $nesting->setContainer($container);
    }
    $children = $directory->useCollection(MD::ASSET, ['parent_id' => $pivot->id])->map(function (AssetProxy $proxy) {
      return new Id(['value' => $proxy->token]);
    })->values();
    if ($children->count() > 0) {
      $layout = new Layout();
      $layout->setId($id);
      $layout->setChildren($children->all());
      $nesting->setLayouts([$layout]);
    }
    return $nesting;
  }

}
