<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\MyModel;

class Checkout extends MyModel
{
    public $timestamps = false;
    public $table = 'checkout';

    public function room()
    {
        return $this->hasOne('App\Models\Room', 'id', 'room_id');
    }

    public function getStartDateAttribute()
    {
//        return format($this->start_date_time);
    }
}