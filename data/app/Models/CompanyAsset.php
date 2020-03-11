<?php

namespace App\Models;

use App\Models\DetailsAsset;
use App\Transformers\CompanyAssetTransformer;
use App\Contracts\Facades\ChannelLog as Log;

class CompanyAsset extends DetailsAsset
{
    protected $_type = CompanyAsset::COMPANY;
    protected $_detailsType = Company::class;
    static protected $defaultTransformer = CompanyAssetTransformer::class;
    static protected $defaultSerialisationLabel = 'companies';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->hidden = array_merge([], $this->hidden);
        $this->appends = array_merge([], $this->appends);
    }

    static public function saveNewCompany($user, $name)
    {
        $company = new CompanyAsset();
        $company->setupAs(CompanyAsset::COMPANY);
        $companyDetails = new Company();
        $companyDetails->name = $name;
        $company->details = $companyDetails;
        $company->save();
        $company->giveUserPrivileges($user);
        return $company;
    }

    public function children()
    {
        return $this->hasMany(VenueAsset::class, $this->getParentIdName());
    }

    static public function findOrCreateForUser($user, $name)
    {
        $companyCollection = static::with('privileges')->whereHas('privileges', function ($query) use ($user) {
            $query->where('user_id', $user->id);
            $query->where('privileges_mask', '>', 0);
        })->get();
        $companyCount = $companyCollection->count();
        if ($companyCount === 0)
        {
            $company = static::_createAndSaveForUser($user, $name);
        }
        else
        {
            if ($companyCount > 1)
            {
                Log::warning("A user seems to have more than one associated company. Investigate.", 'default', ['user_id' => $user->id, 'companies' => $companyCollection->toArray()]);
            }
            $company = $companyCollection->first();
        }
        return $company;
    }

    static private function _createAndSaveForUser($user, $name)
    {
        $company = static::saveNewCompany($user, $name);
        return CompanyAsset::findOrFail($company->id);
    }
}