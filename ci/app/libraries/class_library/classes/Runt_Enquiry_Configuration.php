<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Enquiry_Configuration___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Enquiry_Configuration::class;
}

class Runt_Enquiry_Configuration extends Base__Item
{
    protected static $_modelName = Model__enquiry_configurations::class;
    protected static $_tableName = 'enquiries_configurations';
    protected static $_columns = [
        'enquiry_id' => [
            'pointer' => 'enquiry_id',
            'validations' => 'is_natural'
        ],
        'configuration_id' => [
            'pointer' => 'configuration_id',
            'validations' => 'is_natural'
        ]
    ];
}