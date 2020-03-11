<?php

namespace App\DomainFramework;

use App\DomainFramework\Input;
use App\DomainFramework\Contracts\Async;
use ReflectionClass;
use Exception;

abstract class Listener {
  //Event maps should should like this:
  //[
  //  [
  //    'event': App/MyDomain/_/Events/Event::class,
  //    'handlerClass: App/MyDomain/Service::class,
  //    'handlerMethod: 'handleEvent'
  //  ],
  //  [
  //    ...
  //  ], ...
  //]

  final public function subscribe($events)
  {
    $map = $this->getEventMap();
    collect($map)->unique('event')->each(function ($mapItem) use($events) {
      $events->listen(
        $mapItem['event'],
        get_called_class() . '@handle');
    });
  }

  final public function handle($event) {
    $input = $event->input;
    $eventClass = get_class($event);
    foreach($this->getEventServices($eventClass) as $service) {
      $command = $service['handlerClass'];

      $choreo = $input->retrieveChoreo()->cloneAndAddStep($eventClass, $input->retrievePayload()->serializeToJsonString());
      $originalPayload = $input->retrievePayload();
      $payloadClass = get_class($originalPayload);
      $newPayload = new $payloadClass();
      $newPayload->mergeFrom($originalPayload);
      $newInput = new Input($newPayload, $choreo);

      $commandObject = new $command($newInput);
      $method = $service['handlerMethod'];
      $async = $event instanceOf Async;

      if ($async) {
        Job::dispatch($commandObject, $method);
      } else {
        $commandObject->getCalledWith($method);
      }
    }
  }

  abstract public function getEventMap();

  final public function getEventServices($eventClass) {
    return collect($this->getEventMap())->filter(function ($service) use($eventClass) {
      return $service['event'] == $eventClass;
    })->toArray();
  }

  final protected function validateEventMap($eventMap) {
    foreach ($eventMap as $eventMapItem) {
      $this->validateEventMapItem($eventMapItem);
    }
  }

  private function validateEventMapItem($eventMapItem) {
    if (is_null($eventMapItem)
      || is_null($eventMapItem['event'])
      || is_null($eventMapItem['handlerClass'])
      || is_null($eventMapItem['handlerMethod'])) {
      throw new \Exception('Poorly formed event mapping in ' . get_called_class());
    }
    $event = $eventMapItem['event'];
    $handler = $eventMapItem['handlerClass'];
    if (!class_exists($event)) {
      throw new Exception($eventMapItem['event'] . ' does not exists in ' . $eventMapItem['handlerClass']);
    }
    if (!class_exists($handler)) {
      throw new Exception('Service ' . $eventMapItem['handlerClass'] . ' does not exist to handle ' . $eventMapItem['event']);
    }
    $handlerReflection = new ReflectionClass($handler);
    if (!$handlerReflection->hasMethod($eventMapItem['handlerMethod'])) {
      throw new Exception('Service ' . $eventMapItem['handlerClass'] . ' has no method ' . $eventMapItem['handlerMethod'] . ' to handle ' . $eventMapItem['event']);
    }
  }
}
