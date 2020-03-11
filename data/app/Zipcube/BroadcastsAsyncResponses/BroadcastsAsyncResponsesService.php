<?php

namespace App\Zipcube\BroadcastsAsyncResponses;

use App\Contracts\Facades\ChannelLog;
use App\ZipcubeInterface\DomainCommand;
use App\Zipcube\_Messages\AssetUpsertDenied;

use App\Types\AssetI_UserI;

class BroadcastsAsyncResponsesService extends DomainCommand
{

  //
  //TODO async - this whole file should ping a subscription point rather than just logging
  //

  public $eventMap = [
    [AssetUpsertDenied::class, 'reportUpsertRequestDenial'],
  ];

  public function reportUpsertRequestDenial(AssetI_UserI $payload) {
    ChannelLog::info('User ' . $payload->getUserId()->getValue() . ' was denied upserting asset: ' . $payload->getAssetId()->getValue(), 'default');
  }

}
