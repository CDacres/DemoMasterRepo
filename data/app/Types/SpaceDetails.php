<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.SpaceDetails</code>
 */
class SpaceDetails extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>repeated .zipcube.AssetStyle styles = 1;</code>
     */
    private $styles;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int[]|\Google\Protobuf\Internal\RepeatedField $styles
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.AssetStyle styles = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getStyles()
    {
        return $this->styles;
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.AssetStyle styles = 1;</code>
     * @param int[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setStyles($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::ENUM, \App\Types\AssetStyle::class);
        $this->styles = $arr;

        return $this;
    }

}

