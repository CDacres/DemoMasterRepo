<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Asset_Cancellation extends Base__Item
{
    protected static $_modelName = Model__asset_cancellations::class;
    protected static $_tableName = 'asset_cancellation';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'cancellation_percentage' => [
            'pointer' => 'cancel_percent',
            'validations' => 'is_numeric_positive'
        ],
        'cancellation_period' => [
            'pointer' => 'cancel_days',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'cancellation_type' => [
            'pointer' => 'cancellation_type',
            'validations' => 'is_natural'
        ],
        'cancellation_type_desc' => [
            'pointer' => 'cancellation_type_desc',
            'validations' => ''
        ]
    ];
}