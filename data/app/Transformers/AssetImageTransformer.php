<?php

namespace App\Transformers;

use App\Models\AssetImage;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetImageTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'type',
        'configuration'
    ];

    public function transform(AssetImage $image)
    {
        return [
            'id' => (string) $image->id,
            'name' => (string) $image->name,
            'is_featured' => (bool) $image->is_featured,
            'large_url' => (string) $image->large_url,
            'created' => (string) $image->created
        ];
    }

    public function includeType(AssetImage $image)
    {
        $type = $image->type;
        return $this->item($type, new ImageTypeTransformer, 'image_types');
    }

    public function includeConfiguration(AssetImage $image)
    {
        $conf = $image->configuration;
        return $this->quickItem($conf);
    }
}