<?php
namespace App\LaravelExtensions\Contracts;

use Illuminate\Contracts\Auth\Access\Authorizable as LaravelAuthorizable;

interface Authorizable extends LaravelAuthorizable
{
    public function isAdmin();
    public function isUser();
    public function hasEagleVision();
}