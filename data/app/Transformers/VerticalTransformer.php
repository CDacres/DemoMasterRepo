<?php

namespace App\Transformers;

use App\Models\Verticals\Vertical;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class VerticalTransformer extends ExtendedTransformer
{
    public function transform(Vertical $vertical)
    {
        return [
            'id' => (string) $vertical->id,
            'name' => (string) $vertical->name
        ];
    }
}