<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_User_Asset_Privilege___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_User_Asset_Privilege::class;
}

class Runt_User_Asset_Privilege extends Base__Item
{
    const APPROVAL = 1;
    const MAKE_BOOKING = 1;
    const UPDATE = 2;
    const INSERTCHILD = 4;
    const NOTIFY = 8;
    const DELETE = 16;

    protected static $_modelName = Model__user_asset_privileges::class;
    protected static $_tableName = 'user_asset_privileges';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'privileges_mask' => [
            'pointer' => 'privileges_mask',
            'validations' => 'is_natural'
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
            'validations' => ''
        ]
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

    public static function get_top_privilege()
    {
        return self::APPROVAL | self::MAKE_BOOKING | self::UPDATE | self::INSERTCHILD | self::NOTIFY | self::DELETE;
    }
}