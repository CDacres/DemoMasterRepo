<?php

namespace App\Transformers;

use App\Models\Configuration;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class ConfigurationTransformer extends ExtendedTransformer
{
    public function transform(Configuration $conf)
    {
        return [
            'id' => (string) $conf->id,
            'name' => (string) $conf->name
        ];
    }
}