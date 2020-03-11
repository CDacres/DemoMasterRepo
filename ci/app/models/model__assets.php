<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__assets extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Asset_Audit::class);
        parent::__construct();
    }

    public function get_asset_object_by_id($asset_id)
    {
        return new Asset_Audit($this->_get_asset_by_id($asset_id));
    }

    private function _get_asset_by_id($asset_id)
    {
        $this->db->where(Asset_Audit::id_column(), $asset_id);
        return $this->_query_init_and_run();
    }

    public function get_asset_object_by_reference_id_and_type($id, $asset_type)
    {
        return new Asset_Audit($this->_get_asset_object_by_reference_id_and_type($id, $asset_type));
    }

    private function _get_asset_object_by_reference_id_and_type($id, $asset_type)
    {
        $this->db->where(Asset_Audit::column('reference_id'), $id);
        $this->db->where(Asset_Audit::column('asset_type'), $asset_type);
        return $this->_query_init_and_run();
    }

    public function get_asset_object_collection_by_user_and_type($user_id, $asset_type)
    {
        return new Asset_Audit___Collection($this->_get_asset_object_collection_by_user_and_type($user_id, $asset_type));
    }

    private function _get_asset_object_collection_by_user_and_type($user_id, $asset_type)
    {
        $this->db->advanced_join(Asset_Audit::class, Runt_User_Asset_Privilege::class, Asset_Audit::id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $user_id);
        $this->db->where(Asset_Audit::column('asset_type'), $asset_type);
        $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask'), Runt_User_Asset_Privilege::get_top_privilege());
        return $this->_query_init_and_run(false);
    }
}