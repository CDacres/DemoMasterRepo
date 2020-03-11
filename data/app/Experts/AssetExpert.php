<?php

namespace App\Experts;

use App\Types\Asset;

class AssetExpert {

  public function assetIsVenue(Asset $asset): bool {
    return (!is_null($asset->getVenueDetails()));
  }

  public function assetIsRoom(Asset $asset): bool {
    return (!is_null($asset->getSpaceDetails()));
  }

  public function assetIsGroup(Asset $asset): bool {
    return (!is_null($asset->getGroupDetails()));
  }

}
