<?php

namespace App\Policies;

use App\LaravelExtensions\Contracts\Authorizable;

class StandardPolicy
{
    public function view(Authorizable $authority)
    {
        return true;
    }

    public function browse(Authorizable $authority)
    {
        return true;
    }

    public function update(Authorizable $authority)
    {
        return $authority->isUser();
    }

    public function create(Authorizable $authority)
    {
        return $authority->isUser();
    }

    public function delete(Authorizable $authority)
    {
        return $authority->isUser();
    }

    public function before(Authorizable $authority, $ability)
    {
        if ($authority->isAdmin())
        {
            return true;
        }
    }
}