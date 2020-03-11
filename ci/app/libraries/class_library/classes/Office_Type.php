<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Office_Type extends Base__Item
{
    const HOTDESK = 1;
    const DEDICATEDDESK = 2;
    const PRIVATEOFFICE = 3;

    protected static $_tableName = 'office_types';
    protected static $_columns = ['name' => ['pointer' => 'name']];
}