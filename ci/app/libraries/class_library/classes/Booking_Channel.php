<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Booking_Channel___Collection extends Base__Collection
{
    static protected $_staticObjectType = Booking_Channel::class;
}

class Booking_Channel extends Base__Item
{
    const FRONTEND = 1;
    const VENUECALENDAR = 2;
    const WIDGET = 3;
    const ADMIN = 4;

    protected static $_tableName = 'booking_channels';
    protected static $_columns = [
        'desc' => [
            'pointer' => 'desc',
            'validations' => 'alpha_dash'
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
    protected static $_aliases = [
        'country_default_commission' => ['pointer' => 'country_default_commission'],
        'country_self_list_commission' => ['pointer' => 'country_self_list_commission']
    ];
}