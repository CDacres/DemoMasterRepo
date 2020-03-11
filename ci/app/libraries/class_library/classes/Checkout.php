<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Checkout___Collection extends Base__Collection
{
    static protected $_staticObjectType = Checkout::class;
}

class Checkout extends Base__Item
{
    protected static $_modelName = Model__checkout::class;
    protected static $_tableName = 'checkout';
    protected static $_columns = [
        'journey_token_old' => [
            'pointer' => 'journey_token_old',
            'validations' => 'alpha_numeric'
        ],
        'room_id' => [
            'pointer' => 'room_id',
            'validations' => 'is_natural'
        ],
        'booking_type' => [
            'pointer' => 'booking_type',
            'validations' => 'is_natural'
        ],
        'start_date_time' => [
            'pointer' => 'start_date_time',
            'validations' => 'is_date_time'
        ],
        'end_date_time' => [
            'pointer' => 'end_date_time',
            'validations' => 'is_date_time'
        ],
        'guests' => [
            'pointer' => 'guests',
            'validations' => 'is_natural'
        ],
        'base_price' => [
            'pointer' => 'base_price',
            'validations' => 'is_numeric'
        ]
    ];
}