<?php

namespace App\Maps;

class ProductTypeMap extends BaseMap {

  const HOURLY = 'HOURLY';
  const DAILY = 'DAILY';
  const HALFDAY = 'HALFDAY';
  const FIRSTHALFCUSTOM = 'FIRSTHALFCUSTOM';
  const SECONDHALFCUSTOM = 'SECONDHALFCUSTOM';
  const MONTHLY = 'MONTHLY';

  protected $map = [
    [self::HOURLY, '00'],
    [self::DAILY, '01'],
    [self::HALFDAY, '02'],
    [self::FIRSTHALFCUSTOM, '03'],
    [self::SECONDHALFCUSTOM, '04'],
    [self::MONTHLY, '05'],
  ];

  public function suffixFromType(string $type): string {
    return $this->columnFromColumn($type, 1, 0);
  }
}
