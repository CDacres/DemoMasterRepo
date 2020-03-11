<?php

namespace App\DomainFramework;
use Illuminate\Support\Facades\Cache;

abstract class DomainCommand extends GatewayQuery {

  protected $internalCacheTimeout = 5;

  protected function callGateway($command, $payload) {
    return $this->choreoExceptionWrapper(function () use($command, $payload) {
      $commandObject = new $command($this->buildInput($payload));
      return $commandObject->getCalledWith('handle');
    });
  }

  protected function persist($method, $payload) {
    // TODO - something
  }

  protected function fireEvent($event, $payload) {
    return $this->choreoExceptionWrapper(function () use($event, $payload) {
      event(new $event($this->buildInput($payload)));
    });
  }

  public function getCalledWith($method) {
    return $this->goWith($method);
  }

  protected function suspendState($state) {
    $timeout = $this->internalCacheTimeout/60;
    Cache::put($state->id, $state, $timeout);
  }

  protected function getOrCreateState(...$params) {
    $stateId = $this->generateStateId(...$params);
    $state = $this->getStateFromId($stateId);
    if (is_null($state)) {
      return new State(['id' => $stateId]);
    }
    return $state;
  }

  protected function getState(...$params) {
    $stateId = $this->generateStateId(...$params);
    return $this->getStateFromId($stateId);
  }

  private function generateStateId(...$params) {
    $params = collect($params)->map(function ($param) { //TODO needs de-laraveling if that's ever interesting
      if (is_object($param) && method_exists($param, 'getValue')) {
        return $param->getValue();
      } else {
        return $param;
      }
    })->toArray();
    return md5(get_called_class() . implode('', $params));
  }

  private function getStateFromId($stateId) {
    return Cache::pull($stateId);
  }
}
