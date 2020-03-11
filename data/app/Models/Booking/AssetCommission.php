<?php

namespace App\Models\Booking;

use App\Models\Booking\BookingChannel;
use App\Models\Asset;
use App\LaravelExtensions\Model\LegacyModel;

class AssetCommission extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_commissions';

    public function booking_channel()
    {
        return $this->belongsTo(BookingChannel::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function getBookingChannelIdAttribute()
    {
        return $this->attributes['bookingChannel_id'];
    }

    public function setBookingChannelIdAttribute($value)
    {
        $this->attributes['bookingChannel_id'] = $value;
    }

    public function getCommissionPercentageAttribute()
    {
        return $this->attributes['commissionPercentage'];
    }

    public function setCommissionPercentageAttribute($value)
    {
        $this->attributes['commissionPercentage'] = $value;
    }
}