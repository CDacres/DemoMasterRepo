<?php

    $app->group(['prefix' => '/rpc', 'middleware' => 'is_internal'], function() {
      
      // nothing here yet

    });

    $app->group(['prefix' => '/rest', 'middleware' => ['locale', 'auth:api']], function($app) {

        $app->group(['middleware' => 'json'], function($app) {

            $app->group(['middleware' => 'is_logged_in_rest'], function($app) {

                require __DIR__.'/v0/protected.php'; // requires user to be logged in

                $app->group(['middleware' => 'is_admin'], function () {

                    require __DIR__.'/v0/admin.php'; // requires user to be admin only

                });

            });

            require __DIR__.'/v0/public.php'; // open endpoints

        });

    });
  
