<?php

namespace App\Providers;

use Tymon\JWTAuth\JWTAuth;
use Dingo\Api\Auth\Auth as DingoAuth;
use Illuminate\Support\ServiceProvider;
use Dingo\Api\Auth\Provider\JWT as JWTProvider;
use App\Providers\TelescopeServiceProvider;

class JWTServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
    $this->app->extend('api.auth', function (DingoAuth $auth) {
      $auth->extend('jwt', function ($app) {
        return new JWTProvider($app[JWTAuth::class]);
      });
      return $auth;
    });
  }
}
