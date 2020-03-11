<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Usage___Collection extends Base__Collection
{
    static protected $_staticObjectType = Usage::class;
}

class Usage extends Base__Item
{
    const OFFICE = 1;
    const MEETING = 3;
    const CONFERENCE = 4;
    const OPENDESK = 5;
    const EVENTFUNCTION = 6;
    const TRAINING = 12;
    const PRIVATEDESK = 13;
    const DEDICATEDDESK = 14;

    protected static $_tableName = 'usages';
    protected static $_columns = [
        'desc' => ['pointer' => 'desc'],
        'collective_desc' => ['pointer' => 'collective_desc'],
        'ordering' => ['pointer' => 'ordering']
    ];
}