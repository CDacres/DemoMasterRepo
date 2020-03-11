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

class Model__room_skeletons extends Model_Base__Asset
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Room_Skeleton::class);
        parent::__construct();
    }

    public function get_room_object_by_id($id, $showAll = false, $hideHidden = true)
    {
        $baseClass = $this->_get_base_class();
        return new $baseClass($this->_get_room_by_id($id, $showAll, $hideHidden));
    }

    private function _get_room_by_id($id, $showAll, $hideHidden)
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::id_column(), $id);
        return $this->_query_launch($showAll, true, $hideHidden);
    }

    public function get_room_object_by_asset_id($assetId, $showAll = false, $hideHidden = true)
    {
        $baseClass = $this->_get_base_class();
        return new $baseClass($this->_get_room_by_asset_id($assetId, $showAll, $hideHidden));
    }

    private function _get_room_by_asset_id($assetId, $showAll, $hideHidden)
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::asset_id_column(), $assetId);
        return $this->_query_launch($showAll, true, $hideHidden);
    }

    public function get_siblings_object_collection_by_id($id, $showAll = false, $hideHidden = true)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_room_siblings_by_room_id($id, $showAll, $hideHidden));
    }

    private function _get_room_siblings_by_room_id($room_id, $showAll, $hideHidden)
    {
        $baseClass = $this->_get_base_class();
        $this->db->join($baseClass::tableName() . ' AS original_' . $baseClass::tableName(), $baseClass::column('venue_id') . '=original_' . $baseClass::column('venue_id'), "RIGHT");
        $this->db->where('original_' . $baseClass::id_column(), $room_id);
        $this->db->where($baseClass::id_column() . ' <>', $room_id);
        $this->db->order_by($baseClass::column('usage_id'), 'ASC');
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch($showAll, false, $hideHidden, true);
    }

    public function get_room_object_collection_by_venue_id($venue_id, $showAll = false, $hideHidden = true, $hide_subcol = false)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_venue_id($venue_id, $showAll, $hideHidden, $hide_subcol));
    }

    private function _get_rooms_by_venue_id($venue_id, $showAll, $hideHidden, $hide_subcol)
    {
        $baseClass = $this->_get_base_class();
        $this->db->count_rows(true);
        $this->db->where($baseClass::column('venue_id'), $venue_id);
        $this->db->order_by($baseClass::column('usage_id'), 'ASC');
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch($showAll, false, $hideHidden, $hide_subcol);
    }

    public function get_room_object_collection_by_venue_asset_id($venue_asset_id, $showAll = false, $hideHidden = true)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_venue_asset_id($venue_asset_id, $showAll, $hideHidden));
    }

    private function _get_rooms_by_venue_asset_id($venue_asset_id, $showAll, $hideHidden)
    {
        $baseClass = $this->_get_base_class();
        $this->db->count_rows(true);
        $this->db->where(Venue::asset_id_column(), $venue_asset_id);
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch($showAll, false, $hideHidden);
    }

    public function get_room_object_collection_by_company_id($company_id, $showAll = false, $hideHidden = true)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_company_id($company_id, $showAll, $hideHidden));
    }

    private function _get_rooms_by_company_id($company_id, $showAll, $hideHidden)
    {
        $baseClass = $this->_get_base_class();
        $this->db->count_rows(true);
        $this->db->where(Company::id_column(), $company_id);
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch($showAll, false, $hideHidden);
    }

    public function get_room_object_collection_by_company_asset_id($company_asset_id, $showAll = false, $hideHidden = true)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_company_asset_id($company_asset_id, $showAll, $hideHidden));
    }

    private function _get_rooms_by_company_asset_id($company_asset_id, $showAll, $hideHidden)
    {
        $baseClass = $this->_get_base_class();
        $this->db->count_rows(true);
        $this->db->where(Company::asset_id_column(), $company_asset_id);
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch($showAll, false, $hideHidden);
    }

    public function update_room_page_views(Room_Skeleton $room)
    {
        if ($room->is_null('page_views'))
        {
            $room->set('page_views', 1);
        }
        else
        {
            $room->set('page_views', $room->get('page_views')+1);
        }
        $this->insert_update($room);
    }

    public function get_rooms_by_user_asset_privileges($userId, $showAll = false)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_user_asset_privileges($userId, $showAll));
    }

    private function _get_rooms_by_user_asset_privileges($userId, $showAll)
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Runt_User_Asset_Privilege::class, $baseClass::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch($showAll, false, false);
    }

    public function get_rooms_by_user_asset_privileges_with_constraints($userId, $constraintArray)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_user_asset_privileges_with_constraints($userId, $constraintArray));
    }

    private function _get_rooms_by_user_asset_privileges_with_constraints($userId, $constraintArray)
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Runt_User_Asset_Privilege::class, $baseClass::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        foreach ($constraintArray as $identifier => $constraint)
        {
            $this->db->where($baseClass::column($identifier), $constraint);
        }
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch(true, false, false);
    }

    public function get_user_favourited_room_object_by_asset_id($userId, $assetId)
    {
        $baseClass = $this->_get_base_class();
        return new $baseClass($this->_get_user_favourited_room_object_by_asset_id($userId, $assetId));
    }

    private function _get_user_favourited_room_object_by_asset_id($userId, $assetId)
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Runt_Asset_Favourite::class, $baseClass::asset_id_column(false), Runt_Asset_Favourite::column('asset_id', false));
        $this->db->where($baseClass::asset_id_column(), $assetId);
        $this->db->where(Runt_Asset_Favourite::column('user_id'), $userId);
        return $this->_query_launch();
    }

    public function get_user_favourited_rooms($userId)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_user_favourited_rooms($userId));
    }

    private function _get_user_favourited_rooms($userId)
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Runt_Asset_Favourite::class, $baseClass::asset_id_column(false), Runt_Asset_Favourite::column('asset_id', false));
        $this->db->where(Runt_Asset_Favourite::column('user_id'), $userId);
        $this->db->order_by(Venue::column('name'), 'ASC');
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch(false, false);
    }

    public function get_rooms_by_ids_with_set_order($idArray, $sort_by, $sort_order)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_ids_with_set_order($idArray, $sort_by, $sort_order));
    }

    private function _get_rooms_by_ids_with_set_order($idArray, $sort_by, $sort_order)
    {
        if (count($idArray) == 0)
        {
            return [];
        }
        $baseClass = $this->_get_base_class();
        $this->db->where_in($baseClass::id_column(), $idArray);
        $this->db->order_by($baseClass::sort_by_token($sort_by), $sort_order);
        return $this->_query_launch(true, false);
    }

    public function get_rooms_by_ids($idArray)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_rooms_by_ids($idArray));
    }

    private function _get_rooms_by_ids($idArray)
    {
        if (count($idArray) == 0)
        {
            return [];
        }
        $baseClass = $this->_get_base_class();
        $this->db->where_in($baseClass::id_column(), $idArray);
        $this->db->order_by($baseClass::column('title'), 'ASC');
        return $this->_query_launch(false, false);
    }

    public function get_room_catalogue_collection()
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_room_catalogue_collection());
    }

    private function _get_room_catalogue_collection()
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::column('approved'), 1);
        $this->db->where($baseClass::column('status'), 1);
        return $this->_query_launch(false, false);
    }

    public function get_room_locations($tag_id, $country, $sw_lon, $ne_lon, $sw_lat, $ne_lat)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_room_locations($tag_id, $country, $sw_lon, $ne_lon, $sw_lat, $ne_lat));
    }

    private function _get_room_locations($tag_id, $country, $sw_lon, $ne_lon, $sw_lat, $ne_lat)
    {
        $baseClass = $this->_get_base_class();
        $this->db->select($baseClass::id_column());
        $this->db->select($baseClass::column('venue_id'));
        $this->db->select($baseClass::column('approved'));
        $this->db->select_alias(Venue::column('approved'), $baseClass::alias('venue_approved'));
        $this->db->from($baseClass::tableName());
        $this->db->advanced_join($baseClass, Asset_Tag::class, $baseClass::asset_id_column(false), Asset_Tag::column('asset_id', false), "INNER");
        $this->db->advanced_join(Asset_Tag::class, Tag::class, Asset_Tag::column('tag_id', false), Tag::id_column(false), "INNER");
        $this->db->advanced_join($baseClass, Venue::class, $baseClass::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->where(Tag::id_column(), $tag_id);
        $this->db->where(Venue::column('country_code'), $country);
        $this->db->where(Venue::column('long') . ' > ' . $sw_lon);
        $this->db->where(Venue::column('long') . ' < ' . $ne_lon);
        $this->db->where(Venue::column('lat') . ' > ' . $sw_lat);
        $this->db->where(Venue::column('lat') . ' < ' . $ne_lat);
        $this->_fiter_for_package_container_rooms();
        $this->_fiter_for_hidden();
        $this->db->where($baseClass::enabled_column(), 1);
        $this->db->where(Venue::enabled_column(), 1);
        $this->db->where(Asset_Tag::enabled_column(), 1);
        $this->db->where(Tag::enabled_column(), 1);
        return $this->_query_run(false);
    }

    public function get_room_collection()
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_room_collection());
    }

    private function _get_room_collection()
    {
        $this->_fiter_for_package_container_rooms();
        $this->_fiter_for_hidden();
        return $this->_query_init_and_run(false);
    }

    protected function _query_launch($showAll = false, $justOne = true, $hideHidden = true, $hide_subcol = false)
    {
        if (!$showAll)
        {
            $this->_filter_for_approval();
        }
        if ($hideHidden)
        {
            $this->_fiter_for_hidden();
        }
        $this->_fiter_for_package_container_rooms();
        $this->_query_join_secondaries($hide_subcol);
        return $this->_query_init_and_run($justOne);
    }

    protected function _filter_for_approval()
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::column('approved'), 1);
        $this->db->where(Venue::column('approved'), 1);
        $this->db->where(Company::column('approved'), 1);
        $this->db->where($baseClass::column('status'), 1);
    }

    protected function _fiter_for_hidden()
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::column('hidden'), 0);
    }

    protected function _fiter_for_package_container_rooms()
    {
        $baseClass = $this->_get_base_class();
        $this->db->where($baseClass::column('title') . ' <>', '');
    }

    protected function _query_join_secondaries($hide_subcol)
    {
        $baseClass = $this->_get_base_class();
        $this->_query_join_venues();
        $this->_query_join_companies();
        $this->db->group_by($baseClass::id_column());
    }

    protected function _query_join_venues()
    {
        $baseClass = $this->_get_base_class();
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->advanced_join($baseClass, Venue::class, $baseClass::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->advanced_join(Venue::class, Vat_Rate::class, Venue::column('vat_rate_id', false), Vat_Rate::id_column(false));
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Venue::class, User::class, Venue::column('main_contact', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Venue::column('long'), $baseClass::alias('long'));
        $this->db->select_alias(Venue::column('lat'), $baseClass::alias('lat'));
        $this->db->select_alias(Venue::column('website'), $baseClass::alias('website'));
        $this->db->select_alias(Venue::column('address'), $baseClass::alias('address'));
        $this->db->select_alias(Venue::column('city'), $baseClass::alias('venue_city'));
        $this->db->select_alias(Venue::column('country'), $baseClass::alias('venue_country'));
        $this->db->select_alias(Venue::column('country_code'), $baseClass::alias('venue_country_code'));
        $this->db->select_alias(Venue::column('road'), $baseClass::alias('venue_road'));
        $this->db->select_alias(Venue::column('town'), $baseClass::alias('venue_town'));
        $this->db->select_alias(Venue::column('post_code'), $baseClass::alias('venue_post_code'));
        $this->db->select_alias(Venue::column('name'), $baseClass::alias('venue_name'));
        $this->db->select_alias(Venue::column('description'), $baseClass::alias('venue_desc'));
        $this->db->select_alias(Venue::column('asset_id'), $baseClass::alias('venue_asset_id'));
        $this->db->select_alias(Venue::column('phone'), $baseClass::alias('phone'));
        $this->db->select_alias(Venue::column('company_id'), $baseClass::alias('company_id'));
        $this->db->select_alias(Venue::column('review_count'), $baseClass::alias('review_count'));
        $this->db->select_alias(Venue::column('review_score'), $baseClass::alias('review_score'));
        $this->db->select_alias(Venue::column('uses_live_bookings'), $baseClass::alias('uses_live_bookings'));
        $this->db->select_alias(Venue::column('agree_to_list'), $baseClass::alias('venue_agree_to_list'));
        $this->db->select_alias(Venue::column('approved'), $baseClass::alias('venue_approved'));
        $this->db->select_alias(Venue::enabled_column(), $baseClass::alias('venue_enabled'));
        $this->db->select_alias(Vat_Rate::column('vat_percentage'), $baseClass::alias('venue_vat_rate'));
        $this->db->select_alias(User::id_column(false, $venueUserAlias), $baseClass::alias('main_venue_user_id'));
        $this->db->select_alias(User::column('hubspot_id', false, $venueUserAlias), $baseClass::alias('main_venue_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name', false, $venueProfileAlias), $baseClass::alias('main_venue_user_firstname'));
        $this->db->select_alias(Profile::column('last_name', false, $venueProfileAlias), $baseClass::alias('main_venue_user_lastname'));
        $this->db->select_alias(User::column('email', false, $venueUserAlias), $baseClass::alias('main_venue_user_email'));
        $this->db->select_alias(User::column('email_status', false, $venueUserAlias), $baseClass::alias('main_venue_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number', false, $venueProfileAlias), $baseClass::alias('main_venue_user_phone'));
        $this->db->select_alias(User::column('role_id', false, $venueUserAlias), $baseClass::alias('main_venue_user_role_id'));
    }

    protected function _query_join_companies()
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false), "INNER");
        $this->db->advanced_join(Company::class, Asset_Audit::class, Company::asset_id_column(false), Asset_Audit::id_column(false), "INNER");
        $this->db->select_alias(Company::column('name'), $baseClass::alias('company_name'));
        $this->db->select_alias(Asset_Audit::column('token'), $baseClass::alias('company_token'));
    }

    protected function _query_join_opening_hours()
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Opening_Hours::class, $baseClass::asset_id_column(false), Opening_Hours::column('asset_id', false));
    }

    protected function _query_join_booked_periods($date, $allDay = false)
    {
        $reqStartDT = new DateTime($date);
        $reqEndDT = clone $reqStartDT;
        $reqEndDT->setTime(24, 0, 0);
        $formatString = Booked_Period::format_string();
        $reqStart = $reqStartDT->format($formatString);
        $reqEnd = $reqEndDT->format($formatString);
        $baseClass = $this->_get_base_class();
        $this->db->join(Booked_Period::tableName(), $baseClass::column('asset_id') . "=" . Booked_Period::column('asset_id') . " AND " . Booked_Period::enabled_column() . "=1 AND "
            . ($allDay?(Booked_Period::column('all_day') . "=1 AND "):"")
            . "("
                . "("
                    . "(" . Booked_Period::column('start') . ">='" . $reqStart . "' AND " . Booked_Period::column('start') . "<'" . $reqEnd . "')"
                    . " OR (" . Booked_Period::column('end') . ">'" . $reqStart . "' AND " . Booked_Period::column('end') . "<='" . $reqEnd . "')"
                . ") OR ("
                    . "(" . Booked_Period::column('start') . "<='" . $reqStart . "' AND " . Booked_Period::column('end') . ">'" . $reqEnd . "')"
                . ")"
            . ")", "LEFT");
    }

    protected function _query_filter_opening_hours_by_date($date, $nullable = false)
    {
        $day = date("w", strtotime($date));
        if ($nullable)
        {
            $this->db->nullable_where(Opening_Hours::column('day_id'), $day);
        }
        else
        {
            $this->db->where(Opening_Hours::column('day_id'), $day);
        }
    }
}