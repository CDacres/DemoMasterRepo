<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Booked_Period___Collection extends Base__Collection
{
    static protected $_staticObjectType = Booked_Period::class;
}

class Booked_Period___Collection_Collection extends Booked_Period___Collection
{
    static protected $_staticObjectType = Booked_Period___Collection::class;

    public function duration_days()
    {
        return $this->get_count(true, false)-1;
    }
}

class Booked_Period extends Abstract__Dated_Period
{
    private $_suppress_availability_update = false;
    private $_releases_full_day = false;

    protected static $_tableName = 'reservation_periods';
    protected static $_columns = [
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'start' => [
            'pointer' => 'start',
            'validations' => 'is_date_time'
        ],
        'end' => [
            'pointer' => 'end',
            'validations' => 'is_date_time'
        ],
        'all_day' => [
            'pointer' => 'allDay',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'period_id' => [
            'pointer' => 'period_id',
            'validations' => 'is_natural'
        ],
        'duration_days' => [
            'pointer' => 'duration_days',
            'validations' => 'is_natural'
        ],
        'hourly_rate' => [
            'pointer' => 'hourly_rate',
            'validations' => 'is_numeric_positive'
        ],
        'user_discount' => [
            'pointer' => 'user_discount',
            'validations' => 'is_numeric_positive'
        ],
        'slot_length_minutes' => [
            'pointer' => 'slot_length_minutes',
            'validations' => 'is_natural'
        ],
        'aggregate' => [
            'pointer' => 'aggregate',
            'validations' => 'is_boolean'
        ],
        'minimum_minutes' => [
            'pointer' => 'minimum_minutes',
            'validations' => 'is_natural'
        ]
    ];

    protected function _period_id($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('period_id', $newValue, $setNullIfNull);
    }

    protected function _asset_id($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('asset_id', $newValue, $setNullIfNull);
    }

    protected function _price($newValue = null, $setNullIfNull = false)
    {
        return null;
    }

    protected function _discount($newValue = null, $setNullIfNull = false)
    {
        return null;
    }

    protected function _slot_length($newValue = null, $setNullIfNull = false)
    {
        return null;
    }

    protected function _minimum_minutes($newValue = null, $setNullIfNull = false)
    {
        return null;
    }

    protected function _aggregate($newValue = null)
    {
        if ($newValue === null)
        {
            return $this->is_true('aggregate');
        }
        else
        {
            return $this->set('aggregate', $newValue);
        }
    }

    protected function _available($newValue = null)
    {
        return false;
    }

    public function _duration_full_days()
    {
        return $this->get('duration_days');
    }

    public function is_daily()
    {
        if ($this->is_null('all_day'))
        {
            $this->set_appropriate_all_day_flag();
        }
        return $this->get('all_day');
    }

    public function get_start_date($confirmed = true)
    {
        $dateTime = new DateTime($this->get('start'));
        return $dateTime->format("Y-m-d");
    }

    public function set_start_from_unixtime($unixtimestamp)
    {
        $dateTime = new DateTime();
        $dateTime->setTimestamp($unixtimestamp);
        $this->set('start', $dateTime->format("Y-m-d H:i:s"));
    }

    public function set_end_from_unixtime($unixtimestamp)
    {
        $dateTime = new DateTime();
        $dateTime->setTimestamp($unixtimestamp);
        $this->set('end', $dateTime->format("Y-m-d H:i:s"));
    }

    public function release()
    {
        $this->should_release_full_day();
        $this->set_enabled(false);
    }

    public function releases_full_day()
    {
        return $this->_releases_full_day;
    }

    public function should_release_full_day()
    {
        $this->_releases_full_day = true;
    }

    public function suppress_availability_update()
    {
        $this->_suppress_availability_update = true;
    }

    public function requires_availability_update()
    {
        return !$this->_suppress_availability_update;
    }

    public function set_appropriate_all_day_flag()
    {
        $date = $this->get_start_date();
        if ($date != $this->get_end_date())
        {
            $this->set('all_day', true);
        }
        else
        {
            $this->set('all_day', false);
        }
    }

    protected function _get_start_date_time()
    {
        return $this->get('start');
    }

    protected function _get_end_date_time()
    {
        return $this->get('end');
    }

    protected function _set_start_date_time($newValue)
    {
        return $this->set('start', $newValue);
    }

    protected function _set_end_date_time($newValue)
    {
        return $this->set('end', $newValue);
    }

    protected function _set_initial_availability()
    {
        return true;
    }
}