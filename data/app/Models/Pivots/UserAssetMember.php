<?php

namespace App\Models\Pivots;

use App\LaravelExtensions\Model\LegacyModel;

use App\Events\UserAssetMemberCreatingEvent;

class UserAssetMember extends LegacyModel
{
    public $table = 'user_asset_members';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'asset_id',
        'member_type_id',
        'discount',
        'created'
    ];

    protected $dispatchesEvents = ['creating' => UserAssetMemberCreatingEvent::class];
}