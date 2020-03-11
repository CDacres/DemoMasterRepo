<?php

namespace App\Models;
use App\LaravelExtensions\Model\LegacyModel;

class OpeningPeriod extends LegacyModel
{
    public $timestamps = false;
    public $table = 'opening_periods';

    protected $usesHardDeletes = true;

    public $fillable = [
        'day_id',
        'start',
        'end',
        'minimum_minutes',
        'slot_length_minutes'
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function day()
    {
        return $this->hasOne(Day::class, 'id', 'day_id');
    }

    public function hour_rate()
    {
        return $this->hasOne(HourRate::class, 'openingPeriod_id', 'id');
    }
}