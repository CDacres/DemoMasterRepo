<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            //hack to turn mobile to desktop
            $this->_set_display_type(Controller_Base__Page::PAGE);
        }
        if ($this->dx_auth->is_logged_in())
        {
            $this->lang->load('users', config_item('language_code'));
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $this->data['reserved_user'] = $this->$modelUsers->get_user_by_id($this->get_user_id());
            $this->_suppress_footer();
            $this->data['reserved_full_modal'] = true;
            $this->_add_js_variable('dynx_pagetype', 'other');
            $this->_add_js_variable('zc_first_name', $this->data['reserved_user']->get('first_name'));
            $this->_add_js_variable('zc_last_name', $this->data['reserved_user']->get('last_name'));
            $this->_add_js_variable('zc_email', $this->data['reserved_user']->get('email'));
        }
    }

    public function check_logged_in()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            redirect($this->data['country_lang_url'] . '/users/signup','refresh');
        }
        return true;
    }

    private function _set_snippet_content($path, $folder, $data = [])
    {
        $data['lang'] = $this->lang;
        $data['country_lang_url'] = $this->data['country_lang_url'];
        $this->data['reserved_snippet_path'] = $path;
        $this->data['reserved_snippet_content'] = $this->load->view(THEME_FOLDER . '/dashboard/' . $folder . '/snippets/' . $path, $data, true);
    }

    private function _set_sidebar_content($path, $folder, $data = [])
    {
        $data['lang'] = $this->lang;
        $data['country_lang_url'] = $this->data['country_lang_url'];
        $this->data['reserved_sidebar_path'] = $path;
        $this->data['reserved_sidebar_content'] = $this->load->view(THEME_FOLDER . '/dashboard/' . $folder . '/snippets/' . $path, $data, true);
    }

    public function index()
    {
        if ($this->check_logged_in())
        {
            $userId = $this->data['reserved_user']->get_id();
            $data['user'] = $this->data['reserved_user'];
            $data['num_results'] = 0;
            $modelMessage = Model__message::class;
            $this->load->model($modelMessage);
            $messages = $this->$modelMessage->get_users_messages_collection($userId, 4);
            if ($messages->exists_in_db())
            {
                $data['messages'] = $messages;
                $data['num_results'] = $this->db->get_row_count();
                $data['message_unread'] = $this->$modelMessage->get_count_of_unread_messages();
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                $data['venue_user'] = [];
                foreach ($messages->object() as $message)
                {
                    $data['venue_user'][$message->get_id()] = $this->$modelUserAsset->check_your_privilege($message->get('asset_id'), $userId, Runt_User_Asset_Privilege::APPROVAL);
                }
            }
            $this->_set_sidebar_content('sidebar', 'dashboard', $data);
            $this->_set_snippet_content('dashboard', 'dashboard', $data);
            $this->_add_js(auto_version('dashboard/inbox.js'));
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
            $this->data['message_element'] = "dashboard/dashboard/dashboard_wrapper";
            $this->_render();
        }
    }

    public function inbox()
    {
        if ($this->check_logged_in())
        {
            $userId = $this->data['reserved_user']->get_id();
            $user = $this->data['reserved_user'];
            $this->data['num_results'] = 0;
            $modelMessage = Model__message::class;
            $this->load->model($modelMessage);
            $messages = $this->$modelMessage->get_users_messages_collection($userId);
            if ($messages->exists_in_db())
            {
                $this->data['messages'] = $messages;
                $this->data['num_results'] = $this->db->get_row_count();
                $this->data['message_filter'] = $this->$modelMessage->get_count_of_message_type();
                $this->data['message_unread'] = $this->$modelMessage->get_count_of_unread_messages();
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                $this->data['venue_user'] = [];
                foreach ($messages->object() as $message)
                {
                    $this->data['venue_user'][$message->get_id()] = $this->$modelUserAsset->check_your_privilege($message->get('asset_id'), $userId, Runt_User_Asset_Privilege::APPROVAL);
                }
            }
            $this->_add_js(auto_version('dashboard/inbox.js'));
            $this->_add_js_variable('user', $user->get_as_array());
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard.css') . '" media="all" rel="stylesheet" type="text/css" />');
            $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
            $this->data['message_element'] = "dashboard/inbox/inbox";
            $this->_render();
        }
    }

    public function accept_decline_token()
    {
        try
        {
            $token = $this->input->get('token', 'alpha_numeric|required');
            $action = $this->input->get('booking');
            $modelReservation = Model__reservations::class;
            $this->load->model($modelReservation);
            $reservation = $this->$modelReservation->get_reservation_by_token($token);
            if ($reservation->exists_in_db())
            {
                $this->data['action'] = $action;
                $this->data['reservation'] = $reservation;
                $this->data['venue_user'] = true;
                $this->data['object_type'] = "Reservation_Update_Unsigned";
                $modelContactInfo = Model__contact_info::class;
                $this->load->model($modelContactInfo);
                $this->data['contact_info'] = $this->$modelContactInfo->get_default_contact_info_object();
                $this->_add_js(auto_version('dashboard/inbox.js'));
                $this->_add_js(auto_version('tooltips_good.js'));
                $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->_add_css('<link href="' . auto_version('dashboard/dashboard.css') . '" media="all" rel="stylesheet" type="text/css" />');
                $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
                $this->data['message_element'] = "dashboard/inbox/view_message_request";
                $this->_add_js_variable('dynx_pagetype', 'other');
                $this->_add_js_variable('zc_room_name', $reservation->get('room_name'));
                $this->_add_js_variable('zc_venue_name', $reservation->get('venue_name'));
                $this->_add_js_variable('zc_address', htmlentities($reservation->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                $this->_add_js_variable('zc_start_date', $reservation->wrangle('reservation_start_date_time')->formatted());
                $this->_add_js_variable('zc_end_date', $reservation->wrangle('reservation_end_date_time')->formatted());
                $this->_add_js_variable('zc_guests', $reservation->get('guests'));
                $this->_add_js_variable('zc_currency', $reservation->get('currency'));
                $this->_add_js_variable('zc_total_value', $reservation->wrangle('total_price')->round_to_currency_quantum());
                $this->_add_js_variable('zc_booking_length', $reservation->wrangle('reservation_duration')->formatted());
                $this->_add_js_variable('zc_first_name', $reservation->get('client_first_name'));
                $this->_add_js_variable('zc_last_name', $reservation->get('client_last_name'));
                $this->_render();
            }
            else
            {
                redirect('errors/page_missing');
            }
        }
        catch (Exception $ex)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function message_request($reservationid = '', $use_modal = false)
    {
        if ($this->check_logged_in())
        {
            $validator = new Helper__Validator();
            $reservation_id = $validator->validate($reservationid, 'is_natural');
            if ($reservation_id !== '')
            {
                $modelReservation = Model__reservations::class;
                $this->load->model($modelReservation);
                $reservation = $this->$modelReservation->get_extended_reservation_by_id_check_user($reservation_id);
                if ($reservation->exists_in_db())
                {
                    $modelUserAsset = Model__user_asset_privileges::class;
                    $this->load->model($modelUserAsset);
                    $this->data['venue_user'] = $this->$modelUserAsset->check_your_privilege($reservation->get('venue_asset_id'), $this->data['reserved_user']->get_id(), Runt_User_Asset_Privilege::APPROVAL);
                    $this->data['reservation'] = $reservation;
                    $this->data['object_type'] = "Reservation_Update";
                    $modelContactInfo = Model__contact_info::class;
                    $this->load->model($modelContactInfo);
                    $this->data['contact_info'] = $this->$modelContactInfo->get_default_contact_info_object();
                    $this->_add_js(auto_version('dashboard/inbox.js'));
                    $this->_add_js(auto_version('tooltips_good.js'));
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->data['message_element'] = "dashboard/inbox/view_message_request";
                    if ($use_modal)
                    {
                        $this->_set_display_type(self::MODAL_FULLPAGE);
                    }
                    else
                    {
                        $this->_add_js_variable('zc_room_name', $reservation->get('room_name'));
                        $this->_add_js_variable('zc_venue_name', $reservation->get('venue_name'));
                        $this->_add_js_variable('zc_address', htmlentities($reservation->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                        $this->_add_js_variable('zc_start_date', $reservation->wrangle('reservation_start_date_time')->formatted());
                        $this->_add_js_variable('zc_end_date', $reservation->wrangle('reservation_end_date_time')->formatted());
                        $this->_add_js_variable('zc_guests', $reservation->get('guests'));
                        $this->_add_js_variable('zc_currency', $reservation->get('currency'));
                        $this->_add_js_variable('zc_total_value', $reservation->wrangle('total_price')->round_to_currency_quantum());
                        $this->_add_js_variable('zc_booking_length', $reservation->wrangle('reservation_duration')->formatted());
                    }
                    $this->_render();
                }
                else
                {
                    redirect('errors/page_missing');
                }
            }
            else
            {
                redirect('/' . $this->data['country_lang_url']);
            }
        }
    }

    public function message_request_modal($reservationid = '')
    {
        $this->message_request($reservationid, true);
    }

    public function message_conversation($conversationid = '')
    {
        if ($this->check_logged_in())
        {
            $validator = new Helper__Validator();
            $conversation_id = $validator->validate($conversationid, 'is_natural');
            if ($conversation_id !== '')
            {
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $messages = $this->$modelMessage->get_conversation_messages_collection($conversation_id);
                if ($messages->exists_in_db())
                {
                    $this->data['messages'] = $messages;
                    $this->data['num_results'] = $this->db->get_row_count();
                    $this->_add_js(auto_version('dashboard/inbox.js'));
                    $this->_add_js(auto_version('dashboard/message.js'));
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->data['message_element'] = "dashboard/inbox/view_message_conversation";
                    $this->_render();
                }
                else
                {
                    redirect('errors/page_missing');
                }
            }
            else
            {
                redirect('/' . $this->data['country_lang_url']);
            }
        }
    }

    public function message_review($reservationid = '')
    {
        if ($this->check_logged_in())
        {
            $validator = new Helper__Validator();
            $reservation_id = $validator->validate($reservationid, 'is_natural');
            if ($reservation_id !== '')
            {
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $reservation = $this->$modelReservations->get_extended_reservation_by_id_check_user($reservation_id);
                if ($reservation->exists_in_db())
                {
                    $this->data['reservation'] = $reservation;
                    $modelReviews = Model__reviews::class;
                    $this->load->model($modelReviews);
                    $this->data['review'] = $this->$modelReviews->get_review_by_reservation_id($reservationid);
                    $this->_add_js(auto_version('jquery_plugins/jquery.rating.pack.js'));
                    $this->_add_js(auto_version('dashboard/review.js'));
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('plugins/jquery.rating.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->data['message_element'] = "dashboard/inbox/view_message_review";
                    $this->_add_js_variable('zc_room_name', $reservation->get('room_name'));
                    $this->_add_js_variable('zc_venue_name', $reservation->get('venue_name'));
                    $this->_add_js_variable('zc_address', htmlentities($reservation->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                    $this->_add_js_variable('zc_start_date', $reservation->wrangle('reservation_start_date_time')->formatted());
                    $this->_add_js_variable('zc_end_date', $reservation->wrangle('reservation_end_date_time')->formatted());
                    $this->_add_js_variable('zc_guests', $reservation->get('guests'));
                    $this->_add_js_variable('zc_currency', $reservation->get('currency'));
                    $this->_add_js_variable('zc_total_value', $reservation->wrangle('total_price')->round_to_currency_quantum());
                    $this->_add_js_variable('zc_booking_length', $reservation->wrangle('reservation_duration')->formatted());
                    $this->_render();
                }
                else
                {
                    redirect('errors/page_missing');
                }
            }
            else
            {
                redirect('/' . $this->data['country_lang_url']);
            }
        }
    }

    private function booking_nav()
    {
        $leftNav = new Former__Left_Nav();
        if ($this->data['reserved_user']->has_assets())
        {
            $leftNav->set_child_nav($this->lang->line('dashboard_bookings_venue_nav'), 'venue-bookings');
        }
        $leftNav->set_child_nav($this->lang->line('dashboard_bookings_my_nav'), 'bookings');
        return $leftNav;
    }

    public function booking()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->has_assets())
            {
                redirect($this->data['country_lang_url'] . '/dashboard/venue-bookings');
            }
            else
            {
                redirect($this->data['country_lang_url'] . '/dashboard/bookings');
            }
        }
    }

    public function bookings()
    {
        if ($this->check_logged_in())
        {
            $this->_bookings(false);
            $this->data['leftNav']->set_active('bookings');
            $this->_render();
        }
    }

    public function venue_bookings()
    {
        if ($this->check_logged_in())
        {
            if (!$this->data['reserved_user']->has_assets())
            {
                redirect($this->data['country_lang_url'] . '/dashboard/bookings');
            }
            else
            {
                $this->_bookings(true);
                $this->data['leftNav']->set_active('venue-bookings');
                $this->_render();
            }
        }
    }

    private function _bookings($asset_user)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $this->data['bookings'] = $this->$modelReservations->get_reservations_collection_for_user($asset_user);
        $this->data['num_results'] = $this->db->get_row_count();
        $this->data['booking_filter'] = $this->$modelReservations->get_count_of_reservation_type_for_user($asset_user);
        $this->data['booking_current'] = $this->$modelReservations->get_count_of_timespan_reservations_for_user($asset_user, 'current');
        $this->data['booking_upcoming'] = $this->$modelReservations->get_count_of_timespan_reservations_for_user($asset_user, 'upcoming');
        $this->data['booking_previous'] = $this->$modelReservations->get_count_of_timespan_reservations_for_user($asset_user, 'previous');
        if ($asset_user)
        {
            $this->data['message_element'] = "dashboard/bookings/snippets/venue_bookings";
        }
        else
        {
            $this->data['message_element'] = "dashboard/bookings/snippets/user_bookings";
        }
        $this->_add_js(auto_version('dashboard/bookings.js'));
        $this->data['leftNav'] = $this->booking_nav();
        $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('dashboard/dashboard.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('dashboard/booking.css') . '" media="screen" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('venues.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('zebra_datepicker.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('dashboard/inbox.css') . '" media="all" rel="stylesheet" type="text/css" />');
    }

    public function update_user_booking_list()
    {
        if ($this->check_logged_in())
        {
            $page_type = $this->input->post('page_type');
            if ($page_type == 'venue')
            {
                $asset_user = true;
            }
            elseif ($page_type == 'my')
            {
                $asset_user = false;
            }
            else
            {
                $bookings = new Base__Null();
            }
            $btnValue = $this->input->post('value');
            if (isset($asset_user))
            {
                $ordering = (($this->input->post('order_field') != null)?['field' => $this->input->post('order_field'), 'direction' => (($this->input->post('order_direction') != null)?(($this->input->post('order_direction') == 1)?'DESC':'ASC'):'')]:[]);
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                if ($this->input->post('reservation_status_id') != null)
                {
                    try
                    {
                        $bookings = $this->$modelReservations->get_reservations_collection_for_user($asset_user, null, $this->input->post('reservation_status_id', 'is_natural'), $ordering);
                    }
                    catch (Exception $ex)
                    {
                        $bookings = new Base__Null();
                    }
                }
                else
                {
                    $option = $this->input->post('option');
                    if ($option == 'all')
                    {
                        $bookings = $this->$modelReservations->get_reservations_collection_for_user($asset_user, null, null, $ordering);
                    }
                    elseif ($option == 'current' || $option == 'upcoming' || $option == 'previous')
                    {
                        $bookings = $this->$modelReservations->get_reservations_collection_for_user($asset_user, $option, null, $ordering);
                    }
                    else
                    {
                        $bookings = new Base__Null();
                    }
                }
            }
            $html_view_link = 'user_booking_update_list';
            if (isset($asset_user) && $asset_user)
            {
                $html_view_link = 'venue_booking_update_list';
            }
            echo $bookings->get_as_ajax_response('Choosing that option gave an error.', false, ['buttonText' => $btnValue, 'html' => $this->load->view(THEME_FOLDER . '/dashboard/bookings/' . $html_view_link, ['bookings' => $bookings, 'country_lang_url' => $this->data['country_lang_url'], 'lang' => $this->lang], true)]);
        }
    }

    public function schedule()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->has_assets())
            {
                $user = $this->data['reserved_user'];
                $date = new DateTime();
                $dateString = $date->format('Y-m-d');
                $modelRoomsAdmin = Model__rooms_administration::class;
                $this->load->model($modelRoomsAdmin);
                $venues = $this->$modelRoomsAdmin->get_rooms_super_collection_available_to_user($user->get_id(), $dateString);
                if ($venues->exists_in_db())
                {
                    $this->_add_js('//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.9.0/fullcalendar.min.js');
                    $this->_add_js('//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.9.0/lang-all.js');
                    $this->_add_js('//js.braintreegateway.com/v2/braintree.js');
                    $this->_add_js(auto_version('jquery_plugins/scheduler.min.js'));
                    $this->_add_js(auto_version('zebra_datepicker.js'));
                    $this->add_datepicker_files();
                    $this->_add_js(auto_version('modals/reservation_details.js'));
                    $this->_add_js(auto_version('dashboard/calendar.js'));
                    $this->_add_js(auto_version('modals/booking_request.js'));
                    $this->_add_js_variable('date_format', Wrangler__Date::get_format_datepicker_string());
                    $this->_add_css('<link href="' . auto_version('checkout.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.9.0/fullcalendar.min.css" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('plugins/scheduler.min.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('zebra_datepicker.css') . '" media="all" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/schedule.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->add_phone_plugin_files();
                    $this->data['has_rooms'] = true;
                }
                $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->data['message_element'] = "dashboard/schedule";
                $this->_render();
            }
            else
            {
                redirect('errors/page_missing');
            }
        }
    }

    public function findrooms()
    {
        if ($this->check_logged_in())
        {
            $date = new DateTime();
            $dateString = $date->format('Y-m-d');
            $modelRoomsAdmin = Model__rooms_administration::class;
            $this->load->model($modelRoomsAdmin);
            $venues = $this->$modelRoomsAdmin->get_rooms_super_collection_available_to_user($this->data['reserved_user']->get_id(), $dateString);
            if ($venues->exists_in_db())
            {
                $resourceArray = [];
                foreach ($venues->object() as $venueId => $venueRooms)
                {
                    $venueUniqueId = 'venue_' . $venueId;
                    $resourceArray[] = [
                        'id' => $venueUniqueId,
                        'title' => $venueRooms->label(),
                        'unbookable' => true
                    ];
                    foreach ($venueRooms->object() as $room)
                    {
                        $roomId = 'room_' . $room->get('id');
                        $resourceArray[] = [
                            'id' => $roomId,
                            'venue_name' => $room->wrangle('defaulted_venue_name')->value(),
                            'parentId' => $venueUniqueId,
                            'title' => $room->wrangle('defaulted_name')->value(),
                            'asset_id' => $room->get_asset_id(),
                            'unbookable' => false
                        ];
                    }
                }
            }
            echo json_encode($resourceArray);
        }
    }

    public function findevents()
    {
        if ($this->check_logged_in())
        {
            try
            {
                if ($this->input->post())
                {
                    $date = new DateTime($this->input->post('start','is_date'));
                }
                else
                {
                    $date = new DateTime();
                }
                $date->setTime(0,0,0);
                $dateString = $date->format('Y-m-d');
                $jsonEvents=[];
                $modelRoomsAdmin = Model__rooms_administration::class;
                $this->load->model($modelRoomsAdmin);
                $venues = $this->$modelRoomsAdmin->get_rooms_super_collection_available_to_user($this->data['reserved_user']->get_id(), $dateString);
                if ($venues->exists_in_db())
                {
                    foreach ($venues->object() as $venueId => $venueRooms)
                    {
                        $venueUniqueId = 'venue_' . $venueId;
                        $jsonEvents[] = [
                            'resourceId' => $venueUniqueId,
                            'start' => $date->format("c"),
                            'end' => $date->modify('+1day')->format("c"),
                            'color' => 'grey',
                            'rendering' => 'background'
                        ];
                        $date->modify('-1day');
                        foreach ($venueRooms->object() as $room)
                        {
                            $roomId = 'room_' . $room->get('id');
                            $openingHours = $room->get('opening_hours');
                            if ($openingHours->exist(true))
                            {
                                $openingHours->convert_to_daily_mask();
                                foreach ($openingHours->object() as $openPeriod)
                                {
                                    $jsonEvents[] = [
                                        'resourceId' => $roomId,
                                        'start' => date("c", strtotime($dateString) + $openPeriod->get_start()*60),
                                        'end' => date("c", strtotime($dateString) + $openPeriod->get_end()*60),
                                        'color' => 'grey',
                                        'rendering' => 'background'
                                    ];
                                }
                            }
                            else
                            {
                                $jsonEvents[] = [
                                    'resourceId' => $roomId,
                                    'start' => $date->format("c"),
                                    'end' => $date->modify('+1day')->format("c"),
                                    'color' => 'grey',
                                    'rendering' => 'background'
                                ];
                                $date->modify('-1day');
                            }
                            $reservations = $room->get('reservations');
                            foreach ($reservations->object() as $reservation)
                            {
                                if ($reservation->shows_on_calendar())
                                {
                                    $jsonEvents[] = [
                                        'resourceId' => $roomId,
                                        'id' => $reservation->get('id'),
                                        'title' => $reservation->get('title'),
                                        'start' => $reservation->get('start_date_time'),
                                        'end' => $reservation->get('end_date_time'),
                                        'color' => $reservation->get_calendar_colour(),
                                        'textColor' => 'black'
                                    ];
                                }
                            }
                        }
                    }
                }
                echo json_encode($jsonEvents);
            }
            catch (Exception $ex)
            {
                echo $this->_generate_ajax_error($ex->getMessage());
            }
        }
    }

    public function insertevent()
    {
        if ($this->check_logged_in())
        {
            try
            {
                $start = $this->input->post('start');
                $end = $this->input->post('end');
                $assetId = $this->input->post('asset_id', 'is_natural');
                $res = new Reservation();
                $res->set('asset_id', $assetId);
                $res->set('title', $this->input->post('title'));
                $res->set('reservationStatus_id', Reservation_Status::BLOCKED);
                $period = new Booked_Period();
                $period->set('start', $start);
                $period->set('end', $end);
                $period->set('all_day', false);
                $period->set('asset_id', $assetId);
                $res->set('period', $period);
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $reservation = $this->$modelReservations->insert_update($res);
                $extendedReservation = $this->$modelReservations->get_extended_reservation_by_id($reservation->get('id'));
                echo $extendedReservation->get_as_ajax_response();
            }
            catch (Exception $ex)
            {
                echo $this->_generate_ajax_error($ex->getMessage());
            }
        }
    }

    public function listings()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->is_unspoofed_admin())
            {
                redirect($this->data['country_lang_url'] . '/info/admin_deny');
            }
            else
            {
                if ($this->data['reserved_user']->has_assets())
                {
                    $this->_add_js(node_server_dashboard_bundle());
                    $query['lang'] = config_item('language_code');
                    $query['phone_number'] = $this->data['phone_number'];
                    $query['phone_number_display'] = $this->data['phone_number_display'];
                    $this->data['root_component'] = render_page_component($_SERVER['REQUEST_URI'], $query, $this->data['tracking_cookie_id'], $this->data['user']->get_id(), $this->dx_auth->is_admin(), $this->dx_auth->is_spoof_mode());
                    $this->_hide_menu();
                    $this->_remove_legacy_assets();
                    $this->data['message_element'] = "react_inject";
                    $this->_render();
                }
                else
                {
                    redirect('errors/page_missing');
                }
            }
        }
    }

    public function favourites()
    {
        if ($this->check_logged_in())
        {
            $user = $this->data['reserved_user'];
            $modelRooms = Model__simple_rooms::class;
            $this->load->model($modelRooms);
            $this->data['rooms'] = $this->$modelRooms->get_user_favourited_rooms($user->get_id());
            $this->_add_js(auto_version('dashboard/favourites.js'));
            $this->add_switchery_plugin_files();
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $this->data['message_element'] = "dashboard/favourites/favourites";
            $this->_render();
        }
    }

    private function review_nav()
    {
        $leftNav = new Former__Left_Nav();
        $leftNav->set_child_nav($this->lang->line('dashboard_review_my_nav'), 'reviews');
        if ($this->data['reserved_user']->has_assets())
        {
            $leftNav->set_child_nav($this->lang->line('dashboard_review_boost_nav'), 'review-booster');
        }
        return $leftNav;
    }

    public function reviews()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->is_unspoofed_admin())
            {
                redirect($this->data['country_lang_url'] . '/info/admin_deny');
            }
            else
            {
                $userId = $this->data['reserved_user']->get_id();
                $this->_add_css('<link href="' . auto_version('venues.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->_add_js(auto_version('dashboard/account_reviews.js'));
                $this->_add_js(auto_version('dashboard/request_reviews.js'));
                $modelReviews = Model__reviews::class;
                $this->load->model($modelReviews);
                $this->data['asset_reviews'] = $this->$modelReviews->get_reviews_object_collection_by_asset_privileges($userId);
                $this->data['user_reviews'] = $this->$modelReviews->get_reviews_object_collection_by_author_id($userId);
                $modelRooms = Model__room_skeletons::class;
                $this->load->model($modelRooms);
                $this->data['rooms'] = $this->$modelRooms->get_rooms_by_user_asset_privileges($userId);
                $this->data['user_id'] = $userId;
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $this->data['venues'] = $this->$modelVenues->get_venues_by_user_asset_privileges($userId, true);
                $this->data['leftNav'] = $this->review_nav();
                $this->data['leftNav']->set_active('reviews');
                $this->_add_js_variable('reviewBooster', false);
                $this->data['message_element'] = "dashboard/reviews/view_reviews";
                $this->_render();
            }
        }
    }

    public function update_room_reviews_list()
    {
        if ($this->check_logged_in())
        {
            $userId = $this->data['reserved_user']->get_id();
            $modelRooms = Model__simple_rooms::class;
            $this->load->model($modelRooms);
            $modelReviews = Model__reviews::class;
            $this->load->model($modelReviews);
            if ($this->input->post('asset_id') != null)
            {
                try
                {
                    $assetId = $this->input->post('asset_id', 'is_natural');
                    $modelUserAsset = Model__user_asset_privileges::class;
                    $this->load->model($modelUserAsset);
                    if ($this->$modelUserAsset->check_your_privilege($assetId, $userId, Runt_User_Asset_Privilege::UPDATE))
                    {
                        $room = $this->$modelRooms->get_room_object_by_asset_id($assetId, true);
                        if ($room->exists_in_db())
                        {
                            $reviews = $this->$modelReviews->get_reviews_object_collection_by_subject_id($assetId);
                            $btnText = $room->get('title');
                        }
                        else
                        {
                            $reviews = new Base__Null();
                            $btnText = $this->lang->line('dashboard_unknown_room');
                        }
                    }
                    else
                    {
                        $reviews = new Base__Null();
                        $btnText = $this->lang->line('dashboard_unknown_room');
                    }
                }
                catch (Exception $ex)
                {
                    $reviews = new Base__Null();
                    $btnText = $this->lang->line('dashboard_unknown_room');
                }
            }
            else
            {
                $option = $this->input->post('option');
                $btnText = $option;
                if ($option == 'all')
                {
                    $btnText = $this->lang->line('dashboard_rooms_all');
                    $reviews = $this->$modelReviews->get_reviews_object_collection_by_asset_privileges($userId);
                }
                else
                {
                    $reviews = new Base__Null();
                }
            }
            echo $reviews->get_as_ajax_response('Choosing that option gave an error.', false, ['buttonText' => $btnText, 'html' => $this->load->view(THEME_FOLDER . '/dashboard/reviews/reviews_update_list', ['asset_reviews' => $reviews, 'user_id' => $userId, 'lang' => $this->lang], true)]);
        }
    }

    public function request_reviews()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->is_unspoofed_admin())
            {
                redirect($this->data['country_lang_url'] . '/info/admin_deny');
            }
            else
            {
                if ($this->data['reserved_user']->has_assets())
                {
                    $user = $this->data['reserved_user'];
                    $this->_add_css('<link href="' . auto_version('venues.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_js(auto_version('dashboard/request_reviews.js'));
                    $modelVenues = Model__venues::class;
                    $this->load->model($modelVenues);
                    $this->data['venues'] = $this->$modelVenues->get_venues_by_user_asset_privileges($user->get_id(), true);
                    $modelVenueReviewsRequests = Model__venue_reviews_requests::class;
                    $this->load->model($modelVenueReviewsRequests);
                    $this->data['review_audits'] = $this->$modelVenueReviewsRequests->get_review_audit_collection_by_user_asset_privileges($user->get_id());
                    $this->data['leftNav'] = $this->review_nav();
                    $this->data['leftNav']->set_active('review-booster');
                    $this->_add_js_variable('reviewBooster', true);
                    $this->data['message_element'] = "dashboard/reviews/view_request_reviews";
                    $this->_render();
                }
                else
                {
                    redirect('/' . $this->data['country_lang_url'] . '/dashboard/reviews');
                }
            }
        }
    }

    public function update_sent_reviews_list()
    {
        if ($this->check_logged_in())
        {
            $modelVenueReviewsRequests = Model__venue_reviews_requests::class;
            $this->load->model($modelVenueReviewsRequests);
            $review_audits = $this->$modelVenueReviewsRequests->get_review_audit_collection_by_user_asset_privileges($this->data['reserved_user']->get_id(), (($this->input->post('order_field') != null)?['field' => $this->input->post('order_field'), 'direction' => (($this->input->post('order_direction') != null)?(($this->input->post('order_direction') == 1)?'DESC':'ASC'):'')]:[]));
            if ($review_audits->exists_in_db())
            {
                $this->data['review_audits'] = $review_audits;
            }
            else
            {
                $review_audits = new Base__Null();
            }
            echo $review_audits->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/dashboard/reviews/sent_update_list', ['review_audits' => $review_audits, 'lang' => $this->lang], true)]);
        }
    }

    private function members_nav()
    {
        $leftNav = new Former__Left_Nav();
        $leftNav->set_child_nav($this->lang->line('dashboard_member_venue_nav'), 'team-members');
        $leftNav->set_child_nav($this->lang->line('dashboard_member_user_nav'), 'user-members');
        return $leftNav;
    }

    public function members()
    {
        redirect($this->data['country_lang_url'] . '/dashboard/team-members');
    }

    public function venue_team_members()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->is_unspoofed_admin())
            {
                redirect($this->data['country_lang_url'] . '/info/admin_deny');
            }
            elseif (!$this->data['reserved_user']->has_assets(Asset_Type::COMPANY))
            {
                redirect('errors/page_missing');
            }
            else
            {
                $user = $this->data['reserved_user'];
                $modelCompanies = Model__companies::class;
                $this->load->model($modelCompanies);
                $company = $this->$modelCompanies->get_company_object_by_user_id($user->get_id());
                if ($company->exists_in_db())
                {
                    $assetId = $company->get_asset_id();
                    $modelUserAsset = Model__user_asset_privileges::class;
                    $this->load->model($modelUserAsset);
                    if ($this->$modelUserAsset->check_your_privilege($assetId, $user->get_id(), Runt_User_Asset_Privilege::UPDATE))
                    {
                        $modelUsers = Model__users::class;
                        $this->load->model($modelUsers);
                        $data['members'] = $this->$modelUsers->get_all_users_by_company_asset_id($assetId);
                        $modelVenues = Model__venues::class;
                        $this->load->model($modelVenues);
                        $data['venues'] = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($assetId, true);
                    }
                    else
                    {
                        $data['members'] = new Base__Null();
                    }
                    $data['assetId'] = $assetId;
                }
                else
                {
                    $data['members'] = new Base__Null();
                    $data['assetId'] = '';
                }
                $this->_add_js(auto_version('dashboard/members.js'));
                $this->_add_js(auto_version('modals/dashboard/team_members.js'));
                $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->add_phone_plugin_files();
                $data['leftNav'] = $this->members_nav();
                $data['leftNav']->set_active('team-members');
                $this->_set_snippet_content('team_member_list', 'members', $data);
                $this->data['message_element'] = "dashboard/members/members_wrapper";
                $this->_render();
            }
        }
    }

    public function update_team_members_list()
    {
        if ($this->check_logged_in())
        {
            $userId = $this->data['reserved_user']->get_id();
            $modelCompanies = Model__companies::class;
            $this->load->model($modelCompanies);
            $company = $this->$modelCompanies->get_company_object_by_user_id($userId);
            if ($company->exists_in_db())
            {
                $company_assetId = $company->get_asset_id();
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                if ($this->$modelUserAsset->check_your_privilege($company_assetId, $userId, Runt_User_Asset_Privilege::UPDATE))
                {
                    $ordering = (($this->input->post('order_field') != null)?['field' => $this->input->post('order_field'), 'direction' => (($this->input->post('order_direction') != null)?(($this->input->post('order_direction') == 1)?'DESC':'ASC'):'')]:[]);
                    $modelUsers = Model__users::class;
                    $this->load->model($modelUsers);
                    if ($this->input->post('asset_id') != null)
                    {
                        try
                        {
                            $assetId = $this->input->post('asset_id', 'is_natural');
                            $modelVenues = Model__venues::class;
                            $this->load->model($modelVenues);
                            $venue = $this->$modelVenues->get_venue_object_by_asset_id($assetId, true);
                            if ($venue->exists_in_db())
                            {
                                $members = $this->$modelUsers->get_all_users_by_venue_asset_id($assetId, $ordering);
                                $btnText = $venue->get('name');
                            }
                            else
                            {
                                $members = new Base__Null();
                                $btnText = $this->lang->line('dashboard_unknown_venue');
                            }
                        }
                        catch (Exception $ex)
                        {
                            $members = new Base__Null();
                            $btnText = $this->lang->line('dashboard_unknown_venue');
                        }
                    }
                    else
                    {
                        $option = $this->input->post('option');
                        $btnText = $option;
                        if ($option == 'all')
                        {
                            $btnText = $this->lang->line('dashboard_venues_all');
                            $members = $this->$modelUsers->get_all_users_by_company_asset_id($company_assetId, $ordering);
                        }
                        else
                        {
                            $members = new Base__Null();
                            $btnText = $this->lang->line('dashboard_unknown_venue');
                        }
                    }
                }
                else
                {
                    $members = new Base__Null();
                    $btnText = $this->lang->line('dashboard_unknown_venue');
                }
            }
            else
            {
                $company_assetId = '';
                $members = new Base__Null();
                $btnText = $this->lang->line('dashboard_unknown_venue');
            }
            echo $members->get_as_ajax_response('Choosing that option gave an error.', false, ['buttonText' => $btnText, 'html' => $this->load->view(THEME_FOLDER . '/dashboard/members/team_member_update_list', ['members' => $members, 'assetId' => $company_assetId, 'lang' => $this->lang], true)]);
        }
    }

    public function user_members()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->is_unspoofed_admin())
            {
                redirect($this->data['country_lang_url'] . '/info/admin_deny');
            }
            elseif (!$this->data['reserved_user']->has_assets(Asset_Type::COMPANY))
            {
                redirect('errors/page_missing');
            }
            else
            {
                $user = $this->data['reserved_user'];
                $modelCompanies = Model__companies::class;
                $this->load->model($modelCompanies);
                $company = $this->$modelCompanies->get_company_object_by_user_id($user->get_id());
                if ($company->exists_in_db())
                {
                    $assetId = $company->get_asset_id();
                    $modelUserAsset = Model__user_asset_privileges::class;
                    $this->load->model($modelUserAsset);
                    if ($this->$modelUserAsset->check_your_privilege($assetId, $user->get_id(), Runt_User_Asset_Privilege::UPDATE))
                    {
                        $modelAssetUsers = Model__user_asset_members::class;
                        $this->load->model($modelAssetUsers);
                        $data['members'] = $this->$modelAssetUsers->get_all_users_by_asset_id($assetId);
                        $modelVenues = Model__venues::class;
                        $this->load->model($modelVenues);
                        $data['venues'] = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($assetId, true);
                    }
                    else
                    {
                        $data['members'] = new Base__Null();
                    }
                    $data['assetId'] = $assetId;
                }
                else
                {
                    $data['members'] = new Base__Null();
                    $data['assetId'] = '';
                }
                $this->_add_js(auto_version('dashboard/members.js'));
                $this->_add_js(auto_version('modals/dashboard/user_members.js'));
                $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->add_phone_plugin_files();
                $data['leftNav'] = $this->members_nav();
                $data['leftNav']->set_active('user-members');
                $this->_set_snippet_content('user_member_list', 'members', $data);
                $this->data['message_element'] = "dashboard/members/members_wrapper";
                $this->_render();
            }
        }
    }

    public function update_user_members_list()
    {
        if ($this->check_logged_in())
        {
            $userId = $this->data['reserved_user']->get_id();
            $modelCompanies = Model__companies::class;
            $this->load->model($modelCompanies);
            $company = $this->$modelCompanies->get_company_object_by_user_id($userId);
            if ($company->exists_in_db())
            {
                $company_assetId = $company->get_asset_id();
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                if ($this->$modelUserAsset->check_your_privilege($company_assetId, $userId, Runt_User_Asset_Privilege::UPDATE))
                {
                    $ordering = (($this->input->post('order_field') != null)?['field' => $this->input->post('order_field'), 'direction' => (($this->input->post('order_direction') != null)?(($this->input->post('order_direction') == 1)?'DESC':'ASC'):'')]:[]);
                    $modelAssetUsers = Model__user_asset_members::class;
                    $this->load->model($modelAssetUsers);
                    if ($this->input->post('asset_id') != null)
                    {
                        try
                        {
                            $assetId = $this->input->post('asset_id', 'is_natural');
                            $modelVenues = Model__venues::class;
                            $this->load->model($modelVenues);
                            $venue = $this->$modelVenues->get_venue_object_by_asset_id($assetId, true);
                            if ($venue->exists_in_db())
                            {
                                $members = $this->$modelAssetUsers->get_all_users_by_asset_id($assetId, $ordering);
                                $btnText = $venue->get('name');
                            }
                            else
                            {
                                $members = new Base__Null();
                                $btnText = $this->lang->line('dashboard_unknown_venue');
                            }
                        }
                        catch (Exception $ex)
                        {
                            $members = new Base__Null();
                            $btnText = $this->lang->line('dashboard_unknown_venue');
                        }
                    }
                    else
                    {
                        $option = $this->input->post('option');
                        $btnText = $option;
                        if ($option == 'all')
                        {
                            $btnText = $this->lang->line('dashboard_venues_all');
                            $members = $this->$modelAssetUsers->get_all_users_by_asset_id($company_assetId, $ordering);
                        }
                    }
                }
                else
                {
                    $members = new Base__Null();
                    $btnText = $this->lang->line('dashboard_unknown_venue');
                }
            }
            else
            {
                $company_assetId = '';
                $members = new Base__Null();
                $btnText = $this->lang->line('dashboard_unknown_venue');
            }
            echo $members->get_as_ajax_response('Choosing that option gave an error.', false, ['buttonText' => $btnText, 'html' => $this->load->view(THEME_FOLDER . '/dashboard/members/user_member_update_list', ['members' => $members, 'assetId' => $company_assetId, 'lang' => $this->lang], true)]);
        }
    }

    private function account_nav()
    {
        $leftNav = new Former__Left_Nav();
        $leftNav->set_child_nav($this->lang->line('dashboard_edit_profile'), 'edit-profile');
        $leftNav->set_child_nav($this->lang->line('dashboard_change_password'), 'change-password');
        $leftNav->set_child_nav($this->lang->line('dashboard_notifications'), 'subscribe');
        if ($this->data['reserved_user']->has_assets())
        {
            $leftNav->set_child_nav('Widget', 'widget');
        }
        return $leftNav;
    }

    public function account()
    {
        redirect($this->data['country_lang_url'] . '/dashboard/edit-profile');
    }

    public function account_profile()
    {
        if ($this->check_logged_in())
        {
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $this->_add_js(auto_version('dashboard/account_edit_profile.js'));
            $this->add_phone_plugin_files();
            $user = $this->data['reserved_user'];
            $data['user'] = $user;
            $data['leftNav'] = $this->account_nav();
            $data['leftNav']->set_active('edit-profile');
            $this->_set_snippet_content('account_edit_profile', 'account', $data);
            $this->_add_js_variable('user', $user->get_as_array());
            $this->data['message_element'] = "dashboard/account/account_wrapper";
            $this->_render();
        }
    }

    public function account_password()
    {
        if ($this->check_logged_in())
        {
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $data['user'] = $this->data['reserved_user'];
            $data['leftNav'] = $this->account_nav();
            $data['leftNav']->set_active('change-password');
            $this->_set_snippet_content('account_change_password', 'account', $data);
            $this->_add_js(auto_version('dashboard/account_change_password.js'));
            $this->_add_js_variable('user', $this->data['reserved_user']->get_as_array());
            $this->data['message_element'] = "dashboard/account/account_wrapper";
            $this->_render();
        }
    }

    public function account_subscribe()
    {
        if ($this->check_logged_in())
        {
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $data['user'] = $this->data['reserved_user'];
            $data['leftNav'] = $this->account_nav();
            $data['leftNav']->set_active('subscribe');
            $this->_set_snippet_content('account_subscribe', 'account', $data);
            $this->_add_js(auto_version('dashboard/account_subscribe.js'));
            $this->_add_js_variable('user', $this->data['reserved_user']->get_as_array());
            $this->data['message_element'] = "dashboard/account/account_wrapper";
            $this->_render();
        }
    }

    public function account_widget()
    {
        if ($this->check_logged_in())
        {
            if ($this->data['reserved_user']->is_unspoofed_admin())
            {
                redirect($this->data['country_lang_url'] . '/info/admin_deny');
            }
            else
            {
                $user = $this->data['reserved_user'];
                $modelAssets = Model__assets::class;
                $this->load->model($modelAssets);
                $user_company_asset = $this->$modelAssets->get_asset_object_collection_by_user_and_type($user->get_id(), Asset_Type::COMPANY);
                $user_venue_assets = $this->$modelAssets->get_asset_object_collection_by_user_and_type($user->get_id(), Asset_Type::VENUE);
                if ($user_company_asset->exists_in_db() || $user_venue_assets->exists_in_db())
                {
                    $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    if ($user_company_asset->exists_in_db())
                    {
                        $data['token'] = $user_company_asset->get_first()->get('token');
                    }
                    else
                    {
                        $modelVenues = Model__venues::class;
                        $this->load->model($modelVenues);
                        $f_venue = $this->$modelVenues->get_venue_object_by_id($user_venue_assets->get_first()->get('reference_id'));
                        $company_asset = $this->$modelAssets->get_asset_object_by_reference_id_and_type($f_venue->get('company_id'), Asset_Type::COMPANY);
                        $data['token'] = $company_asset->get('token');
                    }
                    $data['leftNav'] = $this->account_nav();
                    $data['leftNav']->set_active('widget');
                    $this->_set_snippet_content('account_widget', 'account', $data);
                    $this->data['message_element'] = "dashboard/account/account_wrapper";
                    $this->_render();
                }
                else
                {
                    redirect('errors/page_missing');
                }
            }
        }
    }
}