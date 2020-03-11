<?php

namespace App\Transformers;

use App\Models\Pivots\AssetAmenity;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AddOnTransformer extends ExtendedTransformer
{
    public function transform(AssetAmenity $pivot)
    {
        return [
            'id' => (string) $pivot->id,
            'asset_id' => (string) $pivot->asset_id,
            'amenity_types_id'   => (string) $pivot->amenity->amenity_types_id,
            'cost' => $pivot->cost ? (float) $pivot->cost : null,
            'currency' => (string) $pivot->currency,
            'instructions' => $pivot->instructions ? (string) $pivot->instructions : null,
            'available' => (bool) $pivot->available
        ];
    }
}