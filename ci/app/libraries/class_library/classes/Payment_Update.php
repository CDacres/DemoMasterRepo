<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Update extends Base__Ghost_Object
{
    protected static $_modelName = Model__payment_update::class;
    protected static $_aliases = [
        'payment_type_id' => [
            'pointer' => 'paymentType_id',
            'validations' => 'is_natural|required'
        ],
        'external_reference' => [
            'pointer' => 'external_reference',
            'validations' => 'required'
        ],
        'notes' => [
            'pointer' => 'notes',
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