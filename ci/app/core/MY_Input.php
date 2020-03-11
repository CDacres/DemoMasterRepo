<?php

class MY_Input extends CI_Input
{
    private $_validator = null;

    function __construct()
    {
        parent::__construct();
        $this->_validator = new Helper__Validator();
    }

    function get($index = null, $validationsString = null)
    {
        $value = parent::get($index, false);
        if ($index !== null)
        {
            $value = $this->_validate($value, $validationsString);
        }
        if ($this->_validator->error_occurred())
        {
            throw new Exception("Error getting " . $index . ". It " . $this->_validator->get_error_string());
        }
        return $value;
    }

    function post($index = null, $validationsString = null)
    {
        $value = parent::post($index, false);
        if ($index !== null)
        {
            $value = $this->_validate($value, $validationsString);
        }
        if ($this->_validator->error_occurred())
        {
            throw new Exception("Error fetching post: " . $index . ". It " . $this->_validator->get_error_string());
        }
        return $value;
    }

    private function _validate($value, $validationsString = '')
    {
        return $this->_validator->validate($value, $validationsString);
    }
}