<?php

namespace App\ORM\Transformers\Helpers;

use Exception;

class Mapper {

  private $map = [];

  public function __construct(array $map) {
    $this->map = $map;
  }

  public function columnFromColumn($needle, int $target, int $source, $safeNull = false) {
    $raw = collect($this->map)->first(function ($tuple) use($needle, $target, $source) { return $tuple[$source] === $needle; });
    if (is_null($raw)) {
      if ($safeNull) {
        return null;
      } else {
        throw new Exception ('Unavailable mapping for ' . $needle . ' in column ' . $source . ' of ' . get_called_class());
      }
    }
    return $raw[$target];
  }

}
