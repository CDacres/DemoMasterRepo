<?php

namespace App\ZipcubeInterface;

use App\DomainFramework\GatewayCommand as Base;

use App\ZipcubeInterface\Gateway;

class GatewayCommand extends Base
{
  protected $gateway = Gateway::class;
}
