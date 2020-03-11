<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Vat_Rate___Collection extends Base__Collection
{
    static protected $_staticObjectType = Vat_Rate::class;
}

class Vat_Rate extends Base__Item
{
    protected static $_tableName = 'vat_rates';
    protected static $_columns = [
        'country_code' => [
            'pointer' => 'country_code',
            'validations' => ''
        ],
        'rate_type' => [
            'pointer' => 'rate_type',
            'validations' => ''
        ],
        'vat_percentage' => [
            'pointer' => 'vat_percentage',
            'validations' => 'is_numeric'
        ],
        'valid_from' => [
            'pointer' => 'valid_from',
            'validations' => 'is_numeric'
        ],
        'valid_to' => [
            'pointer' => 'valid_to',
            'validations' => 'is_numeric'
        ]
    ];
}