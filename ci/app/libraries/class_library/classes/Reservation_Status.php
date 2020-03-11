<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation_Status extends Base__Item
{
    const BLOCKED = 0;
    const CREATED = 1;
    const EXPIRED = 2;
    const ACCEPTED = 3;
    const DECLINE = 4;
    const CANCELLEDBYHOST = 5;
    const CANCELLEDBYUSER = 6;
    const CHECKIN = 7;
    const AWAITINGHOSTREVIEW = 8;
    const AWAITINGUSERREVIEW = 9;
    const COMPLETED = 10;
    const DELETED = -1;

    protected static $_tableName = 'reservation_status';
    protected static $_columns = ['name' => ['pointer' => 'name']];
}