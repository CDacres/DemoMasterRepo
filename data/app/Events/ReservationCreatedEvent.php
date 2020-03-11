<?php

namespace App\Events;

use App\Models\Booking\Reservation;
use App\Models\Booking\ReservationPeriod;
use App\Models\Room;

class ReservationCreatedEvent extends Event
{
    public function __construct(Reservation $reservation)
    {
        $this->_run_audit_event($reservation);
        $this->_set_room_last_booked($reservation);
        $this->_insert_period($reservation);
        $this->_send_created_emails($reservation);
    }

    private function _run_audit_event($reservation)
    {
        return new ReservationAuditEvent($reservation);
    }

    private function _set_room_last_booked($reservation)
    {
        $room = Room::where('asset_id', $reservation->asset_id)->first();
        if (!is_null($room))
        {
            $room->last_booked = date("Y-m-d H:i:s");
            $room->save();
        }
    }

    private function _insert_period($reservation)
    {
        $period = $reservation->get_request_period();
        $reservationPeriod = new ReservationPeriod();
        $reservationPeriod->reservation_id = $reservation->id;
        $reservationPeriod->asset_id = $period->asset_id;
        $reservationPeriod->start = $period->start;
        $reservationPeriod->end = $period->end;
        $reservationPeriod->allDay = $period->all_day;
        $reservationPeriod->save();
    }

    private function _send_created_emails($reservation)
    {
        $reservation->handle_comms();
    }
}