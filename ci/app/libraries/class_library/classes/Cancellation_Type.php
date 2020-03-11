<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Cancellation_Type extends Base__Item
{
    const CUSTOM = 4;

    protected static $_tableName = 'cancellation_types';
    protected static $_columns = [
        'description' => [
            'pointer' => 'description',
            'validations' => ''
        ],
        'cancellation_percentage' => [
            'pointer' => 'cancel_percent',
            'validations' => 'is_natural'
        ],
        'cancellation_period' => [
            'pointer' => 'cancel_days',
            'validations' => 'is_natural'
        ]
    ];
}