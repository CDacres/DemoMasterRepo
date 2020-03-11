<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Location_Country_Places extends Base__Item
{
    protected static $_tableName = 'location_country_places';
    protected static $_columns = [
        'country' => [
            'pointer' => 'country',
            'validations' => ''
        ],
        'main_location_id' => [
            'pointer' => 'main_location_id',
            'validations' => 'is_natural'
        ],
        'location_1_id' => [
            'pointer' => 'location_1_id',
            'validations' => 'is_natural'
        ],
        'location_2_id' => [
            'pointer' => 'location_2_id',
            'validations' => 'is_natural'
        ],
        'location_3_id' => [
            'pointer' => 'location_3_id',
            'validations' => 'is_natural'
        ],
        'location_4_id' => [
            'pointer' => 'location_4_id',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'location_desc' => [
            'pointer' => 'location_desc',
            'validations' => ''
        ],
        'location_search_url' => [
            'pointer' => 'location_search_url',
            'validations' => ''
        ],
        'location_parent_desc' => [
            'pointer' => 'location_parent_desc',
            'validations' => ''
        ],
        'location_parent_determiner' => [
            'pointer' => 'location_parent_determiner',
            'validations' => ''
        ],
        'location_1_desc' => [
            'pointer' => 'location_1_desc',
            'validations' => ''
        ],
        'location_2_desc' => [
            'pointer' => 'location_2_desc',
            'validations' => ''
        ],
        'location_3_desc' => [
            'pointer' => 'location_3_desc',
            'validations' => ''
        ],
        'location_4_desc' => [
            'pointer' => 'location_4_desc',
            'validations' => ''
        ]
    ];
}