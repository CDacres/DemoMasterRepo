<?php

namespace App\Transformers;

use App\Models\Pivots\AssetAttribute;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetAttributeTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'attribute',
        'asset'
    ];

    public function transform(AssetAttribute $pivot)
    {
        return ['id' => (string) $pivot->id];
    }

    public function includeAttribute(AssetAttribute $pivot)
    {
        $att = $pivot->attribute;
        return $this->item($att, new AttributeTransformer, 'attributes');
    }

    public function includeAsset(AssetAttribute $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}