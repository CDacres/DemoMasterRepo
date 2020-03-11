<?php

namespace App\Zipcube\_Messages;

use App\DomainFramework\Message as Base;
use App\Types\ImageUpload;

class ImageUploadApproved extends Base {
  protected $payloadType = ImageUpload::class;
}