<?php
/**
 * Zipcube Cron Controller Class
 *
 * Helps to control the cron functionality
 *
 * @package		Zipcube
 * @subpackage	Controllers
 * @category	Cron
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com
 */

if (!defined('BASEPATH')) exit('No direct script access allowed');

class expire extends MY_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->lang->load('email', config_item('language_code'));
    }

    public function cron()
    {
        $modelEmail = Model__email::class;
        $this->load->model($modelEmail);
        $currentDateTime = new DateTime();
        $reservation_errors = $this->_handle_reservations($currentDateTime);
        if ($reservation_errors != false)
        {
            $this->$modelEmail->sendAdminMail('email_subject_admin_exception', 'admin_exception', ['{message}' => print_r($reservation_errors, true)], 'admin_failed', 'exception');
        }
        $reviewTimeStart = (new DateTime())->setTime(10, 58);
        $reviewTimeEnd = (new DateTime())->setTime(11, 28);
        if ($currentDateTime > $reviewTimeStart && $currentDateTime < $reviewTimeEnd)
        {
            $review_reminder_errors = $this->_handle_review_reminders($currentDateTime);
            if ($review_reminder_errors != false)
            {
                $this->$modelEmail->sendAdminMail('email_subject_admin_exception', 'admin_exception', ['{message}' => print_r($review_reminder_errors, true)], 'admin_failed', 'exception');
            }
        }
        $payment_errors = $this->_handle_payments();
        if ($payment_errors != false)
        {
            $this->$modelEmail->sendAdminMail('email_subject_admin_exception', 'admin_exception', ['{message}' => print_r($payment_errors, true)], 'admin_failed', 'exception');
        }
    }

    private function _handle_reservations($currentDateTime)
    {
        $this->load->helper('analytics');
        $analytics_helper = new Analytics_Helper();
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservations = $this->$modelReservations->get_open_extended_reservation_collection();
        $errors = [];
        foreach ($reservations->object() as $reservation)
        {
            $bookingExpiresDateTime = (new DateTime($reservation->get('created')))->add(new DateInterval('PT168H'));
            $imminentReservationDateTime = (new DateTime($reservation->get('start_date_time')))->setTime(5, 0);
            $reservationEndTime = new DateTime($reservation->get('end_date_time'));
            if ($currentDateTime > $bookingExpiresDateTime && $reservation->is_pending_response())
            {
                try
                {
                    $this->$modelReservations->update_reservation_status($reservation, Reservation_Status::EXPIRED);
                }
                catch  (Exception $ex)
                {
                    $errors[] = $ex->getMessage();
                }
            }
            elseif ($currentDateTime > $imminentReservationDateTime && $reservation->is_upcoming())
            {
                try
                {
                    $this->$modelReservations->update_reservation_status($reservation, Reservation_Status::CHECKIN);
                }
                catch  (Exception $ex)
                {
                    $errors[] = $ex->getMessage();
                }
            }
            elseif ($currentDateTime > $reservationEndTime && $reservation->has_checked_in())
            {
                try
                {
                    $analytics_helper->register_had_meeting($reservation->get_id(), $reservation->get('client_id'));
                    $this->$modelReservations->update_reservation_status($reservation, Reservation_Status::AWAITINGUSERREVIEW);
                }
                catch  (Exception $ex)
                {
                    $errors[] = $ex->getMessage();
                }
            }
        }
        return $errors;
    }

    private function _handle_review_reminders($currentDateTime)
    {
        $modelComms = Model__comms::class;
        $this->load->model($modelComms);
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservations = $this->$modelReservations->get_review_reminder_extended_reservation_collection();
        $errors = [];
        foreach ($reservations->object() as $reservation)
        {
            $reviewReminderStartTime = (new DateTime($reservation->get('end_date_time')))->add(new DateInterval('P2D'))->setTime(10, 58);
            $reviewReminderEndTime = (new DateTime($reservation->get('end_date_time')))->add(new DateInterval('P2D'))->setTime(11, 28);
            if ($currentDateTime > $reviewReminderStartTime && $currentDateTime < $reviewReminderEndTime && $reservation->needs_review_reminder())
            {
                try
                {
                    $this->$modelComms->reservation_review_reminder($reservation);
                }
                catch  (Exception $ex)
                {
                    $errors[] = $ex->getMessage();
                }
            }
        }
        return $errors;
    }

    private function _handle_payments()
    {
        $modelBrainwrap = Model__brainwrap::class;
        $this->load->model($modelBrainwrap);
        $modelPayments = Model__payments::class;
        $this->load->model($modelPayments);
        $paymentChecks = $this->$modelPayments->get_payments_needing_status_check();
        $errors = [];
        foreach ($paymentChecks->object() as $paymentCheck)
        {
            try
            {
                $this->$modelBrainwrap->update_status_against_reality($paymentCheck);
                if ($paymentCheck->get('payment_status_id') == Payment_Status::CREATED)
                {
                    $this->$modelBrainwrap->submit_for_settlement($paymentCheck);
                    $this->$modelBrainwrap->update_status_against_reality($paymentCheck);
                }
                $this->$modelPayments->insert_update($paymentCheck);
            }
            catch (Exception $ex)
            {
                $errors[] = $ex->getMessage();
            }
        }
        return $errors;
    }
}
