<?php

namespace App\Policies;

use App\Models\Pivots\AssetAmenity;
use App\Helpers\RolesAndPrivilegesHelper;
use App\LaravelExtensions\Contracts\Authorizable;

class FacilityPolicy extends StandardPolicy
{
    public function update(Authorizable $token_user, AssetAmenity $facility = null)
    {
        $privileges = $facility->asset->privileges;
        return $token_user->isUser() && $privileges->contains(function ($pivot) use ($token_user) {
            return ($pivot->user_id === $token_user->id) && ($pivot->privileges_mask & RolesAndPrivilegesHelper::UPDATE);
        });
    }
}