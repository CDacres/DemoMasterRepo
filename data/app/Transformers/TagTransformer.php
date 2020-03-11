<?php

namespace App\Transformers;

use App\Models\Tags\Tag;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class TagTransformer extends ExtendedTransformer
{
    public function transform(Tag $tag)
    {
        return [
            'id' => (string) $tag->id,
            'name' => (string) $tag->name
        ];
    }
}