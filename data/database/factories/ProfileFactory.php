<?php

use Faker\Generator as Faker;
use App\Models\Profile;

$factory->define(Profile::class, function (Faker $faker) {
    $phone_number = $faker->e164PhoneNumber;
    return [
        'Fname' => $faker->firstName,
        'Lname' => $faker->lastName,
        'phnum' => $phone_number,
        'phnum_search' => preg_replace('/[\s\+]/', '', $phone_number)
    ];
});