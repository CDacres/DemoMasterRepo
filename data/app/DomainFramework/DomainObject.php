<?php

namespace App\DomainFramework;

use App\DomainFramework\Exceptions\ChoreoException;
use ReflectionClass;
use Exception;

abstract class DomainObject {

  private $_input;

  public function __construct($input) {
    $this->_input = $input;
  }

  final protected function choreoExceptionWrapper($func) {
    try {
      return $func();
    } catch (Exception $ex) {
      if (!($ex instanceof ChoreoException)) {
        $message = 'Uncaught Exception in ' . get_called_class() . ' with message: ' . $ex->getMessage();
        $this->throwChoreoException($message, $ex);
      } else {
        throw $ex;
      }
    }
  }

  final protected function throwChoreoException($message, $previous = null) {
    throw new ChoreoException($message, $this->_input, $previous);
  }

  final protected function buildInput($payload) {
    $choreo = $this->_input->retrieveChoreo()->cloneAndAddStep(get_called_class(), $this->_input->retrievePayload()->serializeToJsonString());
    return new Input($payload, $choreo);
  }

  protected function goWith($methodName) {
    return $this->choreoExceptionWrapper(function () use($methodName) {
      $payload = $this->_input->retrievePayload();
      $this->validatePayloadForMethod($payload, $methodName);
      return $this->$methodName($payload);
    });
  }

  private function validatePayloadForMethod($payload, $methodName) {
    $reflector = new ReflectionClass(get_called_class());
    $actualClass = get_class($payload);
    try {
      $parameters = $reflector->getMethod($methodName)->getParameters();
    } catch (Exception $ex) {
      throw new Exception(get_called_class() . ': missing ' . $methodName . ' method type hinting a specific payload type (possibly ' . $actualClass . '?)');
    }
    try {
      $requiredClass = $parameters[0]->getClass()->name;
    } catch (Exception $ex) {
      throw new Exception(get_called_class() . ': will not accept unspecified payload types in its ' . $methodName . '() method.');
    }
    if (!($payload instanceof $requiredClass)) {
      throw new Exception(get_called_class() . ' requires payload of type: ' . $requiredClass. ' in ' . $methodName . '(). ' . $actualClass . ' sent.');
    }
  }

  protected function getClassNamespace($class) {
    $classReflection = new ReflectionClass($class);
    return $classReflection->getNamespaceName();
  }
}
