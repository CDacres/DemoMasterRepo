<?php

use Faker\Generator as Faker;
use App\Models\Landing\LandingPageLanguage;

$factory->define(LandingPageLanguage::class, function (Faker $faker) {
    return [
        'lang_code' => $faker->randomElement(['en', 'en_IE', 'en_US', 'fr', 'de']),
        'desc_text' => $faker->paragraphs(3, true),
        'desc_text_top' => $faker->paragraphs(3, true),
        'h1' => $faker->words(3, true),
        'h2' => $faker->words(3, true),
        'carousel_title' => $faker->words(3, true),
        'meta_title' => $faker->words(3, true),
        'meta_desc' => $faker->sentence(9, true),
        'meta_keyword' => $faker->words(9, true)
    ];
});