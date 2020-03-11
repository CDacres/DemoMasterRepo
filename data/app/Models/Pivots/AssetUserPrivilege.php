<?php

namespace App\Models\Pivots;

use App\Models\User;
use App\Models\Asset;
use App\LaravelExtensions\Model\LegacyModel;

class AssetUserPrivilege extends LegacyModel
{
    public $timestamps = false;
    public $table = 'user_asset_privileges';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}