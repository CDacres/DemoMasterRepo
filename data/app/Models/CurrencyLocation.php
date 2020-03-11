<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class CurrencyLocation extends LegacyModel
{
    public $timestamps = false;
    public $table = 'currency_locations';
}