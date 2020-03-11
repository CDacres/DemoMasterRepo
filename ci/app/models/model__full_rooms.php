<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Rooms Class
 *
 * Room information in database - booking types, amenities, configurations, etc
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */

class Model__full_rooms extends Model_Base__Room_User_Facing
{
    function __construct()
    {
        parent::__construct();
        $this->_set_base_class(Full_Room::class);
    }

    protected function _query_join_secondaries($hide_subcol)
    {
        parent::_query_join_secondaries($hide_subcol);
        $this->_add_images();
        $this->_add_configurations();
        $this->_add_reviews();
        if (!$hide_subcol)
        {
            $this->_add_amenities();
            $this->_add_attributes();
        }
    }

    private function _add_reviews()
    {
        $reviewUserTableAlias = "review_user";
        $reviewProfileTableAlias = "review_user_profile";
        $this->db->join(Review::tableName(), Full_Room::asset_id_column() . "=" . Review::column('subject_id') . " AND " . Review::enabled_column() . "= 1", "LEFT");
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Review::class, User::class, Review::column('author_id', false), User::id_column(false), "LEFT", NULL, $reviewUserTableAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $reviewUserTableAlias, $reviewProfileTableAlias);
        $this->db->disallow_join_disabled();
        $this->_select_sub_collection(Review::class, 'reviews');
        $this->_set_sub_collection_ordering(Review::column('created'), 'reviews', 'DESC');
        $this->_select_sub_collection_alias(Profile::column('first_name', true, $reviewProfileTableAlias), 'reviews', Review::alias('author_name'));
    }

    private function _add_images()
    {
        $this->db->join(Image::tableName(), Full_Room::asset_id_column() . "=" . Image::column('subject_id') . " AND " . Image::enabled_column() . "= 1 AND " . Image::column('image_type_id') . " = " . Image::ASSET, "LEFT");
        $this->_select_sub_collection(Image::class, 'images');
        $this->_set_sub_collection_ordering(Image::column('represents'), 'images', 'DESC');
    }

    private function _add_configurations()
    {
        $collectionTableAlias = "conf_coll";
        $runtTableAlias = "room_conf_coll";
        $this->db->advanced_join(Full_Room::class, Runt_Room_Configuration::class, Full_Room::asset_id_column(false), Runt_Room_Configuration::column('asset_id', false), "LEFT", null, $runtTableAlias);
        $this->db->advanced_join(Runt_Room_Configuration::class, Configuration::class, Runt_Room_Configuration::column('configuration_id', false), Configuration::id_column(false), "LEFT", $runtTableAlias, $collectionTableAlias);
        $this->_select_sub_collection(Configuration::class, 'configurations', $collectionTableAlias);
        $this->_set_sub_collection_ordering(Configuration::column('desc', false, $collectionTableAlias), 'configurations', 'ASC');
        $this->_select_sub_collection_alias(Runt_Room_Configuration::column('max_capacity', true, $runtTableAlias), 'configurations', Configuration::alias('max_capacity'));
    }

    private function _add_amenities()
    {
        $this->db->join(Runt_Asset_Amenity::tableName(), Full_Room::asset_id_column() . "=" . Runt_Asset_Amenity::column('asset_id') . " AND " . Runt_Asset_Amenity::column('available') . "= 1 AND " . Runt_Asset_Amenity::enabled_column() . "= 1", "LEFT");
        $this->db->advanced_join(Runt_Asset_Amenity::class, Amenity::class, Runt_Asset_Amenity::column('amenity_id', false), Amenity::id_column(false));
        $this->_select_sub_collection(Runt_Asset_Amenity::class, 'amenities');
        $this->_set_sub_collection_ordering(Amenity::column('desc'), 'amenities', 'ASC');
        $this->_select_sub_collection_alias(Amenity::column('desc'), 'amenities', Runt_Asset_Amenity::alias('amenity_desc'));
        $this->_select_sub_collection_alias(Amenity::column('filterable'), 'amenities', Runt_Asset_Amenity::alias('filterable'));
        $this->_select_sub_collection_alias(Amenity::column('allow_price'), 'amenities', Runt_Asset_Amenity::alias('allow_price'));
        $this->_select_sub_collection_alias(Amenity::column('amenity_type'), 'amenities', Runt_Asset_Amenity::alias('amenity_type'));
        $this->_select_sub_collection_alias(Room_Skeleton::column('currency_code'), 'amenities', Runt_Asset_Amenity::alias('currency'));
        $this->_calculate_collection_price(Runt_Asset_Amenity::column('cost'), 'amenities', Runt_Asset_Amenity::alias('price'));
        $this->_add_collection_currency_symbols('amenities', Full_Room::alias('currency_symbol_left'), Full_Room::alias('currency_symbol_right'));
    }

    private function _add_attributes()
    {
        $this->db->advanced_join(Full_Room::class, Runt_Asset_Attribute::class, Full_Room::asset_id_column(false), Runt_Asset_Attribute::column('asset_id', false));
        $this->_select_sub_collection(Runt_Asset_Attribute::class, 'attributes');
    }
}