<?php

namespace Tests\_Providers\App\Types;

use App\Types\AssetAmenityEdge;
use App\Types\Id;

class AssetAmenityEdges {

  public function buildAmenityEdge(int $amenityId, string $desc): AssetAmenityEdge {
    return new AssetAmenityEdge([
      'amenityId' => new Id(['value' => strval($amenityId)]),
      'note' => 'This is a test amenity.',
      'suppressed' => false,
      'description' => $desc,
    ]);
  }

  public function buildSuppressedAmenityEdge(int $amenityId, string $desc): AssetAmenityEdge {
    return new AssetAmenityEdge([
      'amenityId' => new Id(['value' => strval($amenityId)]),
      'note' => 'This is a suppressed amenity.',
      'suppressed' => true,
      'description' => $desc,
    ]);
  }
}