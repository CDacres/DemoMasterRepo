<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation_Gmv_History___Collection extends Base__Collection
{
    static protected $_staticObjectType = Reservation_Gmv_History::class;
}

class Reservation_Gmv_History extends Base__Item
{
    protected static $_modelName = Model__reservations_gmv_history::class;
    protected static $_tableName = 'reservation_gmv_history';
    protected static $_columns = [
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural|required'
        ],
        'reservation_status_id' => [
            'pointer' => 'reservationStatus_id',
            'validations' => 'integer|required'
        ],
        'amount' => [
            'pointer' => 'amount',
            'validations' => 'is_numeric_positive|required'
        ],
        'date_time' => [
            'pointer' => 'dateTime',
            'validations' => 'is_date_time|required'
        ]
    ];
    protected static $_wranglers = [
        'date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'date_time']
        ],
        'amount' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'amount',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ]
    ];
}