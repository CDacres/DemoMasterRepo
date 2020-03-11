<?php

namespace App\Maps;

use App\Types\AreaUnit;
use Exception;

class AreaUnitMap extends BaseMap {

  const M2 = 'm2';
  const FT2 = 'ft2';

  protected $map = [
    [AreaUnit::M2, self::M2],
    [AreaUnit::FT2, self::FT2],
  ];

  public function valueFromType(int $type): string {
    if ($type === AreaUnit::NOAREAUNIT) {
      throw new Exception('Area Unit not set');
    }
    return $this->columnFromColumn($type, 1, 0);
  }

  public function typeFromValue(string $value): int {
    return $this->columnFromColumn($value, 0, 1);
  }
}
