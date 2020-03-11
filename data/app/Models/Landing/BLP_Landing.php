<?php

namespace App\Models\Landing;

class BLP_Landing extends BLP
{
    static protected $defaultSerialisationLabel = 'landing';

    public $table = 'blp_landing';

    protected $fillable = [
        'location_id',
        'tag_label_id',
        'redirect_lp_id'
    ];

    public function redirect()
    {
        return $this->hasOne(BLP_Landing::class, 'id', 'redirect_lp_id');
    }

    public function landing_attributes()
    {
        return $this->hasMany(BLP_LandingAttribute::class, 'lp_id');
    }

    public function landing_info()
    {
        return $this->hasOne(BLP_LandingInfo::class, 'lp_id');
    }

    public function landing_meta()
    {
        return $this->hasOne(BLP_LandingMetaOverride::class, 'lp_id');
    }

    public function landing_urls()
    {
        return $this->hasMany(BLP_LandingUrl::class, 'lp_id');
    }

    public function chosen_card_assets()
    {
        return $this->hasMany(BLP_LandingCardChosenAsset::class, 'lp_id')->orderBy('ordering', 'ASC');
    }
}