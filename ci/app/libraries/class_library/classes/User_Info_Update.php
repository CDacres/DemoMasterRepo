<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_Info_Update extends Base__Ghost_Object
{
    protected static $_modelName = Model__user_info_update::class;
    protected static $_aliases = [
        'first_name' => [
            'pointer' => 'first_name',
            'validations' => ''
        ],
        'last_name' => [
            'pointer' => 'last_name',
            'validations' => ''
        ],
        'email' => [
            'pointer' => 'email',
            'validations' => 'is_email'
        ],
        'phone_number' => [
            'pointer' => 'phone_number',
            'validations' => 'is_phone_number'
        ],
        'never_bounce_status' => [
            'pointer' => 'never_bounce_status',
            'validations' => ''
        ]
    ];
}