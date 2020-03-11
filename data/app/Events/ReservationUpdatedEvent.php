<?php

namespace App\Events;

use App\Models\Booking\Reservation;
use App\Models\Booking\Booking;
use App\Models\Booking\BookingStatus;

use App\Helpers\ReservationHelper;

class ReservationUpdatedEvent extends Event
{
    public function __construct(Reservation $reservation)
    {
        if (!$reservation->audit_is_suppressed())
        {
            $this->_run_audit_event($reservation);
        }
        $this->_send_updated_emails($reservation);
        $this->_booking_handler($reservation);
        $this->_payment_handler($reservation);
    }

    private function _run_audit_event($reservation)
    {
        return new ReservationAuditEvent($reservation);
    }

    private function _send_updated_emails($reservation)
    {
        $reservation->handle_comms();
    }

    private function _booking_handler($reservation)
    {
        $booking = Booking::find($reservation->booking_id);
        if (!is_null($booking))
        {
            $changeClosure = false;
            $reservationHelper = new ReservationHelper();
            if ($reservationHelper->has_closed_badly($reservation))
            {
                $changeClosure = true;
                $status = BookingStatus::FINISHEDBADLY;
            }
            elseif ($reservationHelper->has_closed_well($reservation))
            {
                $changeClosure = true;
                $status = BookingStatus::FINISHEDHAPPILY;
            }
            elseif ($reservationHelper->has_been_cancelled($reservation))
            {
                $changeClosure = true;
                $status = BookingStatus::CANCELLED;
            }
            if ($changeClosure)
            {
                $booking->complete_booking($status);
            }
        }
    }

    private function _payment_handler($reservation)
    {
        if (!$reservation->finances_are_suppressed())
        {
            $reservationHelper = new ReservationHelper();
            if ($reservationHelper->should_void_payment($reservation))
            {
//                $this->$modelPayments->void_transaction_from_booking_id($reservation->booking_id); //?
            }
            elseif ($reservationHelper->should_settle_payment($reservation))
            {
//                $this->$modelPayments->settle_transaction_from_booking_id($reservation->booking_id); //?
            }
            elseif ($reservationHelper->should_refund_payment($reservation))
            {
//                //$this->$modelPayments->refund_transaction_from_booking_id($reservation->booking_id);
            }
        }
    }
}