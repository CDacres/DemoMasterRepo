<?php

namespace App\Maps;

use App\Types\ImageType;

class ImageTypeMap extends BaseMap {

  const NOIMAGETYPE = '';
  const ASSET = 'ASSET';
  const FOOD = 'FOOD';
  const SITEIMAGE = 'SITEIMAGE';
  
  protected $map = [
    [ImageType::NOIMAGETYPE, self::NOIMAGETYPE, 0],
    [ImageType::ASSET, self::ASSET, 1],
    [ImageType::FOOD, self::FOOD, 2],
    [ImageType::SITEIMAGE, self::SITEIMAGE, 3],
  ];

  public function nameFromType(int $size) {
    return $this->columnFromColumn($size, 1, 0);
  }

  public function typeFromName(string $name) {
    return $this->columnFromColumn($name, 0, 1);
  }

  public function idFromType(int $size) {
    return $this->columnFromColumn($size, 2, 0);
  }

  public function typeFromId(int $id) {
    return $this->columnFromColumn($id, 0, 2);
  }
}