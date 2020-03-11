<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class AuthenticateInternal
{
    public function handle($request, Closure $next)
    {
        if (!($request->input('api_token') && $request->input('api_token') === env('DATA_API_KEY')))
        {
            return response('Unauthorized.', 401);
        }
        $user = User::find(env('AUTO_ADMIN_ID'));
        $request->merge(['user' => $user ]);
        $request->setUserResolver(function () use ($user) {
            return $user;
        });
        return $next($request);
    }
}