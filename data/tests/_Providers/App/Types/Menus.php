<?php

namespace Tests\_Providers\App\Types;

use App\Types\Menu;

class Menus {

  public function buildMenu(): Menu {
    return new Menu([
        'description' => 'Test Menu'
    ]);
  }
}