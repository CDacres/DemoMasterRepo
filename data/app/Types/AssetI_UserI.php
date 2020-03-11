<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.AssetI_UserI</code>
 */
class AssetI_UserI extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.zipcube.Id assetId = 1;</code>
     */
    private $assetId = null;
    /**
     * Generated from protobuf field <code>.zipcube.Id userId = 2;</code>
     */
    private $userId = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\Id $assetId
     *     @type \App\Types\Id $userId
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id assetId = 1;</code>
     * @return \App\Types\Id
     */
    public function getAssetId()
    {
        return $this->assetId;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id assetId = 1;</code>
     * @param \App\Types\Id $var
     * @return $this
     */
    public function setAssetId($var)
    {
        GPBUtil::checkMessage($var, \App\Types\Id::class);
        $this->assetId = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id userId = 2;</code>
     * @return \App\Types\Id
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Id userId = 2;</code>
     * @param \App\Types\Id $var
     * @return $this
     */
    public function setUserId($var)
    {
        GPBUtil::checkMessage($var, \App\Types\Id::class);
        $this->userId = $var;

        return $this;
    }

}

