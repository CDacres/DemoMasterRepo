<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class EnquiryRoom extends LegacyModel
{
    public $timestamps = false;
    public $table = 'enquiries_rooms';

    protected $fillable = [
        'enquiry_id',
        'room_id'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}