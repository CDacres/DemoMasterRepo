<?php

namespace App\ZipcubeInterface;

use App\Contracts\Facades\ChannelLog as Log;

use App\DomainFramework\Controller as Base;
use App\DomainFramework\Exceptions\ChoreoException;

class Controller extends Base
{
  public static function handleChoreoException(ChoreoException $ex): bool {
    // TODO async This all may not make sense in production. Be wary.
    if (!env('APP_DEBUG')) {
      Log::error($ex->getMessage(), null, $ex->getErrorContext());
    }
    return true; //return false here to treat this like a genuine async situation. TODO - possibly link to environment?
  }
}
