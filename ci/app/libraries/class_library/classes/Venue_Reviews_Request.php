<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Venue_Reviews_Request___Collection extends Base__Collection
{
    static protected $_staticObjectType = Venue_Reviews_Request::class;
}

class Venue_Reviews_Request extends Base__Item
{
    protected static $_modelName = Model__venue_reviews_requests::class;
    protected static $_tableName = 'review_audit';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural_no_zero'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'review_token' => [
            'pointer' => 'review_token',
            'validations' => 'alpha_numeric|empty_null'
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
        'email' => [
            'pointer' => 'email',
            'validations' => ''
        ],
        'venue_name' => [
            'pointer' => 'venue_name',
            'validations' => ''
        ]
    ];
    protected static $_wranglers = [
        'created_date' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'created']
        ]
    ];
}