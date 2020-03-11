<?php

namespace App\DomainFramework;
use Serializable;
use JsonSerializable;
use Exception;
use ErrorException;

class DataObject implements Serializable, JsonSerializable {
  protected $_attributes = [];

  public function __construct($dict = []) {
    foreach($dict as $key => $value) {
      $this->_add($key, $value);
    }
  }

  final public function has($property) {
    return isset($this->_attributes[$property]);
  }

  public function jsonSerialize() {
    $retString = '{';
    $first = true;
    foreach($this->_attributes as $key => $value) {
      $retString .= $first ? '' : ',';
      $first = false;
      $retString .= '"' . $key . '":';
      if (is_object($value) && method_exists($value, 'serializeToJsonString')) {
        $retString .= '{"class":"' . get_class($value) . '","data":' . $value->serializeToJsonString() . '}';
      } else {
        $retString .= json_encode($value);
      }
    }
    $retString .= '}';
    return $retString;
  }

  final private function _add($key, $value) {
    if (isset($this->_attributes[$key])) {
      throw new Exception("Multiple attributes with the same key (" . $key . ") are not allowed.");
    }
    $this->_attributes[$key] = $value;
  }

  public function serialize() {
    $wrapper = [];
    foreach($this->_attributes as $key => $value) {
      if ($value instanceof \Google\Protobuf\Internal\Message) {
        $wrapper[$key] = [
          'type' => get_class($value),
          'string' => $value->serializeToString()
        ];
      } else {
        $wrapper[$key] = serialize($value);
      }
    }
    return serialize($wrapper);
  }

  public function unserialize($string) {
    $wrapper = unserialize($string);
    foreach($wrapper as $key=>$value) {
      if (is_array($value)) {
        $type = $value['type'];
        $object = new $type();
        $object->mergeFromString($value['string']);
        $this->_add($key, $object);
      } else {
        $this->_add($key, unserialize($wrapper[$key]));
      }
    }
  }

  public function __get($key) {
    try {
      $value = $this->_attributes[$key];
    } catch (ErrorException $ex) {
      $value = null;
    }
    return $value;
  }

  public function __set($key, $value) {
    $this->_attributes[$key] = $value;
  }
}
