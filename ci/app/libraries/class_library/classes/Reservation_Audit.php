<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation_Audit___Collection extends Abstract__Auditor___Collection
{
    static protected $_staticObjectType = Reservation_Audit::class;
}

class Reservation_Audit extends Abstract__Auditor
{
    protected static $_tableName = 'reservation_audits';

    protected $_itemIdIdentifier = 'reservation_id';
    protected $_statusIdIdentifier = 'reservation_status_id';

    protected static $_columns = [
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural|required'
        ],
        'reservation_status_id' => [
            'pointer' => 'reservationStatus_id',
            'validations' => 'integer|required'
        ]
    ];
}