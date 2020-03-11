<?php

namespace App\Helpers;

class CastHelper
{
    private $_acceptableCasts = [
        "boolean",
        "bool",
        "integer",
        "int",
        "float",
        "double",
        "string",
        "array",
        "object"
    ];

    public function checkCast($type)
    {
        return in_array($type, $this->_acceptableCasts);
    }
}