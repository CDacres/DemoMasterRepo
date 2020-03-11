<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class Authenticate
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        if ($guard === "api")
        {
            $user = $request->user();
            if ($user)
            {
                $claims = $this->auth->guard("api")->payload()->getClaims();
                $this->_add_claims_to_user($user, $claims);
            }
        }
        return $next($request);
    }

    private function _add_claims_to_user($user, $claims)
    {
        $spoof_admin_claim = $claims->get('spoof_admin_id', null);
        if (!is_null($spoof_admin_claim))
        {
            $user->addAdminSpoofIdToUser($spoof_admin_claim->getValue());
        }
    }
}
