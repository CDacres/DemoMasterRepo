<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/gql.proto

namespace App\Types\GQL;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.graphql.ListingsVenuesArgs</code>
 */
class ListingsVenuesArgs extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.zipcube.Id humanRef = 1;</code>
     */
    private $humanRef = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\Id $humanRef
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Gql::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id humanRef = 1;</code>
     * @return \App\Types\Id
     */
    public function getHumanRef()
    {
        return $this->humanRef;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id humanRef = 1;</code>
     * @param \App\Types\Id $var
     * @return $this
     */
    public function setHumanRef($var)
    {
        GPBUtil::checkMessage($var, \App\Types\Id::class);
        $this->humanRef = $var;

        return $this;
    }

}

