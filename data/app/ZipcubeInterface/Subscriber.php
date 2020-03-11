<?php

namespace App\ZipcubeInterface;

use Illuminate\Support\Facades\Cache;
use App\DomainFramework\Listener;
use DirectoryIterator;
use ReflectionClass;

class Subscriber extends Listener {

  private function iterate($pathName) {
    $map = [];
    $dir = new DirectoryIterator($pathName);
    foreach ($dir as $fileInfo) {
      if (!$fileInfo->isDot()) {
        if ($fileInfo->isDir()) {
          if ($fileInfo->getFilename()[0] != "_") {
            $map = array_merge($map, $this->iterate($fileInfo->getPathname()));
          }
        } else {
          $fullPath = substr(str_replace('\\', '/', realpath($fileInfo->getPathname())),
            strlen(str_replace('\\', '/', app_path())));
          $subPath = substr($fullPath, 0, -4);
          $className = $this->appendToNamespace($subPath);
          $reflection = new ReflectionClass($className);
          if ($reflection->hasProperty('eventMap')) {
            $props = $reflection->getDefaultProperties();
            $map = array_merge($map, $this->generateEventMap($props['eventMap'], $className));
          }
        }
      }
    }
    return $map;
  }

  private function generateEventMap($eventMap, $className) {
    $normalisedFromReflection = collect($eventMap)->map(function($item, $key) use($className) {
      return [
        'event' => $item[0],
        'handlerClass' => $className,
        'handlerMethod' => $item[1]
      ];
    })->toArray();
    return array_values($normalisedFromReflection);
  }

  private function appendToNamespace($path) {
    return "\App" . str_replace('/', '\\', $path);
  }

  public function getEventMap() {
    $map = Cache::rememberForever('domainEvents', function() {
      $eventMap = $this->iterate(base_path() . "/app/Zipcube/");
      $this->validateEventMap($eventMap);
      return $eventMap;
    });
    return $map;
  }
}
