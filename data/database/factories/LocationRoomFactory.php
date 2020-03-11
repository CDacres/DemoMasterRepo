<?php

use Faker\Generator as Faker;
use App\Models\Landing\LocationRoom;

$factory->define(LocationRoom::class, function (Faker $faker) {
    return [
        'tag_id' => $faker->numberBetween(1, 315),
        'approved_room_count' => $faker->randomNumber(4),
        'unapproved_room_count' => $faker->randomNumber(4)
    ];
});