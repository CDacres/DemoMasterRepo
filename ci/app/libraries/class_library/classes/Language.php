<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Language___Collection extends Base__Collection
{
    static protected $_staticObjectType = Language::class;
}

class Language extends Base__Item
{
    protected static $_tableName = 'language';
    protected static $_columns = [
        'id' => ['pointer' => 'code'],
        'code' => ['pointer' => 'code'],
        'name' => ['pointer' => 'name'],
        'default' => ['pointer' => 'default']
    ];
}