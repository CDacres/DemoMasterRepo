<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/gql.proto

namespace App\Types\GQL;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.graphql.ListingsSpace</code>
 */
class ListingsSpace extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.zipcube.graphql.ListingsAsset asset = 1;</code>
     */
    private $asset = null;
    /**
     * Generated from protobuf field <code>.zipcube.SpaceDetails details = 2;</code>
     */
    private $details = null;
    /**
     * Generated from protobuf field <code>int32 tableCount = 3;</code>
     */
    private $tableCount = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\GQL\ListingsAsset $asset
     *     @type \App\Types\SpaceDetails $details
     *     @type int $tableCount
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Gql::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.zipcube.graphql.ListingsAsset asset = 1;</code>
     * @return \App\Types\GQL\ListingsAsset
     */
    public function getAsset()
    {
        return $this->asset;
    }

    /**
     * Generated from protobuf field <code>.zipcube.graphql.ListingsAsset asset = 1;</code>
     * @param \App\Types\GQL\ListingsAsset $var
     * @return $this
     */
    public function setAsset($var)
    {
        GPBUtil::checkMessage($var, \App\Types\GQL\ListingsAsset::class);
        $this->asset = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.zipcube.SpaceDetails details = 2;</code>
     * @return \App\Types\SpaceDetails
     */
    public function getDetails()
    {
        return $this->details;
    }

    /**
     * Generated from protobuf field <code>.zipcube.SpaceDetails details = 2;</code>
     * @param \App\Types\SpaceDetails $var
     * @return $this
     */
    public function setDetails($var)
    {
        GPBUtil::checkMessage($var, \App\Types\SpaceDetails::class);
        $this->details = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>int32 tableCount = 3;</code>
     * @return int
     */
    public function getTableCount()
    {
        return $this->tableCount;
    }

    /**
     * Generated from protobuf field <code>int32 tableCount = 3;</code>
     * @param int $var
     * @return $this
     */
    public function setTableCount($var)
    {
        GPBUtil::checkInt32($var);
        $this->tableCount = $var;

        return $this;
    }

}

