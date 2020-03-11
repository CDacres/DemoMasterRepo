<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservations extends Model_Base__Object
{
    use Trait__Currency_Handler;

    function __construct()
    {
        $this->_set_base_class(Reservation::class);
        parent::__construct();
    }

    public function update_reservation_status($protoReservation, $newStatusId, $comment = null, $userRequested = false)
    {
        if ($protoReservation->get('reservationStatus_id') !== $newStatusId)
        {
            $protoReservation->set('status_change_comment', $comment);
            $declineCheckPass = $this->_checkAdminVenueDecline($newStatusId);
            if ($declineCheckPass)
            {
                $this->_unsetSwitchOnSuccess($newStatusId, $protoReservation);
                $protoReservation->set('reservationStatus_id', $newStatusId);
                $object = $this->insert_update($protoReservation, $userRequested);
                $this->_post_status_change($object);
                $this->_handle_booked_period($object);
                if ($protoReservation->get('hubspot_id') != null)
                {
                    try
                    {
                        $hubspotId = $protoReservation->get('hubspot_id');
                        $modelReservationStatus = Model__reservation_status::class;
                        $this->load->model($modelReservationStatus);
                        $status = $this->$modelReservationStatus->get_reservation_status_by_id($protoReservation->get('reservationStatus_id'));
                        $properties[] = (object) [
                            'name' => 'reservationstatus',
                            'value' => $status
                        ];
                        if ($protoReservation->hubspot_closed_won())
                        {
                            $properties[] = (object) [
                                'name' => 'dealstage',
                                'value' => config_item('hubspot_closedwon_stage_id')
                            ];
                        }
                        elseif ($protoReservation->hubspot_closed_lost())
                        {
                            $properties[] = (object) [
                                'name' => 'dealstage',
                                'value' => config_item('hubspot_closedlost_stage_id')
                            ];
                        }
                        $this->load->library('HubspotAPI');
                        $result = $this->hubspotapi->update_deal($hubspotId, $properties);
                        if (!isset($result['status']) || (isset($result['status']) && $result['status'] != 200))
                        {
                            error_log("Unable to update deal (" . $protoReservation->get('id') . ") state on Hubspot: " . json_encode($result));
                        }
                    }
                    catch (Exception $exc)
                    {
                        error_log("Unable to connect to Hubspot to update deal (" . $protoReservation->get('id') . ") status: " . $exc->getMessage());
                    }
                }
            }
            else
            {
                $protoReservation->set('needed_switch', 1);
                $protoReservation->set('requires_switch', 1);
                if ($protoReservation->is_null('switch_datetime'))
                {
                    $protoReservation->set('switch_datetime', date("Y-m-d H:i:s"));
                }
                $protoReservation->suppress_finances_on_insert_update();
                $protoReservation->suppress_emails_on_insert_update(true, false);
                $this->insert_update($protoReservation, $userRequested);
                $this->_handle_comms($protoReservation, Reservation_Status::DECLINE);
            }
        }
    }

    private function _checkAdminVenueDecline($newStatusId)
    {
        $retPass = true;
        if ($newStatusId == Reservation_Status::DECLINE)
        {
            if (!$this->dx_auth->is_admin() || $this->dx_auth->is_spoof_mode())
            {
                $retPass = false;
            }
        }
        return $retPass;
    }

    private function _unsetSwitchOnSuccess($newStatusId, $protoReservation)
    {
        if ($newStatusId == Reservation_Status::AWAITINGHOSTREVIEW || $newStatusId == Reservation_Status::AWAITINGUSERREVIEW || $newStatusId == Reservation_Status::COMPLETED)
        {
            $protoReservation->set('needed_switch', 0);
            $protoReservation->set('requires_switch', 0);
            $protoReservation->set('switch_datetime');
        }
    }

    public function update_review_token($reservation)
    {
        $reservation->set('review_token');
        $this->insert_update($reservation);
    }

    protected function _user_can_select($object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_update($object)
    {
        return $this->user_is_admin();
    }

    protected function _pre_insert($object)
    {
        $object->set('created', date("Y-m-d H:i:s"));
        $object->set('review_token', $this->_add_review_token());
        srand((double) microtime() * 1000000);
        $object->set('token', md5(uniqid(rand(), true)));
        if ($object->get('toZipcube') < 0)
        {
            throw new Exception('The payout amount must be a positive number.');
        }
    }

    private function _add_review_token()
    {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $str = '';
        for ($i = 0; $i < 8; $i++)
        {
            $str .= substr($pool, mt_rand(0, strlen($pool) -1), 1);
        }
        return $str;
    }

    protected function _post_insert($object)
    {
        $period = $object->get('period');
        $period->set('reservation_id', $object->get('id'));
        $modelBookedPeriods = Model__booked_periods::class;
        $this->load->model($modelBookedPeriods);
        $this->$modelBookedPeriods->insert_update($period);
        $this->_post_status_change($object);
    }

    private function _post_status_change($object)
    {
        $this->_audit($object);
        $this->_record_gmv($object);
        $this->_handle_comms($object);
        $this->_further_actions($object);
    }

    private function _audit($object)
    {
        $modelAudit = Model__reservations_audit::class;
        $this->load->model($modelAudit);
        $this->$modelAudit->audit($object);
    }

    private function _record_gmv($object)
    {
        if (!$object->is_null('booking_id'))
        {
            $modelGMV = Model__reservations_gmv_history::class;
            $this->load->model($modelGMV);
            $GMV = new Reservation_Gmv_History();
            $GMV->set('reservation_id', $object->get('id'));
            $GMV->set('reservation_status_id', $object->get_status_id());
            $GMV->set('amount', $object->get_transaction_gmv_total());
            $this->$modelGMV->insert_update($GMV);
        }
    }

    private function _handle_booked_period($reservation)
    {
        if ($reservation->has_closed_badly() || $reservation->has_been_cancelled())
        {
            $modelBookedPeriods = Model__booked_periods::class;
            $this->load->model($modelBookedPeriods);
            $bookedPeriods = $this->$modelBookedPeriods->get_base_object_collection_by_constraints(['reservation_id' => $reservation->get('id')]);
            foreach ($bookedPeriods->object() as $bookedPeriod)
            {
                $bookedPeriod->release();
                $this->$modelBookedPeriods->insert_update($bookedPeriod);
            }
        }
    }

    private function _handle_comms($reservation, $overwrittenStatusId = false)
    {
        $client_suppressed = $reservation->client_emails_are_suppressed();
        $venue_suppressed = $reservation->venue_emails_are_suppressed();
        if (!$client_suppressed || !$venue_suppressed)
        {
            if (!$reservation->exists_in_db())
            {
                throw new Exception('There has been a problem finding the reservation.');
            }
            elseif (!is_a($reservation, Extended_Reservation::class))
            {
                $commsObject = $this->get_extended_reservation_by_id($reservation->get('id'));
            }
            else
            {
                $commsObject = $reservation;
            }
            if ($overwrittenStatusId != false)
            {
                $this->_choose_comm($overwrittenStatusId, $commsObject, $client_suppressed, $venue_suppressed);
            }
            else
            {
                $this->_choose_comm($reservation->get('reservationStatus_id'), $commsObject, $client_suppressed, $venue_suppressed);
            }
        }
    }

    private function _choose_comm($statusId, $commsObject, $client_suppressed, $venue_suppressed)
    {
        $modelComms = Model__comms::class;
        $this->load->model($modelComms);
        switch ($statusId)
        {
            case Reservation_Status::CREATED:

                $this->$modelComms->new_reservation_request($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::EXPIRED:

                $this->$modelComms->reservation_expired($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::ACCEPTED:

                $this->$modelComms->reservation_accepted($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::DECLINE:

                $this->$modelComms->reservation_declined($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::CANCELLEDBYHOST:

                $this->$modelComms->reservation_cancelled_by_host($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::CANCELLEDBYUSER:

                $this->$modelComms->reservation_cancelled_by_user($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::CHECKIN:

                $this->$modelComms->reservation_imminent($commsObject, $client_suppressed, $venue_suppressed);
            break;

            case Reservation_Status::AWAITINGUSERREVIEW:

                $this->$modelComms->reservation_requires_user_review($commsObject, $client_suppressed);
            break;
        }
    }

    public function resend_emails($reservation, $statusId)
    {
        $this->_handle_comms($reservation, $statusId);
    }

    private function _further_actions($object)
    {
        $this->_booking_handler($object);
        $this->_payment_handler($object);
    }

    private function _booking_handler($object)
    {
        if ($object->booking_is_complete() || $object->has_been_cancelled())
        {
            $modelBookings = Model__bookings::class;
            $this->load->model($modelBookings);
            $this->$modelBookings->complete_booking_by_id($object->get('booking_id'), $object->get('booking_closure_status'));
        }
    }

    private function _payment_handler($object)
    {
        if (!$object->finances_are_suppressed())
        {
            $bookingId = $object->get('booking_id');
            $statusId = $object->get('reservationStatus_id');
            $modelPayments = Model__payments::class;
            $this->load->model($modelPayments);
            if ($statusId === Reservation_Status::EXPIRED || $statusId === Reservation_Status::DECLINE)
            {
                $this->$modelPayments->void_transaction_from_booking_id($bookingId);
            }
            elseif ($statusId === Reservation_Status::ACCEPTED || $statusId === Reservation_Status::CHECKIN || $statusId === Reservation_Status::AWAITINGHOSTREVIEW || $statusId === Reservation_Status::AWAITINGUSERREVIEW || $statusId === Reservation_Status::COMPLETED)
            {
                $this->$modelPayments->settle_transaction_from_booking_id($bookingId);
            }
            elseif ($statusId === Reservation_Status::CANCELLEDBYHOST || $statusId === Reservation_Status::CANCELLEDBYUSER)
            {
                //$this->$modelPayments->refund_transaction_from_booking_id($bookingId);
            }
        }
    }

    public function get_open_extended_reservation_collection()
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->where(Booking::column('closed'));
        $this->db->where_not_in(Reservation::column('reservationStatus_id'), Reservation::get_hiddenfromStats());
        $this->db->group_by(Reservation::id_column());
        return new Extended_Reservation___Collection($this->_query_init_and_run(false));
    }

    public function get_review_reminder_extended_reservation_collection()
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGUSERREVIEW);
        $this->db->group_by(Reservation::id_column());
        return new Extended_Reservation___Collection($this->_query_init_and_run(false));
    }

    public function get_extended_reservation_by_id($id)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->where(Reservation::id_column(), $id);
        $this->db->group_by(Reservation::id_column());
        return new Extended_Reservation($this->_query_init_and_run());
    }

    public function get_reservation_by_token($token)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->advanced_join(Simple_Room::class, Opening_Hours::class, Simple_Room::asset_id_column(false), Opening_Hours::column('asset_id', false));
        $this->db->advanced_join(Simple_Room::class, Daily_Price::class, Simple_Room::asset_id_column(false), Daily_Price::column('asset_id', false));
        $this->db->advanced_join(Opening_Hours::class, Hourly_Price::class, Opening_Hours::id_column(false), Hourly_Price::column('period_id', false));
        $this->_calculate_price([
            "MIN((CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Hourly_Price::column('hourly_rate') . ") ELSE " . Hourly_Price::column('hourly_rate') . " END))" => Extended_Reservation::alias('hourly_rate'),
            "(CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Daily_Price::column('daily_rate') . ") ELSE " . Daily_Price::column('daily_rate') . " END)" => Extended_Reservation::alias('daily_rate'),
            "(CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Daily_Price::column('daily_delegate_rate') . ") ELSE " . Daily_Price::column('daily_delegate_rate') . " END)" => Extended_Reservation::alias('daily_delegate_rate'),
            "(CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Daily_Price::column('monthly_rate') . ") ELSE " . Daily_Price::column('monthly_rate') . " END)" => Extended_Reservation::alias('monthly_rate'),
            "MIN(" . Hourly_Price::column('hourly_rate') . ")" => Extended_Reservation::alias('venue_hourly_rate'),
            Daily_Price::column('daily_rate') => Extended_Reservation::alias('venue_daily_rate'),
            Daily_Price::column('daily_delegate_rate') => Extended_Reservation::alias('venue_daily_delegate_rate'),
            Daily_Price::column('monthly_rate') => Extended_Reservation::alias('venue_monthly_rate')
        ]);
        $this->db->where(Reservation::column('token'), $token);
        $this->db->group_by(Reservation::id_column());
        return new Extended_Reservation($this->_query_init_and_run());
    }

    public function get_extended_reservation_by_id_check_user($id)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->_join_venue_users();
        $this->db->advanced_join(Simple_Room::class, Opening_Hours::class, Simple_Room::asset_id_column(false), Opening_Hours::column('asset_id', false));
        $this->db->advanced_join(Simple_Room::class, Daily_Price::class, Simple_Room::asset_id_column(false), Daily_Price::column('asset_id', false));
        $this->db->advanced_join(Opening_Hours::class, Hourly_Price::class, Opening_Hours::id_column(false), Hourly_Price::column('period_id', false));
        $this->_calculate_price([
            "MIN((CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Hourly_Price::column('hourly_rate') . ") ELSE " . Hourly_Price::column('hourly_rate') . " END))" => Extended_Reservation::alias('hourly_rate'),
            "(CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Daily_Price::column('daily_rate') . ") ELSE " . Daily_Price::column('daily_rate') . " END)" => Extended_Reservation::alias('daily_rate'),
            "(CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Daily_Price::column('daily_delegate_rate') . ") ELSE " . Daily_Price::column('daily_delegate_rate') . " END)" => Extended_Reservation::alias('daily_delegate_rate'),
            "(CASE WHEN " . Simple_Room::column('price_control_percent') . " IS NOT NULL THEN ROUND((1 + (" . Simple_Room::column('price_control_percent') . " / 100)) * " . Daily_Price::column('monthly_rate') . ") ELSE " . Daily_Price::column('monthly_rate') . " END)" => Extended_Reservation::alias('monthly_rate'),
            "MIN(" . Hourly_Price::column('hourly_rate') . ")" => Extended_Reservation::alias('venue_hourly_rate'),
            Daily_Price::column('daily_rate') => Extended_Reservation::alias('venue_daily_rate'),
            Daily_Price::column('daily_delegate_rate') => Extended_Reservation::alias('venue_daily_delegate_rate'),
            Daily_Price::column('monthly_rate') => Extended_Reservation::alias('venue_monthly_rate')
        ]);
        $this->db->start_group_where(Profile::column('user_id', true, "venue_user_profile"), $this->get_user_id());
        $this->db->or_where(User::id_column(), $this->get_user_id());
        $this->db->close_group_where();
        $this->db->where(Reservation::id_column(), $id);
        $this->db->group_by(Reservation::id_column());
        return new Extended_Reservation($this->_query_init_and_run());
    }

    public function get_extended_reservation_by_review_token($token)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->where(Reservation::column('review_token'), $token);
        $this->db->group_by(Reservation::id_column());
        return new Extended_Reservation($this->_query_init_and_run());
    }

    private function _join_venue_users()
    {
        $venueuserTableAlias = "venue_user";
        $venueProfileAlias = "venue_user_profile";
        $this->db->advanced_join(Venue::class, Runt_User_Asset_Privilege::class, Venue::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false), "LEFT", NULL, $venueuserTableAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueuserTableAlias, $venueProfileAlias);
    }

    private function _join_and_select_extended_secondaries($include_subcollection = true)
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Reservation::class, Booking::class, Reservation::column('booking_id', false), Booking::id_column(false));
        $this->db->advanced_join(Booking::class, Booking_Channel::class, Booking::column('bookingChannel_id', false), Booking_Channel::id_column(false));
        $this->db->advanced_join(Reservation::class, Reservation_Status::class, Reservation::column('reservationStatus_id', false), Reservation_Status::id_column(false));
        $this->db->advanced_join(Booking::class, User::class, Booking::column('beneficiary_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->advanced_join(Reservation::class, Simple_Room::class, Reservation::column('asset_id', false), Simple_Room::asset_id_column(false));
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Simple_Room::class, Usage::class, Simple_Room::column('usage_id', false), Usage::id_column(false));
        $this->db->advanced_join(Usage::class, Runt_Usage_UsageSuperset::class, Usage::id_column(false), Runt_Usage_UsageSuperset::column('usage_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, UsageSuperset::class, Runt_Usage_UsageSuperset::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Simple_Room::class, Venue::class, Simple_Room::column('venue_id', false), Venue::id_column(false));
        $this->db->advanced_join(Venue::class, Company::class, Venue::column('company_id', false), Company::id_column(false));
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Venue::class, Vat_Rate::class, Venue::column('vat_rate_id', false), Vat_Rate::id_column(false));
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Venue::class, User::class, Venue::column('main_contact', false), User::id_column(false), "LEFT", NULL, $venueUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $venueUserAlias, $venueProfileAlias);
        $this->db->advanced_join(Company::class, Asset_Audit::class, Company::asset_id_column(false), Asset_Audit::id_column(false));
        $this->db->advanced_join(Reservation::class, Enquiry::class, Reservation::id_column(false), Enquiry::column('reservation_id', false));
        if ($include_subcollection)
        {
            $paymentCurrencyAlias = "payment_currency";
            $this->db->advanced_join(Booking::class, Payment::class, Booking::id_column(false), Payment::column('booking_id', false));
            $this->db->advanced_join(Payment::class, Payment_Status::class, Payment::column('payment_status_id', false), Payment_Status::id_column(false));
            $this->_query_join_currencies(Payment::class, Payment::column('currency', false), [
                'left' => 'pay_currency_symbol_left',
                'right' => 'pay_currency_symbol_right'
            ], null, $paymentCurrencyAlias);
            $this->_select_sub_collection_alias(Payment_Status::column('name'), 'payment_details', Payment::alias('status_name'));
            $this->_add_collection_currency_symbols('payment_details', Payment::alias('pay_currency_symbol_left'), Payment::alias('pay_currency_symbol_right'), $paymentCurrencyAlias);
            $this->_select_sub_collection(Payment::class, 'payment_details');
            $this->_set_sub_collection_ordering(Payment::id_column(), 'payment_details', 'ASC');
        }
        $this->db->join(Image::tableName(), Simple_Room::asset_id_column() . "=" . Image::column('subject_id') . " AND " . Image::column('represents') . "= 1 AND " . Image::enabled_column() . "= 1 AND " . Image::column('image_type_id') . " = " . Image::ASSET, "LEFT");
        $this->db->join(Runt_User_Asset_Member::tableName(), Simple_Room::asset_id_column() . "=" . Runt_User_Asset_Member::column('asset_id') . " AND " . User::id_column() . "=" . Runt_User_Asset_Member::column('user_id'), "LEFT");
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Reservation_Status::column('name'), Extended_Reservation::alias('status_name'));
        $this->db->select_alias(Booking::column('created'), Extended_Reservation::alias('booking_date_time'));
        $this->db->select_alias(Booking::column('booker_id'), Extended_Reservation::alias('booker_id'));
        $this->db->select_alias(Booking::column('bookingChannel_id'), Extended_Reservation::alias('booking_channel_id'));
        $this->db->select_alias(Booking::column('bookingStatus_id'), Extended_Reservation::alias('booking_closure_status'));
        $this->db->select_alias(Booking_Channel::column('desc'), Extended_Reservation::alias('booking_channel_desc'));
        $this->db->select_alias(Venue::id_column(), Extended_Reservation::alias('venue_id'));
        $this->db->select_alias(Venue::asset_id_column(), Extended_Reservation::alias('venue_asset_id'));
        $this->db->select_alias(Venue::column('name'), Extended_Reservation::alias('venue_name'));
        $this->db->select_alias(Venue::column('website'), Extended_Reservation::alias('venue_website'));
        $this->db->select_alias(Venue::column('address'), Extended_Reservation::alias('venue_address'));
        $this->db->select_alias(Venue::column('road'), Extended_Reservation::alias('venue_road'));
        $this->db->select_alias(Venue::column('town'), Extended_Reservation::alias('venue_town'));
        $this->db->select_alias(Venue::column('city'), Extended_Reservation::alias('venue_city'));
        $this->db->select_alias(Venue::column('country'), Extended_Reservation::alias('venue_country'));
        $this->db->select_alias(Venue::column('country_code'), Extended_Reservation::alias('venue_country_code'));
        $this->db->select_alias(Venue::column('post_code'), Extended_Reservation::alias('venue_post_code'));
        $this->db->select_alias(Venue::column('address_extras'), Extended_Reservation::alias('venue_address_extras'));
        $this->db->select_alias(Venue::column('transport'), Extended_Reservation::alias('venue_transport'));
        $this->db->select_alias(Venue::column('phone'), Extended_Reservation::alias('venue_phone'));
        $this->db->select_alias(Venue::column('long'), Extended_Reservation::alias('venue_long'));
        $this->db->select_alias(Venue::column('lat'), Extended_Reservation::alias('venue_lat'));
        $this->db->select_alias(Venue::column('uses_live_bookings'), Extended_Reservation::alias('venue_live_bookings'));
        $this->db->select_alias(Venue::column('agree_to_list'), Extended_Reservation::alias('venue_agree_to_list'));
        $this->db->select_alias(Vat_Rate::column('vat_percentage'), Extended_Reservation::alias('venue_vat'));
        $this->db->select_alias(Venue::column('approved'), Extended_Reservation::alias('venue_approved'));
        $this->db->select_alias(Venue::enabled_column(), Extended_Reservation::alias('venue_enabled'));
        $this->db->select_alias(User::column('hubspot_id'), Extended_Reservation::alias('client_hubspot_id'));
        $this->db->select_alias(User::id_column(), Extended_Reservation::alias('client_id'));
        $this->db->select_alias(Profile::column('first_name'), Extended_Reservation::alias('client_first_name'));
        $this->db->select_alias(Profile::column('last_name'), Extended_Reservation::alias('client_last_name'));
        $this->db->select_alias(User::column('email'), Extended_Reservation::alias('client_email'));
        $this->db->select_alias(User::column('email_status'), Extended_Reservation::alias('client_email_status'));
        $this->db->select_alias(Profile::column('phone_number'), Extended_Reservation::alias('client_phone'));
        $this->db->select_alias(User::column('role_id'), Extended_Reservation::alias('client_role_id'));
        $this->db->select_alias(User::column('token'), Extended_Reservation::alias('client_token'));
        $this->db->select_alias(User::enabled_column(), Extended_Reservation::alias('client_enabled'));
        $this->db->select_alias(User::id_column(false, $venueUserAlias), Extended_Reservation::alias('main_user_id'));
        $this->db->select_alias(User::column('hubspot_id', false, $venueUserAlias), Extended_Reservation::alias('main_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name', false, $venueProfileAlias), Extended_Reservation::alias('main_user_firstname'));
        $this->db->select_alias(Profile::column('last_name', false, $venueProfileAlias), Extended_Reservation::alias('main_user_lastname'));
        $this->db->select_alias(User::column('email', false, $venueUserAlias), Extended_Reservation::alias('main_user_email'));
        $this->db->select_alias(User::column('email_status', false, $venueUserAlias), Extended_Reservation::alias('main_user_email_status'));
        $this->db->select_alias(Profile::column('phone_number', false, $venueProfileAlias), Extended_Reservation::alias('main_user_phone'));
        $this->db->select_alias(User::column('role_id', false, $venueUserAlias), Extended_Reservation::alias('main_user_role_id'));
        $this->db->select_alias(Runt_User_Asset_Member::column('discount'), Extended_Reservation::alias('client_discount'));
        $this->db->select_alias(Simple_Room::id_column(), Extended_Reservation::alias('room_id'));
        $this->db->select_alias(Simple_Room::column('title'), Extended_Reservation::alias('room_name'));
        $this->db->select_alias(Simple_Room::column('flexible_percent'), Extended_Reservation::alias('flexible_percent'));
        $this->db->select_alias(Simple_Room::column('approved'), Extended_Reservation::alias('room_approved'));
        $this->db->select_alias(Simple_Room::enabled_column(), Extended_Reservation::alias('room_enabled'));
        $this->db->select_alias(UsageSuperset::column('desc'), Extended_Reservation::alias('usage_superset_desc'));
        $this->db->select_alias(UsageSuperset::column('alias'), Extended_Reservation::alias('usage_superset_alias'));
        $this->db->select_alias(Company::id_column(), Extended_Reservation::alias('company_id'));
        $this->db->select_alias(Company::column('name'), Extended_Reservation::alias('company_name'));
        $this->db->select_alias(Asset_Audit::column('token'), Extended_Reservation::alias('company_token'));
        $this->db->select_alias(Image::column('name'), Extended_Reservation::alias('image_thumbnail'));
        $this->db->select_alias(Enquiry::id_column(), Extended_Reservation::alias('enquiry_id'));
        $this->db->nullable_where(UsageSuperset::column('hidden'), 0);
    }

    private function _join_and_select_secondaries()
    {
        $this->_query_join_currencies(Reservation::class, Reservation::column('currency', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Reservation::class, Booked_Period::class, Reservation::id_column(false), Booked_Period::column('reservation_id', false));
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Booked_Period::column('start'), Reservation::alias('start_date_time'));
        $this->db->select_alias(Booked_Period::column('end'), Reservation::alias('end_date_time'));
        $this->db->select_alias(Booked_Period::column('all_day'), Reservation::alias('all_day'));
        $this->db->select_alias(Reservation::column('reservationStatus_id'), Reservation::alias('current_status_id'));
    }

    public function get_daily_reservations($assetId, $date)
    {
        $this->db->where(Reservation::column('asset_id'), $assetId);
        $this->db->advanced_join(Reservation::class, Booked_Period::class, Reservation::id_column(false), Booked_Period::column('reservation_id',false));
        $this->db->where(Booked_Period::column('date'), $date);
        $this->db->select_alias(Booked_Period::column('start'), Reservation::alias('start'));
        $this->db->select_alias(Booked_Period::column('end'), Reservation::alias('end'));
        $this->db->select_alias(Booked_Period::column('date'), Reservation::alias('date'));
        return new Reservation___Collection($this->_query_init_and_run(false));
    }

    public function check_extended_reservation_by_user($reservation_id, $user_id)
    {
        if ($this->user_is_admin())
        {
            $retVal = true;
        }
        else
        {
            $this->_join_and_select_secondaries();
            $this->_join_and_select_extended_secondaries();
            $this->db->where(Reservation::id_column(), $reservation_id);
            $this->db->where(User::id_column(), $user_id);
            $this->db->where_not_in(Reservation::column('reservationStatus_id'), Reservation::get_hiddenfromStats());
            $retVal = !empty($this->_query_init_and_run());
        }
        return $retVal;
    }

    public function get_extended_reservation_collection_by_user($user_id)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->where(User::id_column(), $user_id);
        $this->db->where_not_in(Reservation::column('reservationStatus_id'), Reservation::get_hiddenfromStats());
        $this->db->group_by(Reservation::id_column());
        $this->db->order_by(Booking::column('created'), "DESC");
        return new Extended_Reservation___Collection($this->_query_init_and_run(false));
    }

    public function get_reservations_collection_for_user($venue_user = true, $timespanstatus = null, $status = null, $ordering = [])
    {
        $this->db->count_rows(true);
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        if ($venue_user)
        {
            $this->_join_venue_users();
            $this->db->where(Profile::column('user_id', true, "venue_user_profile"), $this->get_user_id());
        }
        else
        {
            $this->db->where(User::id_column(), $this->get_user_id());
        }
        if ($timespanstatus != null)
        {
            $this->_get_timspan_where_clause($timespanstatus);
        }
        elseif ($status != null)
        {
            $this->db->where(Reservation::column('reservationStatus_id'), $status);
        }
        else
        {
            $this->db->where_in(Reservation::column('reservationStatus_id'), Reservation::get_usableStatuses());
        }
        $this->db->group_by(Reservation::id_column());
        if ($ordering != null)
        {
            $this->db->order_by(Extended_Reservation::sort_by_token($ordering['field']), ((!isset($ordering['direction'])?'ASC':$ordering['direction'])));
        }
        else
        {
            $this->db->order_by(Booked_Period::column('start'), "DESC");
        }
        return new Extended_Reservation___Collection($this->_query_init_and_run(false));
    }

    public function get_count_of_reservation_type_for_user($venue_user = true)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries(false);
        if ($venue_user)
        {
            $this->_join_venue_users();
            $this->db->where(Profile::column('user_id', true, "venue_user_profile"), $this->get_user_id());
        }
        else
        {
            $this->db->where(User::id_column(), $this->get_user_id());
        }
        $this->db->select('COUNT(DISTINCT ' . Reservation::id_column() . ') AS booking_count, ' . Reservation_Status::id_column() . ' AS id, ' . Reservation_Status::column('name') . ' AS name');
        $this->db->where_in(Reservation::column('reservationStatus_id'), Reservation::get_usableStatuses());
        $this->db->group_by(Reservation_Status::column('name'));
        $this->db->from(Reservation::tableName());
        return $this->db->get();
    }

    public function get_count_of_timespan_reservations_for_user($venue_user = true, $timespanstatus)
    {
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries(false);
        if ($venue_user)
        {
            $this->_join_venue_users();
            $this->db->where(Profile::column('user_id', true, "venue_user_profile"), $this->get_user_id());
        }
        else
        {
            $this->db->where(User::id_column(), $this->get_user_id());
        }
        $this->db->select('COUNT(DISTINCT ' . Reservation::id_column() . ') AS booking_count');
        $this->_get_timspan_where_clause($timespanstatus);
        $this->db->from(Reservation::tableName());
        $query = $this->db->get()->row();
        return $query->booking_count;
    }

    private function _get_timspan_where_clause($timespan)
    {
        if ($timespan == 'current')
        {
            $this->db->where(Reservation::column('reservationStatus_id'), Reservation_Status::CHECKIN);
        }
        elseif ($timespan == 'upcoming')
        {
            $this->db->start_group_where(Reservation::column('reservationStatus_id'), Reservation_Status::CREATED);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::ACCEPTED);
            $this->db->close_group_where();
        }
        elseif ($timespan == 'previous')
        {
            $this->db->where_in(Reservation::column('reservationStatus_id'), Reservation::get_bookingPrevious());
        }
    }

//    public function get_latest_reservations()
//    {
//        $this->_join_and_select_secondaries();
//        $this->_join_and_select_extended_secondaries();
//        $this->_get_timspan_where_clause('upcoming');
//        $this->db->order_by(Reservation::id_column(), 'DESC');
//        $this->db->group_by(Reservation::id_column());
//        $this->db->limit(20);
//        return new Extended_Reservation___Collection($this->_query_init_and_run(false));
//    }

    public function get_all_reservations_details_collection($limit, $offset, $sort_by, $sort_order, $status = '', $keyword = '')
    {
        $venueUserAlias = "main_contact_user";
        $venueProfileAlias = "main_contact_profile";
        $this->db->count_rows(true);
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->limit($limit, $offset);
        $this->db->order_by(Extended_Reservation::sort_by_token($sort_by), $sort_order);
        $this->db->group_by(Reservation::id_column());
        $this->db->where_not_in(Reservation::column('reservationStatus_id'), Reservation::get_hiddenfromStats());
        if ($status == 'paid')
        {
            $this->db->where(Reservation::column('is_paid'), 1);
        }
        elseif ($status == 'topay')
        {
            $this->db->where(Reservation::column('is_paid'), 0);
            $this->db->where(Payment::column('payment_type_id') . ' <>', Payment_Type::VENUEINVOICE);
            $this->db->open_where_bracket(); //office group hack!!
            $this->db->start_group_where(Reservation::column('reservationStatus_id'), Reservation_Status::CHECKIN, true, "");
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGHOSTREVIEW);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGUSERREVIEW);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::COMPLETED);
            $this->db->close_group_where();
            $this->db->start_group_where(Company::id_column(), 359, true, "OR"); //office group hack!!
            $this->db->start_group_where(Booked_Period::column('start') . ' <= now()'); //office group hack!!
            $this->db->or_where('DATE_ADD(now(), INTERVAL 2 DAY) >= ' . Booked_Period::column('start')); //office group hack!!
            $this->db->close_group_where(); //office group hack!!
            $this->db->start_group_where(Reservation::column('reservationStatus_id'), Reservation_Status::ACCEPTED); //office group hack!!
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::CHECKIN); //office group hack!!
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGHOSTREVIEW); //office group hack!!
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGUSERREVIEW); //office group hack!!
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::COMPLETED); //office group hack!!
            $this->db->close_group_where(); //office group hack!!
            $this->db->close_group_where(); //office group hack!!
            $this->db->close_where_bracket(); //office group hack!!
        }
        elseif ($status == 'calendar')
        {
            $this->db->where(Booking::column('bookingChannel_id'), Booking_Channel::VENUECALENDAR);
        }
        elseif ($status == 'widget')
        {
            $this->db->where(Booking::column('bookingChannel_id'), Booking_Channel::WIDGET);
        }
        elseif ($status == 'user')
        {
            $this->db->where(Reservation::column('assigned_user'), $this->get_user_id());
        }
        elseif ($status == 'invoice_unpaid')
        {
            $this->db->where(Payment::column('payment_type_id'), Payment_Type::INVOICE);
            $this->db->where(Payment::column('payment_status_id') . ' <> ' . Payment_Status::VOID);
            $this->db->where(Payment::column('payment_status_id') . ' <> ' . Payment_Status::ZIPCUBECOVERED);
            $this->db->start_group_where(Reservation::column('reservationStatus_id'), Reservation_Status::CREATED);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::ACCEPTED);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::CHECKIN);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGHOSTREVIEW);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGUSERREVIEW);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::COMPLETED);
            $this->db->close_group_where();
        }
        elseif ($status == 'not_agree')
        {
            $this->db->where(Venue::column('agree_to_list'), 0);
        }
        elseif ($status == 'yesterday')
        {
            $yesterday = new DateTime();
            $yesterday->add(DateInterval::createFromDateString('yesterday'));
            $this->db->where('DATE(' . Booked_Period::column('end') . ')', $yesterday->format('Y-m-d'));
            $this->db->start_group_where(Reservation::column('reservationStatus_id'), Reservation_Status::CHECKIN); //just in case cron hasn't changed it!
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGHOSTREVIEW);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::AWAITINGUSERREVIEW);
            $this->db->or_where(Reservation::column('reservationStatus_id'), Reservation_Status::COMPLETED);
            $this->db->close_group_where();
        }
        elseif ($status != 'all')
        {
            $this->db->where(Reservation::column('reservationStatus_id'), $status);
        }
        if ($keyword != '')
        {
            $this->db->start_group_like(Reservation::id_column(), $keyword);
            $this->db->or_like(Reservation::column('price'), $keyword);
            $this->db->or_like("ROUND((" . Reservation::column('toVenue') . " - " . Reservation::column('toVenue_vat') . "), 2)", $keyword);
            $this->db->or_like("ROUND((" . Reservation::column('extra_fee') . " + " . Reservation::column('extra_fee_vat') . "), 2)", $keyword);
            $this->db->or_like("ROUND((" . Reservation::column('flexible_fee') . " + " . Reservation::column('flexible_fee_vat') . "), 2)", $keyword);
            $this->db->or_like("ROUND((" . Reservation::column('price_control_fee') . " + " . Reservation::column('price_control_fee_vat') . "), 2)", $keyword);
            $this->db->or_like(Reservation::column('zipcube_notes'), $keyword);
            $this->db->or_like(Venue::id_column(), $keyword);
            $this->db->or_like(Venue::column('name'), $keyword);
            $this->db->or_like(Venue::column('address'), $keyword);
            $this->db->or_like(Venue::column('phone'), $keyword);
            $this->db->or_like(Venue::column('website'), $keyword);
            $this->db->or_like(Simple_Room::id_column(), $keyword);
            $this->db->or_like(Simple_Room::column('title'), $keyword);
            $this->db->or_like(Profile::column('first_name'), $keyword);
            $this->db->or_like(Profile::column('last_name'), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name') . ", ' ', " . Profile::column('last_name') . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email') . ")", strtolower($keyword));
            $this->db->or_like("REPLACE(LOWER(" . User::column('email') . "), '_', '\\_')", strtolower($keyword));
            $this->db->or_like(Profile::column('phone_number'), $keyword);
            $this->db->or_like(Profile::column('first_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Profile::column('last_name', true, $venueProfileAlias), $keyword);
            $this->db->or_like("CONCAT(" . Profile::column('first_name', true, $venueProfileAlias) . ", ' ', " . Profile::column('last_name', true, $venueProfileAlias) . ")", $keyword);
            $this->db->or_like("LOWER(" . User::column('email', true, $venueUserAlias) . ")", $keyword);
            $this->db->or_like("REPLACE(LOWER(" . User::column('email', true, $venueUserAlias) . "), '_', '\\_')", $keyword);
            $this->db->or_like(Profile::column('phone_number', true, $venueProfileAlias), $keyword);
            $this->db->or_like(Company::column('name'), $keyword);
            $this->db->or_like(Payment::column('external_reference'), $keyword);
            $this->db->or_like("CONCAT('ZCUBE', " . Reservation::id_column() . ", " . Simple_Room::id_column() . ", DATE_FORMAT(" . Booked_Period::column('start') . ", '%d%m'))", $keyword);
            $this->_add_dateformat_like(Booked_Period::column('start'), $keyword);
            $this->_add_dateformat_like(Booked_Period::column('end'), $keyword);
            $this->_add_dateformat_like(Booking::column('created'), $keyword);
            $this->db->close_group_like();
        }
        return new Extended_Reservation___Collection($this->_query_init_and_run(false));
    }

    private function _add_dateformat_like($field, $keyword)
    {
        //could be moved up if needed by other models...
        $date_formats = [
            '%e/%c/%Y',
            '%d/%c/%Y',
            '%e/%m/%Y',
            '%d/%m/%Y',
            '%e/%c/%y',
            '%d/%c/%y',
            '%e/%m/%y',
            '%d/%m/%y',
            '%e %b %Y %k:%i (%a)',
            '%e %b %Y %H:%i (%a)',
            '%d %b %Y %k:%i (%a)',
            '%d %b %Y %H:%i (%a)',
            '%e %b %y %k:%i (%a)',
            '%e %b %y %H:%i (%a)',
            '%d %b %y %k:%i (%a)',
            '%d %b %y %H:%i (%a)'
        ];
        foreach ($date_formats as $date_format)
        {
            $this->db->or_like("DATE_FORMAT(" . $field . ", '" . $date_format . "')", $keyword);
        }
    }

    public function get_tog_reservations($month, $year)
    {
        $query = "SELECT * FROM `pbi_tog` WHERE MONTH(`start`) = '" . $month . "' AND YEAR(`start`) = '" . $year . "'";
        return $this->db->query($query);
    }

    public function get_yesterday_reservations_for_review()
    {
        $query = "SELECT * FROM `yesterday_reservations_for_review`";
        return $this->db->query($query);
    }

    public function get_unpaid_invoices_by_company($company)
    {
        $query = "SELECT " . Reservation::id_column() . ",
            ROUND(" . Reservation::column('price') . " + (CASE WHEN " . Reservation::column('extra_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee') . " END) + (CASE WHEN " . Reservation::column('extra_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('extra_fee_vat') . " END) + (CASE WHEN " . Reservation::column('flexible_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee') . " END) + (CASE WHEN " . Reservation::column('flexible_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('flexible_fee_vat') . " END) + (CASE WHEN " . Reservation::column('price_control_fee') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee') . " END) + (CASE WHEN " . Reservation::column('price_control_fee_vat') . " IS NULL THEN 0 ELSE " . Reservation::column('price_control_fee_vat') . " END), 2) AS total_transaction,
            " . Reservation::column('created') . " AS date_booked,
            " . Booked_Period::column('start') . ",
            " . Booked_Period::column('end') . ",
            " . Reservation::column('zipcube_notes') . " AS notes,
            " . Venue::column('name') . " AS venue_name,
            " . User::column('email') . ""
            . $this->_getInvoiceQueryJoins() . ""
            . " INNER JOIN " . User::tableName() . " ON " . Booking::column('booker_id') . " = " . User::id_column() . ""
            . " INNER JOIN " . Simple_Room::tableName() . " ON " . Reservation::column('asset_id') . " = " . Simple_Room::asset_id_column() . ""
            . " INNER JOIN " . Venue::tableName() . " ON " . Simple_Room::column('venue_id') . " = " . Venue::id_column() . ""
            . $this->_getInvoiceQueryWhere() . ""
            . " AND " . User::column('email') . " LIKE '%" . $company . "%'"
            . " ORDER BY " . Reservation::id_column() . "";
        return $this->db->query($query);
    }

    public function get_future_invoice_amount()
    {
        $retInvoiceArr = [];
        $query = "SELECT SUM(validpayments.amount - (CASE WHEN refundpayments.amount IS NULL THEN 0 ELSE refundpayments.amount END)) AS invoiceAmo, " . Reservation::column('currency') . " AS currency"
            . $this->_getInvoiceQueryJoins() . ""
            . $this->_getInvoiceQueryWhere() . ""
            . " AND " . Booked_Period::column('start') . " >= now()"
            . " GROUP BY " . Reservation::column('currency') . "";
        $invoice_amounts = $this->db->query($query);
        foreach ($invoice_amounts->result_array() as $invoice_data)
        {
            $retInvoiceArr[$invoice_data['currency']] = $invoice_data['invoiceAmo'];
        }
        return $retInvoiceArr;
    }

    private function _getInvoiceQueryJoins()
    {
        return " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " INNER JOIN " . Booked_Period::tableName() . " ON " . Reservation::id_column() . " = " . Booked_Period::column('reservation_id') . ""
            . " LEFT JOIN (SELECT " . Payment::column('amount') . " AS amount, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " = " . Payment_Type::INVOICE . " AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('external_reference') . " <> 'STRIPE' AND " . Payment::column('external_reference') . " <> 'paypal' AND " . Payment::column('payment_status_id') . " IN (" . Payment_Status::CREATED . "," . Payment_Status::COMPLETE . "," . Payment_Status::SUBMITTED . ")) AS validpayments ON " . Booking::id_column() . " = validpayments.booking_id"
            . " LEFT JOIN (SELECT " . Payment::column('amount') . " AS amount, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " WHERE " . Payment::column('payment_type_id') . " = " . Payment_Type::INVOICE . " AND " . Payment::enabled_column() . " = 1 AND " . Payment::column('external_reference') . " <> 'STRIPE' AND " . Payment::column('external_reference') . " <> 'paypal' AND " . Payment::column('payment_status_id') . " = " . Payment_Status::REFUND . ") AS refundpayments ON " . Booking::id_column() . " = refundpayments.booking_id";
    }

    private function _getInvoiceQueryWhere()
    {
        return " WHERE validpayments.amount IS NOT NULL"
            . " AND " . Reservation::column('reservationStatus_id') . " IN (" . Reservation_Status::CREATED . "," . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1";
    }

    public function get_reservations_with_payment_problems()
    {
        $retResArr = [];
        $query = "SELECT " . Reservation::id_column() . " AS reservation_id"
            . " FROM " . Booking::tableName() . ""
            . " INNER JOIN " . Reservation::tableName() . " ON " . Booking::id_column() . " = " . Reservation::column('booking_id') . ""
            . " LEFT JOIN (SELECT " . Payment::column('amount') . " AS amount, " . Payment::column('booking_id') . " AS booking_id FROM " . Payment::tableName() . " WHERE " . Payment::enabled_column() . " = 1 AND " . Payment::column('external_reference') . " <> 'STRIPE' AND " . Payment::column('external_reference') . " <> 'paypal' AND " . Payment::column('payment_status_id') . " IN (" . Payment_Status::CREATED . "," . Payment_Status::COMPLETE . "," . Payment_Status::SUBMITTED . ")) AS validpayments ON " . Booking::id_column() . " = validpayments.booking_id"
            . " WHERE validpayments.amount IS NULL"
            . " AND " . Reservation::column('reservationStatus_id') . " IN (" . Reservation_Status::CREATED . "," . Reservation_Status::ACCEPTED . "," . Reservation_Status::CHECKIN . "," . Reservation_Status::AWAITINGHOSTREVIEW . "," .  Reservation_Status::AWAITINGUSERREVIEW . "," . Reservation_Status::COMPLETED . ")"
            . " AND " . Booking::enabled_column() . " = 1"
            . " AND " . Reservation::enabled_column() . " = 1"
            . " AND " . Reservation::column('created') . " >= '2019-02-11'"; // start date of when to show results from (Paul knows about past data)
        $reservations = $this->db->query($query);
        foreach ($reservations->result_array() as $reservation)
        {
            $retResArr[] = $reservation['reservation_id'];
        }
        return $retResArr;
    }

    public function get_recent_reservations($limit, $sw_lat = null, $sw_lon = null, $ne_lat = null, $ne_lon = null)
    {
        return new Extended_Reservation___Collection($this->_get_recent_reservations($limit, $sw_lat, $sw_lon, $ne_lat, $ne_lon));
    }

    private function _get_recent_reservations($limit, $sw_lat, $sw_lon, $ne_lat, $ne_lon)
    {
        $this->db->count_rows(true);
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Reservation::class, Simple_Room::class, Reservation::column('asset_id', false), Simple_Room::asset_id_column(false));
        $this->db->advanced_join(Simple_Room::class, Venue::class, Simple_Room::column('venue_id', false), Venue::id_column(false));
        $this->db->disallow_join_disabled();
        $this->db->join(Image::tableName(), Simple_Room::asset_id_column() . "=" . Image::column('subject_id') . " AND " . Image::column('represents') . "= 1 AND " . Image::enabled_column() . "= 1 AND " . Image::column('image_type_id') . " = " . Image::ASSET, "LEFT");
        $this->db->advanced_join(Reservation::class, Booking::class, Reservation::column('booking_id', false), Booking::id_column(false));
        $this->db->advanced_join(Booking::class, User::class, Booking::column('beneficiary_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Profile::column('first_name'), Extended_Reservation::alias('client_first_name'));
        $this->db->select_alias(Profile::column('last_name'), Extended_Reservation::alias('client_last_name'));
        $this->db->select_alias(Image::column('name'), Extended_Reservation::alias('image_thumbnail'));
        $this->db->where(Image::column('flagged'), 0);
        if ($sw_lat != null)
        {
            $this->db->where(Venue::column('lat') . ' > ' . $sw_lat);
        }
        if ($sw_lon != null)
        {
            $this->db->where(Venue::column('long') . ' > ' . $sw_lon);
        }
        if ($ne_lat != null)
        {
            $this->db->where(Venue::column('lat') . ' < ' . $ne_lat);
        }
        if ($ne_lon != null)
        {
            $this->db->where(Venue::column('long') . ' < ' . $ne_lon);
        }
        $this->db->where(Reservation::column('booking_id') . ' IS NOT NULL');
        $this->db->order_by(Reservation::column('created'), 'DESC');
        $this->db->limit($limit);
        return $this->_query_init_and_run(false);
    }

    public function get_completed_reservation_count_by_asset($assetId)
    {
        $venueroomAlias = "venue_rooms";
        $venueresAlias = "venue_reservations";
        $this->db->select('COUNT(DISTINCT ' . Reservation::id_column(true, $venueresAlias) . ') AS reservation_count');
        $this->db->where(Reservation::column('asset_id'), $assetId);
        $this->db->where(Reservation::enabled_column(), 1);
        $this->db->advanced_join(Reservation::class, Booking::class, Reservation::column('booking_id', false), Booking::id_column(false));
        $this->db->where(Booking::column('bookingStatus_id'), Booking_Status::FINISHEDHAPPILY);
        $this->db->where_not_in(Reservation::column('reservationStatus_id'), Reservation::get_hiddenfromStats());
        $this->db->from(Reservation::tableName());
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Reservation::class, Simple_Room::class, Reservation::column('asset_id', false), Simple_Room::asset_id_column(false), "INNER");
        $this->db->advanced_join(Simple_Room::class, Venue::class, Simple_Room::column('venue_id', false), Venue::id_column(false), "INNER");
        $this->db->advanced_join(Venue::class, Simple_Room::class, Venue::id_column(false), Simple_Room::column('venue_id', false), "INNER", NULL, $venueroomAlias);
        $this->db->disallow_join_disabled();
        $this->db->advanced_join(Simple_Room::class, Reservation::class, Simple_Room::asset_id_column(false), Reservation::column('asset_id', false), "INNER", $venueroomAlias, $venueresAlias);
        return $this->db->get()->row()->reservation_count;
    }

    public function get_reservation_interest_count_by_asset($assetId)
    {
        $this->db->select('COUNT(DISTINCT ' . Booking::column('booker_id') . ') AS booker_count');
        $this->db->where(Reservation::column('asset_id'), $assetId);
        $this->db->where(Reservation::enabled_column(), 1);
        $this->db->advanced_join(Reservation::class, Booking::class, Reservation::column('booking_id', false), Booking::id_column(false));
        $this->db->where(Booking::column('bookingStatus_id'));
        $this->db->where_not_in(Reservation::column('reservationStatus_id'), Reservation::get_hiddenfromStats());
        $this->db->from(Reservation::tableName());
        return $this->db->get()->row()->booker_count;
    }

    public function get_reservations_by_period_run($year, $month, $currency = 'all', $forCSV = false)
    {
        return new Extended_Reservation___Collection($this->_get_reservations_by_period_run($year, $month, $currency, $forCSV));
    }

    private function _get_reservations_by_period_run($year, $month, $currency, $forCSV)
    {
        $this->_get_reservations_by_payment_period($year, $month);
        if ($forCSV)
        {
            if ($currency != 'all')
            {
                $this->db->where(Reservation::column('currency'), $currency);
            }
            $this->db->where(Financial_Entity::id_column() . ' IS NOT NULL');
            $this->db->where('JSON_TYPE(' . Financial_Entity::column('financial_data') . ') <> "NULL"');
            $this->db->where(Reservation::column('is_paid'), 0);
        }
        else
        {
            $this->db->select_alias('(CASE WHEN ' . Financial_Entity::id_column() . ' IS NOT NULL AND JSON_TYPE(' . Financial_Entity::column('financial_data') . ') <> "NULL" AND ' . Reservation::column('is_paid') . ' = 0 AND ' . Reservation::column('currency') . ' = "EUR" THEN 1 ELSE 0 END)', Extended_Reservation::alias('to_pay_EUR_count'));
            $this->db->select_alias('(CASE WHEN ' . Financial_Entity::id_column() . ' IS NOT NULL AND JSON_TYPE(' . Financial_Entity::column('financial_data') . ') <> "NULL" AND ' . Reservation::column('is_paid') . ' = 0 AND ' . Reservation::column('currency') . ' = "GBP" THEN 1 ELSE 0 END)', Extended_Reservation::alias('to_pay_GBP_count'));
            $this->db->select_alias('(CASE WHEN ' . Financial_Entity::id_column() . ' IS NOT NULL AND JSON_TYPE(' . Financial_Entity::column('financial_data') . ') <> "NULL" AND ' . Reservation::column('is_paid') . ' = 0 AND ' . Reservation::column('currency') . ' = "USD" THEN 1 ELSE 0 END)', Extended_Reservation::alias('to_pay_USD_count'));
            $this->db->select_alias('(CASE WHEN ' . Financial_Entity::id_column() . ' IS NULL OR JSON_TYPE(' . Financial_Entity::column('financial_data') . ') = "NULL" THEN 1 ELSE 0 END)', Extended_Reservation::alias('attention_count'));
        }
        $this->db->order_by(Reservation::column('currency'));
        $this->db->order_by(Financial_Entity::column('name'));
        $this->db->order_by(Financial_Entity::id_column());
        return $this->_query_init_and_run(false);
    }

    public function get_reservations_by_financial_entity($fin_entity_id, $country_code, $year, $month)
    {
        return new Extended_Reservation___Collection($this->_get_reservations_by_financial_entity($fin_entity_id, $country_code, $year, $month));
    }

    private function _get_reservations_by_financial_entity($fin_entity_id, $country_code, $year, $month)
    {
        $this->_get_reservations_by_payment_period($year, $month);
        $this->db->where(Financial_Entity::id_column(), $fin_entity_id);
        $this->db->where(Venue::column('country_code'), $country_code);
        return $this->_query_init_and_run(false);
    }

    private function _get_reservations_by_payment_period($year, $month)
    {
        $today = new DateTime();
        $thisYear = $today->format('Y');
        $thisMonth = $today->format('n');
        $finEntUserAlias = "fin_contact_user";
        $finEntProfileAlias = "fin_contact_profile";
        $this->_join_and_select_secondaries();
        $this->_join_and_select_extended_secondaries();
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Venue::class, Financial_Entity::class, Venue::column('financial_entity_id', false), Financial_Entity::id_column(false));
        $this->db->advanced_join(Financial_Entity::class, User::class, Financial_Entity::column('account_user', false), User::id_column(false), "LEFT", NULL, $finEntUserAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $finEntUserAlias, $finEntProfileAlias);
        $this->db->join('(SELECT MAX(' . Reservation::id_column() . ') AS res_id, ' . Reservation::column('booking_id') . ' AS booking_id FROM ' . Reservation::tableName() . ' GROUP BY ' . Reservation::column('booking_id') . ') res_switch', Reservation::id_column() . ' = res_switch.res_id AND ' . Booking::id_column() . ' = res_switch.booking_id', "INNER");
        $this->db->join('(SELECT SUM((CASE WHEN ' . Payment::column('payment_status_id') . ' = ' . Payment_Status::REFUND . ' THEN -1 ELSE 1 END) * ' . Payment::column('amount') . ') AS payment_amount, ' . Payment::column('booking_id') . ' AS booking_id FROM ' . Payment::tableName() . ' WHERE ' . Payment::column('payment_type_id') . ' NOT IN (' . Payment_Type::INVOICE . ', ' . Payment_Type::VENUEINVOICE . ') AND ' . Payment::column('payment_status_id') . ' <> ' . Payment_Status::VOID . ' GROUP BY ' . Payment::column('booking_id') . ') pay_alias', Booking::id_column() . ' = pay_alias.booking_id', "INNER");
        $this->db->disallow_join_disabled();
        $this->db->join(Payment_Period::tableName(), Payment_Period::column('period_year') . " = YEAR(" . Booked_Period::column('end') . ") AND " . Payment_Period::column('period_month') . " = MONTH(" . Booked_Period::column('end') . ")", "LEFT");
        $this->db->join(Invoice_Note::tableName(), Invoice_Note::column('financial_entity_id') . " = " . Financial_Entity::id_column() . " AND " . Invoice_Note::column('country_code') . " = " . Venue::column('country_code') . " AND " . Invoice_Note::column('period_id') . " = " . Payment_Period::id_column(), "LEFT");
        $this->db->advanced_join(Reservation::class, Reservation_Venue_Payment::class, Reservation::id_column(false), Reservation_Venue_Payment::column('reservation_id', false));
        $this->_select_sub_collection_alias(Currency::column('left_symbol'), 'venue_payments', Reservation_Venue_Payment::alias('currency_symbol_left'));
        $this->_select_sub_collection_alias(Currency::column('right_symbol'), 'venue_payments', Reservation_Venue_Payment::alias('currency_symbol_right'));
        $this->_select_sub_collection(Reservation_Venue_Payment::class, 'venue_payments');
        $this->db->select_alias('pay_alias.payment_amount', Extended_Reservation::alias('payment_amount'));
        $this->db->select_alias(Financial_Entity::id_column(), Extended_Reservation::alias('financial_entity_id'));
        $this->db->select_alias(Financial_Entity::column('name'), Extended_Reservation::alias('financial_entity_name'));
        $this->db->select_alias(Financial_Entity::column('address'), Extended_Reservation::alias('financial_entity_address'));
        $this->db->select_alias(Financial_Entity::column('financial_data'), Extended_Reservation::alias('financial_entity_financial_data'));
        $this->db->select_alias(Financial_Entity::column('vat_number'), Extended_Reservation::alias('financial_entity_vat_number'));
        $this->db->select_alias(Invoice_Note::column('notes'), Extended_Reservation::alias('invoice_notes'));
        $this->db->select_alias(User::id_column(true, $finEntUserAlias), Extended_Reservation::alias('financial_account_user_id'));
        $this->db->select_alias(User::column('hubspot_id', true, $finEntUserAlias), Extended_Reservation::alias('financial_account_user_hubspot_id'));
        $this->db->select_alias(Profile::column('first_name', true, $finEntProfileAlias), Extended_Reservation::alias('financial_account_user_firstname'));
        $this->db->select_alias(Profile::column('last_name', true, $finEntProfileAlias), Extended_Reservation::alias('financial_account_user_lastname'));
        $this->db->select_alias(User::column('email', true, $finEntUserAlias), Extended_Reservation::alias('financial_account_user_email'));
        $this->db->select_alias(User::column('email_status', true, $finEntUserAlias), Extended_Reservation::alias('financial_account_user_email_status'));
        $this->db->select_alias(User::column('role_id', true, $finEntUserAlias), Extended_Reservation::alias('financial_account_user_role_id'));
        $this->db->select_alias(Profile::column('phone_number', true, $finEntProfileAlias), Extended_Reservation::alias('financial_account_user_phone'));
        if ($year > $thisYear || ($year == $thisYear && $month >= $thisMonth))
        {
            $this->db->where_in(Reservation::column('reservationStatus_id'), Reservation::get_futurePaymentStatuses());
        }
        else
        {
            $this->db->where_in(Reservation::column('reservationStatus_id'), Reservation::get_paymentStatuses());
        }
        $this->db->where(Reservation::column('toVenue') . ' >', 0);
        $this->db->where('YEAR(' . Booked_Period::column('end') . ')', $year);
        $this->db->where('MONTH(' . Booked_Period::column('end') . ')', $month);
    }
}