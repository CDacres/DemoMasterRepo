<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.Location</code>
 */
class Location extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.zipcube.Address address = 1;</code>
     */
    private $address = null;
    /**
     * Generated from protobuf field <code>.zipcube.LatLng coords = 2;</code>
     */
    private $coords = null;
    /**
     * Generated from protobuf field <code>repeated .zipcube.NearbyPlace nearbyPlaces = 3;</code>
     */
    private $nearbyPlaces;
    /**
     * Generated from protobuf field <code>string specialInstructions = 4;</code>
     */
    private $specialInstructions = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\Address $address
     *     @type \App\Types\LatLng $coords
     *     @type \App\Types\NearbyPlace[]|\Google\Protobuf\Internal\RepeatedField $nearbyPlaces
     *     @type string $specialInstructions
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.zipcube.Address address = 1;</code>
     * @return \App\Types\Address
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Address address = 1;</code>
     * @param \App\Types\Address $var
     * @return $this
     */
    public function setAddress($var)
    {
        GPBUtil::checkMessage($var, \App\Types\Address::class);
        $this->address = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.zipcube.LatLng coords = 2;</code>
     * @return \App\Types\LatLng
     */
    public function getCoords()
    {
        return $this->coords;
    }

    /**
     * Generated from protobuf field <code>.zipcube.LatLng coords = 2;</code>
     * @param \App\Types\LatLng $var
     * @return $this
     */
    public function setCoords($var)
    {
        GPBUtil::checkMessage($var, \App\Types\LatLng::class);
        $this->coords = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.NearbyPlace nearbyPlaces = 3;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getNearbyPlaces()
    {
        return $this->nearbyPlaces;
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.NearbyPlace nearbyPlaces = 3;</code>
     * @param \App\Types\NearbyPlace[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setNearbyPlaces($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \App\Types\NearbyPlace::class);
        $this->nearbyPlaces = $arr;

        return $this;
    }

    /**
     * Generated from protobuf field <code>string specialInstructions = 4;</code>
     * @return string
     */
    public function getSpecialInstructions()
    {
        return $this->specialInstructions;
    }

    /**
     * Generated from protobuf field <code>string specialInstructions = 4;</code>
     * @param string $var
     * @return $this
     */
    public function setSpecialInstructions($var)
    {
        GPBUtil::checkString($var, True);
        $this->specialInstructions = $var;

        return $this;
    }

}

