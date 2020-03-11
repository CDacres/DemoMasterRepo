<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Asset_Favourite___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Asset_Favourite::class;
}

class Runt_Asset_Favourite extends Base__Item
{
    protected static $_modelName = Model__asset_favourites::class;
    protected static $_tableName = 'asset_favourites';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];
}