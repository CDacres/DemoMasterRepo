<?php

use Faker\Generator as Faker;
use App\Models\Landing\LandingPage;

$factory->define(LandingPage::class, function (Faker $faker) {
    return [
        'tag_id' => $faker->numberBetween(1, 315),
        'attribute_id' => (($faker->boolean)?$faker->randomElement([1, 6, 7]):NULL)
    ];
});