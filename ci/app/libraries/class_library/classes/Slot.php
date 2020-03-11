<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Slot___Collection extends Abstract__Period___Collection
{
    static protected $_staticObjectType = Slot::class;
}

class Slot extends Base__Unbound_Object implements Interface__Period
{
    protected static $_aliases = [
        'start' => [
            'pointer' => 'start',
            'validations' => ''
        ],
        'end' => [
            'pointer' => 'end',
            'validations' => ''
        ],
        'period_id' => [
            'pointer' => 'period_id',
            'validations' => ''
        ],
        'price' => [
            'pointer' => 'price',
            'validations' => ''
        ],
        'discount_price' => [
            'pointer' => 'discount_price',
            'validations' => ''
        ],
        'available' => [
            'pointer' => 'available',
            'validations' => ''
        ],
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => ''
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => ''
        ],
        'user_discount' => [
            'pointer' => 'user_discount',
            'validations' => 'is_numeric_positive'
        ]
    ];
    protected static $_wranglers = [
        'start' => [
            'object' => 'Wrangler__Time',
            'data_bindings' => ['time' => 'start']
        ],
        'end' => [
            'object' => 'Wrangler__Time',
            'data_bindings' => ['time' => 'end']
        ],
        'price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'price',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ],
        'discount_price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'price' => 'discount_price',
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ]
        ]
    ];

    public function populate_slot($start, $end, $periodId = null, $price = null, $available = false, $currencySymbolArray = null, $discount = null)
    {
        $this->set('start', $start);
        $this->set('end', $end);
        $this->set('period_id', $periodId);
        $this->set('price', $price);
        if ($discount != null)
        {
            $this->set('discount_price', round(($price * ((100 - $discount) / 100)), 2));
        }
        $this->set('available', $available);
        $this->set('user_discount', $discount);
        $this->set('currency_symbol_left', $currencySymbolArray['left']);
        $this->set('currency_symbol_right', $currencySymbolArray['right']);
    }

    public function get_start()
    {
        return $this->get('start');
    }

    public function get_end()
    {
        return $this->get('end');
    }

    public function is_available()
    {
        return $this->get('available');
    }

    public function get_period_id()
    {
        return $this->get('period_id');
    }

    public function get_price()
    {
        return $this->get('price');
    }

    public function get_currency_symbols()
    {
        return [
            'left' => $this->get('currency_symbol_left'),
            'right' => $this->get('currency_symbol_right')
        ];
    }

    public function get_slot_length()
    {
        return ($this->get('end') - $this->get('start'));
    }

    public function get_minimum_minutes()
    {
        return $this->get_slot_length();
    }

    public function is_aggregate()
    {
        return false;
    }

    public function get_asset_id()
    {
        return null;
    }
}