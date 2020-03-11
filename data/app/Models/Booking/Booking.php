<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\User;

use App\Events\BookingCreatingEvent;

class Booking extends LegacyModel
{
    public $timestamps = false;
    public $table = 'bookings';

    protected $usesHardDeletes = true;

    protected $fillable = [
        'booker_id',
        'beneficiary_id',
        'bookingChannel_id',
        'bookingStatus_id',
        'created',
        'closed'
    ];

    protected $dispatchesEvents = ['creating' => BookingCreatingEvent::class];

    public function booker()
    {
        return $this->belongsTo(User::class, 'booker_id', 'id');
    }

    public function beneficiary()
    {
        return $this->belongsTo(User::class, 'beneficiary_id', 'id');
    }

    public function booking_channel()
    {
        return $this->hasOne(BookingChannel::class, 'id', 'bookingChannel_id');
    }

    public function getClientNameAttribute()
    {
        return $this->beneficiary->fullname;
    }

    public function getClientFirstNameAttribute()
    {
        return $this->beneficiary->firstname;
    }

    public function getClientLastNameAttribute()
    {
        return $this->beneficiary->lastname;
    }

    public function getClientEmailAttribute()
    {
        return $this->beneficiary->email;
    }

    public function getClientPhoneAttribute()
    {
        return $this->beneficiary->phone;
    }

    public function getClientTokenAttribute()
    {
        return $this->beneficiary->token;
    }

    public function complete_booking($status)
    {
        if (is_null($this->closed))
        {
            $this->bookingStatus_id = $status;
            $this->closed = date("Y-m-d H:i:s");
            $this->save();
        }
    }
}