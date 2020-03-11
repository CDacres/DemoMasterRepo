<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Promotion___Collection extends Base__Collection
{
    static protected $_staticObjectType = Promotion::class;
}

class Promotion extends Base__Item
{
    protected static $_tableName = 'promotions';
    protected static $_columns = [
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ]
    ];
}