<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_BrowseMetaOverride extends MyModel
{
    public $table = 'blp_browse_meta';

    protected $fillable = [
        'browse_id',
        'page_title',
        'page_subtitle',
        'meta_title',
        'meta_desc',
        'meta_keyword',
        'schema_name',
        'schema_desc'
    ];

    public function browse()
    {
        return $this->belongsTo(BLP_Browse::class, 'browse_id');
    }
}