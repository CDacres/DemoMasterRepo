<?php

namespace App\Zipcube\_Messages;

use App\DomainFramework\Message as Base;
use App\Types\Id;

class AssetUpserted extends Base {
  protected $payloadType = Id::class;
}
