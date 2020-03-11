<?php

namespace App\Policies;

use App\Models\AssetImage;
use App\LaravelExtensions\Contracts\Authorizable;

class AssetImagePolicy extends StandardPolicy
{
    public function delete(Authorizable $token_user, AssetImage $image = null)
    {
        $asset = $image->asset;
        return $token_user->can('update', $asset);
    }

    public function update(Authorizable $token_user, AssetImage $image = null)
    {
        $asset = $image->asset;
        return $token_user->can('update', $asset);
    }
}