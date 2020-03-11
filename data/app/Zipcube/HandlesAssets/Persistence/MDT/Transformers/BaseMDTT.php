<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\Id;

class BaseMDTT {

  protected function string(string $str, $pure = false): ?string {
    if ($pure) { return $str; }
    return $str === '' ? null : $str;
  }

  protected function int(int $int, $pure = false): ?int {
    if ($pure) { return $int; }
    return $int === 0 ? null : $int;
  }

  protected function float(float $flt, $pure = false): ?float {
    if ($pure) { return $flt; }
    return (round($flt, 4) == 0) ? null : $flt;
  }

  public function buildNewId(string $token): Id {
    return new Id(['value' => $token]);
  }
}
