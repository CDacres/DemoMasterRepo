<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Insert extends Base__Ghost_Object
{
    protected static $_modelName = Model__payment_insert::class;
    protected static $_aliases = [
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural|required'
        ],
        'payment_amount' => [
            'pointer' => 'payment_amount',
            'validations' => 'is_numeric_positive'
        ],
        'payment_type_id' => [
            'pointer' => 'paymentType_id',
            'validations' => 'is_natural|required'
        ],
        'payment_nonce' => [
            'pointer' => 'payment_nonce',
            'validations' => 'alpha_dash'
        ],
        'payment_price' => [
            'pointer' => 'payment_price',
            'validations' => 'is_numeric_positive'
        ],
        'payment_extra_fee' => [
            'pointer' => 'payment_extra_fee',
            'validations' => 'is_numeric_positive'
        ],
        'payment_flexible_fee' => [
            'pointer' => 'payment_flexible_fee',
            'validations' => 'is_numeric_positive'
        ],
        'notes' => [
            'pointer' => 'notes',
            'validations' => ''
        ],
        'external_reference' => [
            'pointer' => 'external_reference',
            'validations' => ''
        ],
        'paid_date' => [
            'pointer' => 'paid_date',
            'validations' => 'is_date'
        ],
        'account' => [
            'pointer' => 'account',
            'validations' => ''
        ]
    ];
}