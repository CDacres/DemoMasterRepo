<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Currency_Location extends Base__Item
{
    protected static $_tableName = 'currency_locations';
    protected static $_columns = [
        'currency_code' => [
            'pointer' => 'currency_code',
            'validations' => ''
        ],
        'country_code' => [
            'pointer' => 'country_code',
            'validations' => ''
        ]
    ];
    protected static $_aliases = [
        'currency_symbol_left' => ['pointer' => 'currency_symbol_left'],
        'currency_symbol_right' => ['pointer' => 'currency_symbol_right']
    ];
}