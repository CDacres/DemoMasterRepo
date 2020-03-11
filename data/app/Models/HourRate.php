<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class HourRate extends LegacyModel
{
    public $timestamps = false;
    public $table = 'hour_rates';

    protected $usesHardDeletes = true;

    protected $fillable = ['price_per_hour'];
}