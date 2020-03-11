<?php

namespace App\Policies;

use Illuminate\Database\Eloquent\Model;
use App\LaravelExtensions\Contracts\Authorizable;

class UserPolicy extends StandardPolicy
{
    public function view(Authorizable $token_user, Model $subject_user = null)
    {
        return $token_user->isUser() && ($token_user->id === $subject_user->id);
    }
}