<?php

namespace App\Policies;
use App\LaravelExtensions\Contracts\Authorizable;

class AmenityPolicy extends StandardPolicy
{
    public function see_disabled(Authorizable $token_user)
    {
        return $token_user->isAdmin();
    }
}