<?php

namespace App\Models\Marketing;
use App\LaravelExtensions\Model\MyModel;
use App\Models\Booking\Checkout;
use App\Models\Room;

class EventTypes extends MyModel
{
    protected $table = 'event_types';
    public $timestamps = false;
    protected $guarded = [];

    const LINKAGE = [
        'HIT_CHECKOUT' => [
            'model' => Checkout::class,
            'cf' => 1,
            'view_name' => 'checkouts'
        ],
        'ROOM_VIEW' => [
            'model' => Room::class,
            'cf' => 1,
            'view_name' => 'rooms'
        ]
    ];

    static function generate_context_field_name($field_number)
    {
        return "context_field_" . $field_number . "_value";
    }
}