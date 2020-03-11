<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Location___Collection extends Base__Collection
{
    static protected $_staticObjectType = Location::class;
}

class Location extends Base__Item
{
    protected static $_modelName = Model__locations::class;
    protected static $_tableName = 'locations';
    protected static $_columns = [
        'human_desc' => [
            'pointer' => 'human_desc',
            'validations' => ''
        ],
        'url_desc' => [
            'pointer' => 'url_desc',
            'validations' => ''
        ],
        'search_url' => [
            'pointer' => 'search_url',
            'validations' => ''
        ],
        'parent_id' => [
            'pointer' => 'parent_id',
            'validations' => 'is_natural'
        ],
        'is_crawlable' => [
            'pointer' => 'in_sitemap',
            'validations' => 'is_boolean'
        ],
        'search_radius' => [
            'pointer' => 'search_radius',
            'validations' => 'is_numeric'
        ],
        'long' => [
            'pointer' => 'long',
            'validations' => 'is_numeric'
        ],
        'lat' => [
            'pointer' => 'lat',
            'validations' => 'is_numeric'
        ],
        'country' => [
            'pointer' => 'country',
            'validations' => ''
        ],
        'locality' => [
            'pointer' => 'locality',
            'validations' => ''
        ],
        'category_type' => [
            'pointer' => 'locationcategorie_id',
            'validations' => 'is_natural'
        ],
        'bounds_sw_lat' => [
            'pointer' => 'bounds_sw_lat',
            'validations' => 'is_numeric'
        ],
        'bounds_sw_lon' => [
            'pointer' => 'bounds_sw_lon',
            'validations' => 'is_numeric'
        ],
        'bounds_ne_lat' => [
            'pointer' => 'bounds_ne_lat',
            'validations' => 'is_numeric'
        ],
        'bounds_ne_lon' => [
            'pointer' => 'bounds_ne_lon',
            'validations' => 'is_numeric'
        ],
        'bounds_distance' => [
            'pointer' => 'bounds_distance',
            'validations' => 'is_numeric'
        ],
        'place_id' => [
            'pointer' => 'place_id',
            'validations' => ''
        ],
        'requires_determiner' => [
            'pointer' => 'requires_determiner',
            'validations' => 'is_boolean'
        ],
        'updated_date' => [
            'pointer' => 'updated_date',
            'validations' => 'is_date_time'
        ]
    ];
    protected static $_aliases = [
        'parent_desc' => [
            'pointer' => 'parent_desc',
            'validations' => ''
        ],
        'parent_url' => [
            'pointer' => 'parent_url',
            'validations' => ''
        ],
        'parent_parent_id' => [
            'pointer' => 'parent_parent_id',
            'validations' => ''
        ],
        'parent_determiner' => [
            'pointer' => 'parent_determiner',
            'validations' => ''
        ],
        'child_room_count' => [
            'pointer' => 'child_room_count',
            'validations' => ''
        ],
        'approved_venue_count' => [
            'pointer' => 'approved_venue_count',
            'validations' => ''
        ],
        'unapproved_venue_count' => [
            'pointer' => 'unapproved_venue_count',
            'validations' => ''
        ],
        'approved_room_count' => [
            'pointer' => 'approved_room_count',
            'validations' => ''
        ],
        'category_desc' => [
            'pointer' => 'category_desc',
            'validations' => ''
        ],
        'currency_code' => [
            'pointer' => 'currency_code',
            'validations' => ''
        ],
        'currency_symbol_left' => ['pointer' => 'currency_symbol_left'],
        'currency_symbol_right' => ['pointer' => 'currency_symbol_right'],
        'landing_page_search_redirect' => ['pointer' => 'landing_page_search_redirect']
    ];
    protected static $_wranglers = [
        'map' => [
            'object' => 'Wrangler__Map',
            'data_bindings' => [
                'long' => 'long',
                'lat' => 'lat'
            ]
        ]
    ];
    protected static $_objects = ['rooms' => Runt_Location_Room___Collection::class];

    public function sanitise_location_string($locationString)
    {
        return mb_strtolower(str_replace([',', ' ', '(', ')'], ['-', '-'], trim($locationString)), 'UTF-8');
    }
}