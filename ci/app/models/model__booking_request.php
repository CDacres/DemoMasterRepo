<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

use Aws\Ses\SesClient;

class Model__booking_request extends Model_Base__Unbound
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        return new Base__Null();
    }

    protected function _user_can_insert(Booking_Request $request)
    {
        return true;
    }

    public function insert_update($request, $userRequested = false)
    {
        $this->_handle_asset($request);
        $this->_handle_user($request);
        $this->_handle_periods($request);
        if (!$request->is_null('extras'))
        {
            $this->_handle_extras($request);
        }
        $this->_handle_price($request);
        $this->_handle_config($request);
        return $this->_insert_data($request);
    }

    private function _insert_data($request)
    {
        $booking = $this->_handle_booking($request);
        $this->_payment_machinations($request, $booking);
        return $this->_handle_reservation($request, $booking);
    }

    private function _payment_machinations(Booking_Request $request, Booking $booking)
    {
        $paymentRequest = $request->generate_payment_request($booking->get('id'), $this->_user_can_book_asset($request->get('asset_id')));
        $modelPayments = Model__payments::class;
        $this->load->model($modelPayments);
        try
        {
            $this->$modelPayments->make_payment($paymentRequest);
        }
        catch (Exception $ex)
        {
            $modelBookings = Model__bookings::class;
            $this->$modelBookings->delete($booking);
            throw new Exception($ex->getMessage());
        }
    }

    private function _handle_booking(Booking_Request $request)
    {
        $booking = $request->generate_booking();
        $modelBookings = Model__bookings::class;
        $this->load->model($modelBookings);
        return $this->$modelBookings->insert_update($booking);
    }

    private function _handle_reservation(Booking_Request $request, Booking $booking)
    {
        $straightToAccepted = $request->goes_straight_to_accepted();
        $reservation = $request->generate_reservation();
        $reservation->set('booking_id', $booking->get('id'));
        $title = $request->get('beneficiary')->wrangle('full_name')->formatted();
        $reservation->set('title', $title);
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        if ($straightToAccepted)
        {
            $reservation->suppress_emails_on_insert_update();
        }
        $simpleReservation = $this->$modelReservations->insert_update($reservation);
        $this->_handle_conversion($simpleReservation);
        $request->set('scheduler_event_color', $simpleReservation->get_calendar_colour());
        $request->set('title', $title);
        $request->set('start_moment', $simpleReservation->get('period')->get('start'));
        $request->set('end_moment', $simpleReservation->get('period')->get('end'));
        if ($straightToAccepted)
        {
            $simpleReservation->suppress_emails_on_insert_update(false, false);
            try
            {
                $this->$modelReservations->update_reservation_status($simpleReservation, Reservation_Status::ACCEPTED, "Automatically accepted");
            }
            catch (Exception $exc)
            {
                error_log("Unable to update reservation status: " . $exc->getMessage());
            }
        }
        $extendedReservation = $this->$modelReservations->get_extended_reservation_by_id($simpleReservation->get_id());
        if (!$extendedReservation->is_null('client_token') && ($extendedReservation->get('booking_channel_id') == Booking_Channel::VENUECALENDAR || $extendedReservation->get('booking_channel_id') == Booking_Channel::WIDGET))
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->new_widget_calendar_reservation_user($extendedReservation);
        }
        $request->set('reservation', $extendedReservation);
        if (!$extendedReservation->is_null('booking_id'))
        {
            $this->load->helper('analytics');
            $analytics_helper = new Analytics_Helper();
            $analytics_helper->register_tracking_event('MAKE_BOOKING_REQUEST', [$extendedReservation->get('booking_id'), $extendedReservation->get('asset_id'), $extendedReservation->wrangle('total_revenue')->round_to_currency_quantum()]);
        }
        // Create hubspot deal, associated with beneficiary of the booking.
        try
        {
            $user = $request->get('beneficiary');
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $associatedVid = $this->$modelUsers->get_create_hubspot_id($user);
            // Closedate must be unix timestamp in milliseconds
            $closedate = strtotime($request->get('end_moment')) * 1000;
            $properties = [
                (object) [
                    'name' => 'attendees',
                    'value' => $request->get('guests')
                ],
                (object) [
                    'name' => 'budget',
                    'value' => $request->wrangle('price')->formatted()
                ],
                (object) [
                    'name' => 'room_configuration',
                    'value' => $request->get('configuration')
                ],
                (object) [
                    'name' => 'amount',
                    'value' => $request->get_commission()
                ],
                (object) [
                    'name' => 'bookingenddate',
                    'value' => $request->get('end_moment')
                ],
                (object) [
                    'name' => 'bookingstartdate',
                    'value' => $request->get('start_moment')
                ],
                (object) [
                    'name' => 'closedate',
                    'value' => $closedate
                ],
                (object) [
                    'name' => 'reservationid',
                    'value' => $simpleReservation->get_id()
                ],
                (object) [
                    'name' => 'first_interaction',
                    'value' => 'Website'
                ],
            ];
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $room = $this->$modelRooms->get_room_object_by_asset_id($request->get('asset_id'));
            if ($room->exists_in_db())
            {
                array_push($properties, (object) [
                    'name' => 'city',
                    'value' => $room->get('venue_city')
                ]);
                array_push($properties, (object) [
                    'name' => 'country',
                    'value' => $room->get('venue_country')
                ]);
                array_push($properties, (object) [
                    'name' => 'venuename',
                    'value' => $room->get('venue_name')
                ]);
                array_push($properties, (object) [
                    'name' => 'venueurl',
                    'value' => get_venue_url($room)
                ]);
                $room->set('last_booked', date("Y-m-d H:i:s"));
                $this->$modelRooms->insert_update($room);
            }
            array_push($properties, (object) [
                'name' => 'dealname',
                'value' => $user->get('username') . " - " . $user->get('email')
            ]);
            array_push($properties, (object) [
                'name' => 'reservationstatus',
                'value' => $extendedReservation->get('status_name')
            ]);
            $this->load->library('HubspotAPI');
            $associations['associatedVids'] = [$associatedVid];
            $contact_response = $this->hubspotapi->get_user_by_id($associatedVid);
            if (isset($contact_response['result']->properties) && isset($contact_response['result']->properties->associatedcompanyid))
            {
                $associations['associatedCompanyIds'] = [$contact_response['result']->properties->associatedcompanyid->value];
            }
            $result = $this->hubspotapi->create_deal(config_item('hubspot_portal_id'), config_item('hubspot_pipeline_id'), config_item('hubspot_stage_id'), $properties, $associations);
            if (!isset($result['status']) || (isset($result['status']) && $result['status'] != 200))
            {
                error_log("Unable to add deal to Hubspot: " . json_encode($result), 0);
            }
            else
            {
                $reservation->set('hubspot_id', $result['result']->dealId);
                $this->$modelReservations->insert_update($reservation);
            }
            $phoneresult = $this->hubspotapi->update_user($associatedVid, [
                (object) [
                    'property' => 'phone',
                    'value' => $request->get('phone_number')
                ]
            ]);
            if (!isset($phoneresult['status']) || (isset($phoneresult['status']) && $phoneresult['status'] != 204))
            {
                error_log("Unable to update user phone number: " . $user->get('id'), 0);
            }
        }
        catch (Exception $exc)
        {
            error_log("Unable to connect to Hubspot: " . $exc->getMessage(), 0);
        }
        return $request;
    }

    private function _handle_periods($request)
    {
        if (!($this->user_is_admin() && !$request->is_null('period') && !$request->get('period')->is_empty()))
        {
            if ($request->is_daily())
            {
                $this->_daily_machinations($request);
            }
            else
            {
                $this->_hourly_machinations($request);
            }
        }
    }

    private function _daily_machinations($request)
    {
        $modelBookedPeriods = Model__booked_periods::class;
        $this->load->model($modelBookedPeriods);
        $assetId = $request->get('asset_id');
        if (!$this->$modelBookedPeriods->check_valid_dates($assetId, $request->get('start_date'), $request->get('end_date')))
        {
            throw new Exception("We're sorry, but someone has booked this room since you began your request. Please return to the search page to find another great Zipcube room!");
        }
        $modelOpeningHours = Model__opening_hours::class;
        $this->load->model($modelOpeningHours);
        $openingHours = $this->$modelOpeningHours->get_weekly_opening_object_collection_by_asset_id($assetId);
        $bookedPeriods = $openingHours->as_booked_period($request->get('start_date'), $request->get('end_date'), $assetId);
        $modelDailyPrice = Model__daily_price::class;
        $this->load->model($modelDailyPrice);
        $request->set('period', $bookedPeriods);
        $price = $this->$modelDailyPrice->get_price_by_asset_id($assetId) * $bookedPeriods->wrangle('duration')->wrangle('rounded_days')->number();
        if (!$request->is_null('discount'))
        {
            $price = ($price * ((100 - $request->get('discount')) / 100));
        }
        $request->set('base_price', $price);
    }

    private function _hourly_machinations($request)
    {
        $period = null;
        $assetId = $request->get('asset_id');
        if ($request->has_period())
        {
            $period = $request->get('period');
            $period->set('asset_id', $request->get('asset_id'));
            $period->set('all_day', false);
            $period->set('duration_days', 0);
            $date = $period->get_start_date();
        }
        elseif ($request->has_slots())
        {
            $date = $request->get('start_date');
            $originalSlots = $request->get('slots');
            $modelSimpleRooms = Model__simple_rooms::class;
            if (!$this->$modelSimpleRooms->check_valid_slots($assetId, $originalSlots, $date))
            {
                throw new Exception("We're sorry, but someone has booked this room since you began your request. Please return to the search page to find another great Zipcube room!");
            }
            $period = $originalSlots->as_booked_period($date, $assetId);
        }
        else
        {
            throw new Exception("We're sorry, but this booking does not have valid times and dates. Please try again.");
        }
        $modelOpeningHours = Model__opening_hours::class;
        $this->load->model($modelOpeningHours);
        $openingHours = $this->$modelOpeningHours->get_daily_availability($assetId, $date);
        $maskCollection = new Available_Period___Collection();
        $maskCollection->add_object($period);
        $maskCollection->convert_to_daily_mask();
        $openingHours->push_periods($maskCollection);
        $openingHours->filter_on_availability();
        $price = $openingHours->get_total_price();
        $request->set('period', $openingHours->as_booked_period($date, $assetId));
        //hourly prices based on slots already have client discount taken into account.
        $request->set('base_price', $price);
    }

    private function _handle_extras($request)
    {
        $modelAssetAmenities = Model__asset_amenities::class;
        $this->load->model($modelAssetAmenities);
        $amenities = $this->$modelAssetAmenities->get_amenities_object_collection_by_asset_id($request->get('asset_id'));
        $totalPrice = 0;
        $addOnString = '';
        foreach ($request->get('extras')->object() as $extra)
        {
            $amenity = $amenities->get_object_by_id($extra->get('id'));
            if ($amenity->is_null_object())
            {
                throw new Exception("One of your add on requests is no longer available. Please go back and try again.");
            }
            $number = $extra->get('quantity');
            $addOnString .= $number . " x " . $amenity->get('amenity_desc');
            if (!$amenity->is_null('price'))
            {
                $addOnString .= ": " . $amenity->wrangle('price')->formatted(true);
            }
            $addOnString .= "; ";
            $totalPrice += (float)$amenity->get('cost') * $number;
        }
        $request->set('add_on_price', $totalPrice);
        $request->set('addOns', $addOnString);
    }

    private function _handle_price($request)
    {
        $venue_vat = $request->get_venue_vat();
        if (!$this->_user_can_override_price($request) && !$request->is_null('price_control_applied'))
        {
            if (!$request->is_null('flexible_percent') && $request->is_true('cancel_applied'))
            {
                $flexible_fee = (($request->get('flexible_percent') / 100) * ($request->get('base_price') * (1 + ($request->get('price_control_applied') / 100))));
                $this->_set_flexible_fees($request, $venue_vat, $flexible_fee);
                $cancel_price = ($request->get('base_price') + $request->get('flexible_fee') + $request->get('flexible_fee_vat'));
                $request->set('cancel_price', $cancel_price);
                $price_control_fee = ($request->get('given_price') - $request->get('add_on_price') - $cancel_price);
            }
            else
            {
                $price_control_fee = ($request->get('given_price') - $request->get('add_on_price') - $request->get('base_price'));
            }
            try
            {
                if ($venue_vat > 0)
                {
                    $price_control_fee_without_vat = ($price_control_fee / (1 + ($venue_vat / 100)));
                    $request->set('price_control_fee', $price_control_fee_without_vat);
                    $request->set('price_control_fee_vat', ($price_control_fee - $price_control_fee_without_vat));
                }
                else
                {
                    $request->set('price_control_fee', $price_control_fee);
                    $request->set('price_control_fee_vat', 0);
                }
            }
            catch (Exception $ex)
            {
                $exceptionData = new stdClass();
                $exceptionData->asset_id = $request->get('asset_id');
                $exceptionData->given_price = $request->get('given_price');
                $exceptionData->cancel_applied = $request->get('cancel_applied');
                $exceptionData->extra_fee = $request->get('extra_fee');
                $exceptionData->extra_fee_vat = $request->get('extra_fee_vat');
                $exceptionData->flexible_percent = $request->get('flexible_percent');
                $exceptionData->flexible_applied = $request->get('flexible_applied');
                $exceptionData->price_control_applied = $request->get('price_control_applied');
                $exceptionData->base_price = $request->get('base_price');
                $exceptionData->add_on_price = $request->get('add_on_price');
                $exceptionData->addOns = $request->get('addOns');
                $exceptionData->flexible_fee = $request->get('flexible_fee');
                $exceptionData->flexible_fee_vat = $request->get('flexible_fee_vat');
                $exceptionData->cancel_price = $request->get('cancel_price');
                $exceptionData->priceControlFee = $price_control_fee;
                $exceptionData->room_currency_code = $request->get('room_currency_code');
                $exceptionData->email = $request->get('email');
                $exceptionData->beneficiary_email = $request->get('beneficiary_email');
                $exceptionData->start_date = $request->get('start_date');
                $exceptionData->end_date = $request->get('end_date');
                $exceptionData->booking_type = $request->get('booking_type');
                $exceptionData->payment_type = $request->get('payment_type');
                $exceptionData->guests = $request->get('guests');
                $exceptionData->bookingChannel_id = $request->get('bookingChannel_id');
                $this->load->library('awslib');
                $to = 'tech@zipcube.com';
                $from['user'] = 'Zipcube';
                $from['email'] = 'info@zipcube.com';
                $client = SesClient::factory([
                    'key' => $this->config->item('aws_key_id'),
                    'secret' => $this->config->item('aws_secret_access_key'),
                    'region' => $this->config->item('aws_region')
                ]);
                $mailArray = [
                    'Source' => $from['user'] . ' <' . $from['email'] . '>',
                    'Destination' => ['ToAddresses' => [$to]],
                    'Message' => [
                        'Subject' => ['Data' => 'Price control exception'],
                        'Body' => ['Html' => ['Data' => print_r($exceptionData, true)]]
                    ]
                ];
                $client->sendEmail($mailArray);
                throw new Exception('Something went wrong.');
            }
        }
        else
        {
            if (!$request->is_null('flexible_percent') && $request->is_true('cancel_applied'))
            {
                $flexible_fee = (($request->get('flexible_percent') / 100) * $request->get('base_price'));
                $this->_set_flexible_fees($request, $venue_vat, $flexible_fee);
                $request->set('cancel_price', ($request->get('base_price') + $request->get('flexible_fee') + $request->get('flexible_fee_vat')));
            }
        }
        if ($this->_user_can_override_price($request))
        {
            if ($request->is_null('given_price'))
            {
                throw new Exception("Please enter a price for this transaction, or enter 0 to confirm a free booking.");
            }
            else
            {
                $extra_fee = $request->get('extra_fee');
                if ($venue_vat > 0)
                {
                    $extra_fee_without_vat = ($extra_fee / (1 + ($venue_vat / 100)));
                    $request->set('extra_fee', $extra_fee_without_vat);
                    $request->set('extra_fee_vat', ($extra_fee - $extra_fee_without_vat));
                }
                else
                {
                    $request->set('extra_fee_vat', 0);
                }
                if (!$request->is_null('flexible_percent') && $request->is_true('cancel_applied'))
                {
                    $request->set('base_price', (($request->get('given_price') - $request->get('add_on_price')) / (1 + ($request->get('flexible_percent') / 100))));
                    $request->set('cancel_price', ($request->get('given_price') - $request->get('add_on_price')));
                    $flexible_fee = ($request->get('base_price') * ($request->get('flexible_percent') / 100));
                    $this->_set_flexible_fees($request, $venue_vat, $flexible_fee);
                }
                else
                {
                    $request->set('base_price', ($request->get('given_price') - $request->get('add_on_price')));
                }
            }
        }
        elseif (!$request->check_price())
        {
            throw new Exception("We're sorry, but the price we quoted to you for this booking has now become inaccurate.");
        }
    }

    private function _user_can_override_price(Booking_Request $request)
    {
        $retVal = false;
        if ($this->user_is_admin())
        {
            $retVal = true;
        }
        else
        {
            $retVal = $this->_user_can_book_asset($request->get('asset_id'));
        }
        return $retVal;
    }

    private function _user_can_book_asset($assetId)
    {
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        return $this->$modelUserAsset->check_your_privilege($assetId, $this->get_user_id(), Runt_User_Asset_Privilege::MAKE_BOOKING);
    }

    private function _set_flexible_fees($request, $venue_vat, $flexible_fee)
    {
        if ($venue_vat > 0)
        {
            $flexible_fee_without_vat = ($flexible_fee / (1 + ($venue_vat / 100)));
            $request->set('flexible_fee', $flexible_fee_without_vat);
            $request->set('flexible_fee_vat', ($flexible_fee - $flexible_fee_without_vat));
        }
        else
        {
            $request->set('flexible_fee', $flexible_fee);
            $request->set('flexible_fee_vat', 0);
        }
    }

    private function _handle_config($request)
    {
        $modelConfigurations = Model__configurations::class;
        $this->load->model($modelConfigurations);
        $configObject = $this->$modelConfigurations->get_configuration_by_id($request->get('configuration_id'), $request->get('asset_id'));
        if ($configObject->is_null_object())
        {
            throw new Exception("We're sorry, but that configuration is no longer available for this room.");
        }
        $guests = $request->get('guests');
        if ($configObject->get('max_capacity') < $guests)
        {
            throw new Exception("We're sorry, but that configuration can not hold " . $guests . " guests. The maximum is " . $configObject->get('max_capacity') . ".");
        }
        $request->set('configuration', $configObject->get('desc'));
    }

    private function _handle_asset($request)
    {
        $modelSimpleRooms = Model__simple_rooms::class;
        $this->load->model($modelSimpleRooms);
        $assetId = $request->get('asset_id');
        $room = $this->$modelSimpleRooms->get_room_object_by_asset_id($assetId);
        if (!$room->exists_in_db())
        {
            throw new Exception('Sorry - that space is not currently available.');
        }
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($assetId);
        if (!$venue->exists_in_db())
        {
            throw new Exception('Sorry - that space is not currently available.');
        }
        $request->set('room_currency_code', $room->get('currency_code'));
        if (!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))
        {
            $request->set('flexible_percent', $room->get('flexible_percent'));
            $request->set('flexible_applied', true);
        }
        if (!$room->is_null('price_control_percent'))
        {
            $request->set('price_control_applied', $room->get('price_control_percent'));
        }
        if ($request->needs_commission_percentage())
        {
            $request->set_commission_percentage($this->$modelSimpleRooms->get_asset_commission_percentage($room, $request->get('bookingChannel_id')));
            $request->set_commission_vat($venue->get_venue_vat());
        }
    }

    private function _handle_user($request)
    {
        $bookingUser = new Base__Null();
        if ($this->user_is_logged_in())
        {
            $bookingUser = $this->get_user();
            $this->_update_user_details($bookingUser, $request);
            $this->_get_user_discount($bookingUser, $request);
        }
        else
        {
            $bookingUser = $this->_get_user($request);
        }
        $request->set('booker', $bookingUser);
        if ($request->has_beneficiary())
        {
            $beneficiaryUser = $this->_get_user($request, true);
            $request->set('beneficiary', $beneficiaryUser);
        }
        else
        {
            $request->set('beneficiary', $bookingUser);
        }
    }

    private function _get_user($request, $beneficiary = false)
    {
        $emailIdentifier = "email";
        if ($beneficiary)
        {
            $emailIdentifier = "beneficiary_email";
        }
        $email = $request->get($emailIdentifier);
        if ($email !== null)
        {
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->$modelUsers->get_user_by_email($email);
            if (!$user->exists_in_db())
            {
                $protoPaymentUser = new User();
                $protoPaymentUser->set('email', strtolower($email));
                if (!$request->is_null('never_bounce_status'))
                {
                    $protoPaymentUser->set('email_status', neverBounceStatusToEmailStatus($request->get('never_bounce_status')));
                }
                $protoPaymentProfile = $request->generate_new_user_profile($beneficiary);
                $user = $this->$modelUsers->create_new_user_with_profile($protoPaymentUser, $protoPaymentProfile);
                $request->set('user_requires_password', true);
            }
            else
            {
                $this->_update_user_details($user, $request, $beneficiary);
                $this->_get_user_discount($user, $request);
                $request->set('user_requires_password', false);
            }
            return $user;
        }
        return null;
    }

    private function _update_user_details($user, $request, $beneficiary = false)
    {
        $modelProfiles = Model__profiles::class;
        $this->load->model($modelProfiles);
        $userProfile = $this->$modelProfiles->get_profile_by_user_id($user->get_id());
        if ($beneficiary)
        {
            if ($user->get('email') == $request->get('beneficiary_email'))
            {
                $userProfile->set('phone_number', $request->get('beneficiary_phone_number'));
                $userProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $request->get('beneficiary_phone_number')));
                if ($request->get('bookingChannel_id') == Booking_Channel::FRONTEND)
                {
                    $userProfile->set('first_name', trim($request->get('beneficiary_first_name')));
                    $userProfile->set('last_name', trim($request->get('beneficiary_last_name')));
                }
                $this->$modelProfiles->insert_update($userProfile);
            }
        }
        else
        {
            if ($user->get('email') == $request->get('email'))
            {
                $userProfile->set('phone_number', $request->get('phone_number'));
                $userProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $request->get('phone_number')));
                if ($request->get('bookingChannel_id') == Booking_Channel::FRONTEND)
                {
                    $userProfile->set('first_name', trim($request->get('first_name')));
                    $userProfile->set('last_name', trim($request->get('last_name')));
                }
                $this->$modelProfiles->insert_update($userProfile);
            }
        }
    }

    private function _get_user_discount($user, $request)
    {
        $modelUserAssetMember = Model__user_asset_members::class;
        $this->load->model($modelUserAssetMember);
        $user_discount = $this->$modelUserAssetMember->get_user_by_asset_and_id($request->get('asset_id'), $user->get_id());
        if ($user_discount->exists_in_db())
        {
            $request->set('discount', $user_discount->get('discount'));
        }
    }

    private function _handle_conversion($reservation)
    {
        if ($this->session->userdata('gclid') !== false)
        {
            $conversionModel = Gadcons::class;
            $this->load->model($conversionModel);
            $this->$conversionModel->insert_conversion('payment', $reservation->wrangle('total_revenue')->round_to_currency_quantum(), $reservation->get('currency'), $this->session->userdata('gclid'));
        }
    }
}
