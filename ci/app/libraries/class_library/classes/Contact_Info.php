<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Contact_Info___Collection extends Base__Collection
{
    static protected $_staticObjectType = Contact_Info::class;
}

class Contact_Info extends Base__Item
{
    protected static $_modelName = Model__contact_info::class;
    protected static $_tableName = 'contact_info';
    protected static $_columns = [
        'locale' => [
            'pointer' => 'locale',
            'validations' => ''
        ],
        'phone' => [
            'pointer' => 'phone',
            'validations' => ''
        ],
        'phone_clean' => [
            'pointer' => 'phone_clean',
            'validations' => ''
        ],
        'email' => [
            'pointer' => 'email',
            'validations' => ''
        ],
        'name' => [
            'pointer' => 'name',
            'validations' => ''
        ],
        'street' => [
            'pointer' => 'street',
            'validations' => ''
        ],
        'city' => [
            'pointer' => 'city',
            'validations' => ''
        ],
        'state' => [
            'pointer' => 'state',
            'validations' => ''
        ],
        'postcode' => [
            'pointer' => 'postcode',
            'validations' => ''
        ],
        'country' => [
            'pointer' => 'country',
            'validations' => ''
        ],
        'default' => [
            'pointer' => 'default',
            'validations' => ''
        ]
    ];

    public function get_address()
    {
        return $this->get('street') . ', ' . $this->get('city') . ' ' . $this->get('postcode') . ', ' . $this->get('country');
    }
}