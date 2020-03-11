<?php

namespace App\DomainFramework;

use App\DomainFramework\Choreo;
use App\DomainFramework\Input;
use App\DomainFramework\Exceptions\ChoreoException;

abstract class Controller
{
  public static function query($query, $payload)
  {
    try {
      $queryObject = new $query(static::buildInput($payload));
      return $queryObject->getQueriedWith('handle');
    } catch (ChoreoException $ex) {
      static::handleChoreoException($ex);
      throw $ex->getPrevious();
    }
  }

  public static function call($command, $payload)
  {
    try {
      $commandObject = new $command(static::buildInput($payload));
      return $commandObject->getCalledWith('handle');
    } catch (ChoreoException $ex) {
      if (static::handleChoreoException($ex)) {
        throw $ex->getPrevious();
      }
    }
  }

  public static function buildInput($payload) {
    $choreo = new Choreo();
    return new Input($payload, $choreo);
  }

  abstract public static function handleChoreoException(ChoreoException $ex): bool;
}
