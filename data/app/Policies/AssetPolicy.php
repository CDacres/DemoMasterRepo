<?php

namespace App\Policies;

use App\Models\Asset;
use App\Helpers\RolesAndPrivilegesHelper;
use App\LaravelExtensions\Contracts\Authorizable;

class AssetPolicy extends StandardPolicy
{
    public function create(Authorizable $token_user, Asset $asset = null)
    {
        return true;
    }

    public function delete(Authorizable $token_user, Asset $asset = null)
    {
        $privileges = $asset->privileges;
        $user_id = $token_user->id;
        return $privileges->contains(function ($pivot) use ($user_id) {
            return ($pivot->user_id === $user_id) && ($pivot->privileges_mask & RolesAndPrivilegesHelper::DELETE);
        });
    }

    public function update(Authorizable $token_user, Asset $asset = null)
    {
        $privileges = $asset->privileges;
        $user_id = $token_user->id;
        return $privileges->contains(function ($pivot) use ($user_id) {
            return ($pivot->user_id === $user_id) && ($pivot->privileges_mask & RolesAndPrivilegesHelper::UPDATE);
        });
    }
}