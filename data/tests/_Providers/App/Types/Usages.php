<?php

namespace Tests\_Providers\App\Types;

use App\Types\Usage;

class Usages {

  public function buildUsage(int $cat): Usage {
    return new Usage([
      'name' => 'Example Usage',
      'category' => $cat,
      'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    ]);
  }
}