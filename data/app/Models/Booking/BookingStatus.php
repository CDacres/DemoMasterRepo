<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class BookingStatus extends LegacyModel
{
    const CANCELLED = 1;
    const FINISHEDBADLY = 2;
    const FINISHEDHAPPILY = 3;

    public $timestamps = false;
    public $table = 'booking_status';
}