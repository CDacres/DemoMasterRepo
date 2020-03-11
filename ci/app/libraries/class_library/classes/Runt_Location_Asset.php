<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Location_Asset extends Base__Item
{
    protected static $_modelName = Model__location_assets::class;
    protected static $_tableName = 'location_asset';
    protected static $_columns = [
        'location_id' => [
            'pointer' => 'location_id',
            'validations' => 'is_natural'
        ],
        'approved_venue_count' => [
            'pointer' => 'approved_venue_count',
            'validations' => 'is_natural'
        ],
        'unapproved_venue_count' => [
            'pointer' => 'unapproved_venue_count',
            'validations' => 'is_natural'
        ]
    ];
}