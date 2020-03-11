<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Abstract__Auditor___Collection extends Base__Collection
{
}

class Abstract__Auditor extends Base__Item
{
    protected $_itemIdIdentifier;
    protected $_statusIdIdentifier;
    protected static $_columns = [
        'user_id' => [
            'pointer' => 'user_id',
            'validations' => 'is_natural|required'
        ],
        'date_time' => [
            'pointer' => 'dateTime',
            'validations' => 'is_date_time|required'
        ]
    ];
    protected static $_aliases = [
        'first_name' => ['pointer' => 'first_name'],
        'last_name' => ['pointer' => 'last_name'],
        'phone_number' => ['pointer' => 'phone_number'],
        'phone_number_search' => ['pointer' => 'phone_number_search'],
        'email' => ['pointer' => 'email'],
        'status_name' => ['pointer' => 'status_name']
    ];
    protected static $_wranglers = [
        'full_name' => [
            'object' => 'Wrangler__Name',
            'data_bindings' => [
                'first_name' => 'first_name',
                'last_name' => 'last_name'
            ]
        ],
        'full_name_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_full_name']]
        ],
        'date_time' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'date_time']
        ]
    ];

    public function set_item_id($id)
    {
        $this->set($this->_itemIdIdentifier, $id);
    }

    public function set_status_id($id)
    {
        $this->set($this->_statusIdIdentifier, $id);
    }

    protected function _full_name()
    {
        return $this->wrangle('full_name')->formatted();
    }
}