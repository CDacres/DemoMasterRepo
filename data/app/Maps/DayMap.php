<?php

namespace App\Maps;

use App\Types\Day as Type;
use Exception;

class DayMap extends BaseMap {

  const SUNDAY = 'SUNDAY';
  const MONDAY = 'MONDAY';
  const TUESDAY = 'TUESDAY';
  const WEDNESDAY = 'WEDNESDAY';
  const THURSDAY = 'THURSDAY';
  const FRIDAY = 'FRIDAY';
  const SATURDAY = 'SATURDAY';

  protected $map = [
    [Type::SUNDAY, self::SUNDAY, 0],
    [Type::MONDAY, self::MONDAY, 1],
    [Type::TUESDAY, self::TUESDAY, 2],
    [Type::WEDNESDAY, self::WEDNESDAY, 3],
    [Type::THURSDAY, self::THURSDAY, 4],
    [Type::FRIDAY, self::FRIDAY, 5],
    [Type::SATURDAY, self::SATURDAY, 6],
  ];

  public function idFromType(int $day): int {
    if ($day === Type::NODAY) {
      throw new Exception('Day not set');
    }
    return $this->columnFromColumn($day, 2, 0);
  }

  public function typeFromName(string $name): int {
    return $this->columnFromColumn(strtoupper($name), 0, 1);
  }

  public function typeFromId(int $id): int {
    return $this->columnFromColumn($id, 0, 2);
  }
}
