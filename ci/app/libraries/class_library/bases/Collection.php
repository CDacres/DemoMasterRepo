<?php

abstract class Base__Collection extends Base__Expressable
{
    private $_identifier = null;
    private $_label = null;
    private $_failed_objects = [];

    protected static $_wranglers = [
        'label' => [
            'object' => 'Wrangler__Dynamic',
            'method_bindings' => ['data' => ['method' => 'label']]
        ],
        'identifier' => [
            'object' => 'Wrangler__Dynamic',
            'method_bindings' => ['data' => ['method' => 'identifier']]
        ]
    ];
    protected $_objects = [];
    protected $_objectType;
    protected static $_staticObjectType = null;

    function __construct($objectsDataArray = [])
    {
        parent::__construct();
        $this->_objectType = $this->object_type();
        $this->add_objects_array_from_data($objectsDataArray);
    }

    static public function object_type()
    {
        if (static::$_staticObjectType === null)
        {
            throw new Exception(static::class . ' has no Object Type associated with it.');
        }
        return static::$_staticObjectType;
    }

    static public function handles($objectType)
    {
        $childType = static::$_staticObjectType;
        if ($childType === $objectType)
        {
            return true;
        }
        elseif (method_exists($childType, 'handles'))
        {
            return $childType::handles($objectType);
        }
        else
        {
            return false;
        }
    }

    public function order_by($identifier, $direction = 'asc')
    {
        if (is_a($this->object_type(), Base__Collection::class))
        {
            throw new Exception("Collections can not be ordered.");
        }
        $sortArray = [];
        foreach ($this->object() as $object)
        {
            $sortArray[$object->get($identifier)][] = $object;
        }
        if ($direction !== 'asc')
        {
            krsort($sortArray);
        }
        else
        {
            ksort($sortArray);
        }
        $this->clear_objects();
        foreach ($sortArray as $subArray)
        {
            foreach ($subArray as $sortedObject)
            {
                $this->add_object($sortedObject);
            }
        }
    }

    public function clear_objects()
    {
        $this->_objects = [];
    }

    public function add_objects_array_from_data($objectsDataArray)
    {
        if (is_array($objectsDataArray) && count($objectsDataArray) > 0)
        {
            foreach ($objectsDataArray as $id => $objectDataArray)
            {
                $this->add_object_from_data($objectDataArray, $id);
            }
        }
    }

    public function set($identifier, $value, $serverSideRequest = true)
    {
        foreach ($this->object() as $object)
        {
            $object->set($identifier, $value, $serverSideRequest);
        }
    }

    public function set_disabled()
    {
        foreach ($this->object() as $object)
        {
            $object->set_enabled(false);
        }
    }

    public function add_failed_object($object)
    {
        $this->_failed_objects[] = $object;
    }

    static public function tableName()
    {
        $childType = static::$_staticObjectType;
        return $childType::tableName();
    }

    public function get_insert_array()
    {
        $returnArray = [];
        foreach ($this->object() as $object)
        {
            if (is_a($object, Base__Bound_Object::class))
            {
                $returnArray[] = $object->get_insert_array();
            }
            elseif (is_a($object, Base__Collection::class))
            {
                $returnArray = array_merge($returnArray,$object->get_insert_array());
            }
        }
        return $returnArray;
    }

    public function set_identifier($id)
    {
        $this->_identifier = $id;
    }

    public function identifier()
    {
        return $this->_identifier;
    }

    public function add_object_from_data($objectDataArray, $id = null)
    {
        $collection = new $this->_objectType($objectDataArray);
        $this->add_object($collection, $id);
    }

    public function add_object($object, $id = null)
    {
        if ($object->identifier() !== null)
        {
            $this->_objects[$object->identifier()] = $object;
        }
        elseif ($id !== null && $id !== '')
        {
            if (method_exists($object, 'set_identifier'))
            {
                $object->set_identifier($id);
            }
            $this->_objects[$id] = $object;
        }
        else
        {
            $this->_objects[] = $object;
        }
    }

    public function delete_object($id)
    {
        unset($this->_objects[$id]);
    }

    public function populate_from_bindings($populationArray = [])
    {
        if (is_array($populationArray) && !empty($populationArray))
        {
            foreach ($populationArray as $data)
            {
                $object = new $this->_objectType();
                if (is_array($data))
                {
                    $object->populate_from_bindings($data);
                    $this->add_object($object);
                }
            }
        }
    }

    public function exist($checkEnabled = false)
    {
        $returnValue = false;
        if ($checkEnabled)
        {
            $count = $this->get_count(true, true);
            if ($count > 0)
            {
                $returnValue = true;
            }
        }
        elseif (count($this->_objects) > 0)
        {
            $returnValue = true;
        }
        return $returnValue;
    }

    public function is_empty()
    {
        return !($this->get_count() === 0);
    }

    public function exists_in_db()
    {
        return $this->exist();
    }

    public function get_count($checkEnabled = true, $recursive = true)
    {
        $count = 0;
        foreach ($this->object() as $object)
        {
            if ($recursive && method_exists($object, 'get_count'))
            {
                $count += $object->get_count($checkEnabled, $recursive);
            }
            elseif ($checkEnabled && method_exists($object, 'is_enabled'))
            {
                if ($object->is_enabled())
                {
                    ++$count;
                }
            }
            else
            {
                ++$count;
            }
        }
        return $count;
    }

    public function get_total_count($checkEnabled = true)
    {
        return $this->get_count($checkEnabled, true);
    }

    public function get_ids()
    {
        $returnArray = [];
        foreach ($this->_objects as $id => $object)
        {
            $returnArray[] = $id;
        }
        return $returnArray;
    }

    public function object($onlyEnabled = false)
    {
        foreach ($this->_objects as $key => $object)
        {
            if (!$onlyEnabled || !method_exists($object, 'is_enabled') || $object->is_enabled())
            {
                yield $key => $object;
            }
        }
    }

    public function get_object_by_id($id)
    {
        if (isset($this->_objects[$id]))
        {
            $retObj = $this->_objects[$id];
        }
        else
        {
            $retObj = new Base__Null();
        }
        return $retObj;
    }

    public function label()
    {
        $retVal = null;
        if ($this->_label !== null)
        {
            $object = $this->get_first();
            if (!$object->is_null_object())
            {
                $retVal = $object->get($this->_label);
            }
        }
        return $retVal;
    }

    public function get_first($key = false, $recursive = true)
    {
        if (count($this->_objects) > 0)
        {
            $retObj = reset($this->_objects);
            if ($key)
            {
                $retObj = key($this->_objects);
            }
            elseif ($recursive && is_a($retObj, Base__Collection::class))
            {
                $retObj = $retObj->get_first($key, $recursive);
            }
        }
        else
        {
            $retObj = new Base__Null();
        }
        return $retObj;
    }

    public function get_last($key = false, $recursive = true)
    {
        if (count($this->_objects) > 0)
        {
            $retObj = end($this->_objects);
            if ($key)
            {
                $retObj = key($this->_objects);
            }
            elseif ($recursive && is_a($retObj, Base__Collection::class))
            {
                $retObj = $retObj->get_last($key, $recursive);
            }
        }
        else
        {
            $retObj = new Base__Null();
        }
        return $retObj;
    }

    public function get_as_array($data = [])
    {
        $data['objects'] = [];
        foreach ($this->object() as $object)
        {
            $data['objects'][] = $object->get_as_array();
        }
        return $retArray = parent::get_as_array($data);
    }

    protected function _set_label($label)
    {
        $this->_label = $label;
    }
}