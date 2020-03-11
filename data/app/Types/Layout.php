<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.Layout</code>
 */
class Layout extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.zipcube.Id id = 1;</code>
     */
    private $id = null;
    /**
     * Generated from protobuf field <code>repeated .zipcube.Id children = 2;</code>
     */
    private $children;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\Id $id
     *     @type \App\Types\Id[]|\Google\Protobuf\Internal\RepeatedField $children
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id id = 1;</code>
     * @return \App\Types\Id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id id = 1;</code>
     * @param \App\Types\Id $var
     * @return $this
     */
    public function setId($var)
    {
        GPBUtil::checkMessage($var, \App\Types\Id::class);
        $this->id = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.Id children = 2;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.Id children = 2;</code>
     * @param \App\Types\Id[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setChildren($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \App\Types\Id::class);
        $this->children = $arr;

        return $this;
    }

}

