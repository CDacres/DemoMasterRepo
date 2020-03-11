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

$app->get('/original_image/{token}', 'OriginalImage@get_original_asset_image');
//$app->get('/original_image/site/{token}', 'OriginalImage@get_original_site_image');
$app->get('/deep_storage_image/{image_id}', 'FileBucket@get_original_asset_image');
$app->get('/deep_storage_image/site/{image_id}', 'FileBucket@get_original_site_image');