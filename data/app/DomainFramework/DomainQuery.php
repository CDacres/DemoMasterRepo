<?php

namespace App\DomainFramework;
use ReflectionClass;
use Exception;

abstract class DomainQuery extends DomainObject {

  protected function querySiblingMethod($query, $payload, $method) {
    return $this->choreoExceptionWrapper(function () use($query, $payload, $method) {
      $queryObject = new $query($this->buildInput($payload));
      return $queryObject->getQueriedWith($method);
    });
  }

  protected function queryGateway($query, $payload) {
    return $this->choreoExceptionWrapper(function () use($query, $payload) {
      $queryObject = new $query($this->buildInput($payload));
      return $queryObject->getQueriedWith('handle');
    });
  }

  public function getQueriedWith($method) {
    $this->ensureReturnType($method);
    $response = $this->goWith($method);
    return $response;
  }

  private function ensureReturnType($method) {
    $reflector = new ReflectionClass(get_called_class());
    try {
      $reflectionType = $reflector->getMethod($method)->getReturnType();
    } catch(Exception $ex) {
      throw new Exception(get_called_class() . " has no method '" . $method . "'");
    }
    if (is_null($reflectionType)) {
      throw new Exception(get_called_class() . ': must supply a return type in its ' . $method . ' method.');
    }
  }

}
