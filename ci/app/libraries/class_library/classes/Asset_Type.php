<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_Type extends Base__Item
{
    const COMPANY = 1;
    const VENUE = 2;
    const ROOM = 3;

    protected static $_tableName = 'asset_types';
    protected static $_columns = [
        'asset_type' => [
            'pointer' => 'asset_type',
            'validations' => 'alpha'
        ]
    ];
}