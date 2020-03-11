<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Venues Class
 *
 * Venue information in database
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */
class Model__venues extends Model_Base__Asset
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Venue::class);
        parent::__construct();
    }

    public function get_venues_by_user_asset_privileges($userId, $withRooms = false, $showAll = false)
    {
        return new Venue___Collection($this->_get_venues_by_user_asset_privileges($userId, $withRooms, $showAll));
    }

    private function _get_venues_by_user_asset_privileges($userId, $withRooms, $showAll)
    {
        if ($withRooms)
        {
            $this->db->advanced_join(Venue::class, Simple_Room::class, Venue::id_column(false), Simple_Room::column('venue_id', false));
            $this->db->where(Simple_Room::column('approved'), 1);
        }
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        $this->db->order_by(Venue::column('name'), 'ASC');
        return $this->_query_launch($showAll, false);
    }

    public function get_venues_by_user_asset_privileges_with_constraints($userId, $showAll = false, $constraintArray)
    {
        return new Venue___Collection($this->_get_venues_by_user_asset_privileges_with_constraints($userId, $showAll, $constraintArray));
    }

    private function _get_venues_by_user_asset_privileges_with_constraints($userId, $showAll, $constraintArray)
    {
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        foreach ($constraintArray as $identifier => $constraint)
        {
            $this->db->where(Venue::column($identifier), $constraint);
        }
        $this->db->order_by(Venue::column('name'), 'ASC');
        return $this->_query_launch($showAll, false);
    }

    public function get_venue_object_by_asset_id($asset_id, $showAll = false)
    {
        return new Venue($this->_get_venue_by_asset_id($asset_id, $showAll));
    }

    private function _get_venue_by_asset_id($asset_id, $showAll)
    {
        $this->_select_sub_collection_alias(User::column('email'), 'contact_details', Venue::alias('email'));
        $this->_select_sub_collection_alias(User::column('email_status'), 'contact_details', Venue::alias('email_status'));
        $this->_select_sub_collection_alias(User::column('hubspot_id'), 'contact_details', Venue::alias('hubspot_id'));
        $this->_set_sub_collection_ordering(Profile::column('first_name'), 'contact_details', 'ASC');
        $this->_set_sub_collection_ordering(Profile::column('last_name'), 'contact_details', 'ASC');
        $this->_select_sub_collection(Profile::class, 'contact_details');
        $this->db->where(Venue::asset_id_column(), $asset_id);
        return $this->_query_launch($showAll);
    }

    public function get_venue_object_by_id($id, $showAll = false, $includeUnenabled = false)
    {
        return new Venue($this->_get_venue_by_id($id, $showAll, $includeUnenabled));
    }

    private function _get_venue_by_id($venue_id, $showAll, $includeUnenabled)
    {
        if ($includeUnenabled)
        {
            $this->_allow_disabled_override();
        }
        $this->_select_sub_collection_alias(User::column('email'), 'contact_details', Venue::alias('email'));
        $this->_select_sub_collection_alias(User::column('email_status'), 'contact_details', Venue::alias('email_status'));
        $this->_select_sub_collection_alias(User::column('hubspot_id'), 'contact_details', Venue::alias('hubspot_id'));
        $this->_set_sub_collection_ordering(Profile::column('first_name'), 'contact_details', 'ASC');
        $this->_set_sub_collection_ordering(Profile::column('last_name'), 'contact_details', 'ASC');
        $this->_select_sub_collection(Profile::class, 'contact_details');
        $this->db->where(Venue::id_column(), $venue_id);
        return $this->_query_launch($showAll);
    }

    public function get_venues_by_ids($idArray, $sort_by, $sort_order)
    {
        return new Venue___Collection($this->_get_venues_by_ids($idArray, $sort_by, $sort_order));
    }

    private function _get_venues_by_ids($idArray, $sort_by, $sort_order)
    {
        if (count($idArray) == 0)
        {
            return [];
        }
        $this->db->where_in(Venue::id_column(), $idArray);
        $this->db->order_by(Venue::sort_by_token($sort_by), $sort_order);
        return $this->_query_launch(true, false);
    }

    public function get_venue_object_by_room_id($room_id, $showAll = false)
    {
        return new Venue($this->_get_venue_by_room_id($room_id, $showAll));
    }

    private function _get_venue_by_room_id($room_id, $showAll)
    {
        $this->db->advanced_join(Venue::class, Simple_Room::class, Venue::id_column(false), Simple_Room::column('venue_id', false));
        $this->db->where(Simple_Room::id_column(), $room_id);
        return $this->_query_launch($showAll);
    }

    public function get_venue_object_by_room_asset_id($room_asset_id, $showAll = false)
    {
        return new Venue($this->_get_venue_by_room_asset_id($room_asset_id, $showAll));
    }

    private function _get_venue_by_room_asset_id($room_asset_id, $showAll)
    {
        $this->db->advanced_join(Venue::class, Simple_Room::class, Venue::id_column(false), Simple_Room::column('venue_id', false));
        $this->db->where(Simple_Room::asset_id_column(), $room_asset_id);
        return $this->_query_launch($showAll);
    }

    public function get_venue_object_collection_by_company_id($company_id, $showAll = false)
    {
        return new Venue___Collection($this->_get_venue_object_collection_by_company_id($company_id, $showAll));
    }

    private function _get_venue_object_collection_by_company_id($company_id, $showAll)
    {
        $this->db->where(Company::id_column(), $company_id);
        $this->db->order_by(Venue::column('name'), 'ASC');
        return $this->_query_launch($showAll, false);
    }

    public function get_venue_object_collection_by_company_asset_id($company_asset_id, $showAll = false)
    {
        return new Venue___Collection($this->_get_venue_object_collection_by_company_asset_id($company_asset_id, $showAll));
    }

    private function _get_venue_object_collection_by_company_asset_id($company_asset_id, $showAll)
    {
        $this->db->where(Company::asset_id_column(), $company_asset_id);
        $this->db->order_by(Venue::column('name'), 'ASC');
        return $this->_query_launch($showAll, false);
    }

    public function get_venue_object_collection_by_company_token($company_token, $showAll = false)
    {
        return new Venue___Collection($this->_get_venue_object_collection_by_company_token($company_token, $showAll));
    }

    private function _get_venue_object_collection_by_company_token($company_token, $showAll)
    {
        $company_assetAlias = "company_asset";
        $this->db->where(Asset_Audit::column('token', true, $company_assetAlias), $company_token);
        $this->db->order_by(Venue::column('name'), 'ASC');
        return $this->_query_launch($showAll, false);
    }

    public function get_venue_object_collection_without_location_data($extras = false, $limit = false)
    {
        return new Venue___Collection($this->_get_venue_object_collection_without_location_data($extras, $limit));
    }

    private function _get_venue_object_collection_without_location_data($extras, $limit)
    {
//        $this->db->start_group_where(Venue::column('address') . ' IS NOT NULL');
        $this->db->start_group_where(Venue::column('lat'));
        $this->db->or_where(Venue::column('long'));
//        $this->db->close_group_where();
//        $this->db->start_group_where(Venue::column('city'));
//        $this->db->or_where(Venue::column('country'));
//        $this->db->or_where(Venue::column('country_code'));
        if ($extras)
        {
            //$this->db->or_where(Venue::column('street_number'));
            //$this->db->or_where(Venue::column('road'));
            $this->db->or_where(Venue::column('town'));
            $this->db->or_where(Venue::column('county'));
            //$this->db->or_where(Venue::column('post_code'));
        }
        $this->db->close_group_where();
        $this->db->order_by(Venue::column('name'), 'ASC');
        if ($limit != false)
        {
            $this->db->limit($limit);
        }
        return $this->_query_launch(true, false);
    }

    public function get_user_venues_with_rooms_collection($userId, $lang_code)
    {
        return new Venue___Collection($this->_get_user_venues_with_rooms_collection($userId, $lang_code));
    }

    private function _get_user_venues_with_rooms_collection($userId, $lang_code)
    {
        $this->db->advanced_join(Venue::class, Simple_Room::class, Venue::id_column(false), Simple_Room::column('venue_id', false));
        $this->db->advanced_join(Simple_Room::class, Usage::class, Simple_Room::column('usage_id', false), Usage::id_column(false));
        $this->db->advanced_join(Usage::class, Runt_Usage_UsageSuperset::class, Usage::id_column(false), Runt_Usage_UsageSuperset::column('usage_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, UsageSuperset::class, Runt_Usage_UsageSuperset::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->advanced_join(UsageSuperset::class, Runt_UsageSuperset_Language::class, UsageSuperset::id_column(false), Runt_UsageSuperset_Language::column('usage_superset_id', false));
        $this->db->join(Image::tableName('room_image'), Simple_Room::asset_id_column() . "=" . Image::column('subject_id', true, 'room_image') . " AND " . Image::column('represents', true, 'room_image') . "= 1 AND " . Image::enabled_column(true, 'room_image') . "= 1 AND " . Image::column('image_type_id', true, 'room_image') . " = " . Image::ASSET, "LEFT");
        $this->db->nullable_where(Runt_UsageSuperset_Language::column('lang_code'), $lang_code);
        $this->db->nullable_where(UsageSuperset::column('hidden'), 0);
        $this->_select_sub_collection(Simple_Room::class, 'rooms');
        $this->_select_sub_collection_alias(Runt_UsageSuperset_Language::column('alias'), 'rooms', Venue::alias('usage_superset_alias'));
        $this->_select_sub_collection_alias(Venue::column('city'), 'rooms', Simple_Room::alias('venue_city'));
        $this->_select_sub_collection_alias(Image::column('name', true, 'room_image'), 'rooms', Simple_Room::alias('image'));
        $this->_set_sub_collection_ordering(Simple_Room::column('title'), 'rooms', 'ASC');
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        $this->db->order_by(Venue::column('name'), 'ASC');
        return $this->_query_launch(true, false);
    }

    public function get_all_venues_details_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $splitStatus = explode('_', $status);
        $this->_add_users();
        $this->_add_main_contact();
        $this->_query_join_currencies(Venue::class, Venue::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->_add_vat_rate();
        $this->_add_cancellation();
        $this->_query_join_companies();
        $this->db->count_rows(true);
        $this->db->select(Venue::id_column());
        $this->db->select(Venue::column('created'));
        $this->db->select(Venue::column('name'));
        $this->db->select(Venue::column('address'));
        $this->db->select(Venue::column('approved'));
        $this->db->from(Venue::tableName());
        $this->db->where(Venue::enabled_column(), 1);
        $this->db->limit($limit, $offset);
        $this->db->group_by(Venue::id_column());
        $this->db->order_by(Venue::sort_by_token($sort_by), $sort_order);
        if (is_numeric($status))
        {
            $this->db->where(Venue::column('assignedAdmin'), $status);
        }
        elseif (isset($splitStatus[0]) && is_numeric($splitStatus[0]))
        {
            $this->db->where(Venue::column('assignedAdmin'), $splitStatus[0]);
            if (isset($splitStatus[1]))
            {
                $this->_find_source_stage_where($splitStatus[1]);
            }
        }
        else
        {
            $this->_find_source_stage_where($status);
        }
        if ($status == 'unassigned')
        {
            $adminUserTableAlias = "admin_user";
            $this->db->allow_join_disabled();
            $this->db->advanced_join(Venue::class, User::class, Venue::column('assignedAdmin', false), User::id_column(false), "LEFT", NULL, $adminUserTableAlias);
            $this->db->disallow_join_disabled();
            $this->db->start_group_where(Venue::column('assignedAdmin'));
            $this->db->or_where(User::column('role_id', true, $adminUserTableAlias) . ' <> ' . User::ADMINUSER);
            $this->db->close_group_where();
        }
        if ($keyword != '')
        {
            $this->db->start_group_like(Venue::id_column(), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Venue::column('description'), $keyword);
            $this->db->or_like(Venue::column('address'), $keyword);
            $this->db->or_like(Venue::column('city'), $keyword);
            $this->db->or_like(Venue::column('town'), $keyword);
            $this->db->or_like(Venue::column('country'), $keyword);
            $this->db->or_like(Venue::column('phone'), $keyword);
            $this->db->or_like(Venue::column('website'), $keyword);
            $this->db->or_like(Asset_Commission::column('commission_percentage'), $keyword);
            $this->db->or_like(Profile::column('first_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Profile::column('last_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name', true, $venueProfileAlias) . ", ' ', " . Profile::column('last_name', true, $venueProfileAlias) . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email', true, $venueUserAlias) . ")", $keyword);
            $this->db->or_like("REPLACE(LOWER(" . User::column('email', true, $venueUserAlias) . "), '_', '\\_')", $keyword);
            $this->db->or_like(Profile::column('phone_number', true, $venueProfileAlias), $keyword);
            $this->db->close_group_like();
        }
        return new Venue___Collection($this->_query_run(false));
    }

    private function _find_source_stage_where($whereStr)
    {
        if ($whereStr == Venue::PROSPECTURL)
        {
            $this->db->where(Venue::column('source'), Venue::PROSPECT);
        }
        elseif ($whereStr == Venue::NEWLISTINGURL)
        {
            $this->db->where(Venue::column('stage'), Venue::NEWLISTING);
        }
        elseif ($whereStr == Venue::PENDINGURL)
        {
            $this->db->where(Venue::column('stage'), Venue::PENDING);
        }
        elseif ($whereStr == Venue::PICTUREURL)
        {
            $this->db->where(Venue::column('stage'), Venue::PICTURE);
        }
        elseif ($whereStr == Venue::SALVAGEURL)
        {
            $this->db->where(Venue::column('stage'), Venue::SALVAGE);
        }
        elseif ($whereStr == Venue::PREAPPROVEDURL)
        {
            $this->db->where(Venue::column('stage'), Venue::PREAPPROVED);
        }
        elseif ($whereStr == Venue::LIVEURL)
        {
            $this->db->where(Venue::column('stage'), Venue::LIVE);
        }
        elseif ($whereStr == Venue::REJECTEDURL)
        {
            $this->db->where(Venue::column('stage'), Venue::REJECTED);
        }
    }

    public function get_venue_locations($tag_id, $country, $sw_lon, $ne_lon, $sw_lat, $ne_lat)
    {
        return new Venue___Collection($this->_get_venue_locations($tag_id, $country, $sw_lon, $ne_lon, $sw_lat, $ne_lat));
    }

    private function _get_venue_locations($tag_id, $country, $sw_lon, $ne_lon, $sw_lat, $ne_lat)
    {
        $this->_query_join_rooms();
        $this->db->advanced_join(Simple_Room::class, Asset_Tag::class, Simple_Room::asset_id_column(false), Asset_Tag::column('asset_id', false));
        $this->db->advanced_join(Asset_Tag::class, Tag::class, Asset_Tag::column('tag_id', false), Tag::id_column(false));
        $this->db->where(Tag::id_column(), $tag_id);
        $this->db->where(Venue::column('country_code'), $country);
        $this->db->where(Venue::column('long') . ' > ' . $sw_lon);
        $this->db->where(Venue::column('long') . ' < ' . $ne_lon);
        $this->db->where(Venue::column('lat') . ' > ' . $sw_lat);
        $this->db->where(Venue::column('lat') . ' < ' . $ne_lat);
        return $this->_query_launch(false, false);
    }

    protected function _query_join_companies()
    {
        $company_assetAlias = "company_asset";
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false), "INNER");
        $this->db->advanced_join(Company::class, Asset_Audit::class, Company::asset_id_column(false), Asset_Audit::id_column(false), "INNER", NULL, $company_assetAlias);
        $this->db->join(Asset_Commission::tableName(), Venue::asset_id_column() . "=" . Asset_Commission::column('asset_id') . " AND " . Asset_Commission::column('booking_channel_id') . " = " . Booking_Channel::FRONTEND, "LEFT");
        $this->db->select_alias(Company::column('name'), Venue::alias('company_name'));
        $this->db->select_alias(Asset_Audit::column('token', true, $company_assetAlias), Venue::alias('company_token'));
        $this->db->select_alias(Asset_Commission::column('commission_percentage'), Venue::alias('commission_percent_frontend'));
    }

    protected function _query_join_rooms()
    {
        $this->db->join(Simple_Room::tableName(), Venue::id_column() . "=" . Simple_Room::column('venue_id') . " AND " . Simple_Room::enabled_column() . "= 1", "LEFT");
    }

    protected function _query_launch($showAll = false, $justOne = true)
    {
        if (!$showAll)
        {
            $this->_filter_for_approval();
        }
        $this->_add_images();
        $this->_add_users();
        $this->_add_main_contact();
        $this->_query_join_currencies(Venue::class, Venue::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->_add_vat_rate();
        $this->_add_cancellation();
        $this->_query_join_companies();
        $this->db->group_by(Venue::id_column());
        return $this->_query_init_and_run($justOne);
    }

    protected function _filter_for_approval()
    {
        $this->db->where(Venue::column('approved'), 1);
        $this->db->where(Company::column('approved'), 1);
    }

    private function _add_images()
    {
        $this->db->join(Image::tableName(), Venue::asset_id_column() . "=" . Image::column('subject_id') . " AND " . Image::enabled_column() . "= 1 AND " . Image::column('image_type_id') . " = " . Image::ASSET, "LEFT");
        $this->_select_sub_collection(Image::class, 'images');
        $this->_set_sub_collection_ordering(Image::column('represents'), 'images', 'DESC');
    }

    private function _add_users()
    {
        $this->db->advanced_join(Venue::class, Runt_User_Asset_Privilege::class, Venue::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
    }

    private function _add_main_contact()
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Venue::class, User::class, Venue::column('main_contact', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->db->disallow_join_disabled();
        $this->db->select_alias(User::column('hubspot_id', false, $venueUserAlias), Venue::alias('main_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name', false, $venueProfileAlias), Venue::alias('main_user_firstname'));
        $this->db->select_alias(Profile::column('last_name', false, $venueProfileAlias), Venue::alias('main_user_lastname'));
        $this->db->select_alias(User::column('email', false, $venueUserAlias), Venue::alias('main_user_email'));
        $this->db->select_alias(User::column('email_status', false, $venueUserAlias), Venue::alias('main_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number', false, $venueProfileAlias), Venue::alias('main_user_phone'));
    }

    private function _add_vat_rate()
    {
        $this->db->advanced_join(Venue::class, Vat_Rate::class, Venue::column('vat_rate_id', false), Vat_Rate::id_column(false));
        $this->db->select_alias(Vat_Rate::column('vat_percentage'), Venue::alias('vat_rate'));
    }

    private function _add_cancellation()
    {
        $this->db->advanced_join(Venue::class, Runt_Asset_Cancellation::class, Venue::asset_id_column(false), Runt_Asset_Cancellation::column('asset_id', false));
        $this->db->select_alias(Runt_Asset_Cancellation::column('cancellation_period'), Venue::alias('cancellation_days'));
        $this->db->select_alias(Runt_Asset_Cancellation::column('cancellation_percentage'), Venue::alias('cancellation_percent'));
    }

    public function get_all_venues($today = false)
    {
        $this->db->count_rows(true);
        if ($today)
        {
            $todayDate = new DateTime();
            $tomorrowDate = new DateTime();
            $tomorrowDate->add(new DateInterval('P1D'));
            $this->db->where(Venue::column('created') . ' >=', $todayDate->format("Y-m-d"));
            $this->db->where(Venue::column('created') . ' <=', $tomorrowDate->format("Y-m-d"));
        }
        return $this->_query_launch(true, false);
    }

    public function get_all_approved_venues()
    {
        return new Venue___Collection($this->_get_all_approved_venues());
    }

    private function _get_all_approved_venues()
    {
        $this->_filter_for_approval();
        $this->_query_join_companies();
        return $this->_query_init_and_run(false);
    }

//    public function get_venue_reviews($country = null, $ne_lat = null, $sw_lat = null, $ne_lon = null, $sw_lon = null)
//    {
//        return new Venue($this->_get_venue_reviews($country, $ne_lat, $sw_lat, $ne_lon, $sw_lon));
//    }

//    private function _get_venue_reviews($country, $ne_lat, $sw_lat, $ne_lon, $sw_lon)
//    {
//        $this->db->select_sum(Venue::column('review_count'), Venue::alias('overall_review_count'));
//        $this->db->select_avg(Venue::column('review_score'), Venue::alias('overall_review_score'));
//        $this->db->where(Venue::column('review_count') . ' >', 0);
//        if ($country != null)
//        {
//            $this->db->where(Venue::column('country_code'), $country);
//        }
//        if ($ne_lat != null && $sw_lat != null && $ne_lon != null && $sw_lon != null)
//        {
//            $this->db->where(Venue::column('long') . ' > ' . $sw_lon);
//            $this->db->where(Venue::column('long') . ' < ' . $ne_lon);
//            $this->db->where(Venue::column('lat') . ' > ' . $sw_lat);
//            $this->db->where(Venue::column('lat') . ' < ' . $ne_lat);
//        }
//        return $this->_query_init_and_run();
//    }

    public function get_venue_locations_for_flagged_images($assetType)
    {
        return new Venue___Collection($this->_get_venue_locations_for_flagged_images($assetType));
    }

    private function _get_venue_locations_for_flagged_images($assetType)
    {
        $this->db->select_alias("SUM(" . Image::column('flagged') . ")", Venue::alias('flagged_image_count'));
        $this->db->select_alias("SUM(" . Image::column('cosmetic') . ")", Venue::alias('cosmetic_image_count'));
        if ($assetType == Asset_Type::ROOM)
        {
            $this->_query_join_rooms();
            $this->db->advanced_join(Simple_Room::class, Image::class, Simple_Room::asset_id_column(false), Image::column('subject_id', false));
        }
        elseif ($assetType == Asset_Type::VENUE)
        {
            $this->db->advanced_join(Venue::class, Image::class, Venue::asset_id_column(false), Image::column('subject_id', false));
        }
        $this->db->start_group_where(Image::column('flagged'), 1);
        $this->db->or_where(Image::column('cosmetic'), 1);
        $this->db->close_group_where();
        $this->db->where(Image::column('image_type_id'), Image::ASSET);
        $this->db->group_by(Venue::column('city'));
        $this->db->group_by(Venue::column('country_code'));
        $this->db->order_by(Venue::column('city'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}