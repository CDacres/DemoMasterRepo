<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;
use App\Models\SiteImage;

class BLP_BrowseCard extends MyModel
{
    public $table = 'blp_browse_cards';

    protected $fillable = [
        'browse_id',
        'card_title',
        'card_text',
        'card_img_id',
        'ordering',
        'lp_id'
    ];

    public function browse()
    {
        return $this->belongsTo(BLP_Browse::class, 'browse_id');
    }

    public function card_image()
    {
        return $this->belongsTo(SiteImage::class, 'card_img_id', 'id');
    }

    public function landing_url()
    {
        return $this->hasMany(BLP_LandingUrl::class, 'lp_id', 'lp_id');
    }
}