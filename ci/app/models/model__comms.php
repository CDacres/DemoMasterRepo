<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Zipcube Comms_model Class
 *
 * Wrapper that handles messages and emails
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Communications
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */

class Model__comms extends MY_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function password_update(User $user, $passwordPlainText, $user_country_lang)
    {
        if (shouldSendEmailToAddress($user->get('email_status')))
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $emailVariables["{username}"] = ucfirst($user->get('first_name'));
            $emailVariables["{email}"] = $user->get('email');
            $emailVariables["{password}"] = $passwordPlainText;
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            $this->$modelEmail->sendMail($user, 'email_subject_forgot_password', 'forgot_password', $emailVariables);
        }
    }

    public function asset_member_updated_password(User $user, $passwordPlainText, $company)
    {
        if (shouldSendEmailToAddress($user->get('email_status')))
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $user_country_lang = $this->_find_user_country_lang($user);
            $emailVariables["{username}"] = ucfirst($user->get('first_name'));
            $emailVariables["{email}"] = $user->get('email');
            $emailVariables["{password}"] = $passwordPlainText;
            $currentuser = $this->get_user();
            $emailVariables["{company_admin_fname}"] = ucfirst($currentuser->get('first_name'));
            $emailVariables["{calendar_link}"] = base_url() . $user_country_lang . '/dashboard/schedule';
            $emailVariables["{login_link}"] = base_url() . $user_country_lang . '/users/signin';
            $emailVariables["{widget_link}"] = base_url() . $user_country_lang . '/widget/?source=zipcube&medium=email&type=password_change&token=' . $company->get('token');
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            $this->$modelEmail->sendMail($user, 'email_subject_asset_member_updated_password', 'asset_member_updated_password', $emailVariables, '', '', 'asset', 'member_updated_password');
        }
    }

    public function asset_team_member_created(User $user, $passwordPlainText, $company, $object)
    {
        if (shouldSendEmailToAddress($user->get('email_status')))
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $user_country_lang = $this->_find_user_country_lang($user);
            $emailVariables["{username}"] = ucfirst($user->get('first_name'));
            $emailVariables["{email}"] = $user->get('email');
            $emailVariables["{password}"] = $passwordPlainText;
            $emailVariables["{company_name}"] = $company->wrangle('defaulted_name')->value();
            $emailVariables["{login_link}"] = base_url() . $user_country_lang . '/users/signin';
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            $stepStr = '';
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $this->lang->load('email', $user->get('language_pref'));
            if ($object->is_true('venue_admin') && $this->input->post('venues') != null)
            {
                $venueStr = '';
                $roomStr = '';
                foreach ($this->input->post('venues') as $venue)
                {
                    $user_venue = $this->$modelVenues->get_venue_object_by_id($venue, true);
                    if ($user_venue->exists_in_db())
                    {
                        $venueStr .= $this->_find_venue_completion_email_str($user_venue);
                        $rooms = $this->$modelRooms->get_room_object_collection_by_venue_asset_id($user_venue->get_asset_id(), true, false);
                        if ($rooms->exists_in_db())
                        {
                            foreach ($rooms->object() as $room)
                            {
                                $roomStr .= $this->_find_room_completion_email_str($room);
                            }
                        }
                    }
                }
                $stepStr .= $venueStr . $roomStr;
            }
            elseif ($object->is_true('company_admin'))
            {
                $company_asset_id = $company->get_asset_id();
                $venues = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($company_asset_id, true);
                if ($venues->exists_in_db())
                {
                    foreach ($venues->object() as $venue)
                    {
                        $stepStr .= $this->_find_venue_completion_email_str($venue);
                    }
                }
                $rooms = $this->$modelRooms->get_room_object_collection_by_company_asset_id($company_asset_id, true, false);
                if ($rooms->exists_in_db())
                {
                    foreach ($rooms->object() as $room)
                    {
                        $stepStr .= $this->_find_room_completion_email_str($room);
                    }
                }
            }
            if ($stepStr != '')
            {
                $emailVariables["{step_str}"] = $stepStr;
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_team_member_created', $emailVariables, '', '', 'asset', 'team_member_created_steps');
            }
            else
            {
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_team_member_created', $emailVariables, '', '', 'asset', 'team_member_created');
            }
        }
    }

    private function _find_venue_completion_email_str($venue)
    {
        $stepStr = '';
        $venue_steps = $venue->get_uncompleted_stages(true);
        if ($venue_steps['todo'] > 0)
        {
            $stepStr .= '-     ' . $venue->wrangle('defaulted_name')->value() . ' - ' . $venue_steps['todo'] . ' ' . (($venue_steps['todo'] > 1)?$this->lang->line('email_steps'):$this->lang->line('email_step')) . ' (' . $venue_steps['stages'] . ')<br>';
        }
        return $stepStr;
    }

    private function _find_room_completion_email_str($room)
    {
        $stepStr = '';
        $room_steps = $room->get_uncompleted_stages(true);
        if ($room_steps['todo'] > 0)
        {
            $stepStr .= '-     ' . $room->wrangle('defaulted_name')->value() . ' (' . $room->wrangle('defaulted_venue_name')->value() . ') - ' . $room_steps['todo'] . ' ' . (($room_steps['todo'] > 1)?$this->lang->line('email_steps'):$this->lang->line('email_step')) . ' (' . $room_steps['stages'] . ')<br>';
        }
        return $stepStr;
    }

    public function asset_user_member_created(User $user, $assetObj, $passwordPlainText = false)
    {
        if (shouldSendEmailToAddress($user->get('email_status')))
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $user_country_lang = $this->_find_user_country_lang($user);
            $emailVariables["{username}"] = ucfirst($user->get('first_name'));
            $emailVariables["{asset_name}"] = $assetObj->wrangle('defaulted_name')->value();
            $emailVariables["{widget_link}"] = base_url() . $user_country_lang . '/widget?source=zipcube&medium=email&type=welcome&token=' . $assetObj->get('token');
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            if ($passwordPlainText !== false)
            {
                $emailVariables["{email}"] = $user->get('email');
                $emailVariables["{password}"] = $passwordPlainText;
                $emailVariables["{login_link}"] = base_url() . $user_country_lang . '/users/signin';
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_user_member_created', $emailVariables, '', '', 'asset', 'user_member_created');
            }
            else
            {
                $emailVariables["{set_password_link}"] = base_url() . $user_country_lang . '/set-new-password?source=zipcube&medium=email&type=welcome&token=' . $user->get('token');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_user_member_created_token', $emailVariables, '', '', 'asset', 'user_member_created_token');
            }
        }
    }

    public function new_widget_calendar_reservation_user(Extended_Reservation $reservation)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($user->exists_in_db() && shouldSendEmailToAddress($user->get('email_status')))
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $user_country_lang = $this->_find_user_country_lang($user);
            $emailVariables = $this->_get_message_variables($reservation);
            $emailVariables["{username}"] = ucfirst($user->get('first_name'));
            $emailVariables["{set_password_link}"] = base_url() . $user_country_lang . '/set-new-password?source=zipcube&medium=email&type=welcome&token=' . $reservation->get('client_token');
            $emailVariables["{widget_link}"] = base_url() . $user_country_lang . '/widget?source=zipcube&medium=email&type=welcome&token=' . $reservation->get('company_token');
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'new_client_non_frontend', $emailVariables, '', '', 'asset', 'new_client_non_frontend');
        }
    }

    public function new_reservation_request(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        $emailVariablesClient = $this->_get_message_variables($reservation, true);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            $modelMessage = Model__message::class;
            $this->load->model($modelMessage);
            foreach ($venueNotees->object() as $notee)
            {
                $contact_country_lang = $this->_find_user_country_lang($notee);
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariablesClient["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{accept_decline_url}"] = base_url() . $contact_country_lang . '/dashboard/accept-decline-token?source=zipcube&medium=email&type=new_reservation&token=' . $reservation->get('token');
                $emailVariables["{user_country_lang}"] = $contact_country_lang;
                if (!$venue_suppressed)
                {
                    $message = new Message();
                    $message->set('reservation_id', $reservation->get('id'));
                    $message->set('sending_user_id', $reservation->get('client_id'));
                    $message->set('conversation_id', 0);
                    $message->set('message', 'You have a new reservation request from ' . $reservation->wrangle('client_name')->formatted() . ' for ' . $reservation->get('room_name') . ' at ' . $reservation->get('venue_name'));
                    $message->set('message_type', Message_Type::REQUEST);
                    $message->set('receiving_user_id', $notee->get('id'));
                    if ($reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                    {
                        $this->$modelEmail->sendMail($notee, 'email_subject_host_reservation_notification', 'host_reservation_notification', $emailVariables);
                    }
                    $this->$modelMessage->insert_update($message);
                }
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $client_country_lang = $this->_find_user_country_lang($client);
            $emailVariablesClient["{user_country_lang}"] = $client_country_lang;
            if (!$reservation->is_null('client_token'))
            {
                $emailVariablesClient["{set_password_link}"] = base_url() . $client_country_lang . '/set-new-password?source=zipcube&medium=email&type=new_reservation&token=' . $reservation->get('client_token');
                if (!$client_suppressed)
                {
                    $this->$modelEmail->sendMail($client, 'email_subject_client_reservation_token_notification', 'client_reservation_token_notification', $emailVariablesClient, '', '', 'client_reservation_notification', 'token');
                }
            }
            else
            {
                if (!$client_suppressed)
                {
                    $this->$modelEmail->sendMail($client, 'email_subject_client_reservation_token_notification', 'client_reservation_notification', $emailVariablesClient, '', '', 'client_reservation_notification');
                }
            }
        }
        $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_notification', 'admin_reservation_notification', $emailVariablesClient);
    }

    public function reservation_expired(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->get_first();
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $message = new Message();
                $message->set('reservation_id', $reservation->get('id'));
                $message->set('receiving_user_id', $reservation->get('client_id'));
                $message->set('message', 'We are afraid your reservation request to ' . $reservation->get('venue_name') . ' has expired following inaction on their part. Our apologies.');
                $message->set('message_type', Message_Type::VENUEMADE);
                $message->set('sending_user_id', $primaryNotee->get('id'));
                $this->$modelMessage->insert_update($message);
            }
            foreach ($venueNotees->object() as $notee)
            {
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                if (!$venue_suppressed && $reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                {
                    $this->$modelEmail->sendMail($notee, 'email_subject_host_reservation_expire', 'host_reservation_expire', $emailVariables);
                }
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($client);
            if (!$client_suppressed)
            {
                $this->$modelEmail->sendMail($client, 'email_subject_client_reservation_expire', 'client_reservation_expire', $emailVariables, '', '', 'client_reservation', 'expire');
            }
        }
        $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_expire', 'admin_reservation_expire', $emailVariables, 'admin_reservation', 'expire');
    }

    public function reservation_accepted(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        $emailVariablesClient = $this->_get_message_variables($reservation, true);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->get_first();
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $message = new Message();
                $message->set('reservation_id', $reservation->get('id'));
                $message->set('receiving_user_id', $reservation->get('client_id'));
                $message->set('message', 'Excellent! Your reservation request has been granted by ' . ucfirst($primaryNotee->get('first_name')) . ' for ' . $reservation->get('room_name') . '.');
                $message->set('message_type', Message_Type::VENUEMADE);
                $message->set('sending_user_id', $primaryNotee->get('id'));
                $message->set_as_conversation();
                $this->$modelMessage->insert_update($message);
            }
            foreach ($venueNotees->object() as $notee)
            {
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                if (!$venue_suppressed && $reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                {
                    $this->$modelEmail->sendMail($notee, 'email_subject_host_reservation_granted', 'host_reservation_granted', $emailVariables);
                }
                $emailVariablesClient["{host_name}"] = ucfirst($notee->get('first_name'));
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $client_country_lang = $this->_find_user_country_lang($client);
            $emailVariablesClient["{message_request_link}"] = base_url() . $client_country_lang . '/dashboard/message_request/' . $reservation->get('id');
            $emailVariablesClient["{user_country_lang}"] = $client_country_lang;
            if (!$client_suppressed)
            {
                $this->$modelEmail->sendMail($client, 'email_subject_client_reservation_granted', 'client_reservation_granted', $emailVariablesClient);
            }
        }
        $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_granted', 'admin_reservation_granted', $emailVariablesClient);
    }

    public function reservation_declined(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->get_first();
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $message = new Message();
                $message->set('reservation_id', $reservation->get('id'));
                $message->set('receiving_user_id', $reservation->get('client_id'));
                $message->set('message', 'Sorry! Your reservation request has been declined by ' . ucfirst($primaryNotee->get('first_name')) . ' for ' . $reservation->get('room_name') . '.');
                $message->set('message_type', Message_Type::VENUEMADE);
                $message->set('sending_user_id', $primaryNotee->get('id'));
                $message->set_as_conversation();
                $this->$modelMessage->insert_update($message);
            }
            foreach ($venueNotees->object() as $notee)
            {
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                if (!$venue_suppressed && $reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                {
                    $this->$modelEmail->sendMail($notee, 'email_subject_host_reservation_declined', 'host_reservation_declined', $emailVariables);
                }
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($client);
            if (!$client_suppressed)
            {
                $this->$modelEmail->sendMail($client, 'email_subject_client_reservation_declined', 'client_reservation_declined', $emailVariables, '', '', 'client_reservation', 'declined');
            }
        }
        $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_declined', 'admin_reservation_declined', $emailVariables, 'admin_reservation', 'decline');
    }

    public function reservation_cancelled_by_host(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->get_first();
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $message = new Message();
                $message->set('reservation_id', $reservation->get('id'));
                $message->set('receiving_user_id', $reservation->get('client_id'));
                $message->set('message', 'Sorry! Your reservation request has been cancelled by ' . ucfirst($primaryNotee->get('first_name')) . ' for ' . $reservation->get('room_name') . '.');
                $message->set('message_type', Message_Type::VENUEMADE);
                $message->set('sending_user_id', $primaryNotee->get('id'));
                $this->$modelMessage->insert_update($message);
            }
            foreach ($venueNotees->object() as $notee)
            {
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                if (!$venue_suppressed && $reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                {
                    $this->$modelEmail->sendMail($notee, 'email_subject_host_client_reservation_cancel', 'host_reservation_cancelbyhost', $emailVariables, '', '', 'host_reservation_cancel', 'cancelbyhost');
                }
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($client);
            if (!$client_suppressed)
            {
                $this->$modelEmail->sendMail($client, 'email_subject_host_client_reservation_cancel', 'client_reservation_cancelbyhost', $emailVariables, '', '', 'client_reservation_cancel', 'cancelbyhost');
            }
        }
        $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_cancelbyhost', 'admin_reservation_cancelbyhost', $emailVariables, 'admin_reservation', 'venueCancel');
    }

    public function reservation_cancelled_by_user(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            $modelMessage = Model__message::class;
            $this->load->model($modelMessage);
            foreach ($venueNotees->object() as $notee)
            {
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                if (!$venue_suppressed)
                {
                    $venueBoundMessage = new Message();
                    $venueBoundMessage->set('reservation_id', $reservation->get('id'));
                    $venueBoundMessage->set('sending_user_id', $reservation->get('client_id'));
                    $venueBoundMessage->set('message', $reservation->wrangle('client_name')->formatted() . ' has cancelled their request for ' . $reservation->get('room_name') . ' at ' . $reservation->get('venue_name') . '.');
                    $venueBoundMessage->set('message_type', Message_Type::VENUEMADE);
                    $venueBoundMessage->set('receiving_user_id', $notee->get('id'));
                    if ($reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                    {
                        $this->$modelEmail->sendMail($notee, 'email_subject_reservation_cancel', 'host_reservation_cancelbyclient', $emailVariables, '', '', 'host_reservation_cancel', 'cancelbyclient');
                    }
                    $this->$modelMessage->insert_update($venueBoundMessage);
                }
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($client);
            if (!$client_suppressed)
            {
                $this->$modelEmail->sendMail($client, 'email_subject_host_client_reservation_cancel', 'client_reservation_cancelbyclient', $emailVariables, '', '', 'client_reservation_cancel', 'cancelbyclient');
            }
        }
        $this->$modelEmail->sendAdminMail('email_subject_reservation_cancel', 'admin_reservation_cancelbyclient', $emailVariables, 'admin_reservation', 'cancelbyclient');
    }

    public function reservation_imminent(Extended_Reservation $reservation, $client_suppressed = false, $venue_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->get_first();
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $userBoundMessage = new Message();
                $userBoundMessage->set('reservation_id', $reservation->get('id'));
                $userBoundMessage->set('receiving_user_id', $reservation->get('client_id'));
                $userBoundMessage->set('message', 'We hope you have a great meeting in ' . $reservation->get('room_name') . ' at ' . $reservation->get('venue_name') . ' starting at ' . $reservation->wrangle('reservation_start_date_time')->formatted() . '.');
                $userBoundMessage->set('message_type', Message_Type::VENUEMADE);
                $userBoundMessage->set('sending_user_id', $primaryNotee->get('id'));
                $this->$modelMessage->insert_update($userBoundMessage);
            }
            foreach ($venueNotees->object() as $notee)
            {
                $contact_country_lang = $this->_find_user_country_lang($notee);
                $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                $emailVariables["{user_country_lang}"] = $contact_country_lang;
                if (!$venue_suppressed)
                {
                    $message = new Message();
                    $message->set('reservation_id', $reservation->get('id'));
                    $message->set('sending_user_id', $reservation->get('client_id'));
                    $message->set('message', $reservation->wrangle('client_name')->formatted() . ' is due from ' . $reservation->wrangle('reservation_start_date_time')->formatted() . ' until ' . $reservation->wrangle('reservation_end_date_time')->formatted() . ' in ' . $reservation->get('room_name') . ' at ' . $reservation->get('venue_name') .'.');
                    $message->set('message_type', Message_Type::VENUEMADE);
                    $message->set('receiving_user_id', $notee->get('id'));
                    if ($reservation->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                    {
                        $this->$modelEmail->sendMail($notee, 'email_subject_host_checkin', 'host_checkin', $emailVariables, '', '', 'check', 'checkin', 'host');
                    }
                    $this->$modelMessage->insert_update($message);
                }
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $client_country_lang = $this->_find_user_country_lang($client);
            $emailVariables["{user_country_lang}"] = $client_country_lang;
            if (!$client_suppressed)
            {
                $this->$modelEmail->sendMail($client, 'email_subject_client_checkin', 'client_checkin', $emailVariables, '', '', 'check', 'checkin', 'client');
            }
        }
//        $this->$modelEmail->sendAdminMail('email_subject_admin_checkin', 'admin_checkin', $emailVariables, 'check', 'checkin', 'admin');
    }

    public function reservation_requires_user_review(Extended_Reservation $reservation, $client_suppressed = false)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($reservation->get('asset_id'));
        $emailVariables = $this->_get_message_variables($reservation);
        if (!$venueNotees->exist())
        {
            $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
        }
        else
        {
            if (!$client_suppressed)
            {
                $primaryNotee = $venueNotees->get_first();
                $modelMessage = Model__message::class;
                $this->load->model($modelMessage);
                $userBoundMessage = new Message();
                $userBoundMessage->set('reservation_id', $reservation->get('id'));
                $userBoundMessage->set('receiving_user_id', $reservation->get('client_id'));
                $userBoundMessage->set('message', 'We hope you had a great meeting in ' . $reservation->get('room_name') . ' at ' . $reservation->get('venue_name') . '. Please feel free to leave a review!');
                $userBoundMessage->set('message_type', Message_Type::REVIEW);
                $userBoundMessage->set('sending_user_id', $primaryNotee->get('id'));
                $this->$modelMessage->insert_update($userBoundMessage);
            }
        }
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $client_country_lang = $this->_find_user_country_lang($client);
            $emailVariables["{user_country_lang}"] = $client_country_lang;
            $emailVariables["{review_link}"] = base_url() . $client_country_lang . '/write-review/reservation?source=zipcube&medium=email&type=reservation_review&token=' . $reservation->get('review_token');
            if (!$client_suppressed)
            {
                $reservationAdmin = [];
                $assignedUser = $reservation->get('assigned_user');
                $admins = $this->$modelUsers->get_admin_users();
                foreach ($admins->object() as $admin)
                {
                    if ($admin->get_id() == $assignedUser)
                    {
                        $reservationAdmin = $admin;
                    }
                }
                $emailVariables["{admin_name}"] = '';
                if (count($reservationAdmin) > 0 && is_email_zipcube($reservationAdmin->get('email')))
                {
                    $emailVariables["{admin_name}"] = ucfirst($reservationAdmin->get('first_name'));
                }
                $this->$modelEmail->sendMail($client, 'email_subject_client_checkout', 'client_checkout', $emailVariables, '', '', 'check', 'checkout', 'client', $reservationAdmin, 'html_non_brand');
            }
        }
    }

    public function reservation_review_reminder(Extended_Reservation $reservation)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $client = $this->$modelUsers->get_user_by_email($reservation->get('client_email'));
        if ($client->exists_in_db() && shouldSendEmailToAddress($client->get('email_status')))
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $reservationAdmin = [];
            $emailVariables = $this->_get_message_variables($reservation);
            $assignedUser = $reservation->get('assigned_user');
            $admins = $this->$modelUsers->get_admin_users();
            foreach ($admins->object() as $admin)
            {
                if ($admin->get_id() == $assignedUser)
                {
                    $reservationAdmin = $admin;
                }
            }
            $emailVariables["{admin_name}"] = '';
            if (count($reservationAdmin) > 0 && is_email_zipcube($reservationAdmin->get('email')))
            {
                $emailVariables["{admin_name}"] = ucfirst($reservationAdmin->get('first_name'));
            }
            $client_country_lang = $this->_find_user_country_lang($client);
            $emailVariables["{user_country_lang}"] = $client_country_lang;
            $emailVariables["{review_link}"] = base_url() . $client_country_lang . '/write-review/reservation?source=zipcube&medium=email&type=reservation_review&token=' . $reservation->get('review_token');
            $this->$modelEmail->sendMail($client, 'email_subject_client_review_reminder', 'review_reminder', $emailVariables, '', '', 'review_reminder', '', '', $reservationAdmin, 'html_non_brand');
        }
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
//            $emailVariables["{asset_id}"] = $object->get_id();
//            $emailVariables["{asset_type}"] = $assetType->get('asset_type');
//            $emailVariables["{asset_name}"] = $object->wrangle('defaulted_name')->value();
//            $emailVariables["{asset_website}"] = base_url() . $assetType->get('asset_type') . '/' . $object->get_id();
//            switch ($assetType->get_id())
//            {
//                case Asset_Type::VENUE:
//
//                    $modelVenues = Model__venues::class;
//                    $this->load->model($modelVenues);
//                    $venue = $this->$modelVenues->get_venue_object_by_id($object->get_id(), true);
//                    if ($venue->exists_in_db())
//                    {
//                        $emailVariables["{company_name}"] = $venue->get('company_name');
//                        $emailVariables["{address}"] = $venue->get('address');
//                        $emailVariables["{venue_admins}"] = $this->_get_venue_admins($object->get_asset_id());
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
//                        $emailVariables["{company_name}"] = $room->get('company_name');
//                        $emailVariables["{venue_id}"] = $object->get('parent_id');
//                        $emailVariables["{venue_name}"] = $room->get('venue_name');
//                        $emailVariables["{venue_website}"] = base_url() . 'venues/' . $object->get('parent_id');
//                        $emailVariables["{address}"] = $room->get('address');
//                        $emailVariables["{venue_admins}"] = $this->_get_venue_admins($room->get('venue_asset_id'));
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
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $recieving_user = $this->$modelUsers->get_user_by_id($message->get('receiving_user_id'));
        $sending_user = $this->$modelUsers->get_user_by_id($message->get('sending_user_id'));
        if ($recieving_user->exists_in_db() && $sending_user->exists_in_db())
        {
            $emailVariables["{username}"] = ucfirst($sending_user->get('first_name'));
            $emailVariables["{username_receiver}"] = ucfirst($recieving_user->get('first_name'));
            $emailVariables["{message}"] = $message->get('message');
            $emailVariables["{reservation_id}"] = $message->get('reservation_id');
            $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($recieving_user);
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            if ($message->is_true('venue_agree_to_list') && !is_email_zipcube($recieving_user->get('email')) && shouldSendEmailToAddress($recieving_user->get('email_status')))
            {
                $this->$modelEmail->sendMail($recieving_user, 'email_subject_message_notification', 'message_notification', $emailVariables);
            }
            $this->$modelEmail->sendAdminMail('email_subject_admin_message_notification', 'admin_message_notification', $emailVariables);
        }
    }

    public function new_review_recieved($review)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($review->get('subject_id'));
        if ($venueNotees->exist())
        {
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $room = $this->$modelRooms->get_room_object_by_asset_id($review->get('subject_id'));
            if ($room->exists_in_db())
            {
                $emailVariables["{room_name}"] = trim($room->get('title'));
                $emailVariables["{venue_name}"] = trim($room->get('venue_name'));
                $emailVariables["{review}"] = $review->get('review');
                $emailVariables["{feedback}"] = $review->get('feedback');
                $emailVariables["{cleanliness}"] = $review->get('cleanliness');
                $emailVariables["{communication}"] = $review->get('communication');
                $emailVariables["{accuracy}"] = $review->get('accuracy');
                $emailVariables["{checkin}"] = $review->get('checkin');
                $emailVariables["{location}"] = $review->get('location');
                $emailVariables["{value}"] = $review->get('value');
                $emailVariables["{review_link}"] = get_venue_url($room) . '?source=zipcube&medium=email&type=review_recieved#reviews_link';
                foreach ($venueNotees->object() as $notee)
                {
                    $emailVariables["{host_name}"] = ucfirst($notee->get('first_name'));
                    $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                    if ($room->is_true('venue_agree_to_list') && !is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                    {
                        $this->$modelEmail->sendMail($notee, 'email_subject_host_review_notification', 'host_review_notification', $emailVariables);
                    }
                }
            }
        }
    }

    public function venue_reviews_request($object)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $recipient = $this->$modelUsers->get_user_by_id($object->get('user_id'));
        if ($recipient->exists_in_db() && shouldSendEmailToAddress($recipient->get('email_status')))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_asset_id($object->get('asset_id'), true);
            if ($venue->exists_in_db())
            {
                $user_country_lang = $this->_find_user_country_lang($recipient);
                $emailVariables["{first_name}"] = ucfirst($recipient->get('first_name'));
                $emailVariables["{venue_name}"] = trim($venue->get('name'));
                $emailVariables["{review_link}"] = base_url() . $user_country_lang . '/write-review/request?source=zipcube&medium=email&type=review_request&token=' . $object->get('review_token');
                $emailVariables["{user_country_lang}"] = $user_country_lang;
                $modelEmail = Model__email::class;
                $this->load->model($modelEmail);
                $this->$modelEmail->sendMail($recipient, 'email_subject_venue_review_request', 'venue_review_request', $emailVariables);
            }
        }
    }

    public function thank_reviewer($user, $venue)
    {
        if (shouldSendEmailToAddress($user->get('email_status')))
        {
            $user_country_lang = $this->_find_user_country_lang($user);
            $emailVariables["{first_name}"] = ucfirst($user->get('first_name'));
            $emailVariables["{venue_name}"] = trim($venue->get('name'));
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            if (!$user->is_null('token'))
            {
                $emailVariables["{set_password_link}"] = base_url() . $user_country_lang . '/set-new-password?source=zipcube&medium=email&type=review_published&token=' . $user->get('token');
                $this->$modelEmail->sendMail($user, 'email_subject_thank_reviewer_token', 'thank_reviewer_token', $emailVariables, '', '', 'review', 'token');
            }
            else
            {
                $this->$modelEmail->sendMail($user, 'email_subject_thank_reviewer_token', 'thank_reviewer', $emailVariables, '', '', 'review');
            }
        }
    }

    public function review_reply_notification($object, $review)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $recipient = $this->$modelUsers->get_user_by_id($review->get('author_id'));
        if ($recipient->exists_in_db() && shouldSendEmailToAddress($recipient->get('email_status')))
        {
            $user_country_lang = $this->_find_user_country_lang($recipient);
            $emailVariables["{first_name}"] = ucfirst($recipient->get('first_name'));
            $replyAuthor = $this->$modelUsers->get_user_by_id($object->get('author_id'));
            $emailVariables["{reply_author}"] = ucfirst($replyAuthor->get('first_name'));
            $emailVariables["{venue_name}"] = trim($review->get('venue_name'));
            $emailVariables["{reply}"] = $object->get('reply');
            $emailVariables["{review_page_link}"] = base_url() . $user_country_lang . '/dashboard/reviews';
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $this->$modelEmail->sendMail($recipient, 'email_subject_review_reply_notification', 'review_reply_notification', $emailVariables, '', '', 'review', 'reply_notification');
        }
    }

    public function signup_token($user)
    {
        if (shouldSendEmailToAddress($user->get('email_status')))
        {
            $user_country_lang = $this->_find_user_country_lang($user);
            $emailVariables["{email}"] = $user->get('email');
            $emailVariables["{set_password_link}"] = base_url() . $user_country_lang . '/set-new-password?source=zipcube&medium=email&type=welcome&token=' . $user->get('token');
            $emailVariables["{user_country_lang}"] = $user_country_lang;
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'signup_token', $emailVariables, '', '', 'sign', 'token');
        }
    }

    public function enquiry($enquiry)
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $emailVariables["{id}"] = $enquiry->get_id();
        $emailVariables["{client_name}"] = ucfirst($enquiry->get('user_first_name')) . " " . mb_substr(ucfirst($enquiry->get('user_last_name')), 0, 1);
        $emailVariables["{guests}"] = $enquiry->get('guests');
        $emailVariables["{message}"] = $enquiry->get('message');
        foreach ($enquiry->get('rooms')->object() as $enquiry_room)
        {
            if ($enquiry_room->is_true('venue_enabled') && $enquiry_room->is_true('venue_agree_to_list') && $enquiry_room->is_true('room_enabled'))
            {
                $emailVariables["{venue_name}"] = $enquiry_room->get('venue_name');
                $emailVariables["{room_name}"] = $enquiry_room->get('title');
                $venueNotees = $this->$modelUsers->get_interested_parties_by_asset_id($enquiry_room->get('room_asset_id'));
                foreach ($venueNotees->object() as $notee)
                {
                    if (!is_email_zipcube($notee->get('email')) && shouldSendEmailToAddress($notee->get('email_status')))
                    {
                        if (isset($this->lang->is_loaded))
                        {
                            if (in_array('common_lang.php', $this->lang->is_loaded))
                            {
                                $key = array_search('common_lang.php', $this->lang->is_loaded);
                                unset($this->lang->is_loaded[$key]);
                            }
                        }
                        $this->lang->load('common', $notee->get('language_pref'));
                        $date = '';
                        if (!$enquiry->is_null('eventDate'))
                        {
                            $date = $enquiry->wrangle('event_date')->formatted('date');
                            if (!$enquiry->is_null('eventTime'))
                            {
                                $date .= ', ' . $enquiry->wrangle('event_time')->formatted('time');
                            }
                            if (!$enquiry->is_null('duration') && !$enquiry->is_true('duration_hide_email'))
                            {
                                $date .= ', ' . $this->lang->line($enquiry->get('duration_desc_lang_key'));
                            }
                        }
                        elseif (!$enquiry->is_null('tourDate'))
                        {
                            $date = $enquiry->wrangle('tour_date')->formatted('date');
                        }
                        $emailVariables["{date}"] = $date;
                        $emailVariables["{user_country_lang}"] = $this->_find_user_country_lang($notee);
                        $this->$modelEmail->sendMail($notee, 'email_subject_new_enquiry', 'enquiry', $emailVariables);
                    }
                }
            }
        }
    }

    private function _get_message_variables($reservation, $client = false)
    {
        return [
            "{reservation_id}" => $reservation->get('id'),
            "{venue_id}" => $reservation->get('venue_id'),
            "{venue_name}" => ucfirst(trim($reservation->get('venue_name'))),
            "{venue_email}" => $reservation->get('main_user_email'),
            "{venue_phone}" => $reservation->get('venue_phone'),
            "{venue_address}" => ucfirst($reservation->get('venue_address')),
            "{venue_address_extras}" => $reservation->get('venue_address_extras'),
            "{venue_transport}" => $reservation->get('venue_transport'),
            "{client_fname}" => ucfirst($reservation->get('client_first_name')),
            "{client_lname}" => ucfirst($reservation->get('client_last_name')),
            "{client_email}" => $reservation->get('client_email'),
            "{client_phone}" => $reservation->get('client_phone'),
            "{room_name}" => trim($reservation->get('room_name')),
            "{room_id}" => $reservation->get('room_id'),
            "{book_date}" => $reservation->wrangle('booking_date_time')->date_formatted(),
            "{book_time}" => $reservation->wrangle('booking_date_time')->time_formatted(),
            "{checkin}" => $reservation->wrangle('reservation_start_date_time')->date_formatted(),
            "{checkout}" => $reservation->wrangle('reservation_end_date_time')->date_formatted(),
            "{time_in}" => $reservation->wrangle('reservation_start_date_time')->time_formatted(),
            "{time_out}" => $reservation->wrangle('reservation_end_date_time')->time_formatted(),
            "{market_price}" => (($client)?$reservation->wrangle('total_price')->formatted(true):$reservation->wrangle('price')->formatted(true)),
            "{topay}" => $reservation->wrangle('pay_out')->formatted(true),
            "{currency_price}" => $reservation->get('currency'),
            "{no_guest}" => $reservation->get('guests'),
            "{roomconf}" => $reservation->get('configuration'),
            "{comments}" => $reservation->get('comments'),
            "{comment}" => ((!$reservation->is_null('status_change_comment'))?'(' . $reservation->get('status_change_comment') . ')':''),
            "{zipcube_commission}" => $reservation->wrangle('admin_commission')->formatted(true),
            "{zipcube_commission_vat}" => $reservation->wrangle('payout_vat')->formatted(true),
            "{addons}" => $reservation->get('addOns')
        ];
    }

    private function _find_user_country_lang($user)
    {
        $country = 'uk';
        if (isset(config_item('supported_locales')[strtolower($user->get('locale_pref'))]))
        {
            $country = config_item('supported_locales')[strtolower($user->get('locale_pref'))];
        }
        return $country;
    }
}
