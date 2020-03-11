<?php

use Faker\Generator as Faker;
use App\Models\Landing\Location;

$factory->define(Location::class, function (Faker $faker) {
    $place = $faker->city;
    $lat = $faker->latitude;
    $long = $faker->longitude;
    return [
        'url_desc' => strtolower($place),
        'search_url' => $place . '--' . $faker->country,
        'human_desc' => $place,
        'parent_id' => 1,
        'locationcategorie_id' => $faker->numberBetween(1, 6),
        'lat' => $lat,
        'long' => $long,
        'country' => $faker->countryCode,
        'locality' => strtolower($place),
        'constituancy_unit' => strtolower($place),
        'location_type' => 'APPROXIMATE',
        'bounds_sw_lat' => $lat - 0.1,
        'bounds_sw_lon' => $long - 0.1,
        'bounds_ne_lat' => $lat + 0.1,
        'bounds_ne_lon' => $long + 0.1,
        'bounds_distance' => 0.5,
        'search_radius' => 3,
        'in_sitemap' => $faker->boolean,
        'approved_venue_count' => $faker->randomNumber(4),
        'unapproved_venue_count' => $faker->randomNumber(4),
        'requires_determiner' => $faker->boolean,
        'updated_date' => date("Y-m-d H:i:s")
    ];
});