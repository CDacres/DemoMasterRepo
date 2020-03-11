<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_Member extends Base__Ghost_Object
{
    protected static $_aliases = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
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
            'validations' => 'is_phone_number|empty_null'
        ],
        'never_bounce_status' => [
            'pointer' => 'never_bounce_status',
            'validations' => ''
        ]
    ];
}