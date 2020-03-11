<?php

namespace App\Transformers;

use App\Models\Pivots\AssetSetMenu;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetSetMenuTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'asset',
        'dining_period'
    ];

    public function transform(AssetSetMenu $menu)
    {
        return [
            'id' => (string) $menu->id,
            'amount' => (float) $menu->amount
        ];
    }

    public function includeAsset(AssetSetMenu $menu)
    {
        $asset = $menu->asset;
        return $this->quickItem($asset);
    }

    public function includeDiningPeriod(AssetSetMenu $menu)
    {
        $period = $menu->dining_period;
        return $this->item($period, new DiningPeriodTransformer, 'dining_periods');
    }
}