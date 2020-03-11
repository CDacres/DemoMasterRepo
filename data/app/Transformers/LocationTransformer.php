<?php

namespace App\Transformers;

use App\Models\Landing\Location;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class LocationTransformer extends ExtendedTransformer
{
    public function transform(Location $location)
    {
        return [
            'id' => (string) $location->id,
            'url_desc' => (string) $location->url_desc,
            'search_url' => (string) $location->search_url,
            'human_desc' => (string) $location->human_desc,
            'parent_id' => (int) $location->parent_id,
            'category_id' => (int) $location->locationcategorie_id,
            'lat' => (float) $location->lat,
            'long' => (float) $location->long,
            'country' => (string) $location->country,
            'locality' => (string) $location->locality,
            'constituancy_unit' => (string) $location->constituancy_unit,
            'location_type' => (string) $location->location_type,
            'bounds_sw_lat' => (float) $location->bounds_sw_lat,
            'bounds_sw_lon' => (float) $location->bounds_sw_lon,
            'bounds_ne_lat' => (float) $location->bounds_ne_lat,
            'bounds_ne_lon' => (float) $location->bounds_ne_lon,
            'bounds_distance' => (float) $location->bounds_distance,
            'search_radius' => (float) $location->search_radius,
            'in_sitemap' => (bool) $location->in_sitemap,
            'place_id' => (string) $location->place_id,
            'approved_venue_count' => (int) $location->approved_venue_count,
            'unapproved_venue_count' => (int) $location->unapproved_venue_count,
            'requires_determiner' => (bool) $location->requires_determiner
        ];
    }
}