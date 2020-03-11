<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Profile___Collection extends Base__Collection
{
    static protected $_staticObjectType = Profile::class;
}

class Profile extends Base__Item
{
    protected static $_modelName = Model__profiles::class;
    protected static $_tableName = 'profiles';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural_no_zero|required'
        ],
        'first_name' => [
            'pointer' => 'Fname',
            'validations' => ''
        ],
        'last_name' => [
            'pointer' => 'Lname',
            'validations' => ''
        ],
        'phone_number' => [
            'pointer' => 'phnum',
            'validations' => 'is_phone_number'
        ],
        'phone_number_search' => [
            'pointer' => 'phnum_search',
            'validations' => 'is_phone_number'
        ]
    ];
    protected static $_aliases = [
        'email' => [
            'pointer' => 'email',
            'validations' => ''
        ],
        'email_status' => [
            'pointer' => 'email_status',
            'validations' => ''
        ],
        'hubspot_id' => [
            'pointer' => 'hubspot_id',
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
        ],
        'full_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_full_name']]
        ],
        'phone_number' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'phone_number',
                'hubspot_id' => 'hubspot_id'
            ]
        ],
        'email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'email',
                'email_status' => 'email_status',
                'hubspot_id' => 'hubspot_id'
            ]
        ]
    ];

    protected function _full_name()
    {
        return $this->wrangle('full_name')->formatted();
    }
}