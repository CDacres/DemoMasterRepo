<?php

namespace App\Http\GraphQL\Queries\Reference;

use App\Types\CTagCatalogItem;
use Google\Protobuf\GPBEmpty;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\ZipcubeInterface\Controller;
use App\Zipcube\_Queries\TagsReference;

class Tags
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
    public function __invoke($rootValue, array $data, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
      return $this->getTags()->getCollection();
    }

    private function getTags(): CTagCatalogItem {
      return Controller::query(TagsReference::class, (new GPBEmpty()));
    }
}
