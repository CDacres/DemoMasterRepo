<?php

namespace App\Transformers;

use App\Models\VenueAsset;

class VenueAssetTransformer extends AssetTransformer
{
    public function __construct(\Illuminate\Contracts\Auth\Access\Authorizable $user = null)
    {
        parent::__construct($user);
        $this->availableIncludes = array_merge(['children'], $this->availableIncludes);
    }

    public function transform(VenueAsset $venue)
    {
        return [
            'id' => (string) $venue->id,
            'reference_id' => (string) $venue->reference_id,
            'parent_id' => (string) $venue->parent_id,
            'opening_periods' => (object) $this->transformOpeningPeriods($venue->opening_periods),
            'description' => (string) $venue->details->description,
            'name' => (string) $venue->details->name,
            'website' => (string) $venue->details->website,
            'address_extras' => (string) $venue->details->address_extras,
            'address' => (string) $venue->details->address,
            'city' => (string) $venue->details->city,
            'country' => (string) $venue->details->country,
            'country_code' => (string) $venue->details->country_code,
            'lat' => (float) $venue->details->lat,
            'long' => (float) $venue->details->long,
            'venue_type_id' => (string) $venue->details->venue_type_id,
            'street_number' => (string) $venue->details->street_number,
            'road' => (string) $venue->details->road,
            'town' => (string) $venue->details->town,
            'county' => (string) $venue->details->county,
            'post_code' => (string) $venue->details->post_code,
            'transport' => (string) $venue->details->transport,
            'child_count' => (int) $venue->child_count
        ];
    }

    public function includeChildren(VenueAsset $venue)
    {
        $children = $venue->children;
        return $this->collection($children, new RoomAssetTransformer($this->contextUser), 'room_assets');
    }
}