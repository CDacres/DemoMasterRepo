<?php

namespace App\Maps;

use App\Types\AssetType;

class AssetTypeMap extends BaseMap {

  protected $map = [
    [AssetType::NOASSETTYPE, 0],
    [AssetType::GROUP, 1],
    [AssetType::VENUE, 2],
    [AssetType::ROOM, 3],
  ];

  public function idFromType(int $assetType): int {
    return $this->columnFromColumn($assetType, 1, 0);
  }

  public function typeFromId(int $id): int {
    return $this->columnFromColumn($id, 0, 1);
  }

}
