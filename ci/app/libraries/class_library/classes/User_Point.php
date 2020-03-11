<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_Point___Collection extends Base__Collection
{
    static protected $_staticObjectType = User_Point::class;
}

class User_Point extends Base__Item
{
    protected static $_tableName = 'user_points';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'promo_id' => [
            'pointer' => 'promo_id',
            'validations' => 'is_natural'
        ],
        'amount' => [
            'pointer' => 'amount',
            'validations' => 'is_natural'
        ],
        'dateTime' => [
            'pointer' => 'dateTime',
            'validations' => 'is_date_time'
        ]
    ];
    protected static $_aliases = ['total_amount' => ['pointer' => 'total_amount']];
}