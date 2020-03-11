<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\MyModel;

class CheckoutSlot extends MyModel
{
    public $timestamps = false;
    public $table = 'checkout_slots';
}