<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__location_categories extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Location_Category::class);
        parent::__construct();
    }

    public function get_location_categories_collection()
    {
        return new Location_Category___Collection($this->_get_location_categories_collection());
    }

    private function _get_location_categories_collection()
    {
        return $this->_query_init_and_run(false);
    }

    public function get_location_category_default_bounds($category_id, $distance)
    {
        return new Location_Category($this->_get_location_category_default_bounds($category_id, $distance));
    }

    private function _get_location_category_default_bounds($category_id, $distance)
    {
        $this->db->where(Location_Category::column('location_category'), $category_id);
        $this->db->where(Location_Category::column('default_bounds_distance') . ' IS NOT NULL');
        $this->db->where(Location_Category::column('default_bounds_distance') . ' > ' . $distance);
        return $this->_query_init_and_run();
    }
}