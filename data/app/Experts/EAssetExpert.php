<?php

namespace App\Experts;

use App\Maps\AssetTypeMap;
use App\ORM\Asset as EAsset;
use App\Types\AssetIdMap;
use App\Types\AssetType;
use App\Types\CAssetIdMap;
use App\Types\CId;
use App\Types\Id;
use Illuminate\Support\Collection;

class EAssetExpert {

  public function shortIdFromToken(string $token): ?int {
    return $this->shortIdFromId($this->idFrom($token));
  }

  public function mapByShortIds(CId $shortIds): CAssetIdMap {
    $ids = $this->cIdToArray($shortIds);
    return $this->resultsToMap(EAsset::whereIn('id', $ids)->get());
  }

  public function mapByCId(CId $ids): CAssetIdMap {
    $tokens = $this->cIdToArray($ids);
    return $this->resultsToMap(EAsset::whereIn('token', $tokens)->get());
  }

  public function shortIdFromId(Id $id): ?int {
    $map = $this->mapByCId($this->wrapInCollectionFromId($id));
    $item = $this->firstValueFromMap($map);
    return is_null($item) ? null : $item->getHumanRef()->getValue();
  }

  public function IdFromShortId(string $shortId): ?Id {
    $map = $this->mapByShortIds($this->wrapInCollectionFromValue($shortId));
    $item = $this->firstValueFromMap($map);
    return is_null($item) ? null : $item->getId();
  }

  public function assetIsVenue(EAsset $eAsset): bool {
    return $this->assetIsType($eAsset, AssetType::VENUE);
  }

  public function assetIsRoom(EAsset $eAsset): bool {
    return $this->assetIsType($eAsset, AssetType::ROOM);
  }

  public function assetIsGroup(EAsset $eAsset): bool {
    return $this->assetIsType($eAsset, AssetType::GROUP);
  }

  public function assetIsType(EAsset $eAsset, int $requiredType): bool {
    $type = (new AssetTypeMap())->typeFromId($eAsset->asset_type_id);
    return $type === $requiredType;
  }

  private function firstValueFromMap(CAssetIdMap $map): ?AssetIdMap {
    if($map->getCollection()->count() > 0) {
      return $map->getCollection()->offsetGet(0);
    }
    return null;
  }

  private function wrapInCollectionFromValue($id): CId {
    return new CId(['collection' => [$this->idFrom($id)]]);
  }

  private function wrapInCollectionFromId(Id $id): CId {
    return new CId(['collection' => [$id]]);
  }

  private function idFrom($value): Id {
    return new Id(['value' => $value]);
  }

  private function resultsToMap(Collection $results): CAssetIdMap {
    $maps = $results->map(function ($item) {
      return (new AssetIdMap())->setId($this->idFrom($item['token']))->setHumanRef($this->idFrom($item['id']));
    })->all();
    return (new CAssetIdMap())->setCollection($maps);
  }

  private function cIdToArray(CId $cid): array {
    return collect($cid->getCollection()->getIterator())->map(function (Id $id) { return $id->getValue(); })->all();
  }
}
