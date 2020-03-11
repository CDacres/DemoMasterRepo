<?php

namespace App\Events;

use App\Models\Location;

class LocationCreatingEvent extends Event
{
    public function __construct(Location $location)
    {
        $location->updated_date = date("Y-m-d H:i:s");
    }
}