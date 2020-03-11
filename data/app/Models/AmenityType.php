<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class AmenityType extends LegacyModel
{
    public $timestamps = false;
    public $table = 'amenity_types';
    static $defaultId = 9;

    static function confirmIdOrFallback($id)
    {
        if (is_null($id) || is_null(static::find($id)))
        {
            return static::$defaultId;
        }
        else
        {
            return $id;
        }
    }
}