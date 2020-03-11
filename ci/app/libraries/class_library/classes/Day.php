<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Day___Collection extends Base__Collection
{
    static protected $_staticObjectType = Day::class;
}

class Day extends Base__Item
{
    protected static $_tableName = 'days';
    protected static $_columns = ['name' => ['pointer' => 'name']];
}