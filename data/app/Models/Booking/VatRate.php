<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;
use App\Contracts\Facades\ChannelLog as Log;
use DateTime;

class VatRate extends LegacyModel
{
    const STANDARD = 'Default';
    const ZERO = 'Zero';

    public $timestamps = false;
    public $table = 'vat_rates';

    static public function getDefaultByCountryCode($countryCode)
    {
        $currentDateTime = (new DateTime())->format('Y-m-d H:i:s');
        $rates = static::where(['country_code' => $countryCode, 'rate_type' => VatRate::STANDARD])->where(function ($query) use ($currentDateTime) {
            $query->where('valid_from', '<=', $currentDateTime)->where(function ($query) use ($currentDateTime) {
                $query->whereNull('valid_to')->orWhere('valid_to', '>=', $currentDateTime);
            });
        })->get();
        if ($rates->count() !== 1)
        {
            Log::warning("Either too many or too few standard VAT rates for a country. Investigate.", 'default', ['country_code' => $countryCode, 'rates' => $rates->toArray()]);
        }
        return $rates->first();
    }

    static public function getAllDefaults()
    {
        $currentDateTime = (new DateTime())->format('Y-m-d H:i:s');
        return static::where('rate_type', VatRate::STANDARD)->where(function ($query) use ($currentDateTime) {
            $query->where('valid_from', '<=', $currentDateTime)->where(function ($query) use ($currentDateTime) {
                $query->whereNull('valid_to')->orWhere('valid_to', '>=', $currentDateTime);
            });
        })->get();
    }
}