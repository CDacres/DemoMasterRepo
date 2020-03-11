<?php

namespace App\Maps;

use App\Types\Currency as Type;

class CurrencyMap extends BaseMap {

  protected $map = [
    [Type::NOCURRENCY, null],
    [Type::AMD, 'AMD'],
    [Type::BZD, 'BZD'],
    [Type::CAD, 'CAD'],
    [Type::CHF, 'CHF'],
    [Type::CNY, 'CNY'],
    [Type::EUR, 'EUR'],
    [Type::GBP, 'GBP'],
    [Type::IDR, 'IDR'],
    [Type::ILS, 'ILS'],
    [Type::INR, 'INR'],
    [Type::PKR, 'PKR'],
    [Type::PLN, 'PLN'],
    [Type::SEK, 'SEK'],
    [Type::USD, 'USD'],
    [Type::ZAR, 'ZAR'],
  ];

  public function lcFromEnum(int $enum): ?string {
    $response = $this->ucFromEnum($enum);
    return strtolower($response);
  }

  public function ucFromEnum(int $enum): ?string {
    return $this->columnFromColumn($enum, 1, 0);
  }

  public function enumFromLc(?string $id): int {
    return $this->enumFromUc(strtoupper($id));
  }

  public function enumFromUc(?string $id): int {
    if ($id === '') {
      $id = null;
    }
    return $this->columnFromColumn($id, 0, 1);
  }

}
