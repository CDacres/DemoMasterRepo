<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Available_Period___Collection extends Abstract__Period___Collection
{
    static protected $_staticObjectType = Available_Period::class;

    public function filter_on_length()
    {
        foreach ($this->object() as $id => $object)
        {
            if (is_a($object, Base__Collection::class))
            {
                $object->filter_on_length();
            }
            elseif (!$object->is_long_enough())
            {
                $this->delete_object($id);
            }
        }
    }
}

class Available_Period extends Abstract__Period
{
    protected static $_tableName = 'room_availability';
    protected static $_columns = [
        'start' => [
            'pointer' => 'start',
            'validations' => 'is_natural'
        ],
        'end' => [
            'pointer' => 'end',
            'validations' => 'is_natural'
        ],
        'date' => [
            'pointer' => 'date',
            'validations' => 'is_date'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'period_id' => [
            'pointer' => 'openingPeriod_id',
            'validations' => 'is_natural_no_zero'
        ],
        'available' => [
            'pointer' => 'available',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'minimum_minutes' => [
            'pointer' => 'minimum_minutes',
            'validations' => 'is_natural'
        ],
        'aggregate' => [
            'pointer' => 'aggregate',
            'validations' => 'is_boolean'
        ],
        'slot_length_minutes' => [
            'pointer' => 'slot_length_minutes',
            'validations' => 'is_natural|less_than[1441]'
        ],
        'user_discount' => [
            'pointer' => 'user_discount',
            'validations' => 'is_numeric_positive'
        ]
    ];

    protected function _set_initial_availability()
    {
        $this->set('available', true);
    }

    protected function _available($newValue = null)
    {
        if ($newValue === null)
        {
            return $this->is_true('available');
        }
        else
        {
            return $this->set('available', $newValue);
        }
    }

    protected function _start($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('start', $newValue, $setNullIfNull);
    }

    protected function _end($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('end', $newValue, $setNullIfNull);
    }

    protected function _period_id($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('period_id', $newValue, $setNullIfNull);
    }

    protected function _asset_id($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('asset_id', $newValue, $setNullIfNull);
    }

    protected function _slot_length($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('slot_length_minutes', $newValue, $setNullIfNull);
    }

    protected function _minimum_minutes($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('minimum_minutes', $newValue, $setNullIfNull);
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

    public function is_long_enough()
    {
        $retVal = false;
        $end = $this->get_end();
        $start = $this->get_start();
        if ($start !== null && $end !== null)
        {
            $length = $this->get_minimum_minutes();
            $length = (($length === null)?0:$length);
            if (($end - $start) >= $length)
            {
                $retVal = true;
            }
        }
        return $retVal;
    }
}