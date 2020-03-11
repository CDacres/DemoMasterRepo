<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_Promotion___Collection extends Base__Collection
{
    static protected $_staticObjectType = User_Promotion::class;
}

class User_Promotion extends Base__Item
{
    protected static $_tableName = 'user_promotions';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'promo_id' => [
            'pointer' => 'promo_id',
            'validations' => 'is_natural'
        ],
        'date_started' => [
            'pointer' => 'date_started',
            'validations' => 'is_date_time'
        ],
        'date_expiry' => [
            'pointer' => 'date_expiry',
            'validations' => 'is_date_time'
        ],
        'date_completed' => [
            'pointer' => 'date_completed',
            'validations' => 'is_date_time'
        ]
    ];
}