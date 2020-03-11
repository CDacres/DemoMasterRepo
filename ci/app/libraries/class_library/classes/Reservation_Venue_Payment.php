<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation_Venue_Payment___Collection extends Base__Collection
{
    static protected $_staticObjectType = Reservation_Venue_Payment::class;
}

class Reservation_Venue_Payment extends Base__Item
{
    protected static $_modelName = Model__reservation_venue_payments::class;
    protected static $_tableName = 'reservation_venue_payments';
    protected static $_columns = [
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural|required'
        ],
        'amount' => [
            'pointer' => 'amount',
            'validations' => 'is_numeric_positive|required'
        ],
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural|required'
        ],
        'date_time' => [
            'pointer' => 'dateTime',
            'validations' => 'is_date_time|required'
        ]
    ];
    protected static $_aliases = [
        'first_name' => ['pointer' => 'first_name'],
        'last_name' => ['pointer' => 'last_name'],
        'phone_number' => ['pointer' => 'phone_number'],
        'phone_number_search' => ['pointer' => 'phone_number_search'],
        'email' => ['pointer' => 'email'],
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => 'alpha'
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => 'alpha'
        ]
    ];
    protected static $_wranglers = [
        'full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'first_name',
                'last_name' => 'last_name'
            ]
        ],
        'full_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_full_name']]
        ],
        'date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'date_time']
        ],
        'payment_amount' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'amount',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ]
    ];

    protected function _full_name()
    {
        return $this->wrangle('full_name')->formatted();
    }
}