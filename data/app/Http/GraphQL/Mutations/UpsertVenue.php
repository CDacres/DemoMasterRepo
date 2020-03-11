<?php

namespace App\Http\GraphQL\Mutations;

use App\Http\GraphQL\Helpers\MutationResultBuilder;
use App\ZipcubeInterface\Controller;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Zipcube\_Commands\RequestAssetUpsert;

use App\Types\Asset_UserClaims;
use App\Types\GQL\ListingsVenueInput;
use App\Types\Asset;
use App\Types\VenueDetails;

class UpsertVenue
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $venueInput The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function __invoke($rootValue, ListingsVenueInput $venueInput, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
      $responseBuilder = new MutationResultBuilder();
      $asset = new Asset();
      $asset->mergeFromJsonString($venueInput->getAsset()->serializeToJsonString());
      $venueDetails = new VenueDetails();
      $inputDetails = $venueInput->getDetails();
      if (!is_null($inputDetails)) {
        $venueDetails->mergeFrom($venueInput->getDetails());
      }
      $asset->setVenueDetails($venueDetails);
      $payload = new Asset_UserClaims(['asset' => $asset, 'userClaims' => $context->userClaims()]);
      Controller::call(RequestAssetUpsert::class, $payload);
      return $responseBuilder->send();
    }
}
