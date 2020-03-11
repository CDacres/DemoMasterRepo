<?php

class MY_DB_mysql_driver extends CI_DB_mysql_driver
{
    public $ar_count_rows = false;
    public $ar_group_concat = [];
    public $ar_group_concat_ordering = [];
    private $_has_relevant_row_count = false;
    public $enforce_join_enabled = true;

    function __construct($params)
    {
        parent::__construct($params);
        log_message('debug', 'Extended DB driver class instantiated!');
    }

    public function get_unbuffered_get()
    {
        $sql = $this->_compile_select();
        $result = $this->get_unbuffered_query($sql);
        $this->_reset_select();
        return $result;
    }

    public function get_unbuffered_query($query)
    {
        return mysql_unbuffered_query($query);
    }

    public function advanced_join($leftClass, $rightClass, $leftColumn = null, $rightColumn = null, $joinType = 'LEFT', $leftAlias = null, $rightAlias = null, $enforceEnabled = null)
    {
        if ($leftColumn === null || $rightColumn === null)
        {
            $conditionArray = [];
        }
        else
        {
            $conditionArray = [$leftColumn => $rightColumn];
        }
        $this->advanced_join_on_multiple($leftClass, $rightClass, $conditionArray, $joinType, $leftAlias, $rightAlias, $enforceEnabled);
    }

    public function advanced_join_on_multiple($leftClass, $rightClass, $conditionArray = [], $joinType = 'LEFT', $leftAlias = null, $rightAlias = null, $enforceEnabled = null)
    {
        $rightTableName = $rightClass::tableName();
        if ($rightAlias != null)
        {
            $rightTableName .= " as " . $rightAlias;
        }
        $joinCondition = $this->_get_join_condition_string($leftClass, $rightClass, $conditionArray, $leftAlias, $rightAlias);
        $this->join($rightTableName, $joinCondition, $joinType);
        if ($enforceEnabled === null)
        {
            $enforceEnabled = $this->enforce_join_enabled;
        }
        if ($enforceEnabled)
        {
            $this->_enforce_enabled($rightClass, $rightAlias);
        }
    }

    public function nullable_where($columnString, $condition)
    {
        $this->start_group_where($columnString, $condition);
        $this->or_where($columnString);
        $this->close_group_where();
    }

    public function select_alias($column, $alias, $includeBackticks = true)
    {
        $this->select($column . " AS " . $alias, $includeBackticks);
    }

    public function select_group_concat($collectionAlias, $dataAlias, $column = null)
    {
        if (is_array($dataAlias))
        {
            foreach ($dataAlias as $identifier => $column)
            {
                $this->select_group_concat($collectionAlias, $identifier, $column);
            }
        }
        else
        {
            if (!isset($this->ar_group_concat[$collectionAlias]))
            {
                $this->ar_group_concat[$collectionAlias] = [];
            }
            $this->ar_group_concat[$collectionAlias][$dataAlias] = $column;
        }
    }

    public function select_group_concat_ordering($collectionAlias, $column, $direction)
    {
        if (!isset($this->ar_group_concat_ordering[$collectionAlias]))
        {
            $this->ar_group_concat_ordering[$collectionAlias] = [];
        }
        $this->ar_group_concat_ordering[$collectionAlias][$column] = $direction;
    }

    public function allow_join_disabled()
    {
        $this->enforce_join_enabled = false;
    }

    public function disallow_join_disabled()
    {
        $this->enforce_join_enabled = true;
    }

    private function _enforce_enabled($rightClass, $rightAlias = null)
    {
        $this->nullable_where($rightClass::enabled_column(true, $rightAlias), 1);
    }

    private function _get_join_condition_string($leftClass, $rightClass, $conditionArray = [], $leftAlias = null, $rightAlias = null)
    {
        if (count($conditionArray) > 0)
        {
            $first = true;
            foreach ($conditionArray as $leftColumn => $rightColumn)
            {
                if ($leftAlias !== null)
                {
                    $joinConditionLeftSide = $leftAlias . "." . $leftColumn;
                }
                else
                {
                    $joinConditionLeftSide = $leftClass::tableName() . "." . $leftColumn;
                }
                if ($rightAlias !== null)
                {
                    $joinConditionRightSide = $rightAlias . "." . $rightColumn;
                }
                else
                {
                    $joinConditionRightSide = $rightClass::tableName() . "." . $rightColumn;
                }
                $joinCondition = ($first?'':" AND ") . $joinConditionLeftSide . "=" . $joinConditionRightSide;
                $first = false;
            }
        }
        else
        {
            $joinCondition = true;
        }
        return $joinCondition;
    }

    public function get_row_count()
    {
        if (!$this->_has_relevant_row_count)
        {
            throw new Exception("The previous query did not request a row count.");
        }
        return $this->query('SELECT FOUND_ROWS() AS total_rows')->row()->total_rows;
    }

    public function order_from_array($key, $whereArr, $direction)
    {
        $orderStr = '';
        $orderendStr = '';
        for ($o = 0; $o < count($whereArr); ++$o)
        {
            $orderStr .= "(CASE WHEN " . $key . "=" . $whereArr[$o] . " THEN " . $o . " ELSE ";
            $orderendStr .= " END)";
        }
        $orderStr .= "0" . $orderendStr . " " . $direction;
        $this->order_by($orderStr);
    }

 /**
     * This function will allow you to do complex group where clauses in to c and (a AND b) or ( d and e)
     * This function is needed as else the where clause will append an automatic AND in front of each where Thus if you wanted to do something
     * like a AND ((b AND c) OR (d AND e)) you won't be able to as the where would insert it as a AND (AND (b...)) which is incorrect.
     * Usage: start_group_where(key,value)->where(key,value)->close_group_where() or complex queries like
     *        open_bracket()->start_group_where(key,value)->where(key,value)->close_group_where()
     *        ->start_group_where(key,value,'','OR')->close_group_where()->close_bracket() would produce AND ((a AND b) OR (d))
     * @param $key mixed the table columns prefix.columnname
     * @param $value mixed the value of the key
     * @param $escape string any escape as per CI
     * @param $type the TYPE of query. By default it is set to 'AND'
     * @return db object.
     */
    function start_group_where($key, $value = null, $escape = true, $type = "AND")
    {
        $this->open_where_bracket($type);
        return parent::_where($key, $value, '', $escape);
    }

    /**
     * Strictly used to have a consistent close function as the start_group_where. This essentially callse the close_bracket() function.
     */
    function close_group_where()
    {
        return $this->close_where_bracket();
    }

    /**
     * Allows to place a simple ( in a query and prepend it with the $type if needed.
     * @param $type string add a ( to a query and prepend it with type. Default is $type.
     * @param $return db object.
     */
    function open_where_bracket($type = "AND")
    {
        if (count($this->ar_where) > 0)
        {
            $this->ar_where[] = $type . " ";
        }
        $this->ar_where[] = "(";
        return $this;
    }

    /**
     * Allows to place a simple ) to a query.
     */
    function close_where_bracket()
    {
        $this->ar_where[] = ")";
        return $this;
    }

    /**
     * Identically the same again for 'having'
     * @param $key mixed the table columns prefix.columnname
     * @param $value mixed the value of the key
     * @param $escape string any escape as per CI
     * @param $type the TYPE of query. By default it is set to 'AND'
     * @return db object.
     */
    function start_group_having($key,$value = null, $escape = true, $type = "AND")
    {
        $this->open_having_bracket($type);
        return parent::_having($key, $value, '', $escape);
    }

    /**
     * Strictly used to have a consistent close function as the start_group_where. This essentially calls the close_bracket() function.
     */
    function close_group_having()
    {
        return $this->close_having_bracket();
    }

    /**
     * Allows to place a simple ( in a query and prepend it with the $type if needed.
     * @param $type string add a ( to a query and prepend it with type. Default is $type.
     * @param $return db object.
     */
    function open_having_bracket($type = "AND")
    {
        if (count($this->ar_having) > 0)
        {
            $this->ar_having[] = $type . " ";
        }
        $this->ar_having[] = "(";
        return $this;
    }

    /**
     * Allows to place a simple ) to a query.
     */
    function close_having_bracket()
    {
        $this->ar_having[] = ")";
        return $this;
    }

    /**
     *
     * Used to prepend SQL_CALC_FOUND_ROWS to select clause for counting all values pre-limit. MYSQL specific.
     * @param type $val
     * @return boolean
     */

    function start_group_like($key, $value = null, $type = "AND")
    {
        $this->open_like_bracket($type);
        return parent::_like($key, $value, '');
    }

    function close_group_like()
    {
        return $this->close_like_bracket();
    }

    function open_like_bracket($type = "AND")
    {
        if (count($this->ar_like) > 0)
        {
            $this->ar_like[] = $type . " ";
        }
        $this->ar_like[] = "(";
        return $this;
    }

    function close_like_bracket()
    {
        $this->ar_like[] = ")";
        return $this;
    }

    function count_rows($val = true)
    {
        $this->ar_count_rows = (is_bool($val)) ? $val : true;
        return $this;
    }

    function select_distance($longA, $latA, $longB, $latB, $alias)
    {
        $this->select($this->_distance_calculation_string($longA, $latA, $longB, $latB) . ' AS ' . $alias);
    }

    function where_distance($longA, $latA, $longB, $latB, $distance, $comparator = '<', $useBackticks = true)
    {
        $this->where($this->_distance_calculation_string($longA, $latA, $longB, $latB) . $comparator, $distance, $useBackticks);
    }

    private function _distance_calculation_string($longA, $latA, $longB, $latB)
    {
        return '(
                                ROUND(
                                        SQRT(
                                                POW(
                                                        (
                                                                (' . $latA . '-' . $latB . ')
                                                                *110.54
                                                        ),
                                                        (2)
                                                )
                                                +
                                                POW(
                                                        (
                                                                (' . $longA . '-' . $longB . ')
                                                                *111.32
                                                                *cos(RADIANS(' . $latA . '))
                                                        ),
                                                        (2)
                                                )
                                        )
                                ,(1))
                        )';
    }

    /**
     * Resets the active record values.  Called by the get() function
     *
     * @access	private
     * @return	void
     */
    function _reset_select()
    {
            $ar_reset_items = [
                'ar_select' => [],
                'ar_count_rows' => [],
                'ar_from' => [],
                'ar_join' => [],
                'ar_where' => [],
                'ar_like' => [],
                'ar_groupby' => [],
                'ar_having' => [],
                'ar_orderby' => [],
                'ar_wherein' => [],
                'ar_group_concat' => [],
                'ar_group_concat_ordering' => [],
                'ar_aliased_tables' => [],
                'ar_distinct' => false,
                'ar_limit' => false,
                'ar_offset' => false,
                'ar_order' => false,
                'enforce_join_enabled' => true
            ];
            $this->_reset_run($ar_reset_items);
    }

    // --------------------------------------------------------------------

	/**
	 * Compile the SELECT statement
	 *
	 * Generates a query string based on which functions were used.
	 * Should not be called directly.  The get() function calls it.
         * Overloads base class so as to add SQL_CALC_FOUND_ROWS for MySQL.
	 *
	 * @access	private
	 * @return	string
	 */

    function run_group_concat_extending()
    {
        $this->_execute("SET SESSION group_concat_max_len = 20000000;");
    }

    function _compile_select($select_override = false)
    {
        // Combine any cached components with the current statements
        $this->_merge_cache();

        // ----------------------------------------------------------------

        // Write the "select" portion of the query

        if ($select_override !== false)
        {
            $sql = $select_override;
        }
        else
        {
            $sql = "";
            if (count($this->ar_group_concat) > 0)
            {
                $this->run_group_concat_extending();
            }
            $sql .= ((!$this->ar_distinct)?'SELECT ':'SELECT DISTINCT ');
            if ($this->ar_count_rows)
            {
                $this->_has_relevant_row_count = true;
                $countString = 'SQL_CALC_FOUND_ROWS ';
            }
            else
            {
                $this->_has_relevant_row_count = false;
                $countString = '';
            }
            $sql .= $countString;
            if (count($this->ar_select) == 0)
            {
                $sql .= '*';
            }
            else
            {
                // Cycle through the "select" portion of the query and prep each column name.
                // The reason we protect identifiers here rather then in the select() function
                // is because until the user calls the from() function we don't know if there are aliases
                foreach ($this->ar_select as $key => $val)
                {
                        $this->ar_select[$key] = $this->_protect_identifiers($val);
                }
                $sql .= implode(', ', $this->ar_select);
            }
        }

        if (count($this->ar_group_concat) > 0)
        {
            foreach ($this->ar_group_concat as $collectionAlias=>$collectionData)
            {
                $sql .= ",";
                $sql .= "\n";
                $sql .= "GROUP_CONCAT(DISTINCT CONCAT_WS(\"" . Model_Base__View::COLLECTIONIDENTIFIERSEPARATOR . "\", ";
                $first = true;
                foreach ($collectionData as $identifier => $column)
                {
                    $sql .= ($first?'':',') . 'concat("' . $identifier .'", "' . Model_Base__View::COLLECTIONKEYVALUESEPARATOR . '", ' . $column . ')';
                    $first = false;
                }
                $sql .= ')';
                if (isset($this->ar_group_concat_ordering[$collectionAlias]))
                {
                    $first_order = true;
                    $sql .= ' ORDER BY ';
                    foreach ($this->ar_group_concat_ordering[$collectionAlias] as $concat_order_col => $concat_order_dir)
                    {
                        $sql .= ($first_order?'':', ') . $concat_order_col . ' ' . $concat_order_dir;
                        $first_order = false;
                    }
                }
                $sql .= ' SEPARATOR "' . Model_Base__View::COLLECTIONITEMSEPARATOR . '") as ' . $collectionAlias;
            }
        }

        // ----------------------------------------------------------------

        // Write the "FROM" portion of the query

        if (count($this->ar_from) > 0)
        {
            $sql .= "\nFROM ";
            $sql .= $this->_from_tables($this->ar_from);
        }

        // ----------------------------------------------------------------

        // Write the "JOIN" portion of the query

        if (count($this->ar_join) > 0)
        {
            $sql .= "\n";
            $sql .= implode("\n", $this->ar_join);
        }

        // ----------------------------------------------------------------

        // Write the "WHERE" portion of the query

        if (count($this->ar_where) > 0 OR count($this->ar_like) > 0)
        {
            $sql .= "\n";
            $sql .= "WHERE ";
        }

        $sql .= implode("\n", $this->ar_where);

        // ----------------------------------------------------------------

        // Write the "LIKE" portion of the query

        if (count($this->ar_like) > 0)
        {
            if (count($this->ar_where) > 0)
            {
                    $sql .= "\nAND ";
            }
            $sql .= implode("\n", $this->ar_like);
        }

        // ----------------------------------------------------------------

        // Write the "GROUP BY" portion of the query

        if (count($this->ar_groupby) > 0)
        {
            $sql .= "\nGROUP BY ";
            $sql .= implode(', ', $this->ar_groupby);
        }

        // ----------------------------------------------------------------

        // Write the "HAVING" portion of the query

        if (count($this->ar_having) > 0)
        {
            $sql .= "\nHAVING ";
            $sql .= implode("\n", $this->ar_having);
        }

        // ----------------------------------------------------------------

        // Write the "ORDER BY" portion of the query

        if (count($this->ar_orderby) > 0)
        {
            $sql .= "\nORDER BY ";
            $sql .= implode(', ', $this->ar_orderby);
            if ($this->ar_order !== FALSE)
            {
                $sql .= ($this->ar_order == 'desc') ? ' DESC' : ' ASC';
            }
        }

        // ----------------------------------------------------------------

        // Write the "LIMIT" portion of the query

        if (is_numeric($this->ar_limit))
        {
            $sql .= "\n";
            $sql = $this->_limit($sql, $this->ar_limit, $this->ar_offset);
        }
        return $sql;
    }
}