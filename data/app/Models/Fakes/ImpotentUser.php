<?php

namespace App\Models\Fakes;

use App\LaravelExtensions\Contracts\Authorizable as AuthorizableContract;
use Illuminate\Foundation\Auth\Access\Authorizable;

class ImpotentUser implements AuthorizableContract
{
    use Authorizable;

    public function isAdmin()
    {
        return false;
    }

    public function isUser()
    {
        return false;
    }

    public function hasEagleVision()
    {
        return false;
    }

    public function isSpoofMode()
    {
        return false;
    }
}
