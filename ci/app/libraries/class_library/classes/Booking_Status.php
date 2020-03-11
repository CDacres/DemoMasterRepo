<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Booking_Status extends Base__Item
{
    const CANCELLED = 1;
    const FINISHEDBADLY = 2;
    const FINISHEDHAPPILY = 3;

    protected static $_tableName = 'booking_status';
    protected static $_columns = ['name' => ['pointer' => 'name']];
}