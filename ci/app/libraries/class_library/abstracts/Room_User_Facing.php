<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Abstract__Room_User_Facing___Collection extends Room_Skeleton___Collection
{
}

abstract class Abstract__Room_User_Facing extends Room_Skeleton
{
    protected static $_aliases = [
        'minimum_hourly_stay' => ['pointer' => 'min_hourly_stay'],
        'minimum_term' => ['pointer' => 'minimum_term'],
        'minimum_delegates' => ['pointer' => 'minimum_delegates'],
        'max_capacity' => ['pointer' => 'max_capacity'],
        'min_capacity' => ['pointer' => 'min_capacity']
    ];
    protected static $_wranglers = [
        'minimum_hourly_stay' => [
            'object' => 'Wrangler__Duration',
            'data_bindings' => ['minutes' => 'minimum_hourly_stay']
        ],
        'minimum_term' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'minimum_term'],
            'hard_bindings' => [
                'singular' => 'common_month',
                'plural' => 'common_months'
            ]
        ],
        'max_capacity' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'max_capacity'],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ],
        'min_capacity' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'min_capacity'],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];

    public function get_display_price()
    {
        $price = '';
        if (!$this->is_null('user_discount'))
        {
            $hourRate = $this->get('discount_hourly_rate');
            $dayRate = $this->get('discount_daily_rate');
        }
        else
        {
            $hourRate = $this->get('hourly_rate');
            $dayRate = $this->get('daily_rate');
        }
        if ($hourRate > 0)
        {
            $price = $hourRate;
        }
        elseif ($dayRate > 0)
        {
            $price = $dayRate;
        }
        return $price;
    }

    public function get_display_price_period()
    {
        $period = '';
        $hourRate = $this->get('hourly_rate');
        $dayRate = $this->get('daily_rate');
        if ($hourRate > 0)
        {
            $period = 'hour';
        }
        elseif ($dayRate > 0)
        {
            $period = 'day';
        }
        return $period;
    }

    public function capacity_range()
    {
        return $this->get('min_capacity') . " - " . $this->wrangle('max_capacity')->formatted();
    }
}