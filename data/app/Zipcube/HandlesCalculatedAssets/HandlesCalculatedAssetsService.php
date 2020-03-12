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
use App\Types\ImposingAssets;

class HandlesCalculatedAssetsService extends DomainCommand {

  public function calculatedAssetById(Id $id): ?CAsset {
    $ids = new CId(['collection' => [$id]]);
    $assets = $this->assetsByCId($ids);
    if ($assets->getCollection()->offsetExists(0)) {
      $asset = $assets->getCollection()[0];
      $uncalculatedAsset = $this->inheritFromAssetFamily($asset);
      $calculatedAsset = $this->calculateAsset($uncalculatedAsset);
      return new CAsset(['collection' => [$calculatedAsset]]);
    }
    return null;
  }

  private function assetsByCId(CId $ids): CAsset {
    return $this->querySiblingMethod(HandlesAssetsService::class, $ids, 'assetsByCId');
  }

  private function calculateAsset(Asset $asset): Asset {
    return $this->querySiblingMethod(CalculatesAssetsService::class, $asset, 'calculatedAssetFromAsset');
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

  private function inheritFromAssetFamily(Asset $asset): Asset {
    $assetFamilyArray = $this->getAssetFamily([$asset]);
    $inheritedAsset = $this->imposeAssetFamily($assetFamilyArray);
    return $inheritedAsset;
  }

  private function getAssetFamily(array $assets): array {
    $parentAsset = $this->getParentAsset(end($assets));
    if (is_null($parentAsset)) {
      return $assets;
    }
    array_push($assets, $parentAsset);
    return $this->getAssetFamily($assets);
  }

  private function imposeAssetFamily(array $assetFamily) {
    if (count($assetFamily) === 1) {
      return end($assetFamily);
    }
    $parentAsset = array_pop($assetFamily);
    $childAsset = array_pop($assetFamily);
    $cAsset = $this->imposeParentAsset([$childAsset], $parentAsset);
    array_push($assetFamily, $cAsset->getCollection()[0]);
    return $this->imposeAssetFamily($assetFamily);
  }

  private function imposeParentAsset(array $assets, Asset $parentAsset): CAsset {
    $imposingAssets = new ImposingAssets([
      'template' => $parentAsset,
      'targets' => $assets
    ]);
    return $this->querySiblingMethod(CalculatesAssetsService::class, $imposingAssets, 'imposeAssetOnAssets');
  }

  public function getImposedChildAssets(Asset $asset): CAsset {
    $nesting = $this->querySiblingMethod(HandlesAssetsService::class, $asset->getId(), 'serveAssetNesting');
    if (!is_null($nesting->getLayouts()) && $nesting->getLayouts()->offsetExists(0)) {
      $childAssets = collect($nesting->getLayouts()[0]->getChildren())->map(function (Id $id) {
        $cId = new CId(['collection' => [$id]]);
        $assets = $this->assetsByCId($cId);
        if (!is_null($assets->getCollection()) && $assets->getCollection()->offsetExists(0)) {
          return $assets->getCollection()[0];
        }
      })->all();
      return $this->imposeParentAsset($childAssets, $asset);
    }
    return new CAsset();
  }
}