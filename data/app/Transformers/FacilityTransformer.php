<?php

namespace App\Transformers;

use App\Models\Pivots\AssetAmenity;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class FacilityTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'filter',
        'asset',
        'facility_type'
    ];

    public function includeFilter(AssetAmenity $pivot)
    {
        $filter = $pivot->filter;
        return $this->item($filter, new FilterTransformer(), 'filters');
    }

    public function includeFacilityType(AssetAmenity $pivot)
    {
        $facType = $pivot->facility_type;
        return $this->item($facType, new FacilityTypeTransformer(), 'facility_types');
    }

    public function includeAsset(AssetAmenity $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }

    public function transform(AssetAmenity $pivot)
    {
        return [
            'id' => (string) $pivot->id,
            'allows_price' => (bool) $pivot->allows_price,
            'cost' => $this->_nullableValue($pivot->cost, 'float'),
            'name' => $this->_nullableValue($pivot->name, 'string'),
            'instructions' => $this->_nullableValue($pivot->instructions, 'string'),
            'available' => (bool) $pivot->available
        ];
    }
}