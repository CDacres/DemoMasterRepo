<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Asset_Amenity___Collection_Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Asset_Amenity___Collection::class;
}

class Runt_Asset_Amenity___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Asset_Amenity::class;
}

class Runt_Asset_Amenity extends Base__Item
{
    protected static $_modelName = Model__asset_amenities::class;
    protected static $_tableName = 'asset_amenity';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'amenity_id' => [
            'pointer' => 'amenity_id',
            'validations' => 'is_natural'
        ],
        'cost' => [
            'pointer' => 'cost',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'instructions' => [
            'pointer' => 'instructions',
            'validations' => 'empty_null'
        ],
        'available' => [
            'pointer' => 'available',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'price' => [
            'pointer' => 'price',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'amenity_desc' => [
            'pointer' => 'amenity_desc',
            'validations' => 'alpha_dash'
        ],
        'filterable' => [
            'pointer' => 'filterable',
            'validations' => 'is_boolean'
        ],
        'allow_price' => [
            'pointer' => 'allow_price',
            'validations' => 'is_boolean'
        ],
        'amenity_type' => [
            'pointer' => 'amenity_type',
            'validations' => 'is_natural'
        ],
        'currency' => [
            'pointer' => 'currency',
            'validations' => ''
        ],
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => 'alpha'
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => 'alpha'
        ]
    ];
    protected static $_wranglers = [
        'price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'price',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ]
    ];
}