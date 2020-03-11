<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Attribute_Type___Collection extends Base__Collection
{
    static protected $_staticObjectType = Attribute_Type::class;
}

class Attribute_Type extends Base__Item
{
    const COOL = 1;
    const HOTEL = 6;
    const CHEAP = 7;

    protected static $_tableName = 'attribute_types';
    protected static $_columns = [
        'desc' => [
            'pointer' => 'desc',
            'validations' => ''
        ],
        'carousel_title' => [
            'pointer' => 'carousel_title',
            'validations' => ''
        ],
        'order' => [
            'pointer' => 'order',
            'validations' => ''
        ]
    ];
    protected static $_objects = ['attr_language' => Attribute_Language___Collection::class];
}