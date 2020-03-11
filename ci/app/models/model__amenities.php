<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__amenities extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Amenity::class);
        parent::__construct();
    }

    public function get_amenities_objects_collection()
    {
        return new Amenity___Collection($this->_get_amenities_collection());
    }

    private function _get_amenities_collection()
    {
        $this->db->where(Amenity::column('filterable'), 1);
        $this->db->order_by(Amenity::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}