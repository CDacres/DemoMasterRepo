<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Business_User___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Business_User::class;
}

class Runt_Business_User extends Base__Item
{
    protected static $_modelName = Model__business_users::class;
    protected static $_tableName = 'business_users';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];
    protected static $_aliases = [
        'first_name' => [
            'pointer' => 'first_name',
            'validations' => ''
        ],
        'last_name' => [
            'pointer' => 'last_name',
            'validations' => ''
        ],
        'phone_number' => [
            'pointer' => 'phone_number',
            'validations' => ''
        ],
        'email' => [
            'pointer' => 'email',
            'validations' => 'is_email'
        ],
    ];
    protected static $_wranglers = [
        'full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'first_name',
                'last_name' => 'last_name'
            ]
        ]
    ];
}