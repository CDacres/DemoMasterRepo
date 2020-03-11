<?php

use Faker\Generator as Faker;
use App\Models\Landing\LandingPageUrl;

$factory->define(LandingPageUrl::class, function (Faker $faker) {
    return [
        'url' => $faker->url,
        'preferred' => $faker->boolean
    ];
});