<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.Asset_UserClaims</code>
 */
class Asset_UserClaims extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>.zipcube.Asset asset = 1;</code>
     */
    private $asset = null;
    /**
     * Generated from protobuf field <code>.zipcube.UserClaims userClaims = 2;</code>
     */
    private $userClaims = null;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type \App\Types\Asset $asset
     *     @type \App\Types\UserClaims $userClaims
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>.zipcube.Asset asset = 1;</code>
     * @return \App\Types\Asset
     */
    public function getAsset()
    {
        return $this->asset;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Asset asset = 1;</code>
     * @param \App\Types\Asset $var
     * @return $this
     */
    public function setAsset($var)
    {
        GPBUtil::checkMessage($var, \App\Types\Asset::class);
        $this->asset = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.zipcube.UserClaims userClaims = 2;</code>
     * @return \App\Types\UserClaims
     */
    public function getUserClaims()
    {
        return $this->userClaims;
    }

    /**
     * Generated from protobuf field <code>.zipcube.UserClaims userClaims = 2;</code>
     * @param \App\Types\UserClaims $var
     * @return $this
     */
    public function setUserClaims($var)
    {
        GPBUtil::checkMessage($var, \App\Types\UserClaims::class);
        $this->userClaims = $var;

        return $this;
    }

}

