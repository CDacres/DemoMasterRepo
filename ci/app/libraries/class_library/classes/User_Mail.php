<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_Mail___Collection extends Base__Collection
{
    static protected $_staticObjectType = User_Mail::class;
}

class User_Mail extends Base__Item
{
    protected static $_tableName = 'marketing_mails_to_users';
    protected static $_columns = [
        'marketing_mail_view_id' => [
            'pointer' => 'marketing_mail_view_id',
            'validations' => 'is_natural'
        ],
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural'
        ],
        'opened' => [
            'pointer' => 'opened',
            'validations' => 'is_boolean'
        ],
        'clicked' => [
            'pointer' => 'clicked',
            'validations' => 'is_boolean'
        ],
        'opened_token' => [
            'pointer' => 'opened_token',
            'validations' => 'alpha_numeric'
        ],
        'clicked_token' => [
            'pointer' => 'clicked_token',
            'validations' => 'alpha_numeric'
        ],
        'first_opened' => [
            'pointer' => 'first_opened',
            'validations' => 'is_date_time'
        ],
        'last_opened' => [
            'pointer' => 'last_opened',
            'validations' => 'is_date_time'
        ],
        'first_clicked' => [
            'pointer' => 'first_clicked',
            'validations' => 'is_date_time'
        ],
        'last_clicked' => [
            'pointer' => 'last_clicked',
            'validations' => 'is_date_time'
        ],
        'language' => [
            'pointer' => 'language',
            'validations' => 'alpha'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ]
    ];
}