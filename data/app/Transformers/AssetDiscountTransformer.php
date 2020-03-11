<?php

namespace App\Transformers;

use App\Models\Booking\AssetDiscount;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetDiscountTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['asset'];

    public function transform(AssetDiscount $discount)
    {
        return [
            'id' => (string) $discount->id,
            'discount' => (float) $discount->discount
        ];
    }

    public function includeAsset(AssetDiscount $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}