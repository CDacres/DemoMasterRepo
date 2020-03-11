<?php

namespace App\Transformers;

use App\Models\Asset;

class BaseAssetTransformer extends AssetTransformer
{
    public function transform(Asset $asset)
    {
        return ['id' => (string) $asset->id];
    }
}