<?php

namespace App\Transformers;

use App\Models\Pivots\ImageTag;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class ImageTagTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'tag',
        'image'
    ];

    public function transform(ImageTag $pivot)
    {
        return [
            'id' => (string) $pivot->id,
        ];
    }

    public function includeTag(ImageTag $pivot)
    {
        $tag = $pivot->tag;
        return $this->item($tag, new TagTransformer, 'tags');
    }

    public function includeAsset(ImageTag $pivot)
    {
        $image = $pivot->image;
        return $this->quickItem($image);
    }
}