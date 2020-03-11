<?php

namespace App\Zipcube\_Messages;

use App\DomainFramework\Message as Base;
use App\Types\Asset_UserClaims;

class AssetUpsertRequested extends Base {
  protected $payloadType = Asset_UserClaims::class;
}
