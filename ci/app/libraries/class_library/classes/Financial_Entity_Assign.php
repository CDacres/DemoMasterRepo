<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Financial_Entity_Assign extends Base__Ghost_Object
{
    protected static $_modelName = Model__financial_entities_assign::class;
    protected static $_aliases = [
        'new_name' => [
            'pointer' => 'new_name',
            'validations' => ''
        ],
        'existing_fin_id' => [
            'pointer' => 'existing_id',
            'validations' => ''
        ],
        'account_code' => [
            'pointer' => 'account_code',
            'validations' => ''
        ],
        'sort_routing_code' => [
            'pointer' => 'sort_routing_code',
            'validations' => ''
        ],
        'iban' => [
            'pointer' => 'iban',
            'validations' => ''
        ],
        'bic' => [
            'pointer' => 'bic',
            'validations' => ''
        ]
    ];
}