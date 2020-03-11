<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\Pivots\AssetAttribute;

class Attribute extends LegacyModel
{
    const COOL = 1;
    const HOTEL = 6;
    const CHEAP = 7;

    public $timestamps = false;
    public $table = 'attribute_types';

    public function attr_language()
    {
        return $this->hasMany(AttributeLanguage::class);
    }

    public function scopeFromLang($query, $lang)
    {
        return $query->with(['attr_language' => function ($query) use ($lang) {
            $query->fromLang($lang);
        }]);
    }

    public function asset_attributes()
    {
        return $this->hasMany(AssetAttribute::class);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['desc'] = $value;
    }

    public function getNameAttribute()
    {
        return $this->attributes['desc'];
    }
}
