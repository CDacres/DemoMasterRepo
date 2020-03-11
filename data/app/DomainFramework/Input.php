<?php

namespace App\DomainFramework;
use \Serializable;
use \JsonSerializable;

class Input implements Serializable, JsonSerializable {
  private $_payload;
  private $_choreo;

  public function __construct($payload, $choreo) {
    $this->_payload = $payload;
    $this->_choreo = $choreo;
  }

  public function jsonSerialize() {
    return '{"payload":{"class":"' . get_class($this->_payload). '","data":' . $this->_payload->serializeToJsonString() . '}}';
  }

  public function serialize() {
    return serialize([
      'payload' => $this->serializePayload($this->_payload),
      'choreo' => serialize($this->_choreo),
    ]);
  }

  public function unserialize($string) {
    $wrapper = unserialize($string);
    $this->_payload = $this->unserializePayload($wrapper['payload']);
    $this->_choreo = unserialize($wrapper['choreo']);
  }

  public function retrieveChoreo() {
    return $this->_choreo;
  }

  public function retrievePayload() {
    return $this->_payload;
  }

  protected function serializePayload($payload) {
    return serialize([
      'class' => get_class($payload),
      'json' => $payload->serializeToJsonString()
    ]);
  }

  private function unserializePayload($string) {
    $innerWrap = unserialize($string);
    $type = $innerWrap['class'];
    $payload = new $type();
    $payload->mergeFromJsonString($innerWrap['json']);
    return $payload;
  }
}
