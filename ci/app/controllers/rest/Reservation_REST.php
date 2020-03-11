<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Reservation_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function commission_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']) || !isset($get['reservation_id']))
        {
            return $this->response(null, 400);
        }
        $modelRooms = Model__room_skeletons::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($get['room_id'], true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($get['reservation_id']);
        if (!$reservation->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_booking'), 405);
        }
        $commission_percent = $this->$modelRooms->get_asset_commission_percentage($room, $reservation->get('booking_channel_id'));
        return $this->response(json_encode(['error' => ['occurred' => false], 'data' => $commission_percent]), 200);
    }

    public function baseprice_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']) || !isset($get['reservation_id']))
        {
            return $this->response(null, 400);
        }
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($get['room_id'], true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($get['reservation_id']);
        if (!$reservation->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_booking'), 405);
        }
        $flex = 0;
        if (!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))
        {
            $flex = $room->get('flexible_percent');
        }
        $priceArr = [];
        if ($reservation->is_true('all_day') && !$room->is_null('daily_rate'))
        {
            $new_day_price = ($reservation->wrangle('reservation_duration')->get_days() * $room->get('daily_rate'));
            $priceArr['trans_non'] = $new_day_price;
            $priceArr['trans_flex'] = ($new_day_price + ($new_day_price * ($flex / 100)));
            $priceArr['base'] = ($reservation->wrangle('reservation_duration')->get_days() * $room->get('venue_daily_rate'));
        }
        elseif (!$room->is_null('hourly_rate'))
        {
            $new_hour_price = ($reservation->wrangle('reservation_duration')->get_hours() * $room->get('hourly_rate'));
            $priceArr['trans_non'] = $new_hour_price;
            $priceArr['trans_flex'] = ($new_hour_price + ($new_hour_price * ($flex / 100)));
            $priceArr['base'] = ($reservation->wrangle('reservation_duration')->get_hours() * $room->get('venue_hourly_rate'));
        }
        return $this->response(json_encode(['error' => ['occurred' => false], 'data' => $priceArr]), 200);
    }

    public function openinghours_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']) || !isset($get['reservation_id']))
        {
            return $this->response(null, 400);
        }
        $modelRooms = Model__room_skeletons::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($get['room_id'], true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($get['reservation_id']);
        if (!$reservation->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_booking'), 405);
        }
        if ($reservation->is_true('all_day'))
        {
            $modelOpeningHours = Model__opening_hours::class;
            $this->load->model($modelOpeningHours);
            $hours = $this->$modelOpeningHours->get_weekly_opening_object_collection_by_asset_id($room->get_asset_id());
        }
        else
        {
            $hours = new Opening_Hours();
        }
        return $this->response($hours->get_as_ajax_response('No hours found for this space. Please select another space.'), 200);
    }

    public function index_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($put['id']);
        if (!$reservation->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_booking'), 405);
        }
        $dataToChange = false;
        $fieldArr = [
            'zipcube_notes',
            'source'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $reservation->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if (isset($put['assigned_user']))
        {
            if (!empty($put['assigned_user']))
            {
                $reservation->set('assigned_user', $put['assigned_user']);
            }
            else
            {
                $reservation->set('assigned_user');
            }
            $dataToChange = true;
        }
        if (isset($put['requires_switch']))
        {
            $reservation->set('requires_switch', $put['requires_switch']);
            $dataToChange = true;
            if ($put['requires_switch'] == 1)
            {
                $reservation->set('needed_switch', 1);
                if ($reservation->is_null('switch_datetime'))
                {
                    $reservation->set('switch_datetime', date("Y-m-d H:i:s"));
                }
            }
        }
        if ($dataToChange)
        {
            $this->$modelReservations->insert_update($reservation);
        }
        if (!$reservation->is_null('hubspot_id'))
        {
            $properties = [];
            $this->load->library('HubspotAPI');
            if (isset($put['requires_switch']) && $put['requires_switch'] == 1)
            {
                $properties[] = (object) [
                    'name' => 'switch',
                    'value' => true
                ];
            }
            if (isset($put['assigned_user']))
            {
                if (!empty($put['assigned_user']))
                {
                    $modelUsers = Model__users::class;
                    $this->load->model($modelUsers);
                    $adminuser = $this->$modelUsers->get_user_by_id($put['assigned_user']);
                    if ($adminuser->exists_in_db())
                    {
                        $assignedAdmin = $adminuser->get('hubspot_id');
                    }
                }
                else
                {
                    $assignedAdmin = '';
                }
                $properties[] = (object) [
                    'name' => 'hubspot_owner_id',
                    'value' => $assignedAdmin
                ];
                try
                {
                    if ($assignedAdmin != '')
                    {
                        $contact_properties[] = (object) [
                            'property' => 'hubspot_owner_id',
                            'value' => $assignedAdmin
                        ];
                        $contact_response = $this->hubspotapi->update_user($reservation->get('client_hubspot_id'), $contact_properties);
                        if (!isset($contact_response['status']) || (isset($contact_response['status']) && $contact_response['status'] != 200))
                        {
                            error_log("Unable to update contact (" . $reservation->get('client_hubspot_id') . ") on Hubspot: " . json_encode($contact_response));
                        }
                    }
                }
                catch (Exception $exc)
                {
                    error_log("Unable to connect to Hubspot to update contact (" . $reservation->get('client_hubspot_id') . ") status: " . $exc->getMessage());
                }
            }
            try
            {
                if (count($properties > 0))
                {
                    $deal_response = $this->hubspotapi->update_deal($reservation->get('hubspot_id'), $properties);
                    if (!isset($deal_response['status']) || (isset($deal_response['status']) && $deal_response['status'] != 200))
                    {
                        error_log("Unable to update deal (" . $reservation->get_id() . ") on Hubspot: " . json_encode($deal_response));
                    }
                }
            }
            catch (Exception $exc)
            {
                error_log("Unable to connect to Hubspot to update deal (" . $reservation->get_id() . ") status: " . $exc->getMessage());
            }
        }
        return $this->response([], 200);
    }

    public function paid_post()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $post = $this->post();
        if (!isset($post['period_id']) || !isset($post['entity_id']) || !isset($post['country_code']))
        {
            return $this->response(null, 400);
        }
        $modelPaymentPeriods = Model__payment_periods::class;
        $this->load->model($modelPaymentPeriods);
        $period = $this->$modelPaymentPeriods->get_base_object_by_id($post['period_id']);
        if (!$period->exists_in_db())
        {
            return $this->response('No payment period', 405);
        }
        $modelFinancialEntities = Model__financial_entities::class;
        $this->load->model($modelFinancialEntities);
        $fin_entity = $this->$modelFinancialEntities->get_financial_entity_object_by_id($post['entity_id']);
        if (!$fin_entity->exists_in_db())
        {
            return $this->response('No financial entity', 405);
        }
        $modelReservationPayment = Model__reservation_venue_payments::class;
        $this->load->model($modelReservationPayment);
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservations = $this->$modelReservations->get_reservations_by_financial_entity($fin_entity->get_id(), $post['country_code'], $period->get('period_year'), $period->get('period_month'));
        if (!$reservations->exists_in_db())
        {
            return $this->response('No reservations', 405);
        }
        foreach ($reservations->object() as $reservation)
        {
            if (!$reservation->is_true('is_paid'))
            {
                $venue_payment = new Reservation_Venue_Payment();
                $venue_payment->set('reservation_id', $reservation->get_id());
                $venue_payment->set('amount', $reservation->get_payout_amount());
                $this->$modelReservationPayment->insert_update($venue_payment);
            }
        }
        return $this->response([], 201);
    }

    public function recent_get()
    {
        $get = $this->get();
        $limit = 10;
        if (isset($get['sw_lat']) && isset($get['sw_lon']) && isset($get['ne_lat']) && isset($get['ne_lon']))
        {
            $retRes = [];
            $results = $this->_get_recent_reservations($limit, $get['sw_lat'], $get['sw_lon'], $get['ne_lat'], $get['ne_lon']);
            $num_results = $this->db->get_row_count();
            if ($num_results < $limit)
            {
                $retRes = array_merge($results, $this->_get_recent_reservations($limit - $num_results));
            }
            else
            {
                $retRes = $results;
            }
            return $this->response($retRes, 200);
        }
        else
        {
            return $this->response($this->_get_recent_reservations($limit), 200);
        }
    }

    private function _get_recent_reservations($limit, $sw_lat = null, $sw_lon = null, $ne_lat = null, $ne_lon = null)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservations = $this->$modelReservations->get_recent_reservations($limit, $sw_lat, $sw_lon, $ne_lat, $ne_lon);
        $retArr = [];
        if ($reservations->exists_in_db())
        {
            foreach ($reservations->object() as $reservation)
            {
                $retArr[] = [
                    'name' => ucfirst($reservation->get('client_first_name')) . ' ' . mb_substr(ucfirst($reservation->get('client_last_name')), 0, 1),
                    'image' => $reservation->wrangle('image')->get_url('medium')
                ];
            }
        }
        return $retArr;
    }
}