<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Base__Item extends Base__Bound_Object
{
    protected static $_columns = [
        'id' => [
            'pointer' => 'id',
            'validations' => 'is_natural'
        ]
    ];

    static public function id_column($fullLength = true, $tableAlias = null)
    {
        return static::column('id', $fullLength, $tableAlias);
    }

    public function has_key()
    {
        return $this->_data_is_set(static::column('id', false));
    }

    public function get_key_array()
    {
        if (!$this->has_key())
        {
            throw new Exception(get_called_class() . ' does not have a key.');
        }
        return ([static::id_column(false) => $this->get_id()]);
    }

    public function get_id()
    {
        return $this->_get_data_from_pointer(static::column('id', false));
    }

    public function identifier()
    {
        return $this->get_id();
    }

    public function anonymise()
    {
        $this->set('id');
    }
}