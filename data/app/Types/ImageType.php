<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use UnexpectedValueException;

/**
 * Protobuf type <code>zipcube.ImageType</code>
 */
class ImageType
{
    /**
     * Generated from protobuf enum <code>NOIMAGETYPE = 0;</code>
     */
    const NOIMAGETYPE = 0;
    /**
     * Generated from protobuf enum <code>ASSET = 1;</code>
     */
    const ASSET = 1;
    /**
     * Generated from protobuf enum <code>FOOD = 2;</code>
     */
    const FOOD = 2;
    /**
     * Generated from protobuf enum <code>SITEIMAGE = 3;</code>
     */
    const SITEIMAGE = 3;

    private static $valueToName = [
        self::NOIMAGETYPE => 'NOIMAGETYPE',
        self::ASSET => 'ASSET',
        self::FOOD => 'FOOD',
        self::SITEIMAGE => 'SITEIMAGE',
    ];

    public static function name($value)
    {
        if (!isset(self::$valueToName[$value])) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no name defined for value %s', __CLASS__, $value));
        }
        return self::$valueToName[$value];
    }


    public static function value($name)
    {
        $const = __CLASS__ . '::' . strtoupper($name);
        if (!defined($const)) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no value defined for name %s', __CLASS__, $name));
        }
        return constant($const);
    }
}

