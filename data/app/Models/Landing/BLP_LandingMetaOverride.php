<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_LandingMetaOverride extends MyModel
{
    public $table = 'blp_landing_meta';

    protected $fillable = [
        'lp_id',
        'page_title',
        'page_subtitle',
        'meta_title',
        'meta_desc',
        'meta_keyword',
        'schema_name',
        'schema_desc'
    ];

    public function landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'lp_id');
    }
}