<?php

namespace App\Http\GraphQL\Transformers;

use App\Types\Asset;
use App\Types\CAsset;
use App\Types\GQL\ListingsVenue;
use App\Types\GQL\ListingsAsset;
use App\Types\GQL\ListingsSpace;

class V1Listing {

  public function v1VenueToCanon($wrappedArgs) {
    return $this->v1AssetToCanon($wrappedArgs, 'venue');
  }

  public function canonVenueToV1(Asset $venue, CAsset $spaces) {
    $outputVenue = new ListingsVenue();
    $outputVenueAsset = new ListingsAsset();
    $outputVenueAsset->mergeFromJsonString($venue->serializeToJsonString());
    $outputVenue->setAsset($outputVenueAsset);
    $outputVenue->setDetails($venue->getVenueDetails());
    $outputVenue->setSpaces(collect($spaces->getCollection())->map(function (Asset $space) {
      $outputSpace = new ListingsSpace();
      $outputSpaceAsset = new ListingsAsset();
      $outputSpaceAsset->mergeFromJsonString($space->serializeToJsonString());
      $outputSpace->setAsset($outputSpaceAsset);
      $outputSpace->setDetails($space->getSpaceDetails());
      if ($outputSpaceAsset->getUsages()->count() === 1 && $outputSpaceAsset->getUsages()[0]->getProducts()->count() > 0) {
        $stock = $outputSpaceAsset->getUsages()[0]->getProducts()[0]->getStock();
        if ($stock !== 0) {
          $outputSpace->setTableCount($stock);
        }
      }
      return $outputSpace;
    })->toArray());
    return $outputVenue;
  }

  public function v1SpaceToCanon($wrappedArgs) {
    return $this->v1AssetToCanon($wrappedArgs, 'space');
  }

  public function canonSpaceToV1($canon) {
    return $this->canonAssetToV1($canon, 'space');
  }

  private function v1AssetToCanon($wrappedArgs, $assetType) {
    $args = $wrappedArgs['input'];
    $asset = array_diff_key($args['asset'], array_flip(['details']));
    if (isset($args['details'])){
      $asset[$assetType . 'Details'] = $args['details'];
    }
    return ['input' => ['asset' => $asset]];
  }

  private function canonAssetToV1($asset, $assetType) {
    $canon = json_decode($asset->serializeToJsonString(), true);
    $details = $canon[$assetType . 'Details'];
    unset($canon[$assetType . 'Details']);
    $asset = $canon;
    $final['details'] = $details;
    $final['asset'] = $asset;
    return $final;
  }
}
