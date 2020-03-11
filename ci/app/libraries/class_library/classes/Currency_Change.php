<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Currency_Change___Collection extends Base__Collection
{
    static protected $_staticObjectType = Currency_Change::class;
}

class Currency_Change extends Base__Item
{
    protected static $_tableName = 'currency_change';
    protected static $_columns = [
        'currFrom' => [
            'pointer' => 'currFrom',
            'validations' => ''
        ],
        'currInto' => [
            'pointer' => 'currInto',
            'validations' => ''
        ],
        'rate' => [
            'pointer' => 'rate',
            'validations' => ''
        ]
    ];
}