<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Audit___Collection extends Abstract__Auditor___Collection
{
    static protected $_staticObjectType = Payment_Audit::class;
}

class Payment_Audit extends Abstract__Auditor
{
    protected static $_tableName = 'payment_audits';

    protected $_itemIdIdentifier = 'payment_id';
    protected $_statusIdIdentifier = 'payment_status_id';

    protected static $_columns = [
        'payment_id' => [
            'pointer' => 'payment_id',
            'validations' => 'is_natural|required'
        ],
        'payment_status_id' => [
            'pointer' => 'paymentStatus_id',
            'validations' => 'is_natural|required'
        ]
    ];
}