<?php

namespace App\Http\GraphQL\Types;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Types\Amenity as AmenityType;
use App\Types\AssetAmenityEdge;

class Amenity
{
  /**
   * Return a value for the field.
   *
   * @param mixed $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
   * @param array $args The arguments that were passed into the field.
   * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
   * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
   *
   * @return mixed
   */
  public function __invoke(AssetAmenityEdge $rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
  {
    $amenity = new AmenityType();
    $amenity->setId($rootValue->getAmenityId());
    return $amenity;
  }
}
