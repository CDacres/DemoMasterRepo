<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model_Base__View extends Model_Base__Unbound
{
    const COLLECTIONKEYVALUESEPARATOR = "_|_";
    const COLLECTIONIDENTIFIERSEPARATOR = "__|__";
    const COLLECTIONITEMSEPARATOR = "___|___";

    private $_baseClass = '';
    private $_sub_collection_extension = 'Collection';
    private $_overrideClass = null;
    private $_enforce_base_enabled = true;
    private $_sub_collections = [];
    private $_super_collections = [];

    function __construct()
    {
        if ($this->_baseClass == '')
        {
            throw new Exception(get_called_class() . ' - Models must have an associated Base Class');
        }
        parent::__construct();
    }

    protected function _set_base_class($baseClass)
    {
        $this->_baseClass = $baseClass;
    }

    protected function _get_base_class()
    {
        return $this->_baseClass;
    }

    protected function _get_base_collection()
    {
        return $this->_baseClass . "___" . $this->_sub_collection_extension;
    }

    protected function _get_sub_collection_connector()
    {
        return "_" . $this->_sub_collection_extension . "_";
    }

    protected function _class_identifier()
    {
        $baseClass = $this->_baseClass;
        return $baseClass::id_column(false);
    }

    protected function _set_override_class($overrideClass)
    {
        $this->_overrideClass = $overrideClass;
    }

    protected function _allow_disabled_override($hard = false)
    {
        $this->_enforce_base_enabled = false;
        if ($hard)
        {
            $this->db->allow_join_disabled();
        }
    }

    protected function _query_add_select($tableName, $selectArray = false)
    {
        if (is_array($selectArray))
        {
            if (count($selectArray) === 0)
            {
                $this->db->select($tableName . '.*');
            }
            else
            {
                $selectString = '';
                foreach ($selectArray as $selectString)
                {
                    $this->db->select($tableName . "." . $selectString);
                }
            }
        }
    }

    protected function _select_sub_collection($class, $collectionAlias, $tableAlias = null, $includeBackticks = true)
    {
        $this->_handle_sub_collection($collectionAlias);
        $this->db->select_group_concat($collectionAlias, $class::selectArray($tableAlias));
    }

    protected function _select_sub_collection_alias($column, $collectionAlias, $dataAlias, $includeBackticks = true)
    {
        $this->_handle_sub_collection($collectionAlias);
        $this->db->select_group_concat($collectionAlias, $dataAlias, $column);
    }

    protected function _set_sub_collection_ordering($column, $collectionAlias, $direction)
    {
        $this->_handle_sub_collection($collectionAlias);
        $this->db->select_group_concat_ordering($collectionAlias, $column, $direction);
    }

    protected function _handle_sub_collection($collectionAlias)
    {
        if (!isset($this->_sub_collections[$collectionAlias]))
        {
            $baseClass = $this->_baseClass;
            $collectionType = $baseClass::get_object_type($collectionAlias);
            $collectionObjectType = $collectionType::object_type();
            $collectionObjectIdentifier = $collectionObjectType::id_column(false);
            $this->_sub_collections[$collectionAlias] = $collectionObjectIdentifier;
            $this->db->group_by($baseClass::id_column());
        }
    }

    protected function _wrap_in_collection($labelAlias = null)
    {
        $baseClass = $this->_baseClass;
        if ($labelAlias === null)
        {
            $labelAlias = $baseClass::id_column(false);
        }
        $this->_super_collections[] = $labelAlias;
    }

    private function _query_unwind($rawArray)
    {
        if (count($this->_sub_collections) > 0 || count($this->_super_collections) > 0)
        {
            $returnArray = $this->_unwind_results($rawArray);
        }
        else
        {
            $returnArray = $rawArray;
        }
        return $returnArray;
    }

    private function _reset_collections()
    {
        $this->_sub_collections = [];
        $this->_super_collections = [];
    }

    private function _unwind_results($rawArray)
    {
        $returnArray = [];
        foreach ($rawArray as $resultLine)
        {
            $returnArray = $this->_unwind_super_collections($resultLine, $returnArray, $this->_super_collections);
        }
        return $returnArray;
    }

    private function _unwind_super_collections($line, $returnArray = [], $superCollections = [])
    {
        if (count($superCollections) > 0)
        {
            $index = array_pop($superCollections);
            if (!isset($returnArray[$line[$index]]))
            {
                $returnArray[$line[$index]] = [];
            }
            $returnArray[$line[$index]] = $this->_unwind_super_collections($line, $returnArray[$line[$index]], $superCollections);
        }
        else
        {
            $returnArray[$line[$this->_class_identifier()]] = $this->_unwind_line($line);
        }
        return $returnArray;
    }

    private function _unwind_line($line)
    {
        $parsedLine = [];
        foreach ($line as $key => $value)
        {
            if (isset($this->_sub_collections[$key]) && $value !== null && $value !== '')
            {
                $value = $this->_unwind_sub_collection($value, $this->_sub_collections[$key]);
            }
            $parsedLine[$key] = $value;
        }
        return $parsedLine;
    }

    private function _unwind_sub_collection($subCollectionString, $idIdentifier)
    {
        $returnArray = [];
        $subCollectionArray = explode(static::COLLECTIONITEMSEPARATOR, $subCollectionString);
        foreach ($subCollectionArray as $itemString)
        {
            $valuesArray = [];
            $itemValuesArray = explode(static::COLLECTIONIDENTIFIERSEPARATOR, $itemString);
            foreach ($itemValuesArray as $valuesString)
            {
                $keyValuePairArray = explode(static::COLLECTIONKEYVALUESEPARATOR, $valuesString);
                if (isset($keyValuePairArray[1]))
                {
                    $valuesArray[$keyValuePairArray[0]] = $keyValuePairArray[1];
                }
            }
            if (isset($valuesArray[$idIdentifier]))
            {
                $returnArray[$valuesArray[$idIdentifier]] = $valuesArray;
            }
        }
        return $returnArray;
    }

    protected function _query_init()
    {
        if ($this->_overrideClass !== null)
        {
            $baseClass = $this->_overrideClass;
            $this->_overrideClass = null;
        }
        else
        {
            $baseClass = $this->_baseClass;
        }
        $this->db->from($baseClass::tableName());
        $this->db->select($baseClass::selectString());
        if ($this->_enforce_base_enabled)
        {
            $this->db->where($baseClass::enabled_column(), 1);
        }
    }

    protected function _query_init_and_run($justOne = true)
    {
        $this->_query_init();
        return $this->_query_run($justOne);
    }

    protected function _query_run($justOne = true)
    {
        $returnArray = [];
        $result = $this->db->get();
        if ($result->num_rows() > 0)
        {
            $rawArray = $result->result_array();
            $resultArray = $this->_query_unwind($rawArray);
            if ($justOne)
            {
                $returnArray = reset($resultArray);
            }
            else
            {
                $returnArray = $resultArray;
            }
        }
        $this->_reset_collections();
        return $returnArray;
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::id_column(), $id);
        $object = new $baseClass($this->_query_init_and_run(true));
        if ($userRequested && !$this->_user_can_select($object))
        {
            $object = new Base__Null();
        }
        return $object;
    }

    public function get_base_object_by_constraints($constraintArray = [], $userRequested = false)
    {
        $collection = $this->get_base_object_collection_by_constraints($constraintArray, $userRequested);
        $count = $collection->get_count();
        if ($count > 1)
        {
            throw new Exception('Expecting a single object - received multiple');
        }
        if ($count === 1)
        {
            $retObj = $collection->get_first();
        }
        else
        {
            $retObj = new Base__Null();
        }
        return $retObj;
    }

    public function get_base_object_collection_by_constraints($constraintArray = [], $userRequested = false)
    {
        $baseClass = $this->_get_base_class();
        foreach ($constraintArray as $identifier => $constraint)
        {
            $this->db->where($baseClass::column($identifier), $constraint);
        }
        $dataArray = $this->_query_init_and_run(false);
        $collectionClass = $this->_get_base_collection();
        $rawCollection = new $collectionClass($dataArray);
        $retCollection = null;
        if ($userRequested)
        {
            $retCollection = new $collectionClass();
            foreach ($rawCollection->object() as $object)
            {
                if ($this->_user_can_select($object))
                {
                    $retCollection->add_object($object);
                }
            }
        }
        else
        {
            $retCollection = $rawCollection;
        }
        return $retCollection;
    }

    public function insert_update($object, $userRequested = false)
    {
        return new Base__Null();
    }

    protected function _user_can_select($object)
    {
        return false;
    }
}