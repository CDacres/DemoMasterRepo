<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__attribute_types extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Attribute_Type::class);
        parent::__construct();
    }

    public function get_attribute_collection()
    {
        return new Attribute_Type___Collection($this->_get_attribute_collection());
    }

    private function _get_attribute_collection()
    {
        $this->db->order_by(Attribute_Type::column('order'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_carousel_attribute_collection()
    {
        return new Attribute_Type___Collection($this->_get_carousel_attribute_collection());
    }

    private function _get_carousel_attribute_collection()
    {
        $this->_allow_disabled_override();
        $this->db->where(Attribute_Type::column('carousel_title') . ' IS NOT NULL');
        $this->db->order_by(Attribute_Type::column('order'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_attribute_object_by_id($id)
    {
        return new Attribute_Type($this->_get_attribute_object_by_id($id));
    }

    private function _get_attribute_object_by_id($id)
    {
        $this->_allow_disabled_override();
        $this->db->where(Attribute_Type::id_column(), $id);
        return $this->_query_init_and_run();
    }
}