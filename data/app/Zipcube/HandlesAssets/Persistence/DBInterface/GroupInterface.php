<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface;

use App\Types\Id;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\GroupProxy;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;
use App\Zipcube\HandlesAssets\Persistence\MD\ListingMD as MD;

class GroupInterface extends GenericsInterface {

  public function buildModels(Id $id): MD {
    $token = $id->getValue();
    $groups = GroupProxy::fetch($token);
    if ($groups->count() > 1) {
      throw new \Exception('Multiple venues for token: ' . $token); // TODO error handling
    } else if ($groups->count() === 0) {
      return new MD();
    }
    $group = $groups->first();
    $venues = VenueProxy::fetchFromParentId($group->peekAttribute('id'));
    $md = (new MD())
      ->setCollection(MD::GROUP, $groups)
      ->setCollection(MD::VENUE, $venues);
    return $md;
  }
}
