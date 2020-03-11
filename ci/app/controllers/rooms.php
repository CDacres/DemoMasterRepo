<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**

 * Zipcube Room Controller Class
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            Rooms
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class Rooms extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->lang->load('users', config_item('language_code'));
    }

    public function index($roomId = '', $usagesuperset_alias = '', $city = '', $template = '')
    {
        if ($roomId !== '' && is_numeric($roomId))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $modelFullRoom = Model__full_rooms::class;
            $this->load->model($modelFullRoom);
            $isAdmin = $this->dx_auth->is_admin();
            if ($isAdmin)
            {
                $room = $this->$modelFullRoom->get_room_object_by_id($roomId, true, false);
            }
            else
            {
                $room = $this->$modelFullRoom->get_room_object_by_id($roomId);
            }
            if ($room->exists_in_db())
            {
                if (($usagesuperset_alias == '' && !$room->is_null('usage_superset_alias')) || ($usagesuperset_alias != '' && $room->get('usage_superset_alias') !== urldecode($usagesuperset_alias)) || ($city == '' && !$room->is_null('venue_city')) || ($city != '' && seo_url($room->get('venue_city')) !== seo_url(urldecode($city))))
                {
                    if ($template != '')
                    {
                        redirect(get_room_url($room, $template));
                    }
                    else
                    {
                        redirect(get_room_url($room));
                    }
                }
                $venue_rooms = new Full_Room___Collection();
                $venue_rooms->add_object($room);
                if ($isAdmin)
                {
                    $venue = $this->$modelVenues->get_venue_object_by_id($room->get('venue_id'), true);
                    $modelAttributes = Model__attribute_types::class;
                    $this->load->model($modelAttributes);
                    $this->data['attributes'] = $this->$modelAttributes->get_attribute_collection();
                    $attributeArr = [];
                    foreach ($room->get('attributes')->object() as $room_attribute)
                    {
                        $attributeArr[] = $room_attribute->get('attribute_id');
                    }
                    $this->data['asset_attributes'] = $attributeArr;
                    if ($room->get('primary_vertical_id') != Vertical::OFFICE)
                    {
                        $modelConfigurations = Model__configurations::class;
                        $this->load->model($modelConfigurations);
                        $this->data['configs'] = $this->$modelConfigurations->get_configurations_objects_collection();
                    }
                }
                else
                {
                    $this->$modelFullRoom->update_room_page_views($room);
                    $venue = $this->$modelVenues->get_venue_object_by_id($room->get('venue_id'));
                }
                $assetId = $room->get_asset_id();
                $this->data['venue'] = $venue;
                $this->data['room'] = $room;
                $this->_override_meta_tag('title', $room->get('title') . ' - ' . $room->get('usage_superset_itemname') . ' - Zipcube.com');
                $this->_override_meta_tag('meta_description', $room->get('description'));
                $this->_override_meta_tag('meta_og_image', $room->wrangle('image')->get_url('medium'));
                $this->_override_meta_tag('meta_og_title', $room->get('title') . ' - ' . $room->get('usage_superset_itemname') . ' - Zipcube.com');
                $this->_override_meta_tag('meta_og_description', $room->get('description'));
                $this->_override_meta_tag('meta_og_url', get_room_url($room));
                $this->_override_meta_tag('meta_twitter_image', $room->wrangle('image')->get_url('medium'));
                $this->_override_meta_tag('meta_twitter_title', $room->get('title') . ' - ' . $room->get('usage_superset_itemname') . ' - Zipcube.com');
                $this->_override_meta_tag('meta_twitter_description', $room->get('description'));
                $this->data['reserved_tag_slug'] = '';//$room->get('usage_superset_alias');
                $modelOpeningHours = Model__opening_hours::class;
                $this->load->model($modelOpeningHours);
                $weekly_opening_hours = $this->$modelOpeningHours->get_weekly_opening_object_collection_by_asset_id($assetId);
                $this->data['weekly_opening_hours'] = $weekly_opening_hours;
                if ($isAdmin)
                {
                    $siblings = $this->$modelFullRoom->get_siblings_object_collection_by_id($roomId, true, false);
                }
                else
                {
                    $siblings = $this->$modelFullRoom->get_siblings_object_collection_by_id($roomId);
                }
                foreach ($siblings->object() as $sibling)
                {
                    $venue_rooms->add_object($sibling);
                }
                $this->data['venue_rooms'] = $venue_rooms;
                $this->data['siblings'] = $siblings;
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $this->data['past_bookings'] = $this->$modelReservations->get_completed_reservation_count_by_asset($assetId);
                $this->data['closedDaysData'] = $this->_get_closed_days_data_by_asset($weekly_opening_hours, $assetId);
                $this->data['bookingData'] = $this->_get_booking_data($room);
                $this->data['reserved_sticky_menu'] = true;
                $this->data['reserved_canonical'] = get_room_url($room);
                $altLangArr = [];
                foreach (config_item('supported_cctlds') as $countryKey => $values)
                {
                    if ($countryKey == $this->data['country_lang_url'])
                    {
                        $altLangArr[$values['hreflang']] = get_room_url($room);
                    }
                }
                $this->data['alternate_url'] = $altLangArr;
                $room_price = null;
                if (!$room->is_null('hourly_rate'))
                {
                    $room_price = $room->get('hourly_rate');
                }
                elseif (!$room->is_null('daily_rate'))
                {
                    $room_price = $room->get('daily_rate');
                }
                elseif (!$room->is_null('monthly_rate'))
                {
                    $room_price = $room->get('monthly_rate');
                }
                $this->data['dataLayer'] = [
                    'ecommerce' => [
                        'detail' => [
                            'actionField' => [
                                'list' => $room->get('venue_city')
                            ],
                            'products' => [
                                [
                                    'name' => $room->get('title'),
                                    'id' => $room->get_id(),
                                    'price' => $room_price,
                                    'brand' => $room->get('venue_name'),
                                    'category' => $room->get('usage_superset_desc'),
                                    'variant' => '',
                                    'quantity' => 1,
                                    'coupon' => ''
                                ]
                            ]
                        ]
                    ],
                    'event' => 'viewProduct',
                ];
                if ($this->get_display_type() == Controller_Base__Page::MOBILE)
                {
                    $this->_add_js(auto_version('new_zebra_datepicker.js'));
                    $this->_add_js(auto_version('search/search_libraries.js'));
                    $this->_add_js(auto_version('search/search_filters_class.js'));
                    $this->_add_js(auto_version('search/marker_with_label.js'));
                    $this->_add_js(auto_version('search/map_class.js'));
                    $this->_add_js(auto_version('search/search_class.js'));
                    $this->_add_js(auto_version('rooms/calendar_wrapper_class.js'));
                    $this->_add_js(auto_version('rooms/room_booker_class.js'));
                    $this->_add_js(auto_version('rooms/rooms.js'));
                    $this->_add_js_variable('mobileSite', true);
                    $this->_add_js_variable('isMobileVariable', true);
                    $this->_add_css('<link href="' . auto_version('venues.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('zebra_datepicker.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    switch ($template)
                    {
                        case 'book-room':

                            $this->data['message_element'] = 'rooms/book_now_page';
                        break;

                        default:

                            $this->data['message_element'] = 'rooms/view_room';
                        break;
                    }
                }
                else
                {
                    $this->_add_js(auto_version('zebra_datepicker.js'));
                    $this->add_datepicker_files();
                    $this->_add_js(auto_version('jquery_plugins/jquery.rating.pack.js'));
                    $this->_add_js(auto_version('rooms/calendar_wrapper_class.js'));
                    $this->_add_js(auto_version('rooms/room_booker_class.js'));
                    $this->_add_js(auto_version('rooms/rooms.js'));
                    $this->_add_js(auto_version('rooms/variables.js'));
                    $this->_add_js(manifest_item('spaces.js'));
                    $this->_add_js_variable('mobileSite', false);
                    $this->_add_js_variable('isMobileVariable', false);
                    $this->_add_css('<link href="' . auto_version('plugins/jquery.rating.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('venues.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('zebra_datepicker.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('vendor/featherlight.1.3.5.min.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->add_phone_plugin_files();
                    if ($isAdmin)
                    {
                        $this->add_switchery_plugin_files();
                        $this->add_froala_files();
                        $this->_add_js(auto_version('modals/hubspot.js'));
                        $this->_add_js(auto_version('administrator/admin.js'));
                        $this->_add_js(auto_version('administrator/rooms.js'));
                        $this->data['reserved_full_dimension_modal'] = true;
                    }
                    $this->data['message_element'] = 'rooms/view_room';
                    //this could use the room preferred asset tag...
                    $this->_get_footer_locations($room->get('venue_country_code'));
                }
                if ($this->_is_widget_mode())
                {
                    $this->data['widget_back_link'] = '/' . $this->data['country_lang_url'] . '/widget?token=' . $room->get('company_token');
                    $this->data['company_name'] = $room->get('company_name');
                }
                $this->_add_js_variable('isLoggedIn', $this->dx_auth->is_logged_in());
                $this->_add_js_variable('room', $room->get_as_array());
                $this->_add_js_variable('roomId', $roomId);
                $this->_add_js_variable('assetId', $assetId);
                $this->_add_js_variable('bookingData', $this->data['bookingData']);
                $this->_add_js_variable('isAdmin', $isAdmin);
                $this->_add_js_variable('closedDaysData', $this->data['closedDaysData']);
                $this->_add_js_variable('dynx_itemid', $room->get_id());
                $this->_add_js_variable('dynx_pagetype', 'offerdetail');
                $this->_add_js_variable('zc_room_name', htmlentities($room->get('title'), ENT_QUOTES, 'UTF-8'));
                $this->_add_js_variable('zc_venue_name', htmlentities($venue->get('name'), ENT_QUOTES, 'UTF-8'));
                $this->_add_js_variable('zc_address', htmlentities($venue->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                $this->_add_js_variable('zc_currency', $room->get('currency_code'));
                $this->_add_js_variable('zc_booking_type', htmlentities($room->get('usage_superset_desc'), ENT_QUOTES, 'UTF-8'));
                if ($isAdmin)
                {
                    $this->_add_js_variable('adminId', $this->dx_auth->get_user_id());
                }
                $this->add_email_js_variable();
                $this->_render();
                $this->load->helper('analytics');
                $analytics_helper = new Analytics_Helper();
                $analytics_helper->register_tracking_event('ROOM_VIEW', [$room->get_id()]);
            }
            else
            {
                $venue = $this->$modelVenues->get_venue_object_by_room_id($roomId, true);
                if ($venue->exists_in_db() && $venue->data_not_empty('city') && $venue->data_not_empty('country'))
                {
                    redirect('/' . $this->data['country_lang_url'] . '/s/' . (($usagesuperset_alias == '')?$this->data['default_tag_slug']:$usagesuperset_alias) . '/' . $venue->get('city') . '--' . $venue->get('country'), 'location', 301);
                }
                else
                {
                    return $this->_page_404();
                }
            }
        }
        else
        {
            return $this->_page_404();
        }
    }

    private function _get_closed_days_data_by_asset($weekly_opening_hours, $assetId)
    {
        $modelbookedPeriod = Model__booked_periods::class;
        $this->load->model($modelbookedPeriod);
        return [
            'daysOfWeek' => $weekly_opening_hours->get_closed_day_ids(),
            'holidayDates' => [],
            'unavailableDatesForHourly' => $this->$modelbookedPeriod->get_full_dates_array_by_asset($assetId, true),
            'unavailableDatesForDaily' => $this->$modelbookedPeriod->get_full_dates_array_by_asset($assetId)
        ];
    }

    private function _get_booking_data($room)
    {
        if (!$room->is_null('user_discount'))
        {
            $daily_rate = $room->get('discount_daily_rate');
            $daily_delegate_rate = $room->get('discount_daily_delegate_rate');
        }
        else
        {
            $daily_rate = $room->get('daily_rate');
            $daily_delegate_rate = $room->get('daily_delegate_rate');
        }
        return ['minimumBookingMinutes' => $room->get('minimum_hourly_stay'),
            'minimumBookingDays' => 1, //in case we ever need minimum day periods
            'dailyBookingOnly' => !$room->data_exists('hourly_rate'),
            'dailyStandardRate' => $daily_rate,
            'dailyDelegateRate' => $daily_delegate_rate,
            'minimumDelegates' => $room->get('minimum_delegates')
        ];
    }

    public function room_listing($roomId = '', $venueId = '', $usagesuperset_alias = '', $city = '')
    {
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        if ($venueId !== '' && is_numeric($venueId))
        {
            $venue = $this->$modelVenues->get_venue_object_by_asset_id($venueId, true);
            if ($venue->exists_in_db())
            {
                redirect(get_venue_url($venue, true));
            }
        }
        if ($roomId !== '' && is_numeric($roomId))
        {
            $modelRooms = Model__simple_rooms::class;
            $this->load->model($modelRooms);
            $room = $this->$modelRooms->get_room_object_by_asset_id($roomId, true, false);
            if ($room->exists_in_db())
            {
                $venue = $this->$modelVenues->get_venue_object_by_id($room->get('venue_id'), true);
                if ($venue->exists_in_db())
                {
                    redirect(get_venue_url($venue, true));
                }
            }
        }
    }
}