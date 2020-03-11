<?php

namespace App\Http\GraphQL\Types;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use App\ZipcubeInterface\Controller;
use App\Zipcube\_Queries\ImageCollectionByCId;

use App\Types\ImageEdge;
use App\Types\Image as TypeOfImage;
use App\Types\CId;

class Image
{
  public function __invoke(ImageEdge $imageEdge, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo): TypeOfImage
  {
    $imageId = $imageEdge->getImageId();
    $cId = new CId(['collection' => [$imageId]]);
    $imageCollection = Controller::query(ImageCollectionByCId::class, $cId);
    return $imageCollection->first();
  }
}
