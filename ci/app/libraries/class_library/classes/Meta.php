<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Meta extends Base__Item
{
    protected static $_tableName = 'metas';
    protected static $_columns = [
        'controller_name' => ['pointer' => 'controller_name'],
        'method_name' => ['pointer' => 'method_name'],
        'lang_code' => ['pointer' => 'lang_code'],
        'title' => ['pointer' => 'title'],
        'meta_description' => ['pointer' => 'meta_description'],
        'meta_keyword' => ['pointer' => 'meta_keyword'],
        'meta_og_type' => ['pointer' => 'meta_og_type'],
        'meta_og_title' => ['pointer' => 'meta_og_title'],
        'meta_og_image' => ['pointer' => 'meta_og_image'],
        'meta_og_description' => ['pointer' => 'meta_og_description'],
        'meta_og_url' => ['pointer' => 'meta_og_url'],
        'meta_og_latitude' => ['pointer' => 'meta_og_latitude'],
        'meta_og_longitude' => ['pointer' => 'meta_og_longitude'],
        'meta_twitter_title' => ['pointer' => 'meta_twitter_title'],
        'meta_twitter_description' => ['pointer' => 'meta_twitter_description'],
        'meta_twitter_image' => ['pointer' => 'meta_twitter_image'],
        'meta_twitter_card' => ['pointer' => 'meta_twitter_card']
    ];
}