<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Currency___Collection extends Base__Collection
{
    static protected $_staticObjectType = Currency::class;
}

class Currency extends Base__Item
{
    protected static $_tableName = 'currency';
    protected static $_columns = [
        'id' => ['pointer' => 'code'],
        'code' => ['pointer' => 'code'],
        'name' => ['pointer' => 'name'],
        'left_symbol' => ['pointer' => 'symbol_left'],
        'right_symbol' => ['pointer' => 'symbol_right'],
        'default' => ['pointer' => 'default']
    ];
}