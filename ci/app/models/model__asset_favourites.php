<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_favourites extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Runt_Asset_Favourite::class);
        parent::__construct();
    }

    public function get_asset_favourites_collection_by_asset($assetId)
    {
        return new Runt_Asset_Favourite___Collection($this->_get_asset_favourites_collection_by_asset($assetId));
    }

    private function _get_asset_favourites_collection_by_asset($assetId)
    {
        $this->db->where(Runt_Asset_Favourite::column('asset_id'), $assetId);
        return $this->_query_init_and_run(false);
    }

    public function get_asset_favourite_object_by_user_and_asset($userId, $assetId)
    {
        return new Runt_Asset_Favourite($this->_get_asset_favourite_object_by_user_and_asset($userId, $assetId));
    }

    private function _get_asset_favourite_object_by_user_and_asset($userId, $assetId)
    {
        $this->db->where(Runt_Asset_Favourite::column('asset_id'), $assetId);
        $this->db->where(Runt_Asset_Favourite::column('user_id'), $userId);
        return $this->_query_init_and_run();
    }
}