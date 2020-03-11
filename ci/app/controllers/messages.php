<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Messages extends Controller_Base__Public
{
    public function __construct()
    {
        parent::__construct();
    }

    public function delete_message()
    {
        try
        {
            $messageId = $this->input->post('message_id', 'is_natural');
            $user = $this->get_user();
            $modelMessage = Model__message::class;
            $this->load->model($modelMessage);
            $message = $this->$modelMessage->get_message_object_by_id($messageId);
            if ($message->exists_in_db() && $message->get('receiving_user_id') == $user->get('id'))
            {
                $message->set_enabled(false);
                $retObj = $this->$modelMessage->insert_update($message, true);
                echo $retObj->get_as_ajax_response("Sorry, you do not have access to update this message.");
            }
            else
            {
                throw new Exception('That message does not exist. Something has gone wrong...');
            }
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function conversation($reservationid)
    {
        $modelMessage = Model__message::class;
        $this->load->model($modelMessage);
        $conversation_id = $this->$modelMessage->get_conversation_by_reservation_id($reservationid);
        if ($conversation_id != null)
        {
            redirect($this->data['country_lang_url'] . '/dashboard/message-conversation/' . $conversation_id);
        }
        else
        {
            redirect('errors/page_missing');
        }
    }

    public function resend_reservation_email()
    {
        if ($this->user_is_admin())
        {
            try
            {
                $reservationId = $this->input->post('reservation_id', 'is_natural|required');
                $statusId = $this->input->post('status_id', 'integer|required');
                $suppressClient =  $this->input->post('suppress_client', 'is_boolean');
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
                if ($reservation->exists_in_db())
                {
                    if ($reservation->resend_request_emails($statusId) || $reservation->resend_accept_emails($statusId) || $reservation->resend_decline_emails($statusId) || $reservation->resend_cancel_emails($statusId))
                    {
                        if (!isset($suppressClient))
                        {
                            $suppressClient = false;
                        }
                        $reservation->suppress_emails_on_insert_update($suppressClient, false);
                        try
                        {
                            $this->$modelReservations->resend_emails($reservation, $statusId);
                            echo $this->_generate_ajax_error(false);
                        }
                        catch (Exception $ex)
                        {
                            echo $this->_generate_ajax_error($ex->getMessage());
                        }
                    }
                    else
                    {
                        echo $this->_generate_ajax_error('Cannot resend emails as the reservation status doesn\'t allow the resending of emails.');
                    }
                }
                else
                {
                    echo $this->_generate_ajax_error('Cannot resend emails as the reservation doesn\'t exist.');
                }
            }
            catch (Exception $ex)
            {
                echo $this->_generate_ajax_error($ex->getMessage());
            }
        }
        else
        {
            echo $this->_generate_ajax_error('There has been a problem as your user cannot resend emails.');
        }
    }

    public function resend_enquiry_email()
    {
        if ($this->user_is_admin())
        {
            try
            {
                $enquiryId = $this->input->post('enquiry_id', 'is_natural|required');
                $modelEnquiries = Model__enquiries::class;
                $this->load->model($modelEnquiries);
                $enquiry = $this->$modelEnquiries->get_enquiry_by_id($enquiryId);
                if ($enquiry->exists_in_db() && $enquiry->get('rooms')->get_count() > 0)
                {
                    try
                    {
                        $this->$modelEnquiries->resend_email($enquiry);
                        echo $this->_generate_ajax_error(false);
                    }
                    catch (Exception $ex)
                    {
                        echo $this->_generate_ajax_error($ex->getMessage());
                    }
                }
                else
                {
                    echo $this->_generate_ajax_error('Cannot resend emails as the enquiry doesn\'t exist.');
                }
            }
            catch (Exception $ex)
            {
                echo $this->_generate_ajax_error($ex->getMessage());
            }
        }
        else
        {
            echo $this->_generate_ajax_error('There has been a problem as your user cannot resend emails.');
        }
    }
}
