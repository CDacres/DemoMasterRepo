<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Asset_Attribute___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Asset_Attribute::class;
}

class Runt_Asset_Attribute extends Base__Item
{
    protected static $_modelName = Model__asset_attributes::class;
    protected static $_tableName = 'asset_attribute';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'attribute_id' => [
            'pointer' => 'attribute_id',
            'validations' => 'is_natural'
        ]
    ];
}