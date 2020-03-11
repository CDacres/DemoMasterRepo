<?php

namespace App\Models\Landing;

class BLP_Browse extends BLP
{
    static protected $defaultSerialisationLabel = 'browse';

    public $table = 'blp_browse';

    public function browse_info()
    {
        return $this->hasOne(BLP_BrowseInfo::class, 'browse_id');
    }

    public function browse_meta()
    {
        return $this->hasOne(BLP_BrowseMetaOverride::class, 'browse_id');
    }

    public function browse_urls()
    {
        return $this->hasMany(BLP_BrowseUrl::class, 'browse_id');
    }

    public function cards()
    {
        return $this->hasMany(BLP_BrowseCard::class, 'browse_id')->orderBy('ordering', 'ASC');
    }
}