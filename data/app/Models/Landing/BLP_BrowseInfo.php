<?php

namespace App\Models\Landing;

use App\LaravelExtensions\Model\MyModel;
use App\Models\SiteImage;

class BLP_BrowseInfo extends MyModel
{
    public $table = 'blp_browse_info';

    protected $fillable = [
        'browse_id',
        'banner_img',
        'banner_title',
        'banner_button',
        'banner_text',
        'banner_text_color',
        'card_title',
        'card_subtitle',
        'help_title',
        'help_subtitle',
        'html_text_bottom',
        'html_text_top',
        'nearby_title'
    ];

    public function browse()
    {
        return $this->belongsTo(BLP_Browse::class, 'browse_id');
    }

    public function banner_image()
    {
        return $this->belongsTo(SiteImage::class, 'banner_img_id', 'id');
    }
}