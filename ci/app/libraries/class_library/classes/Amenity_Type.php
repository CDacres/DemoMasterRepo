<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Amenity_Type___Collection extends Base__Collection
{
    static protected $_staticObjectType = Amenity_Type::class;
}

class Amenity_Type extends Base__Item
{
    protected static $_tableName = 'amenity_types';
    protected static $_columns = [
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ]
    ];
    protected static $_aliases = [
        'amenity_desc' => [
            'pointer' => 'amenity_desc',
            'validations' => ''
        ],
        'filterable' => [
            'pointer' => 'filterable',
            'validations' => 'is_boolean'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
    ];
    protected static $_objects = ['amenity_details' => Runt_Asset_Amenity___Collection::class];
}