<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\ContextMDT;

use App\Types\ProductContext;
use App\Types\TagEdge;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Contracts\RepresentsAsset;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\TagProxy;
use App\Zipcube\HandlesAssets\Persistence\MDT\Transformers\TagMDTT;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

class TagsMDT {

  public function build(MD $directory, RepresentsAsset $proxy): array {
    return $directory->useCollection(MD::TAG, [
      'asset_id' => $proxy->getId(),
      'enabled' => 1
    ])->map(function (TagProxy $tagPro) {
      return (new TagMDTT())->fromEloquent($tagPro);
    })->values()->all();
  }

  public function mutate(MD $directory, RepresentsAsset $proxy, ProductContext $context): void {
    $tags = $context->getTags();
    if ($tags->count() > 0) {
      collect($tags)->each(function (TagEdge $edge) use($proxy, $directory) {
        $directory->upsert(MD::TAG, [
          'asset_id' => (int)$proxy->getId(),
          'tag_id' => (int)$edge->getTagId()->getValue(),
        ], (new TagMDTT())->toEloquent($edge));
      });
    }
  }

  public function impose(ProductContext $original, ProductContext $parent): array {
    return collect($original->getConfigurations())->all();
  }
}
