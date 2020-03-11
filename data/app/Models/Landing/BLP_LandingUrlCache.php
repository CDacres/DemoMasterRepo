<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_LandingUrlCache extends MyModel
{
    public $table = 'blp_landing_url_cache';

    protected $fillable = [
        'url',
        'last_cached'
    ];
}