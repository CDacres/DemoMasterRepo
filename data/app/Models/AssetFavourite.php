<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

use App\Events\AssetFavouriteCreatingEvent;

class AssetFavourite extends LegacyModel
{
    public $timestamps = false;
    public $table = 'asset_favourites';

    protected $fillable = [
        'asset_id',
        'user_id',
        'created'
    ];

    protected $dispatchesEvents = ['creating' => AssetFavouriteCreatingEvent::class];
}