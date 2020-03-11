<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;
use App\Transformers\FilterTransformer;
use App\Helpers\Formatting\TextHelper;

class Amenity extends LegacyModel
{
    use \Waavi\Translation\Traits\Translatable;

    protected $translatableAttributes = ['desc'];
    public $timestamps = false;
    public $table = 'amenities';
    static protected $defaultTransformer = FilterTransformer::class;
    static protected $defaultSerialisationLabel = 'filters';

    const EXTERNAL = 9;

    public function scopeFromScrape($query)
    {
        return $query->where('amenity_types_id', Amenity::EXTERNAL);
    }

    public function getNameAttribute()
    {
        return $this->desc;
    }

    public function setNameAttribute($value)
    {
        $this->desc = (new TextHelper())->text_replace($value);
    }

    public function getAllowsPriceAttribute()
    {
        return $this->allow_price;
    }

    public function setAllowsPriceAttribute($value)
    {
        $this->allow_price = $value;
    }
}