<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reviews extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            //hack to turn mobile to desktop
            $this->_set_display_type(Controller_Base__Page::PAGE);
        }
        $this->_suppress_footer();
    }

    public function index($type = '')
    {
        try
        {
            $token = $this->input->get('token', 'alpha_numeric|required');
            if ($type != '')
            {
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                switch ($type)
                {
                    case 'reservation':

                        $modelReservations = Model__reservations::class;
                        $this->load->model($modelReservations);
                        $reservation = $this->$modelReservations->get_extended_reservation_by_review_token($token);
                        if ($reservation->exists_in_db())
                        {
                            $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($reservation->get('asset_id'));
                            if ($venue->exists_in_db())
                            {
                                $this->data['review'] = new Review();
                                $this->data['venue'] = $venue;
                                $this->data['reservation'] = $reservation;
                                $this->_add_js_variable('hasReservation', true);
                                $this->_add_js_variable('userId', $reservation->get('client_id'));
                                $this->_add_js_variable('zc_room_name', $reservation->get('room_name'));
                                $this->_add_js_variable('zc_venue_name', $reservation->get('venue_name'));
                                $this->_add_js_variable('zc_address', htmlentities($venue->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                                $this->_add_js_variable('zc_start_date', $reservation->wrangle('reservation_start_date_time')->formatted());
                                $this->_add_js_variable('zc_end_date', $reservation->wrangle('reservation_end_date_time')->formatted());
                                $this->_add_js_variable('zc_guests', $reservation->get('guests'));
                                $this->_add_js_variable('zc_currency', $reservation->get('currency'));
                                $this->_add_js_variable('zc_total_value', $reservation->wrangle('total_price')->round_to_currency_quantum());
                                $this->_add_js_variable('zc_booking_length', $reservation->wrangle('reservation_duration')->formatted());
                                $this->_add_js_variable('zc_first_name', $reservation->get('client_first_name'));
                                $this->_add_js_variable('zc_last_name', $reservation->get('client_last_name'));
                                $this->_add_js_variable('zc_email', $reservation->get('client_email'));
                            }
                            else
                            {
                                redirect('errors/page_missing');
                            }
                        }
                        else
                        {
                            $this->data['review_set'] = true;
                        }
                    break;

                    case 'request':

                        $modelVenueReviewsRequest = Model__venue_reviews_requests::class;
                        $this->load->model($modelVenueReviewsRequest);
                        $reviewAudit = $this->$modelVenueReviewsRequest->get_review_audit_by_token($token);
                        if ($reviewAudit->exists_in_db())
                        {
                            $venue = $this->$modelVenues->get_venue_object_by_asset_id($reviewAudit->get('asset_id'));
                            if ($venue->exists_in_db())
                            {
                                $modelRooms = Model__room_skeletons::class;
                                $this->load->model($modelRooms);
                                $rooms = $this->$modelRooms->get_room_object_collection_by_venue_asset_id($venue->get('asset_id'));
                                if ($rooms->exists_in_db())
                                {
                                    $this->data['review'] = new Review();
                                    $this->data['venue'] = $venue;
                                    $this->data['rooms'] = $rooms;
                                    $this->data['user_first_name'] = $reviewAudit->get('first_name');
                                    $this->_add_js_variable('hasReservation', false);
                                    $this->_add_js_variable('userId', $reviewAudit->get('user_id'));
                                    $this->_add_js_variable('zc_venue_name', $venue->get('name'));
                                    $this->_add_js_variable('zc_address', htmlentities($venue->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                                    $this->_add_js_variable('zc_first_name', $reviewAudit->get('first_name'));
                                    $this->_add_js_variable('zc_last_name', $reviewAudit->get('last_name'));
                                    $this->_add_js_variable('zc_email', $reviewAudit->get('email'));
                                }
                                else
                                {
                                    redirect('errors/page_missing');
                                }
                            }
                            else
                            {
                                redirect('errors/page_missing');
                            }
                        }
                        else
                        {
                            $this->data['review_set'] = true;
                        }
                    break;

                    default:

                        redirect('/' . $this->data['country_lang_url']);
                    break;
                }
                $this->_add_js_variable('dynx_pagetype', 'other');
                $this->_add_js(auto_version('jquery_plugins/jquery.rating.pack.js'));
                $this->_add_js(auto_version('reviews/token_review.js'));
                if (!isset($this->data['review_set']))
                {
                    $this->_add_css('<link href="' . auto_version('plugins/jquery.rating.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                    $this->_add_css('<link href="' . auto_version('write_review.css') . '" media="all" rel="stylesheet" type="text/css" />');
                }
                $this->data['message_element'] = "reviews/view_write_review";
                $this->_render();
            }
            else
            {
                redirect('/' . $this->data['country_lang_url']);
            }
        }
        catch (Exception $ex)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }
}