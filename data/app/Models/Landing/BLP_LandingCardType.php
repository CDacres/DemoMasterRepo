<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_LandingCardType extends MyModel
{
    public $table = 'blp_landing_card_types';

    const FAVOURITE = 1;
    const POPULAR = 2;
    const REVIEW = 3;
    const RECENT = 4;

    protected $fillable = [
        'type_desc'
    ];
}