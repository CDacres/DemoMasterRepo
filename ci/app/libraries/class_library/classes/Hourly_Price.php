<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Hourly_Price___Collection extends Base__Collection
{
    static protected $_staticObjectType = Hourly_Price::class;
}

class Hourly_Price extends Base__Item
{
    protected static $_modelName = Model__hourly_price::class;
    protected static $_tableName = 'hour_rates';
    protected static $_columns = [
        'period_id' => [
            'pointer' => 'openingPeriod_id',
            'validations' => 'is_natural'
        ],
        'hourly_rate' => [
            'pointer' => 'price_per_hour',
            'validations' => 'is_numeric_positive'
        ]
    ];
}