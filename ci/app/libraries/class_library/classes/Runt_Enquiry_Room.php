<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Enquiry_Room___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Enquiry_Room::class;
}

class Runt_Enquiry_Room extends Base__Item
{
    protected static $_modelName = Model__enquiry_rooms::class;
    protected static $_tableName = 'enquiries_rooms';
    protected static $_columns = [
        'enquiry_id' => [
            'pointer' => 'enquiry_id',
            'validations' => 'is_natural'
        ],
        'room_id' => [
            'pointer' => 'room_id',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'room_asset_id' => [
            'pointer' => 'room_asset_id',
            'validations' => 'is_natural'
        ],
        'title' => [
            'pointer' => 'title',
            'validations' => ''
        ],
        'room_enabled' => [
            'pointer' => 'room_enabled',
            'validations' => 'is_boolean'
        ],
        'venue_id' => [
            'pointer' => 'venue_id',
            'validations' => 'is_natural'
        ],
        'venue_asset_id' => [
            'pointer' => 'venue_asset_id',
            'validations' => 'is_natural'
        ],
        'venue_name' => [
            'pointer' => 'venue_name',
            'validations' => ''
        ],
        'venue_website' => [
            'pointer' => 'venue_website',
            'validations' => ''
        ],
        'venue_city' => [
            'pointer' => 'venue_city',
            'validations' => ''
        ],
        'venue_country' => [
            'pointer' => 'venue_country',
            'validations' => ''
        ],
        'venue_country_code' => [
            'pointer' => 'venue_country_code',
            'validations' => ''
        ],
        'venue_live_bookings' => [
            'pointer' => 'venue_live_bookings',
            'validations' => 'is_boolean'
        ],
        'venue_agree_to_list' => [
            'pointer' => 'venue_agree_to_list',
            'validations' => 'is_boolean'
        ],
        'venue_enabled' => [
            'pointer' => 'venue_enabled',
            'validations' => 'is_boolean'
        ],
        'company_name' => [
            'pointer' => 'company_name',
            'validations' => 'alpha_dash'
        ],
        'usage_superset_alias' => [
            'pointer' => 'usage_superset_alias',
            'validations' => ''
        ],
        'main_user_id' => [
            'pointer' => 'main_user_id',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_hubspot_id' => [
            'pointer' => 'main_user_hubspot_id',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_firstname' => [
            'pointer' => 'main_user_firstname',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_lastname' => [
            'pointer' => 'main_user_lastname',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_email' => [
            'pointer' => 'main_user_email',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_email_status' => [
            'pointer' => 'main_user_email_status',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_phone' => [
            'pointer' => 'main_user_phone',
            'validations' => '',
            'access' => 'private'
        ],
        'main_user_role_id' => [
            'pointer' => 'main_user_role_id',
            'validations' => '',
            'access' => 'private'
        ]
    ];
    protected static $_wranglers = [
        'venue_website' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['website' => 'venue_website']
        ],
        'main_contact_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'main_user_firstname',
                'last_name' => 'main_user_lastname'
            ]
        ],
        'main_user_phone' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'phone' => 'main_user_phone',
                'hubspot_id' => 'main_user_hubspot_id'
            ]
        ],
        'main_user_email' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => [
                'email' => 'main_user_email',
                'email_status' => 'main_user_email_status',
                'hubspot_id' => 'main_user_hubspot_id'
            ]
        ],
        'main_user_add_task' => [
            'object' => 'Wrangler__Link',
            'data_bindings' => ['hubspot_id' => 'main_user_hubspot_id']
        ]
    ];
}