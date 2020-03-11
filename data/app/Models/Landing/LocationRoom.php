<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\LegacyModel;

class LocationRoom extends LegacyModel
{
    public $timestamps = false;
    public $table = 'location_rooms';

    protected $fillable = [
        'location_id',
        'tag_id',
        'approved_room_count',
        'unapproved_room_count'
    ];
}