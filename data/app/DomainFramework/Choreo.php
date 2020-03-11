<?php

namespace App\DomainFramework;

use App\DomainFramework\Choreo;

class Choreo extends DataObject {
  public function __construct($atts = null) {
    if (is_null($atts)) {
      $atts = $this->_getInitialAtts();
    }
    parent::__construct($atts);
  }

  public function cloneAndAddStep($step, $payloadAudit) {
    $newAtts = array_merge($this->_attributes);
    $newAtts['path'] = array_merge($newAtts['path'], [['service' => $step, 'ref' => $this->UIDGenerator(), 'timestamp' => time(), 'payloadAudit' => $payloadAudit]]);
    return new Choreo($newAtts);
  }

  public function UIDGenerator() {
    return rand(1, 10000000);
  }

  private function _getInitialAtts() {
    return ['path' => [], 'ref' => $this->UIDGenerator()];
  }

  public function __set($key, $value) {
    throw new Exception("Immutable objects can't have properties set.");
  }
}
