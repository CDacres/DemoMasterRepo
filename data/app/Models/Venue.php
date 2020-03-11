<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\Booking\VatRate;
use App\Contracts\Facades\ChannelLog as Log;
use App\Helpers\Formatting\TextHelper;
use App\Helpers\VenueHelper;

class Venue extends LegacyModel
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'updated';
    public $table = 'venues';

    protected $casts = ['agree_to_list' => 'boolean'];

    public $fillable = [
        'company_id',
        'name',
        'venue_type_id',
        'website',
        'address',
        'street_number',
        'address_extras',
        'road',
        'town',
        'post_code',
        'county',
        'country',
        'transport',
        'lat',
        'long',
        'city',
        'description',
        'draft_description',
        'country_code',
        'currency'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function primary_contact()
    {
        return $this->belongsTo(User::class, 'main_contact', 'id');
    }

    public function vat_rate()
    {
        return $this->belongsTo(VatRate::class);
    }

    public function locale()
    {
        return $this->belongsTo(Locale::class, 'country_code', 'country_code');
    }

    public function optimiseLocation()
    {
        return true;
    }

    public function inferAndSetVAT()
    {
        $country_code = $this->inferAndReturnCountryCode();
        $vatRate = VatRate::getDefaultByCountryCode($country_code);
        if (is_null($vatRate))
        {
            $this->vat_rate_id = null;
            Log::warning("Venue creation attempted for country with no VAT defaults.", 'default', ['asset_id' => $this->id, 'country_code' => $country_code]);
        }
        else
        {
            $this->vat_rate_id = $vatRate->id;
        }
    }

    public function inferAndReturnCountryCode($forceRefresh = false)
    {
        if (!$forceRefresh && !is_null($this->country_code))
        {
            return $this->country_code;
        }
        return 'GB';
    }

    public function getParentRefField()
    {
        return 'company_id';
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = (new TextHelper())->text_replace($value);
    }

    public function setDescriptionAttribute($value)
    {
        $this->attributes['description'] = (new TextHelper())->text_replace($value);
    }

    public function setDraftDescriptionAttribute($value)
    {
        $this->attributes['draft_description'] = (new TextHelper())->text_replace($value);
    }

    public function getUrlAttribute()
    {
        return (new VenueHelper())->get_url($this, false, false);
    }
}