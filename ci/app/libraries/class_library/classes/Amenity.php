<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Amenity___Collection extends Base__Collection
{
    static protected $_staticObjectType = Amenity::class;
}

class Amenity extends Base__Item
{
    protected static $_modelName = Model__amenities::class;
    protected static $_tableName = 'amenities';
    protected static $_columns = [
        'desc' => [
            'pointer' => 'desc',
            'validations' => ''
        ],
        'amenity_type' => [
            'pointer' => 'amenity_types_id',
            'validations' => 'is_natural'
        ],
        'filterable' => [
            'pointer' => 'filterable',
            'validations' => 'is_boolean'
        ],
        'allow_price' => [
            'pointer' => 'allow_price',
            'validations' => 'is_boolean'
        ]
    ];
}