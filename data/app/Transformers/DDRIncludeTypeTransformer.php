<?php

namespace App\Transformers;

use App\Models\DDRIncludeType;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class DDRIncludeTypeTransformer extends ExtendedTransformer
{
    public function transform(DDRIncludeType $include)
    {
        return [
            'id' => (string) $include->id,
            'desc' => (string) $include->desc
        ];
    }
}