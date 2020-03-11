<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\References;

use App\ORM\Amenity;
use Illuminate\Support\Collection;

class AmenityRefProxy extends ReferenceProxy {
  const BASECLASS = Amenity::class;

  static public function fetchModels(): Collection {
    return Amenity::where('filterable', 1)->get();
  }
}
