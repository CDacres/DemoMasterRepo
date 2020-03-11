<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Base__Expressable extends Base__Null
{
    protected static $_wranglers = [];
    protected $_wrangledObjects = [];
    protected static $_modelName = null;

    function __construct()
    {
        parent::__construct();
        $this->_post_construction();
    }

    public function wrangle($identifier)
    {
        $wrangler = $this->_get_wrangler($identifier);
        if ($wrangler === null)
        {
            throw new Exception(get_called_class() . ' - Can not wrangle ' . $identifier);
        }
        else
        {
            return $wrangler;
        }
    }

    public function get_as_array($data = [])
    {
        $data = $this->_add_all_wrangler_data($data);
        return parent::get_as_array($data);
    }

    public function is_null_object()
    {
        return false;
    }

    static public function modelName()
    {
        $modelName = static::$_modelName;
        if ($modelName === null)
        {
            throw new Exception(get_called_class() . ' has no associated model.');
        }
        return $modelName;
    }

    protected function _get_wrangler_data_array($wranglerScaffold)
    {
        $retArray = [];
        if (isset($wranglerScaffold['method_bindings']))
        {
            foreach ($wranglerScaffold['method_bindings'] as $wranglerBinding => $methodUsage)
            {
                $parentMethod = $methodUsage['method'];
                $params = ((isset($methodUsage['params']))?$methodUsage['params']:null);
                $retArray[$wranglerBinding] = $this->$parentMethod($params);
            }
        }
        if (isset($wranglerScaffold['hard_bindings']))
        {
            foreach ($wranglerScaffold['hard_bindings'] as $wranglerBinding => $constant)
            {
                $retArray[$wranglerBinding] = $constant;
            }
        }
        return $retArray;
    }

    static protected function _get_wrangler_scaffold($identifier = null, $class = null)
    {
        $scaffold = null;
        if ($identifier !== null)
        {
            if (isset(static::$_wranglers[$identifier]))
            {
                $scaffold = static::$_wranglers[$identifier];
            }
            else
            {
                $class = $class?$class:get_called_class();
                $parent = get_parent_class($class);
                if ($parent && method_exists($parent, '_get_wrangler_scaffold'))
                {
                    $scaffold = $parent::_get_wrangler_scaffold($identifier, $parent);
                }
            }
        }
        return $scaffold;
    }

    static protected function _get_aggregated_wranglers($class = null)
    {
        $class = $class?$class:get_called_class();
        $parent = get_parent_class($class);
        if ($parent && method_exists($parent, '_get_aggregated_wranglers'))
        {
            return array_merge($parent::_get_aggregated_wranglers($parent), static::$_wranglers);
        }
        else
        {
            return static::$_wranglers;
        }
    }

    private function _add_all_wrangler_data($dataArray)
    {
        foreach ($this->_get_aggregated_wranglers() as $identifier => $data)
        {
            $dataArray = $this->_add_single_wrangler_data($identifier, $dataArray);
        }
        return $dataArray;
    }

    private function _add_single_wrangler_data($identifier, $dataArray)
    {
        foreach ($this->_get_wrangler($identifier)->yield_wrangled_data() as $key => $value)
        {
//            if (isset($dataArray[$key]))
//            {
//                throw new Exception('Wrangled data name conflict in ' . get_called_class());
//            }
//            elseif ($key !== null && $value !== null)
//            {
                $dataArray[$key] = $value;
//            }
        }
        return $dataArray;
    }

    private function _get_wrangler($identifier)
    {
        $retObj = null;
        if (isset($this->_wrangledObjects[$identifier]))
        {
            $retObj = $this->_wrangledObjects[$identifier];
        }
        else
        {
            $wranglerScaffold = $this::_get_wrangler_scaffold($identifier);
            if ($wranglerScaffold !== null)
            {
                $wranglerObject = $wranglerScaffold['object'];
                $wranglerData = $this->_get_wrangler_data_array($wranglerScaffold);
                $retObj = new $wranglerObject($identifier, $wranglerData);
                $this->_wrangledObjects[$identifier] = $retObj;
            }
        }
        return $retObj;
    }

    protected function _post_construction()
    {

    }
}