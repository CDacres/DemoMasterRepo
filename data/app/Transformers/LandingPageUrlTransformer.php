<?php

namespace App\Transformers;

use App\Models\Landing\LandingPageUrl;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class LandingPageUrlTransformer extends ExtendedTransformer
{
    public function transform(LandingPageUrl $url)
    {
        return [
            'id' => (string) $url->id,
            'url' => (string) $url->url,
            'preferred' => (bool) $url->preferred
        ];
    }
}