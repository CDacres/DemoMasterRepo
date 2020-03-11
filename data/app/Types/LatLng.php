<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.LatLng</code>
 */
class LatLng extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>float lat = 1;</code>
     */
    private $lat = 0.0;
    /**
     * Generated from protobuf field <code>float lng = 2;</code>
     */
    private $lng = 0.0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type float $lat
     *     @type float $lng
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>float lat = 1;</code>
     * @return float
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Generated from protobuf field <code>float lat = 1;</code>
     * @param float $var
     * @return $this
     */
    public function setLat($var)
    {
        GPBUtil::checkFloat($var);
        $this->lat = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>float lng = 2;</code>
     * @return float
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Generated from protobuf field <code>float lng = 2;</code>
     * @param float $var
     * @return $this
     */
    public function setLng($var)
    {
        GPBUtil::checkFloat($var);
        $this->lng = $var;

        return $this;
    }

}

