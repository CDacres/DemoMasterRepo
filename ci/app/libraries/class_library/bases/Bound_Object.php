<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Description of MY_Class
 *
 * @author William
 */

abstract class Base__Bound_Object extends Base__Unbound_Object
{
    protected static $_columns = [
        'enabled' => [
            'pointer' => 'enabled',
            'validations' => 'is_boolean',
            'access' => 'protected'
        ]
    ];
    protected static $_tableName;

    static public function column($identifier, $fullLength = true, $tableAlias = null)
    {
        $columnInfo = static::_pointer_from_column($identifier);
        if ($columnInfo === null || $columnInfo['pointer'] === null)
        {
            throw new Exception(get_called_class() . ' - Unidentified column: ' . $identifier);
        }
        $returnString = '';
        if ($tableAlias != null)
        {
            $returnString = $tableAlias . ".";
        }
        elseif ($fullLength)
        {
            $returnString = static::tableName() . ".";
        }
        return $returnString . $columnInfo['pointer'];
    }

    static public function sort_by_token($identifier)
    {
        $pointerInfo = static::_pointer_from_column($identifier);
        if ($pointerInfo === null)
        {
            $pointerInfo = static::_pointer_from_alias($identifier);
            if ($pointerInfo === null)
            {
                throw new Exception(get_called_class() . ' - Unidentified sort request: ' . $identifier);
            }
        }
        return $pointerInfo['pointer'];
    }

    static protected function _pointer_from_column($identifier, $class = null)
    {
        $columnInfo = null;
        if (isset(static::$_columns[$identifier]))
        {
            $columnInfo = static::$_columns[$identifier];
        }
        else
        {
            $class = $class?$class:get_called_class();
            $parent = get_parent_class($class);
            if ($parent && method_exists($parent, '_pointer_from_column'))
            {
                $columnInfo = $parent::_pointer_from_column($identifier, $parent);
            }
        }
        return $columnInfo;
    }

    static public function enabled_column($fullLength = true, $tableAlias = null)
    {
        return static::column('enabled', $fullLength, $tableAlias);
    }

    static public function tableName($alias = null)
    {
        return static::$_tableName . (($alias !== null)?" AS " . $alias:'');
    }

    static public function selectString($tableAlias = null)
    {
        $aggregatedColumns = static::_get_aggregated_columns();
        if (count($aggregatedColumns) > 0)
        {
            $returnString = '';
            $first = true;
            $tableName = (($tableAlias !== null)?$tableAlias:static::tableName());
            foreach ($aggregatedColumns as $columnInfo)
            {
                $columnName = $columnInfo['pointer'];
                if ($columnName !== null)
                {
                    $returnString .= ($first?'':',') . $tableName . "." . $columnName; // THis is intimately linked to Query_Join's unwind_line method.
                    $first = false;
                }
            }
            return $returnString;
        }
        else
        {
            throw new Exception(get_called_class() . ' - Column names not defined');
        }
    }

    static public function selectArray($tableAlias)
    {
        $aggregatedColumns = static::_get_aggregated_columns();
        if (count($aggregatedColumns) > 0)
        {
            $returnArray = [];
            $tableName = (($tableAlias !== null)?$tableAlias:static::tableName());
            foreach ($aggregatedColumns as $columnInfo)
            {
                $columnName = $columnInfo['pointer'];
                if ($columnName !== null)
                {
                    $returnArray[$columnName] = $tableName . "." . $columnName;
                }
            }
            return $returnArray;
        }
        else
        {
            throw new Exception(get_called_class() . ' - Column names not defined');
        }
    }

    public function get_html_data_input($identifier, $className = null, $type = "text", $inputId = null, $readOnlyIfExists = false, $options = [])
    {
        $uniqueStr = (($inputId === null)?$identifier:$inputId);
        return '<input id="' . $uniqueStr . '" name="' . $uniqueStr . '"'
            . ' type="' . $type . '" ' . $this->_get_html_class_string($className) . ''
            . $this->_get_html_object_string() . ''
            . $this->_get_html_id_string() . ''
            . $this->_get_html_identifier_string($identifier) . ''
            . $this->_get_html_options_string($options) . ''
            . $this->_get_html_readonly($identifier, $readOnlyIfExists) . ''
            . $this->_get_html_value_string($identifier) . ' />';
    }

    public function get_html_data_textarea($identifier, $className = null, $inputId = null, $readOnlyIfExists = false, $options = [], $tagsIncluded = true)
    {
        $uniqueStr = (($inputId === null)?$identifier:$inputId);
        return '<textarea id="' . $uniqueStr . '" name="' . $uniqueStr . '"'
            . $this->_get_html_class_string($className) . ''
            . $this->_get_html_object_string() . ''
            . $this->_get_html_id_string() . ''
            . $this->_get_html_identifier_string($identifier) . ''
            . $this->_get_html_options_string($options) . ''
            . $this->_get_html_readonly($identifier, $readOnlyIfExists) . ''
            . '>' . $this->_get_html_value($identifier, $tagsIncluded) . '</textarea>';
    }

    public function get_html_data_text($identifier, $className = null)
    {
        return '<span zc_input_type="text"' . $this->_get_html_class_string($className) . ''
            . $this->_get_html_object_string() . ''
            . $this->_get_html_id_string() . ''
            . $this->_get_html_identifier_string($identifier) . ''
            . $this->_get_html_data_value_string($identifier) . '>'
            . ((!$this->is_null($identifier))?$this->get($identifier):'No Data') . '</span>';
    }

    public function get_html_data_map($className = null, $width = 400, $height = 400, $zoom = 14)
    {
        return '<img ' . $this->_get_html_class_string($className) . ''
            . $this->_get_html_object_string() . ''
            . $this->_get_html_id_string() . ''
            . $this->_get_html_map_details($width, $height, $zoom) . ' />';
    }

    protected function _get_html_class_string($className)
    {
        return (($className !== null)?' class="' . $className . '"':"");
    }

    protected function _get_html_object_string()
    {
        return ' zc_object_type="' . get_called_class() . '"';
    }

    protected function _get_html_id_string()
    {
        $idString = "";
        $id = $this->get("id");
        if ($id !== null)
        {
            $idString = ' zc_object_id="' . $id . '"';
        }
        return $idString;
    }

    protected function _get_html_identifier_string($identifier)
    {
        return ' zc_data_type="' . $identifier . '"';
    }

    protected function _get_html_options_string($optionArr)
    {
        $retStr = '';
        foreach ($optionArr as $key => $value)
        {
            $retStr .= ' ' . $key . '="' . $value . '"';
        }
        return $retStr;
    }

    protected function _get_html_value($identifier, $tagsIncluded = true)
    {
        if ($tagsIncluded)
        {
            return htmlspecialchars($this->get($identifier));
        }
        return htmlspecialchars(strip_tags($this->get($identifier)));
    }

    protected function _get_html_readonly($identifier, $readOnlyIfExists = false)
    {
        $value = $this->get($identifier);
        return (($readOnlyIfExists && ($value !== null))?' readonly':'');
    }

    protected function _get_html_value_string($identifier)
    {
        $valueString = "";
        $value = $this->get($identifier);
        if ($value !== null)
        {
            $valueString = ' value="' . htmlspecialchars($value) . '"';
        }
        return $valueString;
    }

    protected function _get_html_data_value_string($identifier)
    {
        $valueString = "";
        $value = $this->get($identifier);
        if ($value !== null)
        {
            $valueString = ' zc_data_value="' . htmlspecialchars($value) . '"';
        }
        return $valueString;
    }

    protected function _get_html_map_details($width, $height, $zoom)
    {
        if ($this->is_null('lat'))
        {
            $lat = 51.528308;
        }
        else
        {
            $lat = $this->get('lat');
        }
        if ($this->is_null('long'))
        {
            $long = -0.3817765;
        }
        else
        {
            $long = $this->get('long');
        }
        return 'data-lat="' . $lat . '" data-long="' . $long . '" src="' . $this->wrangle('map')->get_url($width, $height, $zoom) . '"';
    }

    public function get_insert_array()
    {
        $aggregatedColumns = $this->_get_aggregated_columns();
        if (count($aggregatedColumns) > 0)
        {
            $returnArray = [];
            foreach ($aggregatedColumns as $identifier=>$columnInfo)
            {
                $columnName = $columnInfo['pointer'];
                if ($columnName !== null)
                {
                    if (!isset($columnInfo['validations']))
                    {
                        throw new Exception(get_called_class() . " - " . $identifier . ' is not validated');
                    }
                    $data = $this->_get_data_from_pointer($columnName);
                    if ($data !== null)
                    {
                        $returnArray[$columnName] = $data;
                    }
                    else
                    {
                        $validations = explode('|',$columnInfo['validations']);
                        if (in_array('required', $validations))
                        {
                            throw new Exception($identifier . ' is a required value');
                        }
                        elseif (in_array('empty_null', $validations))
                        {
                            $returnArray[$columnName] = null;
                        }
                    }
                }
            }
            return $returnArray;
        }
        else
        {
            throw new Exception(get_called_class() . ' - Column names not defined');
        }
    }

    static protected function _get_aggregated_columns($class = null)
    {
        $class = $class?$class:get_called_class();
        $parent = get_parent_class($class);
        if ($parent && method_exists($parent, '_get_aggregated_columns'))
        {
            return array_merge($parent::_get_aggregated_columns($parent), static::$_columns);
        }
        else
        {
            return static::$_columns;
        }
    }

    public function exists_in_db()
    {
        return $this->_has_essentials();
    }

    public function is_enabled()
    {
        return $this->_pointer_is_true($this::enabled_column(false));
    }

    public function get_as_array($data = [])
    {
        foreach ($this->_get_aggregated_columns() as $column => $columnInfo)
        {
            $pointer = $columnInfo['pointer'];
            $visible = (!isset($columnInfo['access']) || (!(strpos($columnInfo['access'], 'private') !== false)));
            if ($visible && $this->_data_is_set($pointer))
            {
                $value = $this->_get_data_from_pointer($pointer);
                $data[$column] = $value;
            }
        }
        return parent::get_as_array($data);
    }

    public function set_enabled($bool = true)
    {
        return $this->set('enabled', $bool);
    }

    static protected function _get_pointer($identifier)
    {
        $pointer = static::_pointer_from_column($identifier);
        if ($pointer === null)
        {
            $pointer = parent::_get_pointer($identifier);
        }
        return $pointer;
    }

    private function _has_enabled_column()
    {
        return $this->_data_is_set($this::enabled_column(false));
    }

    protected function _has_essentials()
    {
        return $this->has_key() && $this->_has_enabled_column();
    }

    abstract public function has_key();
    abstract public function get_key_array();
}