<?php

namespace App\Events;

use App\Models\AssetImage;

class AssetImageCreatingEvent extends Event
{
    public function __construct(AssetImage $image)
    {
        $image->created = date("Y-m-d H:i:s");
    }
}