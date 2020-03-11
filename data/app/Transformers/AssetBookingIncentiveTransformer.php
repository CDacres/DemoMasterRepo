<?php

namespace App\Transformers;

use App\Models\Booking\AssetBookingIncentive;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetBookingIncentiveTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['asset'];

    public function transform(AssetBookingIncentive $incentive)
    {
        return [
            'id' => (string) $incentive->id,
            'discount' => (float) $incentive->discount,
            'bookings_trigger' => (int) $incentive->bookings_trigger
        ];
    }

    public function includeAsset(AssetBookingIncentive $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}