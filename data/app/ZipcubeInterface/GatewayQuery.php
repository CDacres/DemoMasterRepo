<?php

namespace App\ZipcubeInterface;

use App\DomainFramework\GatewayQuery as Base;

use App\ZipcubeInterface\Gateway;

class GatewayQuery extends Base
{
  protected $gateway = Gateway::class;
}
