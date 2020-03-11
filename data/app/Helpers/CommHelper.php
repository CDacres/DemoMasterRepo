<?php

namespace App\Helpers;

use App\Models\Booking\Reservation;
use App\Models\Pivots\AssetUserPrivilege;
use App\Models\Locale;
use App\Models\Booking\Message;
use App\Models\Booking\MessageType;
use App\Models\User;
use App\Models\Room;
use App\Models\Venue;
use App\Models\Enquiry;

use App\Helpers\Formatting\PriceHelper;
use App\Helpers\RoomHelper;
use App\Helpers\VenueHelper;
use App\Helpers\Formatting\DateTimeHelper;

class CommHelper
{
    public function password_update($user, $passwordPlainText)
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($user);
        $emailVariables = [
            'username' => ucfirst($user->firstname),
            'email' => $user->email,
            'password' => $passwordPlainText
        ];
        $emailHelper->sendMail($user, 'user.forgot_password.v1', [], $emailVariables, $locale->domain_code);
    }

    public function asset_member_updated_password($user, $passwordPlainText, $companyAdminName, $companyToken)
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($user);
        $emailVariables = [
            'username' => ucfirst($user->firstname),
            'email' => $user->email,
            'password' => $passwordPlainText,
            'company_admin_fname' => ucfirst($companyAdminName),
            'calendar_link' => env('SITE_URL') . '/' . $locale->domain_code . '/dashboard/schedule',
            'login_link' => env('SITE_URL') . '/' . $locale->domain_code . '/users/signin',
            'widget_link' => env('SITE_URL') . '/' . $locale->domain_code . '/widget/?source=zipcube&medium=email&type=password_change&token=' . $companyToken
        ];
        $emailHelper->sendMail($user, 'user.asset_member_updated_password.v1', [], $emailVariables, $locale->domain_code);
    }

    public function asset_team_member_created($user, $passwordPlainText, $company, $venue_admin = false, $company_admin = false, $assetArr = [])
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($user);
        $emailVariables = [
            'username' => ucfirst($user->firstname),
            'email' => $user->email,
            'password' => $passwordPlainText,
            'company_name' => $company->name,
            'login_link' => env('SITE_URL') . '/' . $locale->domain_code . '/users/signin'
        ];
        $stepStr = '';
        if ($venue_admin)
        {
            $venueStr = '';
            $roomStr = '';
            foreach ($assetArr as $venue)
            {
                $user_venue = Venue::find($venue);
                if (!is_null($user_venue))
                {
                    $venueStr .= $this->_find_venue_completion_email_str($user_venue, $user->language_pref);
                    $rooms = Room::whereHas('venue', function($query) use ($user_venue) {
                        $query->where('asset_id', $user_venue->asset_id);
                    })->get();
                    if (!is_null($rooms))
                    {
                        foreach ($rooms as $room)
                        {
                            $roomStr .= $this->_find_room_completion_email_str($room, $user->language_pref);
                        }
                    }
                }
            }
            $stepStr .= $venueStr . $roomStr;
        }
        elseif ($company_admin)
        {
            $company_asset_id = $company->asset_id;
            $venues = Venue::whereHas('company', function ($query) use ($company_asset_id) {
                $query->where('asset_id', $company_asset_id);
            })->get();
            if (!is_null($venues))
            {
                foreach ($venues as $venue)
                {
                    $stepStr .= $this->_find_venue_completion_email_str($venue, $user->language_pref);
                }
            }
            $rooms = Room::whereHas('venue', function ($query) use ($company_asset_id) {
                $query->whereHas('company', function ($query) use ($company_asset_id) {
                    $query->where('asset_id', $company_asset_id);
                });
            })->get();
            if (!is_null($rooms))
            {
                foreach ($rooms as $room)
                {
                    $stepStr .= $this->_find_room_completion_email_str($room, $user->language_pref);
                }
            }
        }
        if ($stepStr != '')
        {
            $emailVariables['step_str'] = $stepStr;
            $emailHelper->sendMail($user, 'user.team_member_created.v1', [], $emailVariables, $locale->domain_code, 'steps');
        }
        else
        {
            $emailHelper->sendMail($user, 'user.team_member_created.v1', [], $emailVariables, $locale->domain_code);
        }
    }

    private function _find_venue_completion_email_str($venue, $lang)
    {
        $stepStr = '';
        $venueHelper = new VenueHelper();
        $venue_steps = $venueHelper->get_uncompleted_stages($venue, $lang);
        if ($venue_steps['todo'] > 0)
        {
            $stepStr .= '-     ' . $venue->name . ' - ' . trans_choice('assets.steps', $venue_steps['todo'], ['number' => $venue_steps['todo']]) . ' (' . $venue_steps['stages'] . ')<br>';
        }
        return $stepStr;
    }

    private function _find_room_completion_email_str($room, $lang)
    {
        $stepStr = '';
        $roomHelper = new RoomHelper();
        $room_steps = $roomHelper->get_uncompleted_stages($room, $lang);
        if ($room_steps['todo'] > 0)
        {
            $stepStr .= '-     ' . $room->name . ' (' . $room->venuename . ') - ' . trans_choice('assets.steps', $room_steps['todo'], ['number' => $room_steps['todo']]) . ' (' . $room_steps['stages'] . ')<br>';
        }
        return $stepStr;
    }

    public function asset_user_member_created($user, $passwordPlainText = false, $assetObj)
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($user);
        $emailVariables = [
            'username' => ucfirst($user->firstname),
            'asset_name' => $assetObj->name,
            'widget_link' => env('SITE_URL') . '/' . $locale->domain_code . '/widget?source=zipcube&medium=email&type=welcome&token=' . $assetObj->token
        ];
        if ($passwordPlainText !== false)
        {
            $emailVariables['email'] = $user->email;
            $emailVariables['password'] = $passwordPlainText;
            $emailVariables['login_link'] = env('SITE_URL') . '/' . $locale->domain_code . '/users/signin';
            $emailHelper->sendMail($user, 'user.asset_member_created.v1', [], $emailVariables, $locale->domain_code);
        }
        else
        {
            $emailVariables['set_password_link'] = env('SITE_URL') . '/' . $locale->domain_code . '/set-new-password?source=zipcube&medium=email&type=welcome&token=' . $user->token;
            $emailHelper->sendMail($user, 'user.asset_member_created.v1', [], $emailVariables, $locale->domain_code, 'token');
        }
    }

    public function new_widget_calendar_reservation_user($reservation)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $client = $extendedReservation->booking->beneficiary;
        $client_locale = $this->_find_user_locale($client);
        $emailVariables['set_password_link'] = env('SITE_URL') . '/' . $client_locale->domain_code . '/set-new-password?source=zipcube&medium=email&type=welcome&token=' . $extendedReservation->clienttoken;
        $emailVariables['widget_link'] = env('SITE_URL') . '/' . $client_locale->domain_code . '/widget?source=zipcube&medium=email&type=welcome&token=' . $extendedReservation->asset->companytoken;
        $emailHelper->sendMail($client, 'reservation.new_client_non_frontend.v1', [], $emailVariables, $client_locale->domain_code);
    }

    public function new_reservation_request($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $emailVariablesClient = $emailVariables;
        $emailVariables['host_name'] = '';
        $emailVariables['market_price'] = $this->_get_market_price($extendedReservation);
        $venue_emails = [];
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            foreach ($venueNotees as $notee)
            {
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                if (!$venue_suppressed)
                {
                    $message = new Message();
                    $message->reservation_id = $extendedReservation->id;
                    $message->userto = $notee->user->id;
                    $message->userby = $extendedReservation->clientid;
                    $message->message = 'You have a new reservation request from ' . $extendedReservation->clientname . ' for ' . $extendedReservation->asset->name . ' at ' . $extendedReservation->asset->venuename;
                    $message->message_type_id = MessageType::REQUEST;
                    $message->set_as_conversation();
                    $message->save();
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailVariables['book_date'] = $this->_get_book_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['checkin'] = $this->_get_reservation_start_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['checkout'] = $this->_get_reservation_end_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['accept_decline_url'] = env('SITE_URL') . '/' . $contact_locale->domain_code . '/dashboard/accept-decline-token?source=zipcube&medium=email&type=new_reservation&token=' . $extendedReservation->token;
                    $emailHelper->sendMail($notee->user, 'reservation.host_notification.v1', ['client_fname' => $emailVariables['client_fname']], $emailVariables, $contact_locale->domain_code);
                }
                $venue_emails[] = $notee->user->email;
            }
        }
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailVariablesClient['market_price'] = $this->_get_market_price($extendedReservation, true);
            $emailVariablesClient['checkin'] = $this->_get_reservation_start_date($extendedReservation, $client_locale->locale_code);
            $emailVariablesClient['checkout'] = $this->_get_reservation_end_date($extendedReservation, $client_locale->locale_code);
            if (!is_null($extendedReservation->clienttoken))
            {
                $emailVariablesClient['set_password_link'] = env('SITE_URL') . '/' . $client_locale->domain_code . '/set-new-password?source=zipcube&medium=email&type=new_reservation&token=' . $extendedReservation->clienttoken;
                $emailHelper->sendMail($client, 'reservation.client_notification.v1', [], $emailVariablesClient, $client_locale->domain_code, 'token');
            }
            else
            {
                $emailHelper->sendMail($client, 'reservation.client_notification.v1', [], $emailVariablesClient, $client_locale->domain_code);
            }
        }
        $emailVariablesAdmin = $emailVariables;
        $emailVariablesAdmin['venue_email'] = implode(', ', $venue_emails);
        $emailVariablesAdmin['checkin'] = $this->_get_reservation_start_date($extendedReservation);
        $emailVariablesAdmin['checkout'] = $this->_get_reservation_end_date($extendedReservation);
        $emailHelper->sendAdminMail('reservation.admin_notification.v1', ['client_fname' => $emailVariablesAdmin['client_fname'], 'venue_name' => $emailVariablesAdmin['venue_name']], $emailVariablesAdmin);
    }

    public function reservation_expired($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $emailVariablesClient = $emailVariables;
        $emailVariables['host_name'] = '';
        $venue_emails = [];
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->first();
                $message = new Message();
                $message->reservation_id = $extendedReservation->id;
                $message->userto = $extendedReservation->clientid;
                $message->userby = $primaryNotee->user->id;
                $message->message = 'We are afraid your reservation request to ' . $extendedReservation->asset->venuename . ' has expired following inaction on their part. Our apologies.';
                $message->message_type_id = MessageType::VENUEMADE;
                $message->set_as_conversation();
                $message->save();
            }
            foreach ($venueNotees as $notee)
            {
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                if (!$venue_suppressed)
                {
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailHelper->sendMail($notee->user, 'reservation.host_expire.v1', [], $emailVariables, $contact_locale->domain_code);
                }
                $venue_emails[] = $notee->user->email;
            }
        }
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailHelper->sendMail($client, 'reservation.client_expire.v1', [], $emailVariablesClient, $client_locale->domain_code);
        }
        $emailVariablesAdmin = $emailVariables;
        $emailVariablesAdmin['venue_email'] = implode(', ', $venue_emails);
        $emailVariablesAdmin['market_price'] = $this->_get_market_price($extendedReservation);
        $emailVariablesAdmin['checkin'] = $this->_get_reservation_start_date($extendedReservation);
        $emailVariablesAdmin['checkout'] = $this->_get_reservation_end_date($extendedReservation);
        $emailHelper->sendAdminMail('reservation.admin_expire.v1', ['venue_name' => $emailVariablesAdmin['venue_name']], $emailVariablesAdmin);
    }

    public function reservation_accepted($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $emailVariables['host_name'] = '';
        $emailVariables['venue_email'] = '';
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            $venue_emails = [];
            foreach ($venueNotees as $notee)
            {
                $venue_emails[] = $notee->user->email;
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
            }
            $emailVariables['venue_email'] = implode(', ', $venue_emails);
            $emailVariables['market_price'] = $this->_get_market_price($extendedReservation);
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->first();
                $message = new Message();
                $message->reservation_id = $extendedReservation->id;
                $message->userto = $extendedReservation->clientid;
                $message->userby = $primaryNotee->user->id;
                $message->message = 'Excellent! Your reservation request has been granted by ' . ucfirst($primaryNotee->user->firstname) . ' for ' . $extendedReservation->asset->name . '.';
                $message->message_type_id = MessageType::VENUEMADE;
                $message->set_as_conversation();
                $message->save();
            }
            if (!$venue_suppressed)
            {
                foreach ($venueNotees as $notee)
                {
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailVariables['checkin'] = $this->_get_reservation_start_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['checkout'] = $this->_get_reservation_end_date($extendedReservation, $contact_locale->locale_code);
                    $emailHelper->sendMail($notee->user, 'reservation.host_granted.v1', ['client_fname' => $emailVariables['client_fname']], $emailVariables, $contact_locale->domain_code);
                }
            }
        }
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailVariablesClient = $emailVariables;
            $emailVariablesClient['market_price'] = $this->_get_market_price($extendedReservation, true);
            $emailVariablesClient['checkin'] = $this->_get_reservation_start_date($extendedReservation, $client_locale->locale_code);
            $emailVariablesClient['checkout'] = $this->_get_reservation_end_date($extendedReservation, $client_locale->locale_code);
            $emailVariablesClient['message_request_link'] = env('SITE_URL') . '/' . $client_locale->domain_code . '/dashboard/message_request/' . $extendedReservation->id;
            $emailHelper->sendMail($client, 'reservation.client_granted.v1', [], $emailVariablesClient, $client_locale->domain_code);
        }
        $emailVariablesAdmin = $emailVariables;
        $emailHelper->sendAdminMail('reservation.admin_granted.v1', ['host_name' => $emailVariablesAdmin['host_name'], 'client_fname' => $emailVariablesAdmin['client_fname']], $emailVariablesAdmin);
    }

    public function reservation_declined($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $emailVariablesClient = $emailVariables;
        $emailVariables['host_name'] = '';
        $venue_emails = [];
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->first();
                $message = new Message();
                $message->reservation_id = $extendedReservation->id;
                $message->userto = $extendedReservation->clientid;
                $message->userby = $primaryNotee->user->id;
                $message->message = 'Sorry! Your reservation request has been declined by ' . ucfirst($primaryNotee->user->firstname) . ' for ' . $extendedReservation->asset->name . '.';
                $message->message_type_id = MessageType::VENUEMADE;
                $message->set_as_conversation();
                $message->save();
            }
            foreach ($venueNotees as $notee)
            {
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                if (!$venue_suppressed)
                {
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailHelper->sendMail($notee->user, 'reservation.host_declined.v1', ['client_fname' => $emailVariables['client_fname']], $emailVariables, $contact_locale->domain_code);
                }
                $venue_emails[] = $notee->user->email;
            }
        }
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailHelper->sendMail($client, 'reservation.client_declined.v1', [], $emailVariablesClient, $client_locale->domain_code);
        }
        $emailVariablesAdmin = $emailVariables;
        $emailVariablesAdmin['venue_email'] = implode(', ', $venue_emails);
        $emailVariablesAdmin['market_price'] = $this->_get_market_price($extendedReservation);
        $emailVariablesAdmin['checkin'] = $this->_get_reservation_start_date($extendedReservation);
        $emailVariablesAdmin['checkout'] = $this->_get_reservation_end_date($extendedReservation);
        $emailHelper->sendAdminMail('reservation.admin_declined.v1', ['host_name' => $emailVariablesAdmin['host_name'], 'client_fname' => $emailVariablesAdmin['client_fname']], $emailVariablesAdmin);
    }

    public function reservation_cancelled_by_host($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $venue_emails = [];
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->first();
                $message = new Message();
                $message->reservation_id = $extendedReservation->id;
                $message->userto = $extendedReservation->clientid;
                $message->userby = $primaryNotee->user->id;
                $message->message = 'Sorry! Your reservation request has been cancelled by ' . ucfirst($primaryNotee->user->firstname) . ' for ' . $extendedReservation->asset->name . '.';
                $message->message_type_id = MessageType::VENUEMADE;
                $message->set_as_conversation();
                $message->save();
            }
            foreach ($venueNotees as $notee)
            {
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                if (!$venue_suppressed)
                {
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailVariables['market_price'] = $this->_get_market_price($extendedReservation);
                    $emailVariables['checkin'] = $this->_get_reservation_start_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['checkout'] = $this->_get_reservation_end_date($extendedReservation, $contact_locale->locale_code);
                    $emailHelper->sendMail($notee->user, 'reservation.host_cancelbyhost.v1', [], $emailVariables, $contact_locale->domain_code);
                }
                $venue_emails[] = $notee->user->email;
            }
        }
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailVariablesClient = $emailVariables;
            $emailVariablesClient['checkin'] = $this->_get_reservation_start_date($extendedReservation, $client_locale->locale_code);
            $emailVariablesClient['checkout'] = $this->_get_reservation_end_date($extendedReservation, $client_locale->locale_code);
            $emailHelper->sendMail($client, 'reservation.client_cancelbyhost.v1', [], $emailVariablesClient, $client_locale->domain_code);
        }
        $emailVariablesAdmin = $emailVariables;
        $emailVariablesAdmin['venue_email'] = implode(', ', $venue_emails);
        $emailVariablesAdmin['market_price'] = $this->_get_market_price($extendedReservation);
        $emailVariablesAdmin['checkin'] = $this->_get_reservation_start_date($extendedReservation);
        $emailVariablesAdmin['checkout'] = $this->_get_reservation_end_date($extendedReservation);
        $emailHelper->sendAdminMail('reservation.admin_cancelbyhost.v1', ['venue_name' => $emailVariablesAdmin['venue_name']], $emailVariablesAdmin);
    }

    public function reservation_cancelled_by_user($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $emailVariablesClient = $emailVariables;
        $emailVariables['host_name'] = '';
        $venue_emails = [];
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            foreach ($venueNotees as $notee)
            {
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                if (!$venue_suppressed)
                {
                    $message = new Message();
                    $message->reservation_id = $extendedReservation->id;
                    $message->userto = $notee->user->id;
                    $message->userby = $extendedReservation->clientid;
                    $message->message = ucfirst($extendedReservation->clientname) . ' has cancelled their request for ' . $extendedReservation->asset->name . ' at ' . $extendedReservation->asset->venuename . '.';
                    $message->message_type_id = MessageType::VENUEMADE;
                    $message->set_as_conversation();
                    $message->save();
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailVariables['market_price'] = $this->_get_market_price($extendedReservation);
                    $emailVariables['checkin'] = $this->_get_reservation_start_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['checkout'] = $this->_get_reservation_end_date($extendedReservation, $contact_locale->locale_code);
                    $emailHelper->sendMail($notee->user, 'reservation.host_cancelbyclient.v1', ['client_fname' => $emailVariables['client_fname']], $emailVariables, $contact_locale->domain_code);
                }
                $venue_emails[] = $notee->user->email;
            }
        }
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailVariablesClient['checkin'] = $this->_get_reservation_start_date($extendedReservation, $client_locale->locale_code);
            $emailVariablesClient['checkout'] = $this->_get_reservation_end_date($extendedReservation, $client_locale->locale_code);
            $emailHelper->sendMail($client, 'reservation.client_cancelbyclient.v1', [], $emailVariablesClient, $client_locale->domain_code);
        }
        $emailVariablesAdmin = $emailVariables;
        $emailVariablesAdmin['venue_email'] = implode(', ', $venue_emails);
        $emailVariablesAdmin['market_price'] = $this->_get_market_price($extendedReservation);
        $emailVariablesAdmin['checkin'] = $this->_get_reservation_start_date($extendedReservation);
        $emailVariablesAdmin['checkout'] = $this->_get_reservation_end_date($extendedReservation);
        $emailHelper->sendAdminMail('reservation.admin_cancelbyclient.v1', ['client_fname' => $emailVariablesAdmin['client_fname']], $emailVariablesAdmin);
    }

    public function reservation_iminent($reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $emailVariables['host_name'] = '';
        $venue_emails = [];
        if (!$client_suppressed)
        {
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
        }
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->first();
                $userMessage = new Message();
                $userMessage->reservation_id = $extendedReservation->id;
                $userMessage->userto = $extendedReservation->clientid;
                $userMessage->userby = $primaryNotee->user->id;
                $userMessage->message = 'We hope you have a great meeting in ' . $extendedReservation->asset->name . ' at ' . $extendedReservation->asset->venuename . ' starting at ' . $this->_get_reservation_start_date($extendedReservation, $client_locale->locale_code, 'generic') . '.';
                $userMessage->message_type_id = MessageType::VENUEMADE;
                $userMessage->save();
            }
            foreach ($venueNotees as $notee)
            {
                $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                if (!$venue_suppressed)
                {
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $message = new Message();
                    $message->reservation_id = $extendedReservation->id;
                    $message->userto = $notee->user->id;
                    $message->userby = $extendedReservation->clientid;
                    $message->message = ucfirst($extendedReservation->clientname) . ' is due from ' . $this->_get_reservation_start_date($extendedReservation, $contact_locale->locale_code, 'generic') . ' until ' . $this->_get_reservation_end_date($extendedReservation, $contact_locale->locale_code, 'generic') . ' in ' . $extendedReservation->asset->name . ' at ' . $extendedReservation->asset->venuename .'.';
                    $message->message_type_id = MessageType::VENUEMADE;
                    $message->set_as_conversation();
                    $message->save();
                    $emailVariables['checkin'] = $this->_get_reservation_start_date($extendedReservation, $contact_locale->locale_code);
                    $emailVariables['checkout'] = $this->_get_reservation_end_date($extendedReservation, $contact_locale->locale_code);
                    $emailHelper->sendMail($notee->user, 'reservation.host_checkin.v1', ['client_fname' => $emailVariables['client_fname'], 'room_name' => $emailVariables['room_name'], 'venue_name' => $emailVariables['venue_name']], $emailVariables, $contact_locale->domain_code);
                }
                $venue_emails[] = $notee->user->email;
            }
        }
        if (!$client_suppressed)
        {
            $emailVariablesClient = $emailVariables;
            $emailVariablesClient['venue_email'] = implode(', ', $venue_emails);
            $emailVariablesClient['checkin'] = $this->_get_reservation_start_date($extendedReservation, $client_locale->locale_code);
            $emailVariablesClient['checkout'] = $this->_get_reservation_end_date($extendedReservation, $client_locale->locale_code);
            $emailHelper->sendMail($client, 'reservation.client_checkin.v1', ['room_name' => $emailVariablesClient['room_name']], $emailVariablesClient, $client_locale->domain_code);
        }
        $emailVariablesAdmin = $emailVariables;
        $emailVariablesAdmin['checkin'] = $this->_get_reservation_start_date($extendedReservation);
        $emailVariablesAdmin['checkout'] = $this->_get_reservation_end_date($extendedReservation);
        $emailHelper->sendAdminMail('reservation.admin_checkin.v1', ['client_fname' => $emailVariablesAdmin['client_fname'], 'room_name' => $emailVariablesAdmin['room_name'], 'venue_name' => $emailVariablesAdmin['venue_name']], $emailVariablesAdmin);
    }

    public function reservation_requires_user_review($reservation, $client_suppressed = false)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $venueNotees = $this->_get_venue_notees($extendedReservation->asset_id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1', [], $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->first();
                $message = new Message();
                $message->reservation_id = $extendedReservation->id;
                $message->userto = $extendedReservation->clientid;
                $message->userby = $primaryNotee->user->id;
                $message->message = 'We hope you had a great meeting in ' . $extendedReservation->asset->name . ' at ' . $extendedReservation->asset->venuename . '. Please feel free to leave a review!';
                $message->message_type_id = MessageType::REVIEW;
                $message->set_as_conversation();
                $message->save();
            }
        }
        if (!$client_suppressed)
        {
            $admin = $extendedReservation->admin_user;
            $client = $extendedReservation->booking->beneficiary;
            $client_locale = $this->_find_user_locale($client);
            $emailVariables['admin_name'] = ucfirst($admin->firstname);
            $emailVariables['review_link'] = env('SITE_URL') . '/' . $client_locale->domain_code . '/write-review/reservation?source=zipcube&medium=email&type=reservation_review&token=' . $extendedReservation->review_token;
            $emailHelper->sendMail($client, 'reservation.client_checkout.v1', [], $emailVariables, $client_locale->domain_code, '', $admin, 'html_non_brand');
        }
    }

    public function reservation_review_reminder($reservation)
    {
        $emailHelper = new EmailHelper();
        $extendedReservation = $this->_get_extended_reservation($reservation->id);
        $emailVariables = $this->_get_message_variables($extendedReservation);
        $admin = $extendedReservation->admin_user;
        $client = $extendedReservation->booking->beneficiary;
        $client_locale = $this->_find_user_locale($client);
        $emailVariables['admin_name'] = ucfirst($admin->firstname);
        $emailVariables['review_link'] = env('SITE_URL') . '/' . $client_locale->domain_code . '/write-review/reservation?source=zipcube&medium=email&type=reservation_review&token=' . $extendedReservation->review_token;
        $emailHelper->sendMail($client, 'reservation.review_reminder.v1', [], $emailVariables, $client_locale->domain_code, '', $admin, 'html_non_brand');
    }

//    public function asset_created($object)
//    {
//        $modelAssetTypes = Model__asset_types::class;
//        $this->load->model($modelAssetTypes);
//        $assetType = $this->$modelAssetTypes->get_asset_type_by_id($object->get_asset_type());
//        if ($assetType->exists_in_db())
//        {
//            $modelEmail = Model__email::class;
//            $this->load->model($modelEmail);
//            $emailVariables['asset_id'] = $object->get_id();
//            $emailVariables['asset_type'] = $assetType->get('asset_type');
//            $emailVariables['asset_name'] = $object->wrangle('defaulted_name')->value();
//            $emailVariables['asset_website'] = env('SITE_URL') . '/' . $assetType->get('asset_type') . '/' . $object->get_id();
//            switch ($assetType->get_id())
//            {
//                case Asset_Type::VENUE:
//
//                    $modelVenues = Model__venues::class;
//                    $this->load->model($modelVenues);
//                    $venue = $this->$modelVenues->get_venue_object_by_id($object->get_id(), true);
//                    if ($venue->exists_in_db())
//                    {
//                        $emailVariables['company_name'] = $venue->get('company_name');
//                        $emailVariables['address'] = $venue->get('address');
//                        $emailVariables['venue_admins'] = $this->_get_venue_admins($object->get_asset_id());
//                        $this->$modelEmail->sendAdminMail('venue_created', 'new_listing' $emailVariables);
//                    }
//                break;
//
//                case Asset_Type::ROOM:
//
//                    $modelRooms = Model__room_skeletons::class;
//                    $this->load->model($modelRooms);
//                    $room = $this->$modelRooms->get_room_object_by_id($object->get_id(), true, false);
//                    if ($room->exists_in_db())
//                    {
//                        $emailVariables['company_name'] = $room->get('company_name');
//                        $emailVariables['venue_id'] = $object->get('parent_id');
//                        $emailVariables['venue_name'] = $room->get('venue_name');
//                        $emailVariables['venue_website'] = env('SITE_URL') . '/' . venues/' . $object->get('parent_id');
//                        $emailVariables['address'] = $room->get('address');
//                        $emailVariables['venue_admins'] = $this->_get_venue_admins($room->get('venue_asset_id'));
//                        $this->$modelEmail->sendAdminMail('room_created', 'new_listing', $emailVariables);
//                    }
//                break;
//            }
//        }
//    }

//    private function _get_venue_admins($assetId)
//    {
//        $venueadminStr = '';
//        $modelUsers = Model__users::class;
//        $this->load->model($modelUsers);
//        $venue_admins = $this->$modelUsers->get_interested_parties_by_asset_id($assetId, Runt_User_Asset_Privilege::get_top_privilege());
//        foreach ($venue_admins->object() as $venue_admin)
//        {
//            if ($venue_admin != $venue_admins->get_first())
//            {
//                $venueadminStr .= '<br>';
//            }
//            $venueadminStr .= $venue_admin->wrangle('full_name')->formatted() . ': ' . $venue_admin->get('email') . ' ' . $venue_admin->get('phone_number');
//        }
//        return $venueadminStr;
//    }

    public function new_conversation_message($message)
    {
        $recieving_user = User::find($message->userto);
        $sending_user = User::find($message->userby);
        if (!is_null($recieving_user) && !is_null($sending_user))
        {
            $locale = $this->_find_user_locale($recieving_user);
            $emailHelper = new EmailHelper();
            $emailVariables = [
                'username' => ucfirst($sending_user->firstname),
                'username_receiver' => ucfirst($recieving_user->firstname),
                'message' => $message->message,
                'reservation_id' => $message->reservation_id
            ];
            $emailHelper->sendMail($recieving_user, 'message.notification.v1', ['username' => $emailVariables['username']], $emailVariables, $locale->domain_code);
            $emailHelper->sendAdminMail('message.admin_notification.v1', ['reservation_id' => $emailVariables['reservation_id']], $emailVariables);
        }
    }

    public function new_review_received($review)
    {
        $emailHelper = new EmailHelper();
        $venueNotees = $this->_get_venue_notees($review->asset_id);
        if (is_null($venueNotees))
        {
            $emailHelper->sendAdminMail('reservation.admin_no_contact.v1');
        }
        else
        {
            $room = Room::where('asset_id', $review->asset_id)->first();
            if (!is_null($room))
            {
                $emailVariables = [
                    'room_name' => trim($room->name),
                    'venue_name' => trim($room->venue_name),
                    'review' => $review->review,
                    'feedback' => $review->feedback,
                    'cleanliness' => $review->cleanliness,
                    'communication' => $review->communication,
                    'accuracy' => $review->accuracy,
                    'checkin' => $review->checkin,
                    'location' => $review->location,
                    'value' => $review->value
                ];
                foreach ($venueNotees as $notee)
                {
                    $contact_locale = $this->_find_user_locale($notee->user);
                    $emailVariables['host_name'] = ucfirst($notee->user->firstname);
                    $emailVariables['review_link'] = env('SITE_URL') . '/' . $contact_locale->domain_code . $room->venue->url . '?source=zipcube&medium=email&type=review_received#reviews_link';
                    $emailHelper->sendMail($notee->user, 'review.host_notification.v1', [], $emailVariables, $contact_locale->domain_code);
                }
            }
        }
    }

    public function venue_reviews_request($recipient, $venue_name, $review_token)
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($recipient);
        $emailVariables = [
            'first_name' => ucfirst($recipient->firstname),
            'venue_name' => trim($venue_name),
            'review_link' => env('SITE_URL') . '/' . $locale->domain_code . '/write-review/request?source=zipcube&medium=email&type=review_request&token=' . $review_token,
        ];
        $emailHelper->sendMail($recipient, 'review.venue_request.v1', [], $emailVariables, $locale->domain_code);
    }

    public function thank_reviewer($reviewer, $venue_name)
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($reviewer);
        $emailVariables = [
            'first_name' => ucfirst($reviewer->firstname),
            'venue_name' => trim($venue_name)
        ];
        if (!is_null($reviewer->token))
        {
            $emailVariables['set_password_link'] = env('SITE_URL') . '/' . $locale->domain_code . '/set-new-password?source=zipcube&medium=email&type=review_published&token=' . $reviewer->token;
            $emailHelper->sendMail($reviewer, 'review.thank_reviewer.v1', [], $emailVariables, $locale->domain_code, 'token');
        }
        else
        {
            $emailHelper->sendMail($reviewer, 'review.thank_reviewer.v1', [], $emailVariables, $locale->domain_code);
        }
    }

    public function review_reply_notification($reviewer, $reply, $asset)
    {
        $replyAuthor = User::find($reply->userby);
        if (!is_null($replyAuthor))
        {
            $emailHelper = new EmailHelper();
            $locale = $this->_find_user_locale($reviewer);
            $emailVariables = [
                'first_name' => ucfirst($reviewer->firstname),
                'reply_author' => ucfirst($replyAuthor->firstname),
                'venue_name' => trim($asset->details->venuename),
                'reply' => $reply->reply,
                'review_page_link' => env('SITE_URL') . '/' . $locale->domain_code . '/dashboard/reviews'
            ];
            $emailHelper->sendMail($reviewer, 'review.reply_notification.v1', [], $emailVariables, $locale->domain_code);
        }
    }

    public function signup_token($user)
    {
        $emailHelper = new EmailHelper();
        $locale = $this->_find_user_locale($user);
        $emailVariables = [
            'email' => $user->email,
            'set_password_link' => env('SITE_URL') . '/' . $locale->domain_code . '/set-new-password?source=zipcube&medium=email&type=welcome&token=' . $user->token
        ];
        $emailHelper->sendMail($user, 'user.welcome.v1', [], $emailVariables, $locale->domain_code, 'token');
    }

    public function enquiry_notification($enquiry)
    {
        $extended_enquiry = Enquiry::with(['room.room', 'durations'])->find($enquiry->id);
        if (!is_null($extended_enquiry->room) && !is_null($enquiry->user_id))
        {
            $emailHelper = new EmailHelper();
            $emailVariables = [
                'id' => $enquiry->id,
                'client_name' => ucfirst($enquiry->clientfirstname) . ' ' . mb_substr(ucfirst($enquiry->clientlastname), 0, 1),
                'guests' => $enquiry->guests,
                'message' => $enquiry->message
            ];
            foreach ($extended_enquiry->room as $enquiry_room)
            {
                $venueContact = User::find($enquiry_room->room->venuemaincontact);
                if (!is_null($venueContact))
                {
                    $date = '';
                    $contact_locale = $this->_find_user_locale($venueContact);
                    $dateHelper = new DateTimeHelper();
                    $dateHelper->set_locale($contact_locale->locale_code);
                    if (!is_null($extended_enquiry->eventDate))
                    {
                        $dateHelper->date = $extended_enquiry->eventDate;
                        $date = $dateHelper->formatted('date');
                        if (!is_null($extended_enquiry->eventTime))
                        {
                            $date .= ', ' . $extended_enquiry->eventTime;
                        }
                        if (!is_null($extended_enquiry->duration) && !$extended_enquiry->durations->hide_email)
                        {
                            $date .= ', ' . trans('enquiries.' . $extended_enquiry->durations->lang_key, [], $venueContact->language_pref);
                        }
                    }
                    elseif (!is_null($extended_enquiry->tourDate))
                    {
                        $dateHelper->date = $extended_enquiry->tourDate;
                        $date = $dateHelper->formatted('date');
                    }
                    $emailVariables['date'] = $date;
                    $emailVariables['venue_name'] = $enquiry_room->room->venuename;
                    $emailVariables['room_name'] = $enquiry_room->room->name;
                    $emailHelper->sendMail($venueContact, 'enquiry.notification.v1', ['id' => $emailVariables['id']], $emailVariables, $contact_locale->domain_code);
                }
            }
        }
    }

    private function _get_extended_reservation($reservationId)
    {
        return Reservation::with('booking.beneficiary,admin_user')->find($reservationId);
    }

    private function _get_venue_notees($assetId)
    {
        return AssetUserPrivilege::with('user.profile')->where('user_asset_privileges.asset_id', $assetId)->whereRaw('user_asset_privileges.privileges_mask & ? = ?', [RolesAndPrivilegesHelper::NOTIFY, RolesAndPrivilegesHelper::NOTIFY])->get();
    }

    private function _get_message_variables($extendedReservation)
    {
        $payout_priceHelper = new PriceHelper();
        $payout_priceHelper->price = (new ReservationHelper())->get_payout($extendedReservation);
        $commission_priceHelper = new PriceHelper();
        $commission_priceHelper->price = $extendedReservation->toZipcube;
        $commissionVAT_priceHelper = new PriceHelper();
        $commissionVAT_priceHelper->price = $extendedReservation->toVenue_vat;
        $booking_dateTimeHelper = $this->_get_book_date_helper($extendedReservation);
        $start_dateTimeHelper = $this->_get_reservation_start_date_helper($extendedReservation);
        $end_dateTimeHelper = $this->_get_reservation_end_date_helper($extendedReservation);
        return [
            'reservation_id' => $extendedReservation->id,
            'venue_id' => $extendedReservation->asset->venueid,
            'venue_name' => ucfirst(trim($extendedReservation->asset->venuename)),
            'venue_phone' => $extendedReservation->asset->phone,
            'venue_address' => ucfirst($extendedReservation->asset->address),
            'venue_address_extras' => $extendedReservation->asset->address_extras,
            'venue_transport' => $extendedReservation->asset->transport,
            'client_fname' => ucfirst($extendedReservation->clientfirstname),
            'client_lname' => ucfirst($extendedReservation->clientlastname),
            'client_email' => $extendedReservation->clientemail,
            'client_phone' => $extendedReservation->clientphone,
            'room_name' => trim($extendedReservation->asset->name),
            'room_id' => $extendedReservation->asset->detailsid,
            'book_time' => $booking_dateTimeHelper->formatted('time'),
            'time_in' => $start_dateTimeHelper->formatted('time'),
            'time_out' => $end_dateTimeHelper->formatted('time'),
            'topay' => $payout_priceHelper->formatted(true),
            'currency_price' => $extendedReservation->currency,
            'no_guest' => $extendedReservation->guests,
            'roomconf' => $extendedReservation->configuration,
            'comments' => $extendedReservation->comments,
            'comment' => '', //?
//            'comment' => ((!$extendedReservation->is_null('status_change_comment'))?'(' . $extendedReservation->get('status_change_comment') . ')':''),
            'zipcube_commission' => $commission_priceHelper->formatted(true),
            'zipcube_commission_vat' => $commissionVAT_priceHelper->formatted(true),
            'addons' => $extendedReservation->addOns
        ];
    }

    private function _get_market_price($extendedReservation, $client = false)
    {
        $market_priceHelper = new PriceHelper();
        $market_priceHelper->price = (($client)?(new ReservationHelper())->get_total_price($extendedReservation):$extendedReservation->price);
        return $market_priceHelper->formatted(true);
    }

    private function _get_book_date_helper($extendedReservation)
    {
        $booking_dateTimeHelper = new DateTimeHelper();
        $booking_dateTimeHelper->datetime = $extendedReservation->booking->created;
        return $booking_dateTimeHelper;
    }

    private function _get_reservation_start_date_helper($extendedReservation)
    {
        $start_dateTimeHelper = new DateTimeHelper();
        $start_dateTimeHelper->datetime = $extendedReservation->period->first()->start;
        return $start_dateTimeHelper;
    }

    private function _get_reservation_end_date_helper($extendedReservation)
    {
        $end_dateTimeHelper = new DateTimeHelper();
        $end_dateTimeHelper->datetime = $extendedReservation->period->last()->end;
        return $end_dateTimeHelper;
    }

    private function _get_book_date($extendedReservation, $locale = 'en_GB', $type = 'date')
    {
        $booking_dateTimeHelper = $this->_get_book_date_helper($extendedReservation);
        $booking_dateTimeHelper->set_locale($locale);
        return $booking_dateTimeHelper->formatted($type);
    }

    private function _get_reservation_start_date($extendedReservation, $locale = 'en_GB', $type = 'date')
    {
        $start_dateTimeHelper = $this->_get_reservation_start_date_helper($extendedReservation);
        $start_dateTimeHelper->set_locale($locale);
        return $start_dateTimeHelper->formatted($type);
    }

    private function _get_reservation_end_date($extendedReservation, $locale = 'en_GB', $type = 'date')
    {
        $end_dateTimeHelper = $this->_get_reservation_end_date_helper($extendedReservation);
        $end_dateTimeHelper->set_locale($locale);
        return $end_dateTimeHelper->formatted($type);
    }

    private function _find_user_locale($user)
    {
        $user_locale = Locale::where('country_code', $user->locale_pref)->first();
        if (!is_null($user_locale))
        {
            return $user_locale;
        }
        else
        {
            return new Locale();
        }
    }
}