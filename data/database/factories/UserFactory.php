<?php

use Faker\Generator as Faker;

use App\Models\User;

$factory->define(User::class, function (Faker $faker) {
    $user = new User();
    $email = $faker->unique()->safeEmail;
    $name = $faker->firstName;
    $salt = $user->generateSalt();
    $passwordHash = $user->crypt($name . 'Pass', $salt);
    srand((double)microtime() * 1000000);
    return [
        'ref_id' => md5($email),
        'coupon_code' => rand(10000, 99999),
        'token' => md5(uniqid(rand(), true)),
        'unsubscribe_token' => md5(uniqid(rand(), true)),
        'username' => $name,
        'salt' => $salt,
        'password' => $passwordHash,
        'email' => $email,
        'last_ip' => '10.0.0.32',
        'created' => time()
    ];
});