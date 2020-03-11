<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_Info_History extends Base__Item
{
    protected static $_tableName = 'user_info_history';
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural_no_zero'
        ],
        'email' => [
            'pointer' => 'email',
            'validations' => 'is_email'
        ],
        'dateTime' => [
            'pointer' => 'dateTime',
            'validations' => 'is_date_time'
        ]
    ];
}