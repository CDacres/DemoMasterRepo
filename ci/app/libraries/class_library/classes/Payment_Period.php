<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Period___Collection extends Base__Collection
{
    static protected $_staticObjectType = Payment_Period::class;
}

class Payment_Period extends Base__Item
{
    protected static $_modelName = Model__payment_periods::class;
    protected static $_tableName = 'payment_periods';
    protected static $_columns = [
        'period_year' => [
            'pointer' => 'period_year',
            'validations' => 'integer'
        ],
        'period_month' => [
            'pointer' => 'period_month',
            'validations' => 'integer'
        ]
    ];
}