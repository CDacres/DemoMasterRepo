<?php
namespace App\Models\Landing;

use App\LaravelExtensions\Model\LegacyModel;

use App\Transformers\LandingPageLangTransformer;

class LandingPageLanguage extends LegacyModel
{
    static protected $defaultTransformer = LandingPageLangTransformer::class;
    static protected $defaultSerialisationLabel = 'landing_page_lang';
    public $table = 'landing_page_language';
    public $timestamps = false;

    public function landing_page_url()
    {
        return $this->hasMany(LandingPageUrl::class);
    }

    public function scopeFromLang($query, $lang)
    {
        return $query->where('lang_code', $lang);
    }
}