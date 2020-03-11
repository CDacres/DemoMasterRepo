<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_Team_Member extends Asset_Member
{
    protected static $_modelName = Model__asset_team_member::class;
    protected static $_aliases = [
        'generate_password' => [
            'pointer' => 'generate_password',
            'validations' => 'is_boolean'
        ],
        'old_password' => [
            'pointer' => 'old_password',
            'validations' => ''
        ],
        'password' => [
            'pointer' => 'password',
            'validations' => ''
        ],
        'password_confirmation' => [
            'pointer' => 'password_confirmation',
            'validations' => ''
        ],
        'company_admin' => [
            'pointer' => 'company_admin',
            'validations' => 'is_boolean'
        ],
        'venue_admin' => [
            'pointer' => 'venue_admin',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_objects = ['venues' => Venue___Collection::class];

    public function passwords_match()
    {
        return ($this->get('password') === $this->get('password_confirmation'));
    }
}