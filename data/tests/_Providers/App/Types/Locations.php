<?php

namespace Tests\_Providers\App\Types;

use App\Types\Address;
use App\Types\LatLng;
use App\Types\Location;
use App\Types\NearbyPlace;

class Locations {

  public function buildEmptyLocation(): Location {
    return new Location();
  }

  public function buildLocationEmptySubTypes(): Location {
    return new Location([
      'address' => new Address(),
      'coords' => new LatLng(),
      'nearbyPlaces' => [new NearbyPlace()],
      'specialInstructions' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ]);
  }
}