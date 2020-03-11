<?php

namespace App\Http\Middleware;

use App\Http\GraphQL\Helpers\MutationResultBuilder;
use Exception;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class AuthenticateLoggedGraphQL
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
          return (new MutationResultBuilder())->addAuthenticationProblem('User not logged in')->send();
        }
        return $next($request);
    }

    protected function throwException() {
      throw new Exception("User must be logged in.");
    }
}
