<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Password_Update extends Base__Ghost_Object
{
    protected static $_modelName = Model__password_update::class;
    protected static $_aliases = [
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
        'token' => [
            'pointer' => 'token',
            'validations' => 'alpha_numeric'
        ]
    ];

    public function passwords_match()
    {
        return ($this->get('password') === $this->get('password_confirmation'));
    }
}