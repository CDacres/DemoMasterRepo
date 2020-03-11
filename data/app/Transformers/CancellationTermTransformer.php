<?php

namespace App\Transformers;

use App\Models\Booking\CancellationTerm;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class CancellationTermTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['asset'];

    public function transform(CancellationTerm $term)
    {
        return [
            'id' => (string) $term->id,
            'percentage' => (float) $term->percentage,
            'notice_days' => (int) $term->notice_days
        ];
    }

    public function includeAsset(CancellationTerm $term)
    {
        $asset = $term->asset;
        return $this->quickItem($asset);
    }
}