<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Daily_Price extends Base__Item
{
    protected static $_modelName = Model__daily_price::class;
    protected static $_tableName = 'day_rates';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'daily_rate' => [
            'pointer' => 'standard_day_rate',
            'validations' => 'is_numeric_positive'
        ],
        'daily_delegate_rate' => [
            'pointer' => 'daily_delegate_rate',
            'validations' => 'is_numeric_positive'
        ],
        'minimum_delegates' => [
            'pointer' => 'minimum_delegate_number',
            'validations' => 'is_numeric'
        ],
        'minimum_spend' => [
            'pointer' => 'minimum_spend',
            'validations' => 'is_numeric'
        ],
        'monthly_rate' => [
            'pointer' => 'monthly_price',
            'validations' => 'is_numeric'
        ]
    ];
    protected static $_wranglers = [
        'daily_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'daily_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'monthly_rate' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'monthly_rate',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ]
    ];
}