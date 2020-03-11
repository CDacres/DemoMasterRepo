<?php

namespace App\Events;

use App\Models\Booking\ReservationPeriod;
use App\Models\Booking\RoomAvailability;

class ReservationPeriodUpdatedEvent extends Event
{
    public function __construct(ReservationPeriod $period)
    {
        if ($period->releases_full_day())
        {
            $period->unset_full_day($period->asset_id, $period->get_start_date());
        }
        if ($period->requires_availability_update())
        {
            (new RoomAvailability())->refresh_availability($period->asset_id, $period->get_start_date());
        }
    }
}