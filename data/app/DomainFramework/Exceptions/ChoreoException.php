<?php

namespace App\DomainFramework\Exceptions;
use \Exception as PHPEx;

class ChoreoException extends PHPEx {

  private $_input;

  public function __construct($message, $input, $previous = null) {
    $this->_input = $input;
    parent::__construct($message, 0, $previous);
  }

  public function getErrorContext() {
    $context = [
      'input' => serialize($this->_input)
    ];
    $target = $this->getPrevious() ?: $this;
    $context['exception'] = [
      '[file]' => $target->getFile(),
      '[line]' => $target->getLine(),
      '[stacktrace]' => $target->getTraceAsString()
    ];
    return $context;
  }

}
