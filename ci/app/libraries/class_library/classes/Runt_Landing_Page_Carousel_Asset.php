<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Landing_Page_Carousel_Asset___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Landing_Page_Carousel_Asset::class;
}

class Runt_Landing_Page_Carousel_Asset extends Base__Item
{
    protected static $_modelName = Model__landing_page_carousel_assets::class;
    protected static $_tableName = 'landing_page_carousel_assets';
    protected static $_columns = [
        'landing_page_id' => [
            'pointer' => 'landing_page_id',
            'validations' => 'is_natural|required'
        ],
        'carousel_attribute_id' => [
            'pointer' => 'carousel_attribute_id',
            'validations' => 'is_natural|required'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural|required'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => ''
        ]
    ];
    protected static $_aliases = [
        'attribute_desc' => ['pointer' => 'attribute_desc'],
        'reference_id' => ['pointer' => 'reference_id'],
        'asset_type' => ['pointer' => 'asset_type']
    ];
}