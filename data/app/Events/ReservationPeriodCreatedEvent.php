<?php

namespace App\Events;

use App\Models\Booking\ReservationPeriod;
use App\Models\Booking\RoomAvailability;

class ReservationPeriodCreatedEvent extends Event
{
    public function __construct(ReservationPeriod $period)
    {
        if (!$period->is_daily() && $period->requires_availability_update())
        {
            (new RoomAvailability())->update_availabilities($period->asset_id, $period);
        }
    }
}