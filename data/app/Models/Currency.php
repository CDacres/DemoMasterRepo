<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;
use App\Contracts\Facades\ChannelLog as Log;

class Currency extends LegacyModel
{
    public $timestamps = false;
    public $table = 'currency';

    static public function getCurrencyByCountryCode($code)
    {
        $currencies = static::join('currency_locations', 'currency_code', 'code')->where('currency_locations.country_code', $code)->get();
        if ($currencies->count() !== 1)
        {
            Log::warning("Either too many or too few currencies for a country. Investigate.", 'default', ['country_code' => $code, 'rates' => $currencies->toArray()]);
        }
        return $currencies->first();
    }

    static public function getCurrencyByCode($code)
    {
        return static::where('code', $code)->first();
    }
}