<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Import_Calendar extends Base__Ghost_Object
{
    protected static $_modelName = Model__import_calendar::class;
    protected static $_aliases = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ]
    ];
}