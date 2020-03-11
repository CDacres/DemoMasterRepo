<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Booking___Collection extends Base__Collection
{
    static protected $_staticObjectType = Booking::class;
}

class Booking extends Base__Item
{
    protected static $_tableName = 'bookings';
    protected static $_modelName = Model__bookings::class;
    protected static $_columns = [
        'booker_id' => [
            'pointer' => 'booker_id',
            'validations' => 'is_natural'
        ],
        'beneficiary_id' => [
            'pointer' => 'beneficiary_id',
            'validations' => 'is_natural'
        ],
        'bookingChannel_id' => [
            'pointer' => 'bookingChannel_id',
            'validations' => 'is_natural'
        ],
        'bookingStatus_id' => [
            'pointer' => 'bookingStatus_id',
            'validations' => 'is_natural|empty_null'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ],
        'closed' => [
            'pointer' => 'closed',
            'validations' => 'is_date_time|empty_null'
        ]
    ];

    public function is_closed()
    {
        return $this->data_exists('closed');
    }
}