<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Enquiry_Duration___Collection extends Base__Collection
{
    static protected $_staticObjectType = Enquiry_Duration::class;
}

class Enquiry_Duration extends Base__Item
{
    protected static $_tableName = 'enquiry_durations';
    protected static $_columns = [
        'desc' => [
            'pointer' => 'desc',
            'validations' => ''
        ],
        'lang_key' => [
            'pointer' => 'lang_key',
            'validations' => ''
        ],
        'dur_value' => [
            'pointer' => 'dur_value',
            'validations' => ''
        ],
        'hour_option' => [
            'pointer' => 'hour_option',
            'validations' => 'is_boolean'
        ],
        'day_option' => [
            'pointer' => 'day_option',
            'validations' => 'is_boolean'
        ],
        'week_option' => [
            'pointer' => 'week_option',
            'validations' => 'is_boolean'
        ],
        'month_option' => [
            'pointer' => 'month_option',
            'validations' => 'is_boolean'
        ],
        'admin_only' => [
            'pointer' => 'admin_only',
            'validations' => 'is_boolean'
        ],
        'hide_email' => [
            'pointer' => 'hide_email',
            'validations' => 'is_boolean'
        ]
    ];
}