<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Booking_Channel_Country extends Base__Item
{
    protected static $_tableName = 'booking_channel_countries';
    protected static $_columns = [
        'booking_channel_id' => [
            'pointer' => 'booking_channel_id',
            'validations' => 'is_natural'
        ],
        'country_code' => [
            'pointer' => 'country_code',
            'validations' => ''
        ],
        'default_commission' => [
            'pointer' => 'defaultCommission',
            'validations' => 'is_numeric'
        ],
        'self_list_commission' => [
            'pointer' => 'self_list_commission',
            'validations' => 'is_numeric'
        ]
    ];
}