<?php

namespace App\Transformers;

use App\Models\Room;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class RoomDetailsTransformer extends ExtendedTransformer
{
    public function transform(Room $details)
    {
        return ['id' => (string) $details->id];
    }
}