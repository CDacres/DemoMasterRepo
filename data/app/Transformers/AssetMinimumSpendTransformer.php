<?php

namespace App\Transformers;

use App\Models\Pivots\AssetMinimumSpend;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetMinimumSpendTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'asset',
        'dining_period'
    ];

    public function transform(AssetMinimumSpend $minSpend)
    {
        return [
            'id' => (string) $minSpend->id,
            'amount' => (float) $minSpend->amount
        ];
    }

    public function includeAsset(AssetMinimumSpend $minSpend)
    {
        $asset = $minSpend->asset;
        return $this->quickItem($asset);
    }

    public function includeDiningPeriod(AssetMinimumSpend $minSpend)
    {
        $period = $minSpend->dining_period;
        return $this->item($period, new DiningPeriodTransformer, 'dining_periods');
    }
}