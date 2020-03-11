<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Signup extends Base__Ghost_Object
{
    protected static $_modelName = Model__signup::class;
    protected static $_aliases = [
        'first_name' => [
            'pointer' => 'first_name',
            'validations' => 'alpha_dash'
        ],
        'last_name' => [
            'pointer' => 'last_name',
            'validations' => 'alpha_dash'
        ],
        'email' => [
            'pointer' => 'email',
            'validations' => 'is_email'
        ],
        'phone_number' => [
            'pointer' => 'phone_number',
            'validations' => 'is_phone_number'
        ],
        'send_token_email' => [
            'pointer' => 'send_token_email',
            'validations' => 'is_boolean'
        ],
        'never_bounce_status' => [
            'pointer' => 'never_bounce_status',
            'validations' => ''
        ]
    ];
}