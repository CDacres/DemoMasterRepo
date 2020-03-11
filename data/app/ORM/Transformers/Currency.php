<?php

namespace App\ORM\Transformers;

use App\Types\Currency as Type;

use App\ORM\Room as ERoom;
use App\ORM\Venue as EVenue;

use App\ORM\Transformers\Helpers\Mapper;

class Currency {

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
    return (new Mapper($this->map))->columnFromColumn($enum, 1, 0);
  }

  public function enumFromLc(?string $id): int {
    return $this->enumFromUc(strtoupper($id));
  }

  public function enumFromUc(?string $id): int {
    if ($id === '') {
      $id = null;
    }
    return (new Mapper($this->map))->columnFromColumn($id, 0, 1);
  }

  public function enumFromRoomAndVenue(ERoom $eRoom, EVenue $eVenue): int {
    $currencyStr = $this->mergeCurrencies($eRoom, $eVenue);
    return $this->enumFromUc($currencyStr);
  }

  private function mergeCurrencies(ERoom $eRoom, EVenue $eVenue): string {
    return is_null($eRoom->currency) ? $eVenue->currency : $eRoom->currency;
  }
}
