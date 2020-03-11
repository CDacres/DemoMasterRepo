<?php

namespace App\Transformers;

use App\Models\Pivots\AssetDDRInclude;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetDDRIncludeTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'ddrinclude_type',
        'asset'
    ];

    public function transform(AssetDDRInclude $pivot)
    {
        return [
            'id' => (string) $pivot->id,
            'include_text' => (string) $pivot->include_text
        ];
    }

    public function includeDdrincludeType(AssetDDRInclude $pivot)
    {
        $include = $pivot->ddrinclude_type;
        return $this->item($include, new DDRIncludeTypeTransformer, 'include_types');
    }

    public function includeAsset(AssetDDRInclude $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}