<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class PaymentStatus extends LegacyModel
{
    const CREATED = 1;
    const VOID = 2;
    const COMPLETE = 3;
    const REFUND = 4;
    const SUBMITTED = 5;
    const ZIPCUBECOVERED = 6;

    public $timestamps = false;
    public $table = 'payment_status';
}