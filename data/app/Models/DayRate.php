<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class DayRate extends LegacyModel
{
    public $timestamps = false;
    public $table = 'day_rates';

    protected $fillable = [
        'half_day_price_first',
        'half_day_price_second',
        'half_day_time_first_start',
        'half_day_time_first_end',
        'half_day_time_second_start',
        'half_day_time_second_end',
        'daily_price',
        'evening_price',
        'monthly_price',
        'daily_delegate_rate',
        'half_day_price_first_exvat',
        'half_day_price_second_exvat',
        'daily_price_exvat',
        'evening_price_exvat',
        'monthly_price_exvat',
        'daily_delegate_rate_exvat'
    ];

    public function setHalfDayPriceFirstAttribute($value)
    {
        $this->attributes['halfday_rate_first'] = $value;
    }

    public function getHalfDayPriceFirstAttribute()
    {
        return $this->halfday_rate_first;
    }

    public function setHalfDayPriceSecondAttribute($value)
    {
        $this->attributes['halfday_rate_second'] = $value;
    }

    public function getHalfDayPriceSecondAttribute()
    {
        return $this->halfday_rate_second;
    }

    public function setHalfDayPriceFirstExvatAttribute($value)
    {
        $this->attributes['halfday_rate_first_exvat'] = $value;
    }

    public function setHalfDayPriceSecondExvatAttribute($value)
    {
        $this->attributes['halfday_rate_second_exvat'] = $value;
    }

    public function setDailyPriceAttribute($value)
    {
        $this->attributes['standard_day_rate'] = $value;
    }

    public function getDailyPriceAttribute()
    {
        return $this->standard_day_rate;
    }

    public function setDailyPriceExvatAttribute($value)
    {
        $this->attributes['standard_day_rate_exvat'] = $value;
    }
}