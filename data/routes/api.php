<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v0', ['namespace' => 'App\Http\Controllers\VersionZero', 'middleware' => 'api.throttle'], function ($app) {

  require __DIR__.'/../routes/v0.php';
   
});

$api->version('v1', ['namespace' => 'App\Http\Controllers\VersionOne', 'middleware' => 'api.throttle'], function ($app) {

  require __DIR__.'/../routes/v1.php';

});

