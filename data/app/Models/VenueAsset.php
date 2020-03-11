<?php

namespace App\Models;
use App\Transformers\VenueAssetTransformer;
use App\Models\User;
use App\Models\Booking\VatRate;

class VenueAsset extends DetailsAsset
{
    protected $_type = VenueAsset::VENUE;
    protected $_detailsType = Venue::class;
    static protected $defaultTransformer = VenueAssetTransformer::class;
    static protected $defaultSerialisationLabel = 'venues';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->hidden = array_merge([], $this->hidden);
        $this->appends = array_merge([], $this->appends);
    }

    public function saveNewVenue($company, $user)
    {
        $this->inferAndSetVAT();
        $this->company()->associate($company->details);
        $this->parent()->associate($company);
        $this->save();
        $this->primary_contact()->associate($user);
        $this->copyRelationFromAsset($company, 'privileges');
        $countryCode = $this->inferAndReturnCountryCode();
        $this->generateDefaultCommissions($countryCode, $user->isSelfLister());
        $currency = Currency::getCurrencyByCountryCode($countryCode);
        if (is_null($currency))
        {
            Log::warning("Venue creation attempted for country with no currency.", 'default', ['asset_id' => $this->id, 'country_code' => $countryCode]);
        }
        else
        {
            $this->currency = $currency->currency_code;
        }
        $this->save();
    }

    public function createFromRequestHelper($reqHelper)
    {
        $user = $reqHelper->user();
        $name = $reqHelper->getJSONAttribute('name');
        $company = CompanyAsset::findOrCreateForUser($user, $name);
        $this->fillFromRequestHelper($reqHelper);
        return $this->_sharedCreationMethods($company, $user);
    }

    public function createFromFillArray($fillArray, $tempHackUser) {
        $name = $fillArray['name'];
        $company = CompanyAsset::findOrCreateForUser($tempHackUser, $name);
        $this->fill($fillArray);
        return $this->_sharedCreationMethods($company, $tempHackUser);
    }
    
    private function _sharedCreationMethods($company, $user) {
        $this->setAgreedToList($user);
        $this->optimiseLocation();
        $this->saveNewVenue($company, $user);
        return $this;
    }

    public function parent()
    {
        return $this->belongsTo(CompanyAsset::class, $this->getParentIdName());
    }

    public function children()
    {
        return $this->hasMany(RoomAsset::class, $this->getParentIdName());
    }

    public function optimiseLocation()
    {
        return $this->details->optimiseLocation();
    }

    public function setAgreedToList(User $user)
    {
        $this->details->agree_to_list = $user->isSelfLister();
    }

    public function inferAndReturnCountryCode()
    {
        return $this->details->inferAndReturnCountryCode();
    }

    public function inferAndSetVAT()
    {
        return $this->details->inferAndSetVAT();
    }

    public function company()
    {
        return $this->details->company();
    }

    public function primary_contact()
    {
        return $this->details->primary_contact();
    }

    public function vat_rate()
    {
        return $this->hasManyThrough(VatRate::class, Venue::class, 'asset_id', 'id', 'id', 'vat_rate_id');
    }

    public function getCompanyTokenAttribute()
    {
        return $this->parent->token;
    }

    public function getCurrencyAttribute()
    {
        return $this->details->currency;
    }

    public function setCurrencyAttribute($currency)
    {
        return $this->details->currency = $currency;
    }

    public function scopeFromChild($query, $asset_id)
    {
        return $query->whereHas('children', function ($q) use ($asset_id) {
            $q->where('id', $asset_id);
        });
    }
}
