<?php

namespace App\Transformers;

use App\Models\DiningPeriod;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class DiningPeriodTransformer extends ExtendedTransformer
{
    public function transform(DiningPeriod $period)
    {
        return [
            'id' => (string) $period->id,
            'name' => (string) $period->name
        ];
    }
}