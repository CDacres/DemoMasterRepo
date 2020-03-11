<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AuthenticateLoggedRest extends AuthenticateLogged
{
    protected function throwException() {
      throw new UnauthorizedHttpException("User must be logged in.");
    }
}
