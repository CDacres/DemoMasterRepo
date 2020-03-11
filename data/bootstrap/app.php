<?php

if (!defined('LOCAL_PATH_ROOT')) {
    define("LOCAL_PATH_ROOT", realpath(__DIR__.'/../'));
}

require_once LOCAL_PATH_ROOT.'/vendor/autoload.php';

putenv("SITE_URL=https://www." . env('SITE_NAME'));
putenv("DATA_API_URL=https://api." . env('SITE_NAME'));
putenv("API_DOMAIN=api." . env('SITE_NAME'));
putenv("ANALYTICS_API_URL=https://analytics." . env('SITE_NAME'));


/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Illuminate\Foundation\Application(
    LOCAL_PATH_ROOT
);

//for baum nested hierarchy
$app->instance('path.base', $app->path());
$app->instance('path.database', $app->databasePath());

$app->instance('path.config', app()->basePath() . DIRECTORY_SEPARATOR . 'config');
$app->instance('path.storage', app()->basePath() . DIRECTORY_SEPARATOR . 'storage');

if (!class_exists('ChannelLog', false)) {
    class_alias(\App\Contracts\Facades\ChannelLog::class, 'ChannelLog');
}

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton('Illuminate\Contracts\Routing\ResponseFactory', function ($app) {
    return new \Illuminate\Routing\ResponseFactory(
        $app['Illuminate\Contracts\View\Factory'],
        $app['Illuminate\Routing\Redirector']
    );
});

$app->bind('chanellog', 'App\Helpers\ChannelWriter');

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

/* $app->routeMiddleware([ */
/* ]); */
/* $app->routeMiddleware([ */
/* ]); */
/* $app->routeMiddleware([ */
/* ]); */
/* $app->routeMiddleware([ */
/* ]); */
/* $app->routeMiddleware([ */
/* ]); */
/* $app->routeMiddleware([ */
/* ]); */
/* $app->middleware([ */
/* ]); */
/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

/* $app->register(App\Providers\AuthServiceProvider::class); */
/* $app->register(); */
/* $app->register(); */
/* $app->register(); */
/* $app->register(); */
/* $app->register(App\Providers\AppServiceProvider::class); */

/* $app->configure('mail'); */
/* $app->configure('services'); */
/* $app->configure('translator'); */
/* $app->configure('cache'); */
/* $app->configure('flysystem'); */


/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/

return $app;
