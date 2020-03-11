<?php

namespace App\Events;

use App\Models\Booking\NetPromoterScore;

class NetPromoterScoreCreatingEvent extends Event
{
    public function __construct(NetPromoterScore $score)
    {
        $score->created = date("Y-m-d H:i:s");
    }
}