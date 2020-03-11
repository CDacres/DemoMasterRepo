<?php

namespace App\Transformers;

use App\Models\Landing\LandingPage;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class LandingPageTransformer extends ExtendedTransformer
{
    protected $defaultIncludes = [
        'landing_page_lang',
        'location'
    ];

    public function transform(LandingPage $page)
    {
        return [
            'id' => (string) $page->id,
            'attribute_id' => (string) $page->attribute_id,
            'location_id' => (int) $page->location_id,
            'tag_id' => (int) $page->tag_id,
            'redirect_id' => (int) $page->redirect_id,
            'canonical' => (int) $page->canonical,
            'search_redirect' => (int) $page->search_redirect
        ];
    }

    public function includeLandingPageLang(LandingPage $landingPage)
    {
        $lang = $landingPage->landing_page_lang;
        return $this->collection($lang, new LandingPageLangTransformer, 'landing_page_lang');
    }

    public function includeLocation(LandingPage $landingPage)
    {
        $ocation = $landingPage->location;
        return $this->item($ocation, new LocationTransformer, 'location');
    }
}