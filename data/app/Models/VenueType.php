<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class VenueType extends LegacyModel
{
    public $timestamps = false;
    public $table = 'venue_types';

    const HOTELS = 5;
}