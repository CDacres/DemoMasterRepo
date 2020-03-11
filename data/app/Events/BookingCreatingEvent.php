<?php

namespace App\Events;

use App\Models\Booking\Booking;

class BookingCreatingEvent extends Event
{
    public function __construct(Booking $booking)
    {
        $booking->created = date("Y-m-d H:i:s");
    }
}