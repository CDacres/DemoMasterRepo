<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_User_Asset_Member___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_User_Asset_Member::class;
}

class Runt_User_Asset_Member extends Base__Item
{
    protected static $_modelName = Model__user_asset_members::class;
    protected static $_tableName = 'user_asset_members';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'discount' => [
            'pointer' => 'discount',
            'validations' => 'is_numeric_positive|more_than_equal[0]|less_than_equal[100]'
        ],
        'member_type' => [
            'pointer' => 'member_type_id',
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
        'new_price' => [
            'pointer' => 'new_price',
            'validations' => 'is_numeric_positive'
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
}