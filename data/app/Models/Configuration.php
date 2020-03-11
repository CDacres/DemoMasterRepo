<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;
use App\Transformers\ConfigurationTransformer;

class Configuration extends LegacyModel
{
    public $timestamps = false;
    public $table = 'configurations';
    static protected $defaultTransformer = ConfigurationTransformer::class;
    static protected $defaultSerialisationLabel = 'configurations';

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_configuration')->using(\Pivots\RoomConfiguration::class);
    }

    public function getNameAttribute()
    {
        return $this->desc;
    }

    public function setNameAttribute($value)
    {
        $this->attributes['desc'] = $value;
    }
}