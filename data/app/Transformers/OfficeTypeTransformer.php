<?php

namespace App\Transformers;

use App\Models\OfficeType;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class OfficeTypeTransformer extends ExtendedTransformer
{
    public function transform(OfficeType $type)
    {
        return [
            'id' => (string) $type->id,
            'name' => (string) $type->name
        ];
    }
}