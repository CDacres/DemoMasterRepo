<?php

namespace App\Transformers;

use App\Models\SiteImage;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class SiteImageTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['type'];

    public function transform(SiteImage $image)
    {
        return [
            'id' => (string) $image->id,
            'name' => (string) $image->name,
            'large_url' => (string) $image->large_url,
            'created' => (string) $image->created_at
        ];
    }

    public function includeType(SiteImage $image)
    {
        $type = $image->type;
        return $this->item($type, new ImageTypeTransformer, 'image_types');
    }
}