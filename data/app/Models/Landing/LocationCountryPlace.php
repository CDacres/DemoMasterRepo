<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\LegacyModel;

class LocationCountryPlace extends LegacyModel
{
    public $timestamps = false;
    public $table = 'location_country_places';

    protected $fillable = [
        'country',
        'main_location_id',
        'location_1_id',
        'location_2_id',
        'location_3_id',
        'location_4_id'
    ];
}