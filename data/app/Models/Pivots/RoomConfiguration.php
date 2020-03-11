<?php

namespace App\Models\Pivots;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\Configuration;

class RoomConfiguration extends LegacyModel
{
    public $timestamps = false;
    public $table = 'room_configuration';

    public function configurations()
    {
        return $this->belongsTo(Configuration::class);
    }

    public function rooms()
    {
        return $this->belongsTo(Configuration::class, 'asset_id', 'asset_id');
    }
}