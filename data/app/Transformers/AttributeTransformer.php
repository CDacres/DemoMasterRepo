<?php

namespace App\Transformers;

use App\Models\Attribute;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AttributeTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['asset_attributes'];

    public function transform(Attribute $att)
    {
        return [
            'id' => (string) $att->id,
            'name' => (string) $att->name
        ];
    }

    public function includeAssetAttribute(Attribute $pivot)
    {
        $att = $pivot->asset_attributes;
        return $this->item($att, new AssetAttributeTransformer, 'asset_attributes');
    }
}