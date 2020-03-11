<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_User_Member extends Asset_Member
{
    protected static $_modelName = Model__asset_user_member::class;
    protected static $_aliases = [
        'discount' => [
            'pointer' => 'discount',
            'validations' => 'is_numeric_positive|more_than_equal[0]|less_than_equal[100]'
        ]
    ];
}