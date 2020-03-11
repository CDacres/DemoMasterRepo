<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;

class BLP_BrowseUrl extends MyModel
{
    public $table = 'blp_browse_urls';

    protected $fillable = [
        'browse_id',
        'locale_id',
        'url',
        'preferred'
    ];

    public function browse()
    {
        return $this->belongsTo(BLP_Browse::class, 'browse_id');
    }
}