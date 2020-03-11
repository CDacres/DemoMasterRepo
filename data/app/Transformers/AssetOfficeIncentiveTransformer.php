<?php

namespace App\Transformers;

use App\Models\AssetOfficeIncentive;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetOfficeIncentiveTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['asset'];

    public function transform(AssetOfficeIncentive $incentive)
    {
        return [
            'id' => (string) $incentive->id,
            'discount' => (float) $incentive->discount,
            'months_trigger' => (int) $incentive->months_trigger
        ];
    }

    public function includeAsset(AssetOfficeIncentive $pivot)
    {
        $asset = $pivot->asset;
        return $this->quickItem($asset);
    }
}