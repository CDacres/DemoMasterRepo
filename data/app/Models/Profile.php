<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class Profile extends LegacyModel
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'Fname',
        'Lname',
        'phnum',
        'phnum_search'
    ];
    protected $hidden = [
        'email',
        'live',
        'work',
        'describe',
        'user_type',
        'bus_first_name',
        'bus_last_name',
        'bus_email',
        'bus_email_only',
        'bus_phone',
        'address_status',
        'parking',
        'bussiness_name',
        'venue_type',
        'website',
        'address',
        'neighbor',
        'exact',
        'directions',
        'lat',
        'long',
        'street_view',
        'room_cancel_percent',
        'room_cancel_days',
        'room_agreement_status',
        'room_agreement_upload'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function setFirstNameAttribute($value)
    {
        $this->attributes['Fname'] = $value;
    }

    public function getFirstNameAttribute()
    {
        return $this->attributes['Fname'];
    }

    public function setLastNameAttribute($value)
    {
        $this->attributes['Lname'] = $value;
    }

    public function getLastNameAttribute()
    {
        return $this->attributes['Lname'];
    }
}
