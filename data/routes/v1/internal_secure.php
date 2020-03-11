<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/mail/daily', 'Mail@daily');
$app->get('/mail/morning', 'Mail@morning');
$app->get('/mail/afternoon', 'Mail@afternoon');
//$app->get('/tagging/remunge', 'Tags@remungeTagStructure');

//Auth
$app->post('/auth/anonymous_register', 'AuthController@anonymousRegister');
$app->post('/auth/token', 'AuthController@tokenById'); // !!! This is a fully secured endpoint for a reason. Do not lower security without auditing the controller method, since any claim as admin is honoured.

//Henry
$app->post('/api/henry', 'Henrys@create');
$app->post('/api/henry/purge', 'Henrys@purge');