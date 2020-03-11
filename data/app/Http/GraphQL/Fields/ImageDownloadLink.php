<?php

namespace App\Http\GraphQL\Fields;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Types\Image;
use App\Types\UserRole;

class ImageDownloadLink
{
  public function __invoke(Image $image, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
  {
    $userClaims = $context->userClaims();
    $isAdmin = collect($userClaims->getUser()->getRoles())->contains(UserRole::ADMIN);
    if ($isAdmin) {
        $token = $image->getId()->getValue();
        return env("DATA_API_URL") . "/api/original_image/" . $token;
    }
    return null;
  }
}
