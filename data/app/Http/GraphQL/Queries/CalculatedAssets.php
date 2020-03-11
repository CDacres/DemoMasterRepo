<?php

namespace App\Http\GraphQL\Queries;

use App\Types\AssetIdMap;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\ZipcubeInterface\Controller;

use App\Types\CId;

use App\Zipcube\_Queries\AssetIdMapFromHumanRefs as Gateway;
use App\Zipcube\_Queries\CalculatedAssetById;

use App\Types\GQL\CalculatedAssetsArgs;
use App\Types\CAssetIdMap;

class CalculatedAssets
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
  public function __invoke($rootValue, CalculatedAssetsArgs $data, GraphQLContext $context = null, ResolveInfo $resolveInfo)
  {
    $humanRefs = new CId();
    $humanRefs->setCollection([$data->getHumanRef()]);
    $map = $this->getAssetIdMap($humanRefs);
    if ($map->getCollection()->count() === 1) {
      $id = $map->getCollection()[0]->getId();
      $calculatedAssetCollection = Controller::query(CalculatedAssetById::class, $id);
      $calculatedAssets = $calculatedAssetCollection->getCollection();
      return $calculatedAssets;
    }
    return [];
  }

  private function getAssetIdMap(CId $humanRefs): CAssetIdMap {
    return Controller::query(Gateway::class, $humanRefs);
  }
}