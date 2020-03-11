<?php

namespace App\Transformers;

use App\Models\Landing\LandingPageLanguage;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class LandingPageLangTransformer extends ExtendedTransformer
{
    protected $defaultIncludes = ['landing_page_url'];

    public function transform(LandingPageLanguage $lang)
    {
        return [
            'id' => (string) $lang->id,
            'lang_code' => (string) $lang->lang_code,
            'desc_text' => (string) $lang->desc_text,
            'desc_text_top' => (string) $lang->desc_text_top,
            'h1' => (string) $lang->h1,
            'h2' => (string) $lang->h2,
            'carousel_title' => (string) $lang->carousel_title,
            'meta_title' => (string) $lang->meta_title,
            'meta_desc' => (string) $lang->meta_desc,
            'meta_keyword' => (string) $lang->meta_keyword
        ];
    }

    public function includeLandingPageUrl(LandingPageLanguage $lang)
    {
        $url = $lang->landing_page_url;
        return $this->collection($url, new LandingPageUrlTransformer, 'landing_page_url');
    }
}