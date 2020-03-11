<?php

function devlog($data = 'here', $name = 'debug') {
  if (is_object($data)) {
    if (method_exists($data, 'serializeToJsonString')) {
      $data = $data->serializeToJsonString();
    } else if ($data instanceof \JsonSerializable) {
      $data = $data->jsonSerialize();
    } else if (method_exists($data, 'toJson')) {
      $data = $data->toJson();
    }
  }
  $ts = ((int) substr(((string) ceil(microtime(true)*100)), -4))/100;
  ChannelLog::info($name,'default',['ts' => $ts, 'data' => $data]);
  ChannelLog::info('********************************************','default');
}
