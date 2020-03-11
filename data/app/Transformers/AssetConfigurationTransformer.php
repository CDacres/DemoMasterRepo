<?php

namespace App\Transformers;

use App\Models\Pivots\AssetConfiguration;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetConfigurationTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'configuration',
        'asset'
    ];

    public function transform(AssetConfiguration $pivot)
    {
        return [
            'id' => (string) $pivot->id,
            'max_capacity' => (int) $pivot->max_capacity
        ];
    }

    public function includeConfiguration(AssetConfiguration $pivot)
    {
        $conf = $pivot->configuration;
        return $this->item($conf, new ConfigurationTransformer, 'configurations');
    }

    public function includeAsset(AssetConfiguration $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}