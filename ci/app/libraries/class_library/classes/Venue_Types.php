<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Venue_Types___Collection extends Base__Collection
{
    static protected $_staticObjectType = Venue_Types::class;
}

class Venue_Types extends Base__Item
{
    const HOTELS = 5;

    protected static $_tableName = 'venue_types';
    protected static $_columns = ['description' => ['pointer' => 'description']];
}