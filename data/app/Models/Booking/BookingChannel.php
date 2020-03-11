<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class BookingChannel extends LegacyModel
{
    const FRONTEND = 1;
    const VENUECALENDAR = 2;
    const WIDGET = 3;
    const ADMIN = 4;

    public $timestamps = false;
    public $table = 'booking_channels';

    public function getDefaultCommissionAttribute()
    {
        return $this->attributes['defaultCommission'];
    }

    public function setDefaultCommissionAttribute($value)
    {
        $this->attributes['defaultCommission'] = $value;
    }
}