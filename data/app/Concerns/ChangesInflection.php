<?php

namespace App\Concerns;

use Illuminate\Contracts\Support\Arrayable;

trait ChangesInflection
{
    protected $_native_case = 'snake';

    public function convertArrayKeysToCase($value, $case, $object = false)
    {
        if ($value instanceof Arrayable)
        {
            return $this->encodeArrayable($value, $case);
        }
        elseif (is_object($value))
        {
            return $this->encodeObject($value, $case);
        }
        elseif (is_array($value))
        {
            return $this->_handleEmptyObjectArray($this->encodeArray($value, $case), $object);
        }
        else
        {
            return $value;
        }
    }

    public function checkForInflectionRequest($request)
    {
        return $request->header('X-Zip-Inflection');
    }

    public function casesDiffer($request)
    {
        $case = $this->checkForInflectionRequest($request);
        return !is_null($case) && $case !== $this->_native_case;
    }

    public function getNativeCase()
    {
        return $this->_native_case;
    }

    public function encodeObject($object, $case)
    {
        $array = json_decode(json_encode($object), true);
        return $this->convertArrayKeysToCase($array, $case, true);
    }

    public function encodeArrayable($arrayable, $case)
    {
        $array = $arrayable->toArray();
        return $this->convertArrayKeysToCase($array, $case);
    }
    /**
     * Encode an array
     */
    public function encodeArray($array, $case)
    {
        $newArray = [];
        foreach ($array as $key => $val)
        {
            $newKey = $this->encodeString($key, $case);
            $newArray[$newKey] = $this->convertArrayKeysToCase($val, $case);
        }
        return $newArray;
    }

    public function encodeString($string, $case)
    {
        return ($case === 'camel') ? \camel_case($string) : \snake_case($string);
    }

    private function _handleEmptyObjectArray($array, $isObject = false)
    {
        return count($array) > 0 ? $array : ($isObject ? new \stdClass() : []);
    }
}