<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Generated from protobuf message <code>zipcube.CurrencyAmount</code>
 */
class CurrencyAmount extends \Google\Protobuf\Internal\Message
{
    /**
     * Generated from protobuf field <code>float value = 1;</code>
     */
    private $value = 0.0;
    /**
     * Generated from protobuf field <code>.zipcube.Currency currency = 2;</code>
     */
    private $currency = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type float $value
     *     @type int $currency
     * }
     */
    public function __construct($data = NULL) {
        \ProtobufMeta\Assets::initOnce();
        parent::__construct($data);
    }

    /**
     * Generated from protobuf field <code>float value = 1;</code>
     * @return float
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Generated from protobuf field <code>float value = 1;</code>
     * @param float $var
     * @return $this
     */
    public function setValue($var)
    {
        GPBUtil::checkFloat($var);
        $this->value = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Currency currency = 2;</code>
     * @return int
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * Generated from protobuf field <code>.zipcube.Currency currency = 2;</code>
     * @param int $var
     * @return $this
     */
    public function setCurrency($var)
    {
        GPBUtil::checkEnum($var, \App\Types\Currency::class);
        $this->currency = $var;

        return $this;
    }

}

