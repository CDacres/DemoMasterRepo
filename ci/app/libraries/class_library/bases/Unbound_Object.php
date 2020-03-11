<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Base__Unbound_Object extends Base__Black_Box_Object
{
    protected static $_aliases = [];
    protected static $_objects = [];
    protected $_validator = null;

    function __construct($populationArray = [])
    {
        $this->_validator = new Helper__Validator();
        parent::__construct($populationArray);
    }

    static public function get_object_type($objectAlias)
    {
        $aggregatedObjects = static::_get_aggregated_objects();
        if (isset($aggregatedObjects[$objectAlias]))
        {
            return $aggregatedObjects[$objectAlias];
        }
        else
        {
            throw new Exception(get_called_class() . ' has no ' . $objectAlias . ' object.');
        }
    }

    static public function get_validation_string($identifier)
    {
        $pointerInfo = static::_get_pointer($identifier);
        if (!isset($pointerInfo['validations']))
        {
            throw new Exception("No validation string for " . get_called_class() . " - " . $identifier);
        }
        else
        {
            return $pointerInfo['validations'];
        }
    }

    public function get($identifier)
    {
        $pointer = $this->_get_pointer($identifier);
        $value = $this->_get_data_from_pointer($pointer['pointer']);
        return $value;
    }

    public function set($identifier, $value = null, $serverSideRequest = true)
    {
        $retVal = true;
        if ($value === null && is_array($identifier))
        {
            foreach ($identifier as $key=>$value)
            {
                $retVal = $retVal && $this->_set_identifier_to_value($key, $value, $serverSideRequest);
            }
        }
        else
        {
            $retVal = $this->_set_identifier_to_value($identifier, $value, $serverSideRequest);
        }
        return $retVal;
    }

    private function _handle_pre_triggers($pointerInfo, $originalDatum)
    {
        if (isset($pointerInfo['pre_triggers']))
        {
            if ($originalDatum === null && isset($pointerInfo['pre_triggers']['insert']))
            {
                $methodName = $pointerInfo['pre_triggers']['insert'];
                $this->$methodName();
            }
            elseif ($originalDatum !== null && isset($pointerInfo['pre_triggers']['update']))
            {
                $methodName = $pointerInfo['pre_triggers']['update'];
                $this->$methodName();
            }
        }
    }

    private function _handle_post_triggers($pointerInfo, $originalDatum)
    {
        if (isset($pointerInfo['triggers']))
        {
            if ($originalDatum === null && isset($pointerInfo['triggers']['insert']))
            {
                $methodName = $pointerInfo['triggers']['insert'];
                $this->$methodName();
            }
            elseif ($originalDatum !== null && isset($pointerInfo['triggers']['update']))
            {
                $methodName = $pointerInfo['triggers']['update'];
                $this->$methodName();
            }
        }
    }

    private function _handle_setting($pointerInfo, $identifier, $value)
    {
        $retVal = false;
        if (is_object($value))
        {
            $retVal = $this->_set($pointerInfo['pointer'], $value);
        }
        elseif (isset($pointerInfo['objectType']))
        {
            $objectType = $pointerInfo['objectType'];
            $object = new $objectType();
            $object->populate_from_bindings($value);
            $retVal = $this->_set($pointerInfo['pointer'], $object);
        }
        elseif (isset($pointerInfo['validations']))
        {
            $cleanData = $this->_validate_datum($value, $identifier, $pointerInfo['validations']);
            $retVal = $this->_set($pointerInfo['pointer'], $cleanData);
        }
        elseif (defined('ENVIRONMENT') && ENVIRONMENT=='development')
        {
            //throw new Exception("Class: " . get_called_class() . " - " . $identifier);
        }
        return $retVal;
    }

    private function _set_identifier_to_value($identifier, $value, $serverSideRequest)
    {
        $retVal = false;
        $pointerInfo = $this->_get_pointer($identifier);
        $originalDatum = $this->_get_data_from_pointer($pointerInfo['pointer']);
        if ($serverSideRequest || $this->_can_set_given_access($pointerInfo, $originalDatum))
        {
            $this->_handle_pre_triggers($pointerInfo, $originalDatum);
            $retVal = $this->_handle_setting($pointerInfo, $identifier, $value);
            if ($retVal)
            {
                $this->_handle_post_triggers($pointerInfo, $originalDatum);
            }
        }
        else
        {
            throw new Exception("We are sorry, but an error occurred. Please try again.");
        }
        return $retVal;
    }

    private function _can_set_given_access($pointerInfo, $originalDatum)
    {
        $retVal = true;
        if (isset($pointerInfo['access']))
        {
            $accessArray = explode('|', $pointerInfo['access']);
            if (in_array('protected', $accessArray))
            {
                $retVal = false;
            }
            elseif ($originalDatum === null && in_array('insert_protected', $accessArray))
            {
                $retVal = false;
            }
            elseif ($originalDatum !== null && in_array('update_protected', $accessArray))
            {
                $retVal = false;
            }
        }
        return $retVal;
    }

    protected function _get_set($identifier, $newValue, $setNullIfNull = false)
    {
        if ($newValue === null && !$setNullIfNull)
        {
            return $this->get($identifier);
        }
        else
        {
            return $this->set($identifier, $newValue);
        }
    }

    static protected function _get_aggregated_objects($class = null)
    {
        $class = $class?$class:get_called_class();
        $parent = get_parent_class($class);
        if ($parent && method_exists($parent, '_get_aggregated_objects'))
        {
            return array_merge($parent::_get_aggregated_objects($parent), static::$_objects);
        }
        else
        {
            return static::$_objects;
        }
    }

    protected function _validate_datum($value, $identifier, $validationsString = '')
    {
        $retVal = $this->_validator->validate($value, $validationsString);
        if ($this->_validator->error_occurred())
        {
            throw new Exception(get_called_class() . " " . $identifier . " " . $this->_validator->get_error_string());
        }
        return $retVal;
    }

    static private function _get_object_pointer($identifier)
    {
        $pointerInfo = null;
        $objectArray = static::_get_aggregated_objects();
        if (isset($objectArray[$identifier]))
        {
            $pointerInfo['pointer'] = $identifier;
            $pointerInfo['objectType'] = $objectArray[$identifier];
        }
        return $pointerInfo;
    }

    protected function _post_construction()
    {
        parent::_post_construction();
        foreach ($this->_get_aggregated_objects() as $objectAlias=>$objectType)
        {
            $objectData = $this->get($objectAlias);
            if (!(is_array($objectData) && count($objectData) > 0))
            {
                $objectData = [];
            }
            $objectObject = new $objectType($objectData);
            $this->set($objectAlias,$objectObject);
        }
    }

    static public function alias($identifier)
    {
        $aliasInfo = static::_pointer_from_alias($identifier);
        if ($aliasInfo === null || $aliasInfo['pointer'] === null)
        {
            throw new Exception(get_called_class() . ' - Unidentified alias: ' . $identifier);
        }
        return $aliasInfo['pointer'];
    }

    public function get_as_array($data = [])
    {
        foreach ($this->_get_aggregated_aliases() as $alias => $aliasInfo)
        {
            $pointer = $aliasInfo['pointer'];
            $visible = (!isset($aliasInfo['access']) || (!(strpos($aliasInfo['access'], 'private') !== false)));
            if ($visible && $this->_data_is_set($pointer))
            {
                $value = $this->_get_data_from_pointer($pointer);
                $data[$alias] = $value;
            }
        }
        foreach ($this->_get_aggregated_objects() as $pointer => $objectType)
        {
            if ($this->_data_is_set($pointer))
            {
                $object = $this->_get_data_from_pointer($pointer);
                if ($object->exists_in_db())
                {
                    $data[$pointer] = $object->get_as_array();
                }
            }
        }
        return parent::get_as_array($data);
    }

    static protected function _get_aggregated_aliases($class = null)
    {
        $class = $class?$class:get_called_class();
        $parent = get_parent_class($class);
        if ($parent && method_exists($parent, '_get_aggregated_aliases'))
        {
            return array_merge($parent::_get_aggregated_aliases($parent), static::$_aliases);
        }
        else
        {
            return static::$_aliases;
        }
    }

    static protected function _pointer_from_alias($identifier, $class = null)
    {
        $pointerInfo = null;
        if (isset(static::$_aliases[$identifier]))
        {
            $pointerInfo = static::$_aliases[$identifier];
        }
        else
        {
            $class = $class?$class:get_called_class();
            $parent = get_parent_class($class);
            if ($parent && method_exists($parent, '_pointer_from_alias'))
            {
                $pointerInfo = $parent::_pointer_from_alias($identifier, $parent);
            }
        }
        return $pointerInfo;
    }

    static protected function _get_pointer($identifier)
    {
        $pointerInfo = static::_pointer_from_alias($identifier);
        if ($pointerInfo === null)
        {
            $pointerInfo = static::_get_object_pointer($identifier);
        }
        return $pointerInfo;
    }
}