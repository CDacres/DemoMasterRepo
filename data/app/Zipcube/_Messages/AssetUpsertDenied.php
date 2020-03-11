<?php

namespace App\Zipcube\_Messages;

use App\DomainFramework\Message as Base;
use App\Types\AssetI_UserI;

class AssetUpsertDenied extends Base {
  protected $payloadType = AssetI_UserI::class;
}
