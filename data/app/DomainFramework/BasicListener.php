<?php

namespace App\DomainFramework;
use ReflectionClass;
use Exception;

abstract class BasicListener extends Listener {

  protected $eventMap = [
    //[
    // 'event': App/MyDomain/_Events/EventName::class,
    // 'handlerClass: App/MyDomain/ServiceName/Service::class,
    // 'handlerMethod: 'handleEvent'
    //]
  ];

  final public function getEventMap() {
    $eventMap = $this->eventMap;
    // This is expensive. You could consider disabling it in production
    // or using caching.
    $this->validateEventMap($eventMap);
    return $eventMap;
  }
}
