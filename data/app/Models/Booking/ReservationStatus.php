<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class ReservationStatus extends LegacyModel
{
    const BLOCKED = 0;
    const CREATED = 1;
    const EXPIRED = 2;
    const ACCEPTED = 3;
    const DECLINE = 4;
    const CANCELLEDBYHOST = 5;
    const CANCELLEDBYUSER = 6;
    const CHECKIN = 7;
    const AWAITINGHOSTREVIEW = 8;
    const AWAITINGUSERREVIEW = 9;
    const COMPLETED = 10;
    const DELETED = -1;

    public $timestamps = false;
    public $table = 'reservation_status';
}