<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Landing_Page_Url___Collection extends Base__Collection
{
    static protected $_staticObjectType = Landing_Page_Url::class;
}

class Landing_Page_Url extends Base__Item
{
    protected static $_tableName = 'landing_page_urls';
    protected static $_columns = [
        'landing_page_language_id' => [
            'pointer' => 'landing_page_language_id',
            'validations' => 'is_natural'
        ],
        'url' => [
            'pointer' => 'url',
            'validations' => ''
        ],
        'preferred' => [
            'pointer' => 'preferred',
            'validations' => 'is_boolean'
        ]
    ];
}