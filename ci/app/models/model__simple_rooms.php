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

class Model__simple_rooms extends Model_Base__Room_User_Facing
{
    function __construct()
    {
        parent::__construct();
        $this->_set_base_class(Simple_Room::class);
    }

    public function get_all_rooms($today = false)
    {
        $this->db->count_rows(true);
        if ($today)
        {
            $baseClass = $this->_get_base_class();
            $todayDate = new DateTime();
            $tomorrowDate = new DateTime();
            $tomorrowDate->add(new DateInterval('P1D'));
            $this->db->where($baseClass::column('created') . ' >=', $todayDate->format("Y-m-d"));
            $this->db->where($baseClass::column('created') . ' <=', $tomorrowDate->format("Y-m-d"));
        }
        return $this->_query_launch(true, false, false);
    }

    protected function _query_join_secondaries($hide_subcol)
    {
        parent::_query_join_secondaries($hide_subcol);
        $this->_query_join_room_images();
    }

    protected function _query_join_room_images()
    {
        $baseClass = $this->_get_base_class();
        $this->db->join(Image::tableName(), $baseClass::asset_id_column() . "=" . Image::column('subject_id') . " AND " . Image::column('represents') . "= 1 AND " . Image::enabled_column() . "= 1 AND " . Image::column('image_type_id') . " = " . Image::ASSET, "LEFT");
        $this->db->select_alias(Image::column('name'), $baseClass::alias('image'));
    }

    private function _remove_rooms_with_flagged_image()
    {
        $this->db->where(Image::column('flagged'), false);
    }

    protected function _query_join_room_reviews()
    {
        $baseClass = $this->_get_base_class();
        $this->db->join(Review::tableName(), $baseClass::asset_id_column() . "=" . Review::column('subject_id') . " AND " . Review::enabled_column() . "= 1", "LEFT");
        $this->db->allow_join_disabled();
        $this->db->select_alias(Review::column('review'), $baseClass::alias('review'));
        $this->db->disallow_join_disabled();
    }

    public function get_landing_page_rooms($type, $lang_code, $tag_id, $location, $attribute_id = null, $chosen_rooms_venues = [])
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_landing_page_rooms($type, $lang_code, $tag_id, $location, $attribute_id, $chosen_rooms_venues));
    }

    private function _get_landing_page_rooms($type, $lang_code, $tag_id, $location, $attribute_id, $chosen_rooms_venues)
    {
        $baseClass = $this->_get_base_class();
        $this->_filter_for_approval();
        $this->_fiter_for_hidden();
        $this->_fiter_for_package_container_rooms();
        $this->_query_join_venues();
        $this->_query_join_companies();
        $this->_query_join_currencies($baseClass, $baseClass::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->_query_select_prices();
        $this->_query_join_configurations();
        $this->_query_join_tags($lang_code);
        $this->_query_join_room_images();
        $this->_remove_rooms_with_flagged_image();
        $this->db->where(Tag::id_column(), $tag_id);
        $this->db->where(Venue::column('country_code'), $location->get('country'));
        $this->db->where(Venue::column('long') . ' > ' . $location->get('bounds_sw_lon'));
        $this->db->where(Venue::column('long') . ' < ' . $location->get('bounds_ne_lon'));
        $this->db->where(Venue::column('lat') . ' > ' . $location->get('bounds_sw_lat'));
        $this->db->where(Venue::column('lat') . ' < ' . $location->get('bounds_ne_lat'));
        switch ($type)
        {
            case 'favourite':

                $this->db->order_by(Asset_Tag::column('ranking'), 'DESC');
            break;

            case 'top':

                $this->db->where($baseClass::column('page_views') . ' IS NOT NULL');
                $this->db->order_by($baseClass::column('page_views'), 'DESC');
            break;

            case 'review':

                $this->db->where(Venue::column('review_score') . ' >=', 3.5);
                $this->db->order_by(Venue::column('review_score'), 'DESC');
                $this->db->order_by(Venue::column('review_count'), 'DESC');
            break;

            case 'recent':

                $this->db->where($baseClass::column('last_booked') . ' IS NOT NULL');
                $this->db->order_by($baseClass::column('last_booked'), 'DESC');
            break;
        }
        if ($attribute_id != null)
        {
            switch ($attribute_id)
            {
                case Attribute_Type::CHEAP:

                    $this->db->start_group_having($baseClass::alias('hourly_rate') . ' <= ', 50);
                    $this->db->or_having($baseClass::alias('daily_rate') . ' <= ', 300);
                    $this->db->or_having($baseClass::alias('daily_delegate_rate') . ' <= ', 300);
                    $this->db->or_having($baseClass::alias('monthly_rate') . ' <= ', 6000);
                    $this->db->close_group_having();
                break;

                case Attribute_Type::HOTEL:

                    $this->db->where(Venue::column('venue_type'), Venue_Types::HOTELS);
                break;

                case Attribute_Type::COOL:

                    $this->db->advanced_join($baseClass, Runt_Asset_Attribute::class, $baseClass::asset_id_column(false), Runt_Asset_Attribute::column('asset_id', false));
                    $this->db->where(Runt_Asset_Attribute::column('attribute_id'), Attribute_Type::COOL);
                break;
            }
        }
        if (count($chosen_rooms_venues) > 0)
        {
            if (isset($chosen_rooms_venues['rooms']))
            {
                $this->db->where_not_in($baseClass::id_column(), $chosen_rooms_venues['rooms']);
            }
            if (isset($chosen_rooms_venues['venues']))
            {
                $this->db->where_not_in(Venue::id_column(), $chosen_rooms_venues['venues']);
            }
        }
        $this->db->group_by($baseClass::id_column());
        $this->db->limit(300);
        return $this->_query_init_and_run(false);
    }

    public function get_chosen_landing_page_rooms($landing_page_id)
    {
        $baseCollection = $this->_get_base_collection();
        return new $baseCollection($this->_get_chosen_landing_page_rooms($landing_page_id));
    }

    private function _get_chosen_landing_page_rooms($landing_page_id)
    {
        $baseClass = $this->_get_base_class();
        $this->db->advanced_join($baseClass, Runt_Landing_Page_Carousel_Asset::class, $baseClass::asset_id_column(false), Runt_Landing_Page_Carousel_Asset::column('asset_id', false));
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Runt_Landing_Page_Carousel_Asset::class, Attribute_Type::class, Runt_Landing_Page_Carousel_Asset::column('carousel_attribute_id', false), Attribute_Type::id_column(false));
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Attribute_Type::column('carousel_title'), $baseClass::alias('carousel_title'));
        $this->_filter_for_approval();
        $this->_fiter_for_hidden();
        $this->_fiter_for_package_container_rooms();
        $this->_query_join_venues();
        $this->_query_join_companies();
        $this->_query_join_currencies($baseClass, $baseClass::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->_query_select_prices();
        $this->_query_join_configurations();
        $this->_query_join_room_images();
        $this->_remove_rooms_with_flagged_image();
        $this->db->where(Runt_Landing_Page_Carousel_Asset::column('landing_page_id'), $landing_page_id);
        $this->db->group_by(Attribute_Type::id_column());
        $this->db->group_by($baseClass::id_column());
        $this->db->order_by(Runt_Landing_Page_Carousel_Asset::column('created'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_all_rooms_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $baseClass = $this->_get_base_class();
        $baseCollection = $this->_get_base_collection();
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->_query_join_venues();
        $this->_query_join_companies();
        $this->_query_join_room_images();
        $this->_query_join_currencies($baseClass, $baseClass::column('currency_code', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->_query_join_configurations();
        $this->db->count_rows(true);
        $this->db->select($baseClass::id_column());
        $this->db->select($baseClass::column('created'));
        $this->db->select($baseClass::asset_id_column());
        $this->db->select($baseClass::column('description'));
        $this->db->select($baseClass::column('listing_hourly_rate'));
        $this->db->select($baseClass::column('approved'));
        $this->db->from($baseClass::tableName());
        $this->_fiter_for_package_container_rooms();
        $this->db->where($baseClass::enabled_column(), 1);
        $this->db->limit($limit, $offset);
        $this->db->group_by($baseClass::id_column());
        $this->db->order_by($baseClass::sort_by_token($sort_by), $sort_order);
        if ($status == 'pending')
        {
            $this->db->where(Venue::column('approved'), 1);
            $this->db->where($baseClass::column('approved'), 0);
            $this->db->where($baseClass::column('status'), 1);
        }
        elseif ($status == 'live')
        {
            $this->db->where($baseClass::column('approved'), 1);
            $this->db->where($baseClass::column('status'), 1);
        }
        elseif ($status == 'unapproved')
        {
            $this->db->where($baseClass::column('approved'), 0);
            $this->db->where($baseClass::column('status'), 1);
        }
        elseif ($status == 'banned')
        {
            $this->db->where($baseClass::column('status'), 0);
        }
        elseif ($status == 'hourly')
        {
            $this->_query_select_prices();
            $this->db->where(Hourly_Price::column('hourly_rate') . " IS NOT NULL");
        }
        elseif ($status == 'daily')
        {
            $this->_query_select_prices();
            $this->db->where(Daily_Price::column('daily_rate') . " IS NOT NULL");
        }
        elseif ($status == 'delegate')
        {
            $this->_query_select_prices();
            $this->db->where(Daily_Price::column('daily_delegate_rate') . " IS NOT NULL");
        }
        elseif ($status == 'monthly')
        {
            $this->_query_select_prices();
            $this->db->where(Daily_Price::column('monthly_rate') . " IS NOT NULL");
        }
        if ($keyword != '')
        {
            $this->_query_join_usages();
            $this->db->start_group_like($baseClass::id_column(), $keyword);
            $this->db->or_like($baseClass::column('venue_id'), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Venue::column('address'), $keyword);
            $this->db->or_like(Venue::column('phone'), $keyword);
            $this->db->or_like(Venue::column('website'), $keyword);
            $this->db->or_like($baseClass::column('title'), $keyword);
            $this->db->or_like($baseClass::column('description'), $keyword);
            $this->db->or_like(Usage::column('desc'), $keyword);
            $this->db->or_like(Profile::column('first_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Profile::column('last_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name', true, $venueProfileAlias) . ", ' ', " . Profile::column('last_name', true, $venueProfileAlias) . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email', true, $venueUserAlias) . ")", $keyword);
            $this->db->or_like("REPLACE(LOWER(" . User::column('email', true, $venueUserAlias) . "), '_', '\\_')", $keyword);
            $this->db->or_like(Profile::column('phone_number', true, $venueProfileAlias), $keyword);
            $this->db->close_group_like();
        }
        return new $baseCollection($this->_query_run(false));
    }
}