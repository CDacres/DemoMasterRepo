<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Message_Type extends Base__Item
{
    const REQUEST = 1;
    const VENUEMADE = 2;
    const CONVERSATION = 3;
    const REVIEW = 5;
    const INQUIRY = 6;

    protected static $_tableName = 'message_type';
    protected static $_columns = [
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'url' => [
            'pointer' => 'url',
            'validations' => ''
        ]
    ];
}