<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Financial_Entity___Collection extends Base__Collection
{
    static protected $_staticObjectType = Financial_Entity::class;
}

class Financial_Entity extends Base__Item
{
    protected static $_modelName = Model__financial_entities::class;
    protected static $_tableName = 'financial_entities';
    protected static $_columns = [
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'address' => [
            'pointer' => 'address',
            'validations' => ''
        ],
        'vat_number' => [
            'pointer' => 'vat_number',
            'validations' => ''
        ],
        'financial_data' => [
            'pointer' => 'financial_data',
            'validations' => ''
        ],
        'account_user' => [
            'pointer' => 'account_user',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'account_user_hubspot_id' => [
            'pointer' => 'account_user_hubspot_id',
            'validations' => ''
        ],
        'account_user_firstname' => [
            'pointer' => 'account_user_firstname',
            'validations' => ''
        ],
        'account_user_lastname' => [
            'pointer' => 'account_user_lastname',
            'validations' => ''
        ],
        'account_user_email' => [
            'pointer' => 'account_user_email',
            'validations' => ''
        ],
        'account_user_email_status' => [
            'pointer' => 'account_user_email_status',
            'validations' => ''
        ],
        'account_user_phone' => [
            'pointer' => 'account_user_phone',
            'validations' => ''
        ]
    ];
    protected static $_wranglers = [
        'account_user_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'account_user_firstname',
                'last_name' => 'account_user_lastname'
            ]
        ],
        'account_user_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'account_user_phone',
                'hubspot_id' => 'account_user_hubspot_id'
            ]
        ],
        'account_user_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'account_user_email',
                'email_status' => 'account_user_email_status',
                'hubspot_id' => 'account_user_hubspot_id'
            ]
        ],
        'financial_data' => [
            'object' => 'Wrangler__Json',
            'data_bindings' => ['data' => 'financial_data']
        ],
    ];
    protected static $_objects = [
        'venues' => Venue___Collection::class,
        'contact_details' => Profile___Collection::class
    ];
}