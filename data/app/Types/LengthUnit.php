<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: zipcube/assets.proto

namespace App\Types;

use UnexpectedValueException;

/**
 * Protobuf type <code>zipcube.LengthUnit</code>
 */
class LengthUnit
{
    /**
     * Generated from protobuf enum <code>NOLENGTHUNIT = 0;</code>
     */
    const NOLENGTHUNIT = 0;
    /**
     * Generated from protobuf enum <code>METER = 1;</code>
     */
    const METER = 1;
    /**
     * Generated from protobuf enum <code>FEET = 2;</code>
     */
    const FEET = 2;

    private static $valueToName = [
        self::NOLENGTHUNIT => 'NOLENGTHUNIT',
        self::METER => 'METER',
        self::FEET => 'FEET',
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

