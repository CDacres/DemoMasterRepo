<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Status extends Base__Item
{
    const CREATED = 1;
    const VOID = 2;
    const COMPLETE = 3;
    const REFUND = 4;
    const SUBMITTED = 5;
    const ZIPCUBECOVERED = 6;

    protected static $_tableName = 'payment_status';
    protected static $_columns = ['name' => ['pointer' => 'name']];
}