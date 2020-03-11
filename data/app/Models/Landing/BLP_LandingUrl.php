<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_LandingUrl extends MyModel
{
    public $table = 'blp_landing_urls';

    protected $fillable = [
        'lp_id',
        'locale_id',
        'url',
        'preferred'
    ];

    public function landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'lp_id');
    }
}