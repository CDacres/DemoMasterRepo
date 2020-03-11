<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__landing_page_carousel_assets extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Landing_Page_Carousel_Asset::class);
        parent::__construct();
    }

    public function get_landing_carousel_assets_collection($landing_id)
    {
        return new Runt_Landing_Page_Carousel_Asset___Collection($this->_get_landing_carousel_assets_collection($landing_id));
    }

    private function _get_landing_carousel_assets_collection($landing_id)
    {
        $this->db->advanced_join(Runt_Landing_Page_Carousel_Asset::class, Asset_Audit::class, Runt_Landing_Page_Carousel_Asset::column('asset_id', false), Asset_Audit::id_column(false));
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Runt_Landing_Page_Carousel_Asset::class, Attribute_Type::class, Runt_Landing_Page_Carousel_Asset::column('carousel_attribute_id', false), Attribute_Type::id_column(false));
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Attribute_Type::column('desc'), Runt_Landing_Page_Carousel_Asset::alias('attribute_desc'));
        $this->db->select_alias(Asset_Audit::column('reference_id'), Runt_Landing_Page_Carousel_Asset::alias('reference_id'));
        $this->db->select_alias(Asset_Audit::column('asset_type'), Runt_Landing_Page_Carousel_Asset::alias('asset_type'));
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('landing_page_id'), $landing_id);
        $this->db->order_by(Runt_Landing_Page_Carousel_Asset::column('created'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_existing_landing_carousel_asset_by_ids($landing_id, $carousel_attribute_id, $asset_id)
    {
        return new Runt_Landing_Page_Carousel_Asset($this->_get_existing_landing_carousel_asset_by_ids($landing_id, $carousel_attribute_id, $asset_id));
    }

    private function _get_existing_landing_carousel_asset_by_ids($landing_id, $carousel_attribute_id, $asset_id)
    {
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('landing_page_id'), $landing_id);
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('carousel_attribute_id'), $carousel_attribute_id);
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('asset_id'), $asset_id);
        return $this->_query_init_and_run();
    }

    public function get_existing_landing_carousel_asset_by_venue($landing_id, $carousel_attribute_id, $asset_id, $current_id = null)
    {
        return new Runt_Landing_Page_Carousel_Asset($this->_get_existing_landing_carousel_asset_by_venue($landing_id, $carousel_attribute_id, $asset_id, $current_id));
    }

    private function _get_existing_landing_carousel_asset_by_venue($landing_id, $carousel_attribute_id, $venue_id, $current_id)
    {
        $this->db->advanced_join(Runt_Landing_Page_Carousel_Asset::class, Simple_Room::class, Runt_Landing_Page_Carousel_Asset::column('asset_id', false), Simple_Room::asset_id_column(false));
        $this->db->advanced_join(Simple_Room::class, Venue::class, Simple_Room::column('venue_id', false), Venue::id_column(false));
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('landing_page_id'), $landing_id);
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('carousel_attribute_id'), $carousel_attribute_id);
        $this->db->where(Venue::id_column(), $venue_id);
        if ($current_id != null)
        {
            $this->db->where(Runt_Landing_Page_Carousel_Asset::id_column() . ' <> ' . $current_id);
        }
        return $this->_query_init_and_run();
    }

    public function get_existing_landing_carousel_asset_by_id($id)
    {
        return new Runt_Landing_Page_Carousel_Asset($this->_get_existing_landing_carousel_asset_by_id($id));
    }

    private function _get_existing_landing_carousel_asset_by_id($id)
    {
        $this->db->where(Runt_Landing_Page_Carousel_Asset::id_column(), $id);
        return $this->_query_init_and_run();
    }
}