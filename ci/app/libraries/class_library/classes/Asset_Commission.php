<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_Commission___Collection extends Base__Collection
{
    static protected $_staticObjectType = Asset_Commission::class;
}

class Asset_Commission extends Base__Item
{
    protected static $_modelName = Model__asset_commissions::class;
    protected static $_tableName = 'asset_commissions';
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'booking_channel_id' => [
            'pointer' => 'bookingChannel_id',
            'validations' => 'is_natural'
        ],
        'commission_percentage' => [
            'pointer' => 'commissionPercentage',
            'validations' => 'is_numeric'
        ]
    ];
}