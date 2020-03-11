<?php

namespace App\Http\GraphQL\Mutations;

use App\Http\GraphQL\Helpers\MutationResultBuilder;
use App\ZipcubeInterface\Controller;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Zipcube\_Commands\RequestAssetUpsert;

use App\Zipcube\_Queries\AssetById;

use App\Types\Asset_UserClaims;
use App\Types\GQL\PatchAddressInput;

class PatchAddress
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $patchAddressInput The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function __invoke($rootValue, PatchAddressInput $patchAddressInput, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
      $responseBuilder = new MutationResultBuilder();
      $asset = Controller::query(AssetById::class, $patchAddressInput->getId());
      $location = $asset->getLocation();
      $address = $location->getAddress();
      $addressInput = $patchAddressInput->getAddress();
      $country = $addressInput->getCountry();
      if ($country !== '') {
        $address->setCountry($country);
      }
      $city = $addressInput->getCity();
      if ($city !== '') {
        $address->setCity($city);
      }
      $town = $addressInput->getTown();
      if ($town !== '') {
        $address->setTown($town);
      }
      $location->setAddress($address);
      $asset->setLocation($location);
      $payload = new Asset_UserClaims(['asset' => $asset, 'userClaims' => $context->userClaims()]);
      Controller::call(RequestAssetUpsert::class, $payload);
      return $responseBuilder->send();
    }
}
