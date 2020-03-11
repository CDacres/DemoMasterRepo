<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Checkout_Slot___Collection extends Base__Collection
{
    static protected $_staticObjectType = Checkout_Slot::class;
}

class Checkout_Slot extends Base__Item
{
    protected static $_modelName = Model__checkout_slots::class;
    protected static $_tableName = 'checkout_slots';
    protected static $_columns = [
        'checkout_log_id' => [
            'pointer' => 'checkout_log_id',
            'validations' => 'is_natural'
        ],
        'start' => [
            'pointer' => 'start',
            'validations' => 'is_natural'
        ],
        'end' => [
            'pointer' => 'end',
            'validations' => 'is_natural'
        ],
        'period_id' => [
            'pointer' => 'period_id',
            'validations' => 'is_natural'
        ]
    ];
}