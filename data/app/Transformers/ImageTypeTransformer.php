<?php

namespace App\Transformers;

use App\Models\ImageType;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class ImageTypeTransformer extends ExtendedTransformer
{
    public function transform(ImageType $type)
    {
        return [
            'id' => (string) $type->id,
            'name' => (string) $type->name
        ];
    }
}