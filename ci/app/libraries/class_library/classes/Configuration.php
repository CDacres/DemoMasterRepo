<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Configuration___Collection extends Base__Collection
{
    static protected $_staticObjectType = Configuration::class;
}

class Configuration extends Base__Item
{
    const BOARDROOM = 1;

    protected static $_tableName = 'configurations';
    protected static $_columns = ['desc' => ['pointer' => 'desc']];
    protected static $_aliases = ['max_capacity' => ['pointer' => 'max_capacity']];
    protected static $_wranglers = [
        'max_capacity' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'max_capacity'],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];
}