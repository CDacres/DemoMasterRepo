<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class BookingChannelCountry extends LegacyModel
{
    public $timestamps = false;
    public $table = 'booking_channel_countries';

    public function scopeFromCountry($query, $country_code)
    {
        return $query->where('country_code', $country_code);
    }
}