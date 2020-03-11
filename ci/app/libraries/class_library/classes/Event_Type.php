<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Event_Type___Collection extends Base__Collection
{
    static protected $_staticObjectType = Event_Type::class;
}

class Event_Type extends Base__Item
{
    protected static $_modelName = Model__event_types::class;
    protected static $_tableName = 'event_types';
    protected static $_columns = [
        'id' => [
            'pointer' => 'id',
            'validations' => 'alpha'
        ],
        'description' => [
            'pointer' => 'description',
            'validations' => 'alpha'
        ],
        'context_field_1_name' => [
            'pointer' => 'context_field_1_name',
            'validations' => 'alpha'
        ],
        'context_field_2_name' => [
            'pointer' => 'context_field_2_name',
            'validations' => 'alpha'
        ],
        'context_field_3_name' => [
            'pointer' => 'context_field_3_name',
            'validations' => 'alpha'
        ],
        'context_field_4_name' => [
            'pointer' => 'context_field_4_name',
            'validations' => 'alpha'
        ]
    ];
}