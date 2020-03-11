<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Cookie_Assignation_Exception___Collection extends Base__Collection
{
    static protected $_staticObjectType = Cookie_Assignation_Exception::class;
}

class Cookie_Assignation_Exception extends Base__Item
{
    protected static $_modelName = Model__cookie_assignation_exception::class;
    protected static $_tableName = 'cookie_assignation_exceptions';
    protected static $_columns = [
        'cookie_id' => [
            'pointer' => 'cookie_id',
            'validations' => 'is_natural'
        ],
        'current_user_id' => [
            'pointer' => 'current_user_id',
            'validations' => 'is_natural'
        ],
        'attempted_user_id' => [
            'pointer' => 'attempted_user_id',
            'validations' => 'is_natural'
        ],
        'context' => [
            'pointer' => 'context',
            'validations' => ''
        ],
        'created_at' => [
            'pointer' => 'created_at',
            'validations' => 'is_date_time'
        ]
    ];
}