<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Room_Administration___Collection_Collection_Collection extends Base__Collection
{
    static protected $_staticObjectType = Room_Administration___Collection_Collection::class;
}

class Room_Administration___Collection_Collection extends Base__Collection
{
    static protected $_staticObjectType = Room_Administration___Collection::class;
}

class Room_Administration___Collection extends Room_Skeleton___Collection
{
    static protected $_staticObjectType = Room_Administration::class;
    function __construct($objectsDataArray = [])
    {
        parent::__construct($objectsDataArray);
        $this->_set_label('venue_name');
    }
}

class Room_Administration extends Room_Skeleton
{
    protected static $_objects = [
        'reservations' => Reservation___Collection::class,
        'opening_hours' => Opening_Hours___Collection::class,
        'bookings' => Booking___Collection::class
    ];
}