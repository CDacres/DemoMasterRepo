<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Location_Category___Collection extends Base__Collection
{
    static protected $_staticObjectType = Location_Category::class;
}

class Location_Category extends Base__Item
{
    const COUNTRY = 1;
    const CITY = 2;
    const DISTRICT = 3;
    const LANDMARK = 4;
    const AIRPORT = 5;
    const POSTCODE = 6;

    protected static $_widgetCategories = [
        self::COUNTRY,
        self::CITY,
        self::DISTRICT,
        self::AIRPORT
    ];

    protected static $_tableName = 'location_categories';
    protected static $_columns = [
        'location_category' => [
            'pointer' => 'location_category',
            'validations' => ''
        ],
        'default_bounds_distance' => [
            'pointer' => 'default_bounds_distance',
            'validations' => 'is_numeric'
        ]
    ];

    public static function get_widgetCategories()
    {
        return static::$_widgetCategories;
    }
}