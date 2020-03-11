<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Marketing_Channel___Collection extends Base__Collection
{
    static protected $_staticObjectType = Marketing_Channel::class;
}

class Marketing_Channel extends Base__Item
{
    const INTERNAL = 1;
    const DIRECT = 2;
    const PAID = 3;
    const ORGANIC = 4;
    const REFERRAL = 5;

    protected static $_tableName = 'marketing_channels';
    protected static $_columns = [
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ]
    ];
}