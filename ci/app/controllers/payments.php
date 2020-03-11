<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Payments Controller Class
 *
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            Payment
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */

class Payments extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->lang->load('users', config_item('language_code'));
        $this->lang->load('payments', config_item('language_code'));
        $this->_suppress_footer();
    }

    function index()
    {
        try
        {
            $modelFullRoom = Model__full_rooms::class;
            $this->load->model($modelFullRoom);
            $room = $this->$modelFullRoom->get_room_object_by_asset_id($this->input->get('asset_id','is_natural_no_zero'));
            if (!$room->exists_in_db())
            {
                redirect('errors/page_missing');
            }
            else
            {
                if ($this->dx_auth->is_logged_in())
                {
                    $modelUsers = Model__users::class;
                    $this->load->model($modelUsers);
                    $user = $this->$modelUsers->get_user_by_id($this->get_user_id(), true);
                    $this->_add_js_variable('userIsLoggedIn', true);
                    $this->_add_js_variable('client_id', $this->get_user_id());
                }
                else
                {
                    $user = new User();
                    $this->_add_js_variable('userIsLoggedIn', false);
                }
                $assetId = $room->get('asset_id');
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($assetId);
                if (!$venue->exists_in_db())
                {
                    redirect('errors/page_missing');
                }
                $request = new Booking_Request();
                $request->populate_from_bindings($this->input->get());
                $request->set_room_currency($room);
                $request->set_commission_vat($venue->get_venue_vat());
                $venue_vat = $request->get_venue_vat();
                if (!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))
                {
                    $cancel_fee = (($room->get('flexible_percent') / 100) * $request->get_price());
                    if ($venue_vat > 0)
                    {
                        $cancel_fee_without_vat = ($cancel_fee / (1 + ($venue_vat / 100)));
                        $cancelFee = $cancel_fee_without_vat;
                        $cancelFeeVAT = ($cancel_fee - $cancel_fee_without_vat);
                    }
                    else
                    {
                        $cancelFee = $cancel_fee;
                        $cancelFeeVAT = 0;
                    }
                    $request->set('cancel_price', $request->get_price() + $cancelFee + $cancelFeeVAT);
                    $request->set('flexible_fee', $cancelFee);
                }
                if (!$request->is_valid())
                {
                    redirect(get_room_url($room));
                }
                if ($request->is_daily())
                {
                    $modelOpeningHours = Model__opening_hours::class;
                    $this->load->model($modelOpeningHours);
                    $openingHours = $this->$modelOpeningHours->get_weekly_opening_object_collection_by_asset_id($assetId);
                    $bookedPeriod = $openingHours->as_booked_period($request->get('start_date'), $request->get('end_date'), $assetId);
                    $request->set('period', $bookedPeriod);
                }
                else
                {
                    $request->convert_slots_to_booked_period();
                }
                if ($this->dx_auth->is_logged_in())
                {
                    $modelUserAssetMember = Model__user_asset_members::class;
                    $this->load->model($modelUserAssetMember);
                    $user_discount = $this->$modelUserAssetMember->get_user_by_asset_and_id($room->get_asset_id(), $this->get_user_id());
                    if ($user_discount->exists_in_db())
                    {
                        $request->set('discount', $user_discount->get('discount'));
                    }
                }
                $modelConfigurations = Model__configurations::class;
                $this->load->model($modelConfigurations);
                $configurations = $this->$modelConfigurations->get_config_object_collection_by_asset_id($assetId, $request->get('guests'));
                if (!$configurations->exist())
                {
                    redirect(get_room_url($room));
                }
//                $modelAssetCancellations = Model__asset_cancellations::class;
//                $this->load->model($modelAssetCancellations);
//                $this->data['cancellation'] = $this->$modelAssetCancellations->get_cancellation_type_by_asset($venue->get_asset_id());
//                $modelReservations = Model__reservations::class;
//                $this->load->model($modelReservations);
//                $this->data['past_bookings'] = $this->$modelReservations->get_completed_reservation_count_by_asset($assetId);
//                $this->data['interested'] = $this->$modelReservations->get_reservation_interest_count_by_asset($assetId);
//                $this->data['reviews'] = $this->get_reviews();
                $this->data['new_css'] = true;
                $this->_add_js('https://apis.google.com/js/platform.js');
                $this->_add_js('https://apis.google.com/js/api:client.js?onload=onLoad');
                $modelBrainwrap = Model__brainwrap::class;
                $this->load->model($modelBrainwrap);
//                if ($this->get_display_type() == Controller_Base__Page::MOBILE)
//                {
//                    $this->_add_js_variable('mobileSite', true);
//                    $this->_add_js_variable('isLoggedIn', $this->dx_auth->is_logged_in());
//                    $this->_add_js(auto_version('mobile/checkout.js'));
//                    // $this->_add_js(auto_version('mobile/mobile_search.js'));
//                }
//                else
//                {
                    $this->_add_js_variable('mobileSite', false);
                    $this->add_phone_plugin_files();
                    $this->_add_js(node_module('tippy.js/dist/tippy.min.js'));
                    $this->_add_js(auto_version('modals/terms_and_conditions.js'));
                    $this->_add_js(manifest_item('payments.js'));
                    $this->_add_css('<link href="' . node_module('tippy.js/dist/tippy.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('new/payments/payments.css') . '" media="all" rel="stylesheet" type="text/css" />');
//                }
                $this->load->library('LinkedInAPI');
                $this->_add_js('https://js.braintreegateway.com/v2/braintree.js');
                $lang = get_lang_json(['common', 'payments', 'users']);
                $ret_user = [
                    'id' => ((!$user->is_null('id'))?$user->get_id():''),
                    'email' => ((!$user->is_null('email'))?$user->get('email'):''),
                    'first_name' => ((!$user->is_null('first_name'))?$user->get('first_name'):''),
                    'last_name' => ((!$user->is_null('last_name'))?$user->get('last_name'):''),
                    'phone_number' => ((!$user->is_null('phone_number') && $user->data_not_empty('phone_number'))?$user->get('phone_number'):''),
                    'is_admin' => $this->dx_auth->is_admin() || $this->dx_auth->is_spoof_mode(),
                    'is_logged_in' => $this->dx_auth->is_logged_in(),
                    'is_business_user' => ((!$user->is_null('is_business_user'))?$user->is_true('is_business_user'):false),
                ];
                $retConfigs = [];
                foreach ($configurations->object() as $config)
                {
                    $retConfigs[] = [
                        'config_id' => $config->get_id(),
                        'max_capacity' => $config->get('max_capacity'),
                        'desc' => $config->get('desc')
                    ];
                }
                $roomArr = $room->get_as_array();
                $roomArr['review_count_wrangled'] = $room->get('reviews')->wrangle('review_count')->formatted();
                $percentage = $this->$modelFullRoom->get_asset_commission_percentage($room, Booking_Channel::FRONTEND);
                $revenue = ((ceil($request->get('base_price') * $percentage * 1000)) / 100000);
                $this->data['checkout_component'] = render_component('payments/', 'Checkout', 'checkout', [
                    'bookingRequest' => [
                        'room_id' => $room->get_id(),
                        'booking_type' => $request->get('booking_type'),
                        'start_date' => $request->get('start_date'),
                        'end_date' => $request->get('end_date'),
                        'duration' => $request->get('period')->wrangle('duration')->formatted(),
                        'guests' => $request->get('guests'),
                        'guests_wrangled' => $request->wrangle('guests')->formatted(),
                        'base_price' => $request->get('base_price'),
                        'flexible_price' => ($request->get('cancel_price') - $request->get('base_price')),
                        'cancel_price' => $request->get('cancel_price'),
                        'currency_code' => $room->get('currency_code'),
                        'currency_symbol_left' => $request->get('currency_symbol_left'),
                        'currency_symbol_right' => $request->get('currency_symbol_right'),
                        'slots' => $request->get('slots')->get_as_array()['objects'],
                        'checkin' => $request->wrangle('start_date_time')->formatted('checkoutfull'),
                        'checkout' => $request->wrangle('end_date_time')->formatted('checkoutfull'),
                        'total' => $request->get('cancel_price'),
                        'zipcube_revenue' => $revenue
                    ],
                    'btToken' => $this->$modelBrainwrap->get_client_token(),
                    'amenities' => $room->get('amenities')->get_as_array()['objects'],
                    'configurations' => $retConfigs,
                    'defaultConfiguration' => $retConfigs[0],
                    'country_lang_url' => $this->data['country_lang_url'],
                    'lang' => $lang,
                    'linkedin_login_link' => $this->linkedinapi->get_login_link_url(),
                    'room' => $roomArr,
                    'address' => $room->get_venue_address(),
                    'fullAddress' => $room->get('address'),
                    'user' => $ret_user,
                    'showMobileSidebar' => false
                ]);
                $this->_add_js_variable('linkedin_login_link', $this->linkedinapi->get_login_link_url());
                if ($this->get_display_type() == Controller_Base__Page::MOBILE)
                {
                    //hack to turn mobile to responsive site for new urls
                    $this->_set_display_type(Controller_Base__Page::PAGE);
                }
                $this->data['message_element']="payments/view_checkout";
                $this->_hide_menu();
                if ($this->_is_widget_mode())
                {
                    $this->data['widget_back_link'] = get_room_url($room, '', false, true);
                    $this->data['company_name'] = $room->get('company_name');
                }
                $this->_add_js_variable('dynx_itemid', $room->get_id());
                $this->_add_js_variable('dynx_pagetype', 'conversionintent');
                $this->_add_js_variable('dynx_totalvalue', $request->get('base_price'));
                $this->_add_js_variable('zc_room_name', $room->get('title'));
                $this->_add_js_variable('zc_booking_type', $room->get('usage_superset_desc'));
                $this->_add_js_variable('zc_venue_name', $room->get('venue_name'));
                $this->_add_js_variable('zc_address', htmlentities($room->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                $this->_add_js_variable('zc_start_date', $request->wrangle('start_date_time')->formatted());
                $this->_add_js_variable('zc_end_date', $request->wrangle('end_date_time')->formatted());
                $this->_add_js_variable('zc_guests', $request->get('guests'));
                $this->_add_js_variable('zc_currency', $room->get('currency_code'));
                $this->_add_js_variable('zc_booking_length', $request->get('period')->wrangle('duration')->formatted());
                $this->_add_js_variable('zc_first_name', $user->get('first_name'));
                $this->_add_js_variable('zc_last_name', $user->get('last_name'));
                $this->_add_js_variable('zc_email', $user->get('email'));
                $this->_add_js_variable('zc_revenue', $revenue);
                $this->data['dataLayer'] = [
                    [
                        'ecommerce' => [
                            'currencyCode' => $room->get('currency_code'),
                            'add' => [
                                'products' => [
                                    [
                                        'name' => $room->get('title'),
                                        'id' => $room->get_id(),
                                        'price' => (string)$revenue,
                                        'brand' => $room->get('venue_name'),
                                        'category' => $room->get('usage_superset_desc'),
                                        'variant' => '',
                                        'quantity' => 1,
                                        'coupon' => ''
                                    ]
                                ]
                            ]
                        ],
                        'event' => 'addToCart'
                    ],
                    [
                        'ecommerce' => [
                            'checkout' => [
                                'actionField' => [
                                    'step' => 1
                                ],
                                'products' => [
                                    [
                                        'name' => $room->get('title'),
                                        'id' => $room->get_id(),
                                        'price' => (string)$revenue,
                                        'brand' => $room->get('venue_name'),
                                        'category' => $room->get('usage_superset_desc'),
                                        'variant' => '',
                                        'quantity' => 1,
                                        'coupon' => ''
                                    ]
                                ]
                            ]
                        ],
                        'event' => 'checkout',
                    ]
                ];
                $dataArr = [
                    'journey_token_old' => '',
                    'room_id' => $room->get_id(),
                    'booking_type' => $request->get('booking_type'),
                    'start_date_time' => $request->get('period')->get('start'),
                    'end_date_time' => $request->get('period')->get('end'),
                    'guests' => $request->get('guests'),
                    'base_price' => $request->get('base_price'),
                    'slots' => $request->get('slots')
                ];
                $this->load->helper('analytics');
                $checkout_id = $this->_register_checkout($dataArr);
                $this->_add_js_variable('zc_checkout_id', $checkout_id);
                $this->_render();
            }
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    private function _register_checkout($dataArr)
    {
        $checkout = new Checkout($dataArr);
        $ch_out_model = Model__checkout::class;
        $this->load->model($ch_out_model);
        $this->$ch_out_model->insert_update($checkout);
        $checkoutId = $checkout->get('id');
        $this->_handle_slots($checkoutId, $dataArr['slots']);
        $analytics_helper = new Analytics_Helper();
        $analytics_helper->register_tracking_event('HIT_CHECKOUT', [$checkoutId]);
        return $checkoutId;
    }

    private function _handle_slots($checkoutId, $slotsCollection)
    {
        $ch_out_slots_model = Model__checkout_slots::class;
        $this->load->model($ch_out_slots_model);
        $slots_collection = new Checkout_Slot___Collection();
        foreach ($slotsCollection->object() as $slotsItem)
        {
            $slots = new Checkout_Slot();
            $slots->set('checkout_log_id', $checkoutId);
            $slots->set('start', $slotsItem->get('start'));
            $slots->set('end', $slotsItem->get('end'));
            $slots->set('period_id', $slotsItem->get('period_id'));
            $slots_collection->add_object($slots);
        }
        $this->$ch_out_slots_model->insert_update($slots_collection);
    }
}
