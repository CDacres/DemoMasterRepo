<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.CAssetI_AssetType</code>
 */
class CAssetI_AssetType extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>repeated .zipcube.AssetI_AssetType collection = 1;</code>
     */
    private $collection;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\AssetI_AssetType[]|\Google\Protobuf\Internal\RepeatedField $collection
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.AssetI_AssetType collection = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getCollection()
    {
        return $this->collection;
    }

    /**
     * Generated from protobuf field <code>repeated .zipcube.AssetI_AssetType collection = 1;</code>
     * @param \App\Types\AssetI_AssetType[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setCollection($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \App\Types\AssetI_AssetType::class);
        $this->collection = $arr;

        return $this;
    }

}

