<?php

namespace App\Transformers;

use Illuminate\Database\Eloquent\Model;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class DefaultTransformer extends ExtendedTransformer
{
    public function transform(Model $model)
    {
        return $model->toArray();
    }
}