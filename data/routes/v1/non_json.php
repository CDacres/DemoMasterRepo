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

//$app->post('/filter_file/', 'Verticals@post_filter_csv');
//$app->post('/vertical_file/', 'Verticals@post_vertical_csv');
//$app->post('/fgc_file/', 'Verticals@post_fgc_csv');
//$app->post('/fg_file/', 'Verticals@post_fg_csv');
//$app->post('/tags_file/', 'Tags@post_tags_csv');

$app->post('/file_bucket', 'FileBucket@upload_file');