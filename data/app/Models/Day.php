<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class Day extends LegacyModel
{
    public $timestamps = false;
    public $table = 'days';

    public function getNameAttribute()
    {
        return lcfirst($this->attributes['name']);
    }
}