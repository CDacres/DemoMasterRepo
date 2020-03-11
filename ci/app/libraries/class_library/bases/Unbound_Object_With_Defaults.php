<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Base__Unbound_Object_With_Defaults extends Base__Unbound_Object
{
    protected $_defaults = [];

    public function get($identifier, $dbSafe = false)
    {
        $value = parent::get($identifier, $dbSafe);
        if ($value === null || $value === '')
        {
            $value = $this->_get_default($identifier);
        }
        return $value;
    }

    private function _get_default($identifier)
    {
        $retVal = null;
        if (isset($this->_defaults[$identifier]))
        {
            $retVal = $this->_defaults[$identifier];
        }
        else
        {
            //throw new Exception(get_called_class() . " has no default for " . $identifier);
        }
        return $retVal;
    }
}