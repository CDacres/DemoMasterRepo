<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Attribute_Language___Collection extends Base__Collection
{
    static protected $_staticObjectType = Attribute_Language::class;
}

class Attribute_Language extends Base__Item
{
    protected static $_tableName = 'attribute_language';
    protected static $_columns = [
        'attribute_id' => [
            'pointer' => 'attribute_id',
            'validations' => 'is_natural|required'
        ],
        'lang_code' => [
            'pointer' => 'lang_code',
            'validations' => 'required'
        ],
        'desc' => [
            'pointer' => 'desc',
            'validations' => ''
        ],
        'url' => [
            'pointer' => 'url',
            'validations' => ''
        ]
    ];
}