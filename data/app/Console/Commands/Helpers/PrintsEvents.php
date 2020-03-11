<?php

namespace App\Console\Commands\Helpers;

class PrintsEvents {
  public function print($command, $events, $event = null) {
    $command->line('');
    $result = collect($events)->filter(function ($item) use($event) {
      if (is_null($event)) {
        return true;
      } else {
        return strpos(strtolower($item['event']), strtolower($event)) !== false;
      }
    })->groupBy('event')->sortKeys()->each(function ($item, $key) use($event, $command) {
      $items = collect($item);
      $command->info($key . " (" . $items->count() . ")");
      if (!is_null($event)) {
        $items->each(function($subItem) use($command) {
          $command->line(' ' . $subItem['handlerClass'] . '@' . $subItem['handlerMethod']);
        });
        $command->line('');
      }
    });
    if (is_null($event)) {
      $command->line('');
    }
  }
}
