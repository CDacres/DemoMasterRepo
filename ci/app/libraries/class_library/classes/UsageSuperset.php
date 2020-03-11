<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class UsageSuperset___Collection extends Base__Collection
{
    static protected $_staticObjectType = UsageSuperset::class;
}

class UsageSuperset extends Base__Item
{
    const MEETING = 2;
    const CONFERENCE = 3;
    const TRAINING = 4;
    const DESK = 5;
    const EVENTFUNCTION = 6;
    const PRIVATEOFFICE = 10;
    const XMAS = 11;
    const PARTY = 12;
    const BAR = 13;
    const BIRTHDAY = 14;
    const BOAT = 15;
    const CORPORATE = 16;

    protected static $_tableName = 'usage_supersets';
    protected static $_columns = [
        'desc' => ['pointer' => 'desc'],
        'short_desc' => ['pointer' => 'short_desc'],
        'user_visible' => ['pointer' => 'user_visible'],
        'bot_visible' => ['pointer' => 'bot_visible'],
        'alias' => ['pointer' => 'alias'],
        'item_name' => ['pointer' => 'item_name'],
        'collective_title' => ['pointer' => 'collective_title'],
        'default_guests' => ['pointer' => 'default_guests'],
        'order' => ['pointer' => 'order'],
        'hidden' => ['pointer' => 'hidden']
    ];
    protected static $_objects = ['configurations' => Configuration___Collection::class];
}