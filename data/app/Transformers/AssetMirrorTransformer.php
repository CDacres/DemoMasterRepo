<?php

namespace App\Transformers;

use App\Models\Pivots\AssetMirror;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetMirrorTransformer extends ExtendedTransformer
{
    public function transform(AssetMirror $mirror)
    {
        return [
            'id' => (string) $mirror->id,
            'asset_id' => (int) $mirror->asset_id,
            'mirror_id' => (int) $mirror->mirror_id,
            'simularity' => (int) $mirror->simularity
        ];
    }
}