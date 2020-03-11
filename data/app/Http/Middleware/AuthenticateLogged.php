<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

abstract class AuthenticateLogged
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest())
        {
            $this->throwException();
        }
        return $next($request);
    }

    abstract protected function throwException();
}
