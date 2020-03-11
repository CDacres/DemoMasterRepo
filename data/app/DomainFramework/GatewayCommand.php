<?php

namespace App\DomainFramework;

abstract class GatewayCommand extends DomainCommand {
//TODO add something in here to limit number of side effects that can be fired (probably 1)
  protected function callSiblingMethod($command, $payload, $method) {
    return $this->choreoExceptionWrapper(function () use($command, $payload, $method) {
      $commandObject = new $command($this->buildInput($payload));
      return $commandObject->getCalledWith($method);
    });
  }

}
