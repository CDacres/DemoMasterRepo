<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\LegacyModel;

class LocationAsset extends LegacyModel
{
    public $timestamps = false;
    public $table = 'location_asset';

    protected $fillable = [
        'location_id',
        'approved_venue_count',
        'unapproved_venue_count'
    ];
}