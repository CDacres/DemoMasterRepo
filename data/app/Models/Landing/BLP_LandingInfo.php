<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;
use App\Models\SiteImage;

class BLP_LandingInfo extends MyModel
{
    public $table = 'blp_landing_info';

    protected $fillable = [
        'lp_id',
        'banner_img',
        'banner_title',
        'banner_button',
        'banner_text',
        'banner_text_color',
        'favourite_card_title',
        'favourite_card_subtitle',
        'popular_card_title',
        'popular_card_subtitle',
        'review_card_title',
        'review_card_subtitle',
        'recent_card_title',
        'recent_card_subtitle',
        'map_title',
        'related_title',
        'help_title',
        'help_subtitle',
        'html_text_bottom',
        'html_text_top',
        'nearby_title'
    ];

    public function landing()
    {
        return $this->belongsTo(BLP_Landing::class, 'lp_id');
    }

    public function banner_image()
    {
        return $this->belongsTo(SiteImage::class, 'banner_img_id', 'id');
    }
}