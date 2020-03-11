<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Opening_Hours___Collection_Collection_Collection extends Base__Collection
{
    static protected $_staticObjectType = Opening_Hours___Collection_Collection::class;
}

class Opening_Hours___Collection_Collection extends Base__Collection
{
    static protected $_staticObjectType = Opening_Hours___Collection::class;

    function __construct($objectsDataArray = [])
    {
        parent::__construct($objectsDataArray);
    }

    public function as_booked_period($startDate, $endDate, $assetId)
    {
        if (is_string($startDate) || $startDate === null)
        {
            $startDate = new DateTime($startDate);
        }
        if (is_string($endDate) || $endDate === null)
        {
            $endDate = new DateTime($endDate);
        }
        $startTime = $this->_get_opening_time($startDate);
        $endTime = $this->_get_closing_time($startDate, $endDate);
        if ($startTime === null || $endTime === null)
        {
            throw new Exception("We're sorry, but this room is no longer accepting bookings. Please go back to the search page and try again.");
        }
        $bookedPeriod = new Booked_Period();
        $bookedPeriod->set_start_date($startDate);
        $bookedPeriod->set_end_date($endDate);
        $bookedPeriod->set_start($startTime);
        $bookedPeriod->set_end($endTime);
        $bookedPeriod->set('duration_days', $this->duration_days($bookedPeriod->get('start'), $bookedPeriod->get('end')));
        $bookedPeriod->set('all_day', true);
        $bookedPeriod->set('asset_id', $assetId);
        return $bookedPeriod;
    }

    private function _get_opening_time($startDate, $counter = 0)
    {
        if ($counter === 7)
        {
            return null;
        }
        $dayId = $startDate->format('w');
        $dailyOpeningHours = $this->get_object_by_id($dayId);
        if ($dailyOpeningHours->exist(true))
        {
            return $dailyOpeningHours->get_first()->get_start();
        }
        else
        {
            $startDate->modify("+1 day");
            return $this->_get_opening_time($startDate, ($counter + 1));
        }
    }

    private function _get_closing_time($startDate, $endDate, $counter = 0)
    {
        if ($endDate < $startDate || $counter === 7)
        {
            return null;
        }
        $dayId = $endDate->format('w');
        $dailyOpeningHours = $this->get_object_by_id($dayId);
        if ($dailyOpeningHours->exist(true))
        {
            return $dailyOpeningHours->get_last()->get_end();
        }
        else
        {
            $endDate->modify("-1 day");
            return $this->_get_closing_time($startDate, $endDate, ($counter + 1));
        }
    }

    public function max_periods()
    {
        $maxSlots = 0;
        foreach ($this->object() as $dailySlots)
        {
            $maxSlots = max($maxSlots, $dailySlots->get_count());
        }
        return $maxSlots;
    }

    public function get_closed_day_ids() // This will break if we ever move to a different number of days in a week.
    {
        $returnArray = [];
        $i = 0;
        foreach ($this->object() as $daily_opening_hours)
        {
            if ($daily_opening_hours->get_count() === 0)
            {
                $returnArray[] = $i;
            }
            ++$i;
        }
        return $returnArray;
    }

    public function duration_days($startDate, $endDate)
    {
        if (is_string($startDate) || $startDate === null)
        {
            $startDate = new DateTime($startDate);
        }
        if (is_string($endDate) || $endDate === null)
        {
            $endDate = new DateTime($endDate);
        }
        $datesIterator = new DatePeriod($startDate, new DateInterval('P1D'), $endDate);
        $datesArray = iterator_to_array($datesIterator);
        $count = 0;
        foreach ($datesArray as $date)
        {
            $dayId = $date->format('w');
            $dailyOpeningHours = $this->get_object_by_id($dayId);
            if ($dailyOpeningHours->exist(true))
            {
                ++$count;
            }
        }
        if ($startDate->format("H:i:s") === $endDate->format("H:i:s"))
        {
            ++$count;
        }
        return max(($count - 1), 0);
    }
}

class Opening_Hours___Collection extends Abstract__Period___Collection
{
    static protected $_staticObjectType = Opening_Hours::class;

    function __construct($objectsDataArray = [])
    {
        parent::__construct($objectsDataArray);
        $this->_set_label('day');
    }
}

class Opening_Hours extends Abstract__Period
{
    protected static $_tableName = 'opening_periods';
    protected static $_columns = [
        'start' => [
            'pointer' => 'start',
            'validations' => 'is_natural|less_than[1441]'
        ],
        'end' => [
            'pointer' => 'end',
            'validations' => 'is_natural|less_than[1441]'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural_no_zero'
        ],
        'day_id' => [
            'pointer' => 'day_id',
            'validations' => 'is_natural'
        ],
        'minimum_minutes' => [
            'pointer' => 'minimum_minutes',
            'validations' => 'is_natural'
        ],
        'slot_length_minutes' => [
            'pointer' => 'slot_length_minutes',
            'validations' => 'is_natural|less_than[1441]'
        ],
        'aggregate' => [
            'pointer' => 'aggregate',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'day' => [
            'pointer' => 'day',
            'validations' => ''
        ],
        'available' => [
            'pointer' => 'available',
            'validations' => 'is_boolean'
        ],
        'date' => [
            'pointer' => 'date',
            'validations' => 'is_date'
        ],
        'wrapping_day_id' => [
            'pointer' => 'wrapping_day_id',
            'validations' => 'is_natural'
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
        return $this->_get_set('id', $newValue, $setNullIfNull);
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
}