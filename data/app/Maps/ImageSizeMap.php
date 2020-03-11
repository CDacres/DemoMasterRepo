<?php

namespace App\Maps;

use App\Types\ImageSize;

class ImageSizeMap extends BaseMap {

  const RAW = '';
  const SMALL = 'small';
  const MEDIUM = 'medium';
  const LARGE = 'large';
  const HUGE = 'huge';
  const BANNER = 'banner';
  
  protected $map = [
    [ImageSize::RAW, self::RAW, null],
    [ImageSize::SMALL, self::SMALL, [190, 120]],
    [ImageSize::MEDIUM, self::MEDIUM, [300, 200]],
    [ImageSize::LARGE, self::LARGE, [639, 428]],
    [ImageSize::HUGE, self::HUGE, [870, 450]],
    [ImageSize::BANNER, self::BANNER, [1056, 300]],
  ];

  public function nameFromType(int $size): string {
    return $this->columnFromColumn($size, 1, 0);
  }

  public function dimensionsFromType(int $size): array {
    return $this->columnFromColumn($size, 2, 0);
  }

  public function typeFromName(string $name) {
    return $this->columnFromColumn($name, 0, 1);
  }
}
