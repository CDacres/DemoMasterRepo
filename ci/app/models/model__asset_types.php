<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_types extends Model_Base__Object 
{
    function __construct()
    {
        $this->_set_base_class(Asset_Type::class);
        parent::__construct();
    }
    
    public function get_asset_type_by_id($id)
    {
        return new Asset_Type($this->_get_asset_type_by_id($id));
    }
    
    private function _get_asset_type_by_id($id)
    {
        $this->db->where(Asset_Type::id_column(), $id);
        return $this->_query_init_and_run();
    }
}