<?php

namespace App\ORM\Transformers\DayRate;

use App\ORM\Transformers\Helpers\Mapper;

use App\Types\Id;

class Map {

  protected $map = [
    [Types::DAYRATE, '00'],
    [Types::HALFDAY, '01'],
    [Types::FIRSTHALFCUSTOM, '02'],
    [Types::SECONDHALFCUSTOM, '03'],
    [Types::MONTHLY, '04'],
  ];

  public function idFromTokenAndType(string $token, string $type): Id {
    $component = (new Mapper($this->map))->columnFromColumn($type, 1, 0);
    return new Id(['value' => $token . $component]);
  }

}
