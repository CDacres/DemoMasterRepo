<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Location_Room___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Location_Room::class;
}

class Runt_Location_Room extends Base__Item
{
    protected static $_modelName = Model__location_rooms::class;
    protected static $_tableName = 'location_rooms';
    protected static $_columns = [
        'location_id' => [
            'pointer' => 'location_id',
            'validations' => 'is_natural'
        ],
        'tag_id' => [
            'pointer' => 'tag_id',
            'validations' => 'is_natural'
        ],
        'approved_room_count' => [
            'pointer' => 'approved_room_count',
            'validations' => 'is_natural'
        ],
        'unapproved_room_count' => [
            'pointer' => 'unapproved_room_count',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = ['tag_name' => ['pointer' => 'tag_name']];
}