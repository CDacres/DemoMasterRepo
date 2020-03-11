<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Member_Type extends Base__Item
{
    const NEWMEMBER = 1;
    const EXISTINGMEMBER = 2;

    protected static $_tableName = 'member_type';
    protected static $_columns = ['name' => ['pointer' => 'name']];
}