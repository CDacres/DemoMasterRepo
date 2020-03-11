<?php

namespace App\Http\GraphQL\Mutations;

use App\Http\GraphQL\Helpers\MutationResultBuilder;
use App\ZipcubeInterface\Controller;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Zipcube\_Commands\RequestImageUpload;

use App\Types\Id;
use App\Types\ImageUpload;
use App\Types\ImageSize;
use App\Maps\ImageTypeMap;

class UploadImage
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $args The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
      $responseBuilder = new MutationResultBuilder();
      $payload = new ImageUpload([
        'id' => new Id(['value' => $args['input']['image']['id']['value']]),
        'file' =>  $args['input']['file']->get(),
        'type' => (new ImageTypeMap())->typeFromName($args['input']['image']['type']),
        'size' => ImageSize::RAW,
      ]);
      Controller::call(RequestImageUpload::class, $payload);
      return $responseBuilder->send();
    }
}
