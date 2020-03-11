<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class AssetType extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_types';
}