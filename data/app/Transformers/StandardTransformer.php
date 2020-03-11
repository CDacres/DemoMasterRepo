<?php

namespace App\Transformers;

use stdClass;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class StandardTransformer extends ExtendedTransformer
{
    public function transform(stdClass $class)
    {
        return (array) $class;
    }
}