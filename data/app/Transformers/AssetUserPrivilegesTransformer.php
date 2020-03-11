<?php

namespace App\Transformers;

use App\Models\Pivots\AssetUserPrivilege;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class AssetUserPrivilegesTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['user'];

    public function transform(AssetUserPrivilege $aup)
    {
        return [
            'id' => (string) $aup->id,
            'user_id' => (string) $aup->user_id,
            'asset_id' => (string) $aup->asset_id,
            'privileges_mask' => $aup->privileges_mask
        ];
    }

    public function includeUser(AssetUserPrivilege $aup)
    {
        $user = $aup->user;
        return $this->item($user, new UsersTransformer($this->contextUser), 'users');
    }
}