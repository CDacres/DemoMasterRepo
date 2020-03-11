<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Image___Collection extends Base__Collection
{
    static protected $_staticObjectType = Image::class;
}

class Image extends Base__Item
{
    const ASSET = 1;
    const FOOD = 2;

    protected static $_modelName = Model__images::class;
    protected static $_tableName = 'asset_photos';
    protected static $_columns = [
        'subject_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'represents' => [
            'pointer' => 'is_featured',
            'validations' => 'is_boolean'
        ],
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ],
        'configuration_id' => [
            'pointer' => 'configuration_id',
            'validations' => 'is_natural|empty_null'
        ],
        'flagged' => [
            'pointer' => 'flagged',
            'validations' => 'is_boolean'
        ],
        'cosmetic' => [
            'pointer' => 'cosmetic',
            'validations' => 'is_boolean'
        ],
        'comments' => [
            'pointer' => 'comments',
            'validations' => ''
        ],
        'image_type_id' => [
            'pointer' => 'image_type_id',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'room_id' => ['pointer' => 'room_id'],
        'room_name' => ['pointer' => 'room_name'],
        'room_enabled' => ['pointer' => 'room_enabled'],
        'venue_id' => ['pointer' => 'venue_id'],
        'venue_asset_id' => ['pointer' => 'venue_asset_id'],
        'venue_name' => ['pointer' => 'venue_name'],
        'venue_city' => ['pointer' => 'venue_city'],
        'venue_country_code' => ['pointer' => 'venue_country_code'],
        'venue_enabled' => ['pointer' => 'venue_enabled'],
        'configuration_name' => ['pointer' => 'configuration_name'],
        'usage_superset_alias' => ['pointer' => 'usage_superset_alias'],
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
        'image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => [
                'name' => 'name',
                'subject_id' => 'subject_id'
            ]
        ],
        'defaulted_room_name' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'room_name'],
            'hard_bindings' => ['default' => 'common_new_room']
        ],
        'defaulted_venue_name' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'venue_name'],
            'hard_bindings' => ['default' => 'common_new_venue']
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
        ]
    ];

    public function get_url($size)
    {
        return $this->wrangle('image')->get_url($size);
    }
}