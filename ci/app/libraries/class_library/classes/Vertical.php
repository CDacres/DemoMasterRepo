<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Vertical___Collection extends Base__Collection
{
    static protected $_staticObjectType = Vertical::class;
}

class Vertical extends Base__Item
{
    const MEETING = 1;
    const OFFICE = 2;
    const PARTY = 3;
    const DINING = 4;
    const WEDDING = 5;
    const ART = 6;
    const SPORT = 7;
    const POPUP = 8;
    const ACTIVITY = 9;

    protected static $_tableName = 'verticals';
    protected static $_columns = ['title' => ['pointer' => 'title']];
}