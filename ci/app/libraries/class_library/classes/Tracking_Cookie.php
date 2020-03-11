<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Tracking_Cookie___Collection extends Base__Collection
{
    static protected $_staticObjectType = Tracking_Cookie::class;
}

class Tracking_Cookie extends Base__Item
{
    protected static $_modelName = Model__tracking_cookies::class;
    protected static $_tableName = 'tracking_cookies';
    protected static $_columns = [
        'token' => [
            'pointer' => 'token',
            'validations' => 'alpha_numeric|required'
        ],
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural|empty_null'
        ],
        'ga_client_id' => [
            'pointer' => 'ga_client_id',
            'validations' => 'alpha_dash_dot|empty_null'
        ],
        'is_admin' => [
            'pointer' => 'is_admin',
            'validations' => 'is_boolean'
        ],
        'fi_ip_address' => [
            'pointer' => 'fi_ip_address',
            'validations' => 'valid_ip'
        ],
        'fi_session_id' => [
            'pointer' => 'fi_session_id',
            'validations' => 'alpha_numeric|required'
        ],
        'fi_language' => [
            'pointer' => 'fi_language',
            'validations' => 'empty_null'
        ],
        'fi_country' => [
            'pointer' => 'fi_country',
            'validations' => 'empty_null'
        ],
        'fi_source' => [
            'pointer' => 'fi_source',
            'validations' => 'empty_null'
        ],
        'fi_source_url' => [
            'pointer' => 'fi_source_url',
            'validations' => 'empty_null'
        ],
        'fi_medium' => [
            'pointer' => 'fi_medium',
            'validations' => 'empty_null'
        ],
        'fi_landing_page' => [
            'pointer' => 'fi_landing_page',
            'validations' => 'empty_null'
        ],
        'fi_date' => [
            'pointer' => 'fi_date',
            'validations' => 'is_date_time|required'
        ],
        'li_session_id' => [
            'pointer' => 'li_session_id',
            'validations' => 'alpha_numeric|required'
        ],
        'li_source' => [
            'pointer' => 'li_source',
            'validations' => 'empty_null'
        ],
        'li_source_url' => [
            'pointer' => 'li_source_url',
            'validations' => 'empty_null'
        ],
        'li_medium' => [
            'pointer' => 'li_medium',
            'validations' => 'empty_null'
        ],
        'li_landing_page' => [
            'pointer' => 'li_landing_page',
            'validations' => 'empty_null'
        ],
        'li_date' => [
            'pointer' => 'li_date',
            'validations' => 'is_date_time|required'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];

    public function has_user_id()
    {
        return !$this->is_null('user_id');
    }
}