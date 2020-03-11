<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_UsageSuperset_Language___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_UsageSuperset_Language::class;
}

class Runt_UsageSuperset_Language extends Base__Item
{
    protected static $_tableName = 'usage_superset_language';
    protected static $_columns = [
        'lang_code' => ['pointer' => 'lang_code'],
        'usage_superset_id' => ['pointer' => 'usageSuperset_id'],
        'alias' => ['pointer' => 'alias'],
        'desc' => ['pointer' => 'desc'],
        'short_desc' => ['pointer' => 'short_desc'],
        'item_name' => ['pointer' => 'item_name'],
        'collective_title' => ['pointer' => 'collective_title'],
        'default' => [
            'pointer' => 'default',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'usage_id' => [
            'pointer' => 'usage_id',
            'validations' => ''
        ]
    ];
    protected static $_objects = ['usages' => Usage___Collection::class];
}