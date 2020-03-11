<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AuthenticateAdmin
{
    public function handle($request, Closure $next)
    {
        if (!$request->user()->hasEagleVision())
        {
            throw new UnauthorizedHttpException("Invalid admin token.");
        }
        return $next($request);
    }
}
