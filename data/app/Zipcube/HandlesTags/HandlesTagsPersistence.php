<?php
namespace App\Zipcube\HandlesTags;

use App\Types\CTagCatalogItem;
use App\Types\Id;
use App\Types\TagCatalogItem;
use App\Types\Tag;
use App\ORM\Tag as ETag;
use App\ORM\Transformers\Tag as TagTransformer;
use App\ZipcubeInterface\DomainCommand;
use Google\Protobuf\GPBEmpty;
use Illuminate\Support\Collection;

class HandlesTagsPersistence {
  public function serveTagsReference(GPBEmpty $payload): CTagCatalogItem {
    $rootsWithDescendants = $this->getRootsWithDescendants();
    $tags = collect($rootsWithDescendants)->flatMap(function ($root) {
      return $this->buildTagsFromRoot($root);
    })->all();
    return new CTagCatalogItem(['collection' => $tags]);
  }

  private function buildTagsFromRoot(ETag $root): Collection {
    $category = (new TagTransformer())->categoryFromId($root->id);
    if (is_null($category)) {
      return collect([]);
    }
    $rootCollection = collect([$this->buildTag($root, $category, (!is_null($root->order_index) ? $root->order_index : 100000000))]);
    $descendantCollection = $root->descendants->map(function (ETag $datum) use($category) {
      return $this->buildTag($datum, $category, (!is_null($datum->order_index) ? $datum->order_index : 0));
    });
    return $rootCollection->concat($descendantCollection);
  }

  private function buildTag(ETag $datum, int $category, int $index): TagCatalogItem {
    $tag = $this->eTagToTag($datum);
    return $tag
      ->setOrderIndex($index)
      ->setProductCategory($category);
  }

  private function eTagToTag(ETag $eTag): TagCatalogItem {
    $tag = (new Tag())
      ->setId((new Id())->setValue($eTag['id']))
      ->setDescription($eTag['name']);
    return (new TagCatalogItem())->setTag($tag);
  }

  private function getRootsWithDescendants(): Collection {
    return ETag::whereIsRoot()->with('descendants')->get();
  }
}
