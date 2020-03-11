<?php

namespace App\DomainFramework;
use Exception;
use Serializable;

abstract class Message implements Serializable {

  public $input;

  protected $payloadType = Payload::class;

  public function __construct($input)
  {
    if (!$input->retrievePayload() instanceof $this->payloadType) {
      throw new Exception('Incorrect Payload Type for ' . get_called_class() . '. Expected: ' . $this->payloadType . ' but received ' . get_class($input->retrievePayload()));
    }
    $this->input = $input;
  }

  public function serialize() {
    return serialize($this->input);
  }

  public function unserialize($string) {
    $this->input = unserialize($string);
  }

}
