<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Base__Black_Box_Object extends Base__Expressable
{
    private $_data = [];

    function __construct($populationArray = [])
    {
        if (is_array($populationArray) && !empty($populationArray))
        {
            $this->_data = $populationArray;
        }
        parent::__construct();
    }

    public function populate_from_bindings($populationArray = [])
    {
        if (is_array($populationArray) && !empty($populationArray))
        {
            foreach ($populationArray as $binding => $datum)
            {
                $this->set($binding, $datum);
            }
        }
    }

    public function get($pointer)
    {
        if ($pointer !== null)
        {
            return $this->_get_data_from_pointer($pointer);
        }
        else
        {
            throw new Exception(get_class($this) . " Class - Identifier error getting null.");
        }
    }

    public function is_empty()
    {
        return (count($this->_data) === 0);
    }

    public function set($pointer, $value)
    {
        $this->_set($pointer, $value);
    }

    protected function _set($pointer, $value)
    {
        if ($pointer === null)
        {
            throw new Exception(get_class($this) . " Class - Identifier error setting null.");
        }
        if (is_array($pointer) && $value === null)
        {
            return $this->_set_array($pointer);
        }
        else
        {
            $this->_set_data($pointer, $value);
            $this->_reset_wranglers();
            return true;
        }
    }

    public function is_true($identifier)
    {
        $retVal = false;
        $data = $this->get($identifier);
        if ($data == 1 || $data === true)
        {
            $retVal = true;
        }
        return $retVal;
    }

    public function is_null($identifier)
    {
        $retVal = false;
        $data = $this->get($identifier);
        if ($data === null)
        {
            $retVal = true;
        }
        return $retVal;
    }

    public function data_exists($identifier)
    {
        return !$this->is_null($identifier);
    }

    public function data_not_empty($identifier)
    {
        return !$this->_data_empty($identifier);
    }

    protected function _data_empty($pointer)
    {
        $retVal = false;
        $data = $this->_get_data_from_pointer($pointer);
        if ($data == '')
        {
            $retVal = true;
        }
        return $retVal;
    }

    protected function _pointer_is_true($pointer)
    {
        $retVal = false;
        $data = $this->_get_data_from_pointer($pointer);
        if ($data == 1 || $data === true)
        {
            $retVal = true;
        }
        return $retVal;
    }

    protected function _get_data_from_pointer($pointer)
    {
        if ($this->_data_is_set($pointer))
        {
            $retVal = $this->_fetch_data($pointer);
        }
        else
        {
            $retVal = null;
        }
        return $retVal;
    }

    protected function _data_is_set($pointer)
    {
        return isset($this->_data[$pointer]);
    }

    private function _fetch_data($pointer)
    {
        $retMixed = $this->_data[$pointer];
        return $retMixed;
    }

    protected function _set_data($pointer, $value)
    {
        $this->_data[$pointer] = $value;
    }

    protected function _get_wrangler_data_array($wranglerScaffold)
    {
        $retArray = parent::_get_wrangler_data_array($wranglerScaffold);
        if (isset($wranglerScaffold['data_bindings']))
        {
            foreach ($wranglerScaffold['data_bindings'] as $wranglerBinding => $objectBinding)
            {
                $retArray[$wranglerBinding] = $this->get($objectBinding);
            }
        }
        return $retArray;
    }

    private function _set_array($additionalData)
    {
        $failure = false;
        if (is_array($additionalData) && count($additionalData)>0)
        {
            foreach ($additionalData as $identifier => $value)
            {
                $failure = !$this->set($identifier, $value) || $failure;
            }
        }
        else
        {
            $failure = true;
        }
        return !$failure;
    }

    private function _reset_wranglers()
    {
        $this->_wrangledObjects = [];
    }
}