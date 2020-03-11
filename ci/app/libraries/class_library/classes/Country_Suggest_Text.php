<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Country_Suggest_Text extends Base__Item
{
    protected static $_tableName = 'country_suggest_text';
    protected static $_columns = [
        'locale_code' => [
            'pointer' => 'locale_code',
            'validations' => ''
        ],
        'suggest_text' => [
            'pointer' => 'suggest_text',
            'validations' => ''
        ],
        'button_text' => [
            'pointer' => 'button_text',
            'validations' => ''
        ]
    ];
    protected static $_aliases = ['country_name' => ['pointer' => 'country_name']];
}