<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Company extends Abstract__Asset
{
    protected static $_modelName = Model__companies::class;
    protected static $_parentClass = null;
    protected static $_tableName = 'companies';
    protected static $_columns = [
        'name' => [
            'pointer' => 'name',
            'validations' => 'alpha_dash'
        ]
    ];
    protected static $_wranglers = [
        'defaulted_name' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'name'],
            'hard_bindings' => ['default' => 'common_new_company']
        ],
        'defaulted_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_defaulted_name']]
        ]
    ];
    protected static $_objects = ['venues' => Venue___Collection::class];

    protected static $_assetType = Asset_Type::COMPANY;

    protected function _defaulted_name()
    {
        return $this->wrangle('defaulted_name')->value();
    }
}