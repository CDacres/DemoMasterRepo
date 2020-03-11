<?php

namespace App\Transformers;

use App\Models\Amenity;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class FilterTransformer extends ExtendedTransformer
{
    public function transform(Amenity $amenity)
    {
        return [
            'id' => (string) $amenity->id,
            'name' => (string) $amenity->name,
            'allows_price' => (bool) $amenity->allows_price,
//            'amenity_types_id' => (string) $amenity->amenity_types_id,
//            'filterable' => (bool) $amenity->filterable
        ];
    }
}