<?php

namespace App\Transformers;

use App\Models\AmenityType;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class FacilityTypeTransformer extends ExtendedTransformer
{
    public function transform(AmenityType $type)
    {
        return [
            'id' => (string) $type->id,
            'name' => (string) $type->name
        ];
    }
}