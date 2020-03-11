<?php

namespace App\Http\GraphQL\Mutations;

use App\Http\GraphQL\Helpers\MutationResultBuilder;
use App\ZipcubeInterface\Controller;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Zipcube\_Commands\RequestAssetNesting;
use App\Zipcube\_Commands\RequestAssetUpsert;

use App\Zipcube\_Queries\AssetsByCId;

use App\Types\SpaceDetails;
use App\Types\Asset;
use App\Types\Asset_UserClaims;
use App\Types\Id;
use App\Types\CId;
use App\Types\GQL\ListingsSpaceInput;
use App\Types\AssetNesting;
use App\Types\Container;

class UpsertSpace
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $spaceInput The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function __invoke($rootValue, ListingsSpaceInput $spaceInput, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
      $responseBuilder = new MutationResultBuilder();
      $parentId = $spaceInput->getParentId();
      $cId = new CId();
      $cId->setCollection([$parentId]);
      $venues = Controller::query(AssetsByCId::class, $cId);
      if (!$venues->getCollection()->offsetExists(0)) {
        return $responseBuilder->addValidationProblem('Venue does not exist for id ' . $parentId->getValue())->send();
      }

      $asset = new Asset();
      $asset->mergeFromJsonString($spaceInput->getAsset()->serializeToJsonString());
      $nesting = $this->buildNesting($asset->getId(), $parentId);
      Controller::call(RequestAssetNesting::class, $nesting); // TODO: async: this nesting depends on being synchronous

      $spaceDetails = new SpaceDetails();
      $inputDetails = $spaceInput->getDetails();

      if ($spaceInput->getTableCount() !== 0) {
        if ($asset->getUsages()->count() === 1 && $asset->getUsages()[0]->getProducts()->count() === 1) {
          $asset->getUsages()[0]->getProducts()[0]->setStock($spaceInput->getTableCount());
        } else {
          return $responseBuilder->addValidationProblem('Table count used incorrectly')->send();
        }
      }
      if (!is_null($inputDetails)) {
        $spaceDetails->mergeFrom($spaceInput->getDetails());
      }
      $asset->setSpaceDetails($spaceDetails);
      $payload = new Asset_UserClaims(['asset' => $asset, 'userClaims' => $context->userClaims()]);
      Controller::call(RequestAssetUpsert::class, $payload);
      return $responseBuilder->send();
    }

    private function buildNesting(Id $childId, Id $parentId): AssetNesting {
      $nesting = new AssetNesting();
      $nesting->setAssetId($childId);
      $container = new Container();
      $container->setAssetId($parentId);
      $container->setLayoutId($parentId);
      $nesting->setContainer($container);
      return $nesting;
    }
}
