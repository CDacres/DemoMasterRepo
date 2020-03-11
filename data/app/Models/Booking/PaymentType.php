<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class PaymentType extends LegacyModel
{
    const INVOICE = 4;
    const BRAINTREE = 5;
    const VENUEINVOICE = 6;
    const BACS = 7;

    public $timestamps = false;
    public $table = 'payment_types';
}