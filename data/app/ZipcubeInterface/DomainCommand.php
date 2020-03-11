<?php

namespace App\ZipcubeInterface;

use App\DomainFramework\DomainCommand as Base;

use App\ZipcubeInterface\Gateway;

class DomainCommand extends Base
{
  protected $gateway = Gateway::class;
}
