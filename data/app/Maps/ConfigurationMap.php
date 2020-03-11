<?php

namespace App\Maps;

use App\Types\Configuration;

class ConfigurationMap extends BaseMap {

  const BOARDROOM = 'BOARDROOM';
  const CLASSROOM = 'CLASSROOM';
  const BANQUET = 'BANQUET';
  const THEATRE = 'THEATRE';
  const DESK = 'DESK';
  const RECEPTION = 'RECEPTION';
  const U_SHAPED = 'U_SHAPED';
  const CABARET = 'CABARET';
  const OFFICE = 'OFFICE';
  const SEATED = 'SEATED';

  protected $map = [
    [Configuration::SEATED, self::SEATED, 10],
    [Configuration::BOARDROOM, self::BOARDROOM, 1],
    [Configuration::CLASSROOM, self::CLASSROOM, 2],
    [Configuration::BANQUET, self::BANQUET, 3],
    [Configuration::THEATRE, self::THEATRE, 4],
    [Configuration::SEATED, self::DESK, 5],
    [Configuration::RECEPTION, self::RECEPTION, 6],
    [Configuration::U_SHAPED, self::U_SHAPED, 7],
    [Configuration::CABARET, self::CABARET, 8],
    [Configuration::SEATED, self::OFFICE, 9],
  ];

  public function idFromType(int $day): int {
    if ($day === Configuration::NOCONFIGURATION) {
      throw new Exception('Configuration not set');
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
