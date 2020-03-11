<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payment_Type extends Base__Item
{
    const INVOICE = 4;
    const BRAINTREE = 5;
    const VENUEINVOICE = 6;
    const BACS = 7;

    protected static $_tableName = 'payment_types';
    protected static $_columns = ['name' => ['pointer' => 'payment_name']];
}