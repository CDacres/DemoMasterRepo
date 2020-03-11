<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__location_assets extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Location_Asset::class);
        parent::__construct();
    }

    public function get_location_asset_object_by_id($location_id)
    {
        return new Runt_Location_Asset($this->_get_location_asset_object_by_id($location_id));
    }

    private function _get_location_asset_object_by_id($location_id)
    {
        $this->db->where(Runt_Location_Asset::column('location_id'), $location_id);
        return $this->_query_init_and_run();
    }
}