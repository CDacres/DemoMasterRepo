<?php

namespace App\Zipcube\HandlesCalculatedAssets;

use App\ZipcubeInterface\DomainCommand;
use App\Zipcube\CalculatesAssets\CalculatesAssetsService;
use App\Zipcube\HandlesAssets\HandlesAssetsService;

use App\DomainFramework\State;

use App\Types\AssetNesting;
use App\Types\Asset;
use App\Types\CAsset;
use App\Types\CId;
use App\Types\Id;

class HandlesCalculatedAssetsService extends DomainCommand {

  public function calculatedAssetById(Id $id): ?CAsset {
    $ids = new CId(['collection' => [$id]]);
    $assets = $this->assetsByCId($ids);
    if ($assets->getCollection()->offsetExists(0)) {
      $asset = $assets->getCollection()[0];
      $assetFamily = $this->buildAssetFamilyCollection($asset);
      $uncalculatedAsset = $this->handleAssetInheritence($assetFamily);
      $calculatedAsset = $this->calculateAsset($uncalculatedAsset);
      return new CAsset(['collection' => [$calculatedAsset]]);
    }
    return null;
  }

  private function assetsByCId(CId $ids): CAsset {
    return $this->querySiblingMethod(HandlesAssetsService::class, $ids, 'assetsByCId');
  }

  private function calculateAsset(Asset $assets): Asset {
    return $this->querySiblingMethod(CalculatesAssetsService::class, $assets, 'calculatedAssetFromAsset');
  }

  private function getParentAsset(Asset $childAsset): ?Asset {
    $nesting = $this->querySiblingMethod(HandlesAssetsService::class, $childAsset->getId(), 'serveAssetNesting');
    if (!is_null($nesting->getContainer())) {
      $id = $nesting->getContainer()->getAssetId();
      $cId = new CId(['collection' => [$id]]);
      $assets = $this->assetsByCId($cId);
      if ($assets->getCollection()->offsetExists(0)) {
        return $assets->getCollection()[0];
      }
    }
    return null;
  }

  private function buildAssetFamilyCollection(Asset $asset): CAsset {
    $assetArray = [$asset];
    $checkAsset = $asset;
    while (!is_null($checkAsset)) {
      $parentAsset = $this->getParentAsset($checkAsset);
      if (!is_null($parentAsset)) {
        array_push($assetArray, $parentAsset);
      }
      $checkAsset = $parentAsset;
    }
    return new CAsset(['collection' => $assetArray]);
  }

  private function handleAssetInheritence(CAsset $assetFamily): Asset {
    $assetFamilyArr = array_reverse(collect($assetFamily->getCollection())->all());
    $parentAsset = $assetFamilyArr[0];
    for ($i=1; $i < count($assetFamilyArr); $i++) {
      $parentAsset = $this->inheritFromParentAsset($assetFamilyArr[$i], $parentAsset);
    }
    return $parentAsset;
  }

  private function inheritFromParentAsset(Asset $asset, Asset $parentAsset): Asset {
    $assets = new CAsset(['collection' => [$asset, $parentAsset]]);
    return $this->querySiblingMethod(CalculatesAssetsService::class, $assets, 'inheritFromParentAsset');
  }
}
