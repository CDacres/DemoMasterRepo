<?php

namespace App\Events;

use App\Models\Booking\Reservation;
use App\Models\Booking\ReservationAudit;

class ReservationAuditEvent extends AuditEvent
{
    public function __construct(Reservation $reservation)
    {
        $this->_baseClass = ReservationAudit::class;
        parent::__construct($reservation);
    }
}