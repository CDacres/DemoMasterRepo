<?php

namespace App\Events;

use App\Models\AssetFavourite;

class AssetFavouriteCreatingEvent extends Event
{
    public function __construct(AssetFavourite $favourite)
    {
        $favourite->created = date("Y-m-d H:i:s");
    }
}