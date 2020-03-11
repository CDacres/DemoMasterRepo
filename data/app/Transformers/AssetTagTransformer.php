<?php

namespace App\Transformers;

use App\Models\Pivots\AssetTag;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetTagTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'tag',
        'asset'
    ];

    public function transform(AssetTag $pivot)
    {
        return [
            'id' => (string) $pivot->id,
            'ranking' => (int) $pivot->ranking
        ];
    }

    public function includeTag(AssetTag $pivot)
    {
        $tag = $pivot->tag;
        return $this->item($tag, new TagTransformer, 'tags');
    }

    public function includeAsset(AssetTag $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}