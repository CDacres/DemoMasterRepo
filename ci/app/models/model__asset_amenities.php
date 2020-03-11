<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_amenities extends Model_Base__Object
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Runt_Asset_Amenity::class);
        parent::__construct();
    }

    public function get_amenities_object_collection_by_asset_id($assetId, $allowPrice = true, $showAvailable = true)
    {
        return new Runt_Asset_Amenity___Collection($this->_get_amenities_data_by_asset_id($assetId, $allowPrice, $showAvailable));
    }

    private function _get_amenities_data_by_asset_id($assetId, $allowPrice, $showAvailable)
    {
        $this->db->advanced_join(Runt_Asset_Amenity::class, Room_Skeleton::class, Runt_Asset_Amenity::column('asset_id', false), Room_Skeleton::asset_id_column(false));
        $this->db->advanced_join(Runt_Asset_Amenity::class, Amenity::class, Runt_Asset_Amenity::column('amenity_id', false), Amenity::id_column(false));
        $this->db->advanced_join(Amenity::class, Amenity_Type::class, Amenity::column('amenity_type', false), Amenity_Type::id_column(false));
        $this->_query_join_currencies(Room_Skeleton::class, Room_Skeleton::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->db->select_alias(Amenity::column('desc'), Runt_Asset_Amenity::alias('amenity_desc'));
        $this->db->select_alias(Amenity::column('filterable'), Runt_Asset_Amenity::alias('filterable'));
        $this->db->select_alias(Amenity::column('allow_price'), Runt_Asset_Amenity::alias('allow_price'));
        $this->db->select_alias(Amenity::column('amenity_type'), Runt_Asset_Amenity::alias('amenity_type'));
        $this->db->select_alias(Room_Skeleton::column('currency_code'), Runt_Asset_Amenity::alias('currency'));
        $this->_calculate_price([Runt_Asset_Amenity::column('cost') => Runt_Asset_Amenity::alias('price')]);
        $this->db->where(Runt_Asset_Amenity::column('asset_id'), $assetId);
        if ($showAvailable)
        {
            $this->db->where(Runt_Asset_Amenity::column('available'), 1);
        }
        if (!$allowPrice)
        {
            $this->db->where(Amenity::column('allow_price'), 1);
        }
        $this->db->order_by(Amenity::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}