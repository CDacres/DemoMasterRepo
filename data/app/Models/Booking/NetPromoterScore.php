<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\MyModel;

use App\Events\NetPromoterScoreCreatingEvent;

class NetPromoterScore extends MyModel
{
    public $timestamps = false;
    public $table = 'net_promoter_score';

    protected $fillable = [
        'user_id',
        'reservation_id',
        'rating',
        'comment',
        'created'
    ];

    protected $dispatchesEvents = ['creating' => NetPromoterScoreCreatingEvent::class];
}