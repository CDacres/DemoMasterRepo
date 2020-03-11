<?php

namespace App\ORM\Transformers;

use App\Types\Day as Type;

use App\ORM\Transformers\Helpers\Mapper;

class Day {

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
    return (new Mapper($this->map))->columnFromColumn($day, 2, 0);
  }

  public function typeFromName(string $name): int {
    return (new Mapper($this->map))->columnFromColumn(strtoupper($name), 0, 1);
  }

  public function typeFromId(int $id): int {
    return (new Mapper($this->map))->columnFromColumn($id, 0, 2);
  }
}
