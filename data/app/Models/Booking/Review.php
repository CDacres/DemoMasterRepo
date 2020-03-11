<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\User;
use App\Models\RoomAsset;
use App\Models\Booking\Reservation;

use App\Events\ReviewCreatingEvent;
use App\Events\ReviewCreatedEvent;

class Review extends LegacyModel
{
    public $timestamps = false;
    public $table = 'reviews';

    protected $fillable = [
        'asset_id',
        'userby',
        'reservation_id',
        'review',
        'feedback',
        'created',
        'cleanliness',
        'accuracy',
        'checkin',
        'communication',
        'location',
        'value'
    ];

    protected $dispatchesEvents = [
        'creating' => ReviewCreatingEvent::class,
        'created' => ReviewCreatedEvent::class
    ];

    private $_reviewing_user;

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'userby', 'id');
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'reservation_id', 'id');
    }

    public function asset()
    {
        return $this->belongsTo(RoomAsset::class, 'asset_id', 'id');
    }

    public function get_reviewing_user()
    {
        return $this->_reviewing_user;
    }

    public function set_reviewing_user($user)
    {
        $this->_reviewing_user = $user;
    }
}