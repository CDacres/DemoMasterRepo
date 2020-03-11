<?php
namespace App\Models\Landing;

use App\LaravelExtensions\Model\LegacyModel;

class LandingPageUrl extends LegacyModel
{
    public $table = 'landing_page_urls';
    public $timestamps = false;

    public function scopePreferred($query)
    {
        return $query->where('preferred', 1);
    }
}