<?php

namespace App\Events;

use App\Models\Booking\Reservation;

use App\Helpers\TokenHelper;

class ReservationCreatingEvent extends Event
{
    public function __construct(Reservation $reservation)
    {
        $tokenHelper = new TokenHelper();
        $reservation->created = date("Y-m-d H:i:s");
        $reservation->review_token = $tokenHelper->add_token(8);
        $reservation->token = $tokenHelper->add_token();
        if ($reservation->toZipcube < 0)
        {
            throw new Exception('The payout amount must be a positive number.');
        }
    }
}