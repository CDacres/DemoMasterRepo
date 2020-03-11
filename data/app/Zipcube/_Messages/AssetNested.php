<?php

namespace App\Zipcube\_Messages;

use App\DomainFramework\Message as Base;
use App\Types\AssetNesting;

class AssetNested extends Base {
  protected $payloadType = AssetNesting::class;
}
