<?php

namespace App\Http\GraphQL\Queries;

use App\Types\AssetIdMap;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\ZipcubeInterface\Controller;

use App\Types\CId;

use App\Zipcube\_Queries\AssetIdMapFromHumanRefs as Gateway;
use App\Zipcube\_Queries\AssetsByCId;
use App\Zipcube\_Queries\FetchAssetNesting;

use App\Http\GraphQL\Transformers\V1Listing;
use App\Types\GQL\ListingsVenuesArgs;
use App\Types\CAssetIdMap;

class ListingsVenues
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $data The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function __invoke($rootValue, ListingsVenuesArgs $data, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
      $humanRefs = new CId();
      $humanRefs->setCollection([$data->getHumanRef()]);
      $map = $this->getAssetIdMap($humanRefs);
      if ($map->getCollection()->count() === 1) {
        $cId = new CId();
        $ids = collect($map->getCollection())->map(function (AssetIdMap $tuple) { return $tuple->getId(); });
        $cId->setCollection($ids->toArray());
        $venues = Controller::query(AssetsByCId::class, $cId);
        if ($venues->getCollection()->offsetExists(0)) {
          $venue = $venues->getCollection()[0];
          $nesting = Controller::query(FetchAssetNesting::class, $venue->getId());
          $spacesIds = new CId();
          if ($nesting->getLayouts()->offsetExists(0)) {
            $children = $nesting->getLayouts()[0]->getChildren();
            $spacesIds->setCollection($children);
          }
          $spaces = Controller::query(AssetsByCId::class, $spacesIds);
          $v1 = (new V1Listing())->canonVenueToV1($venue, $spaces);
          return [$v1];
        }
      }
      return [];
    }

    private function getAssetIdMap(CId $humanRefs): CAssetIdMap {
      return Controller::query(Gateway::class, $humanRefs);
    }
}
