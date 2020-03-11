<?php

namespace App\Models\Search;
use App\Models\RoomAsset;

class RoomResult extends AssetResult
{
    public function asset()
    {
        return $this->hasOne(RoomAsset::class, 'id', 'asset_id');
    }

    public function scopeWithAssetDetails($query)
    {
        return parent::scopeWithAssetDetails($query)->with([
            'asset.details',
            'asset.details.venue'
        ]);
    }
}