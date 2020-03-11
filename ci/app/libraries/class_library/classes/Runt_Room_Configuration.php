<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Room_Configuration___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Room_Configuration::class;
}

class Runt_Room_Configuration extends Base__Item
{
    protected static $_modelName = Model__room_configurations::class;
    protected static $_tableName = 'room_configuration';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'configuration_id' => [
            'pointer' => 'configuration_id',
            'validations' => 'is_natural'
        ],
        'max_capacity' => [
            'pointer' => 'max_capacity',
            'validations' => 'is_natural'
        ]
    ];
}