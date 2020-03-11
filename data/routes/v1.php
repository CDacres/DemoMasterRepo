<?php

    require __DIR__.'/v1/internal_insecure.php'; // for housekeeping and tracking tasks that can be called from anywhere

    $app->group(['middleware' => 'is_internal'], function($app) {

        require __DIR__.'/v1/internal_secure.php'; // for housekeeping and tracking tasks that can only be called from other app components

    });

    $app->group(['prefix' => '/api', 'middleware' => ['locale', 'auth:api']], function($app) {

        $app->group(['middleware' => 'is_logged_in_rest'], function($app) {

                require __DIR__.'/v1/non_json.php'; // for all non json requests. Should probably be confined to files?

                $app->group(['middleware' => 'is_admin'], function ($app) {

                    require __DIR__.'/v1/admin_non_json.php'; // requires user to be admin only

                });

            });

        $app->group(['middleware' => 'json'], function($app) {

            $app->group(['middleware' => 'is_logged_in_rest'], function($app) {

                require __DIR__.'/v1/protected.php'; // requires user to be logged in

                $app->group(['middleware' => 'is_admin'], function ($app) {

                    require __DIR__.'/v1/admin.php'; // requires user to be admin only

                });

            });

            require __DIR__.'/v1/public.php'; // open endpointsh
        });

    });
