<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Abstract__Period___Collection extends Base__Collection
{
    static protected $_staticObjectType = Abstract__Period::class;

    public function populate_from_period_collection(Abstract__Period___Collection $collection)
    {
        foreach ($collection->object() as $oldPeriod)
        {
            $objectType = $this->_objectType;
            $newPeriod = new $objectType();
            $newPeriod->populate_period($oldPeriod->get_start(), $oldPeriod->get_end(), $oldPeriod->get_slot_length(), $oldPeriod->is_available(), $oldPeriod->get_period_id(), $oldPeriod->get_price(), $oldPeriod->get_currency_symbols(), $oldPeriod->get_minimum_minutes(), $oldPeriod->is_aggregate(), $oldPeriod->get_asset_id(), $oldPeriod->get_discount());
            $this->add_object($newPeriod);
        }
    }

    public function push_periods($periods)
    {
        foreach ($periods->object() as $period)
        {
            $this->push_period($period);
        }
    }

    public function push_period(Interface__Period $pushedPeriod)
    {
        $objectType = $this->_objectType;
        $newPeriod = new $objectType();
        $newPeriod->populate_from_period($pushedPeriod);
        $newStart = $newPeriod->get_start();
        $newEnd = $newPeriod->get_end();
        $mergedPeriods = [];
        $embedded = false;
        foreach ($this->object() as $key => $naturalPeriod)
        {
            if ($newStart < $naturalPeriod->get_start() && !$embedded)
            {
                $mergedPeriods[] = $newPeriod;
                $embedded = true;
            }
            if ($naturalPeriod->get_start() < $newStart && $newStart < $naturalPeriod->get_end())
            {
                if ($newEnd < $naturalPeriod->get_end())
                {
                    $mergedPeriods = array_merge($this->_split_period($key, $newPeriod), $mergedPeriods);
                    $embedded = true;
                }
                else
                {
                    $truncatedPeriod = $this->_objects[$key];
                    $truncatedPeriod->set_end($newStart);
                    $mergedPeriods[] = $truncatedPeriod;
                    $mergedPeriods[] = $newPeriod;
                    $embedded = true;
                }
            }
            elseif ($naturalPeriod->get_start() < $newEnd && $newEnd < $naturalPeriod->get_end())
            {
                $truncatedPeriod = $this->_objects[$key];
                $truncatedPeriod->set_start($newEnd);
                $mergedPeriods[] = $truncatedPeriod;
            }
            elseif ($naturalPeriod->get_start() >= $newStart && $naturalPeriod->get_end() <= $newEnd)
            {
                //Don't add the natural period - it has been superceded completely
                if (!$embedded)
                {
                    $mergedPeriods[] = $newPeriod;
                    $embedded = true;
                }
            }
            else
            {
                $mergedPeriods[] = $naturalPeriod;
            }
        }
        if (!$embedded)
        {
            $mergedPeriods[] = $newPeriod;
        }
        $this->_objects = $mergedPeriods;
    }

    private function _split_period($key, $newPeriod)
    {
        $objectType = $this->_objectType;
        $preObject = new $objectType();
        $postObject = new $objectType();
        $originalPeriod = $this->_objects[$key];
        $preObject->populate_period($originalPeriod->get_start(), $newPeriod->get_start(), $originalPeriod->get_slot_length(), $originalPeriod->is_available(), $originalPeriod->get_period_id(), $originalPeriod->get_price(), $originalPeriod->get_currency_symbols(), $originalPeriod->get_minimum_minutes(), $originalPeriod->is_aggregate(), $originalPeriod->get_asset_id(), $originalPeriod->get_discount());
        $postObject->populate_period($newPeriod->get_end(), $originalPeriod->get_end(), $originalPeriod->get_slot_length(), $originalPeriod->is_available(), $originalPeriod->get_period_id(), $originalPeriod->get_price(), $originalPeriod->get_currency_symbols(), $originalPeriod->get_minimum_minutes(), $originalPeriod->is_aggregate(), $originalPeriod->get_asset_id(), $originalPeriod->get_discount());
        return [$preObject,$newPeriod, $postObject];
    }

    public function convert_to_daily_mask($available = false)
    {
        $time = 0;
        $objectType = $this->_objectType;
        $objectArray = [];
        foreach ($this->object() as $period)
        {
            if ($period->get_start() > $time)
            {
                $maskObject = new $objectType();
                $maskObject->populate_period($time, $period->get_start(), null, $available, null, null, null, null, false, null, null);
                $objectArray[] = $maskObject;
            }
            $time = $period->get_end();
        }
        if ($time < 1440)
        {
            $maskObject = new $objectType();
            $maskObject->populate_period($time, 1440, null, $available, null, null, null, null, false, null, null);
            $objectArray[] = $maskObject;
        }
        $this->_objects = $objectArray;
    }

    public function duration_minutes()
    {
        return $this->end_time()-$this->start_time();
    }

    public function start_time()
    {
        return $this->get_first()->get_start();
    }

    public function end_time()
    {
        return $this->get_last()->get_end();
    }

    public function as_slots()
    {
        $slots = new Slot___Collection();
        foreach ($this->object() as $period)
        {
            if ($slots->exist())
            {
                $last = $slots->get_last();
                $previousEnd = $last->get_end();
                $newStart = $period->get_start();
                if ($previousEnd != $newStart)
                {
                    $slot = new Slot();
                    $slot->populate_slot($previousEnd, $newStart);
                    $slots->add_object($slot);
                }
            }
            foreach ($period->as_slots()->object() as $slot)
            {
                $slots->add_object($slot);
            }
        }
        return $slots;
    }

    public function set_available($boolean = true)
    {
        if (!is_bool($boolean))
        {
            $boolean = true;
        }
        foreach ($this->object() as $id => $object)
        {
            $object->set_available($boolean);
        }
    }

    public function filter_on_availability($availableIsTrue = true)
    {
        foreach ($this->object() as $id => $object)
        {
            if (is_a($object, Base__Collection::class))
            {
                $object->filter_on_availability($availableIsTrue);
            }
            elseif ($object->is_available() xor $availableIsTrue)
            {
                $this->delete_object($id);
            }
        }
    }

    public function aggregated_periods_collection($matchSlots = true)
    {
        $collectionType = get_called_class();
        $returnPeriods = new $collectionType();
        $objectType = $this->_objectType;
        foreach ($this->object() as $naturalPeriod)
        {
            $periodObject = new $objectType();
            $currentLast = $returnPeriods->get_last(false, false);
            if (!$currentLast->is_null_object() && ($currentLast->get_end() == $naturalPeriod->get_start()) && ($currentLast->is_available() == $naturalPeriod->is_available()) && (!$matchSlots || (($currentLast->get_slot_length() == $naturalPeriod->get_slot_length()) && ($currentLast->get_minimum_minutes() == $naturalPeriod->get_minimum_minutes()))))
            {
                $periodObject->populate_period($currentLast->get_start(), $naturalPeriod->get_end(), max($naturalPeriod->get_slot_length(), $currentLast->get_slot_length()), $naturalPeriod->is_available(), null, max($naturalPeriod->get_price(), $currentLast->get_price()), $naturalPeriod->get_currency_symbols(), max($naturalPeriod->get_minimum_minutes(), $currentLast->get_minimum_minutes()), true, $naturalPeriod->get_asset_id(), $naturalPeriod->get_discount());
                $returnPeriods->delete_object($returnPeriods->get_last(true, false));
            }
            else
            {
                $periodObject->populate_period($naturalPeriod->get_start(), $naturalPeriod->get_end(), $naturalPeriod->get_slot_length(), $naturalPeriod->is_available(), $naturalPeriod->get_period_id(), $naturalPeriod->get_price(), $naturalPeriod->get_currency_symbols(), $naturalPeriod->get_minimum_minutes(), $naturalPeriod->is_aggregate(), $naturalPeriod->get_asset_id(), $naturalPeriod->get_discount());
            }
            $returnPeriods->add_object($periodObject);
        }
        return $returnPeriods;
    }

    public function as_booked_period($date, $assetId)
    {
        $bookedPeriod = new Booked_Period();
        $bookedPeriod->set_start_date($date);
        $bookedPeriod->set_end_date($date);
        $bookedPeriod->set_start($this->get_first()->get_start());
        $bookedPeriod->set_end($this->get_last()->get_end());
        $bookedPeriod->set('asset_id', $assetId);
        $startDateTime = new DateTime($bookedPeriod->get('start'));
        $endDateTime = new DateTime($bookedPeriod->get('end'));
        $interval = $startDateTime->diff($endDateTime);
        if ($interval->format('%a') >= 1)
        {
            $bookedPeriod->set('all_day', true);
            $bookedPeriod->set('duration_days', $interval->format('%a'));
        }
        else
        {
            $bookedPeriod->set('all_day', false);
            $bookedPeriod->set('duration_days', 0);
        }
        return $bookedPeriod;
    }

    public function get_slots_as_json($message)
    {
        $slots = $this->as_slots();
        return $slots->get_as_ajax_response($message);
    }

    public function filter_on_aggregate($aggregatedIsTrue = true)
    {
        foreach ($this->object() as $id => $object)
        {
            if (is_a($object, Base__Collection::class))
            {
                $object->filter_on_aggregate($aggregatedIsTrue);
            }
            elseif ($object->is_aggregate() xor $aggregatedIsTrue)
            {
                $this->delete_object($id);
            }
        }
    }

    public function get_total_price()
    {
        $runningTotal = 0;
        $success = true;
        foreach ($this->object() as $object)
        {
            $objectTotal = $object->get_total_price();
            if ($objectTotal === null)
            {
                $success = false;
                break;
            }
            else
            {
                $runningTotal += $objectTotal;
            }
        }
        return $runningTotal;
    }
}

abstract class Abstract__Period extends Base__Item  implements Interface__Period
{
    protected static $_aliases = [
        'currency_symbol_left' => [
            'pointer' => 'currency_symbol_left',
            'validations' => ''
        ],
        'currency_symbol_right' => [
            'pointer' => 'currency_symbol_right',
            'validations' => ''
        ],
        'hourly_rate' => [
            'pointer' => 'price_per_hour',
            'validations' => 'is_numeric_positive'
        ],
        'user_discount' => [
            'pointer' => 'user_discount',
            'validations' => 'is_numeric_positive'
        ]
    ];
    protected static $_wranglers = [
        'price' => [
            'object' => 'Wrangler__Price',
            'data_bindings' => [
                'currency_symbol_left' => 'currency_symbol_left',
                'currency_symbol_right' => 'currency_symbol_right'
            ],
            'method_bindings' => ['price' => ['method' => '_price']]
        ],
        'start' => [
            'object' => 'Wrangler__Time',
            'method_bindings' => ['time' => ['method' => 'get_start']]
        ],
        'end' => [
            'object' => 'Wrangler__Time',
            'method_bindings' => ['time' => ['method' => 'get_end']]
        ],
        'duration' => [
            'object' => 'Wrangler__Duration',
            'method_bindings' => [
                'minutes' => ['method' => '_duration_minutes'],
                'days' => ['method' => '_duration_full_days']
            ]
        ]
    ];

    function __construct($populationArray = [])
    {
        parent::__construct($populationArray);
        $this->_set_initial_availability();
    }

    public function get_total_price()
    {
        $pricePerHour = $this->get_price();
        $durationMinutes = $this->_duration_minutes();
        $userDiscount = $this->get_discount();
        if (!($pricePerHour === null || $durationMinutes === null))
        {
            if ($userDiscount == null)
            {
                $retVal = $pricePerHour*($durationMinutes/60);
            }
            else
            {
                $retVal = round(round($pricePerHour * (100 - $userDiscount)/100, 2) * ($durationMinutes/60), 2);
            }
        }
        else
        {
            $retVal = null;
        }
        return $retVal;
    }

    public function populate_period($startTime = null, $endTime = null, $slotLength = null, $available = false, $periodId = null, $price = null, $currencySymbolArray = null, $minimumMinutes = null, $isAggregate = false, $assetId = null, $discount = null)
    {
        $this->_start($startTime, true);
        $this->_end($endTime, true);
        $this->_period_id($periodId, true);
        $this->_price($price, true);
        $this->_discount($discount, true);
        $this->_set_currency_symbols($currencySymbolArray);
        $this->_available($available);
        $this->_slot_length($slotLength, true);
        $this->_minimum_minutes($minimumMinutes, true);
        $this->_asset_id($assetId, true);
        $this->_aggregate($isAggregate);
        $this->set_enabled(true);
    }

    public function populate_from_period(Interface__Period $period)
    {
        $this->populate_period($period->get_start(), $period->get_end(), $period->get_slot_length(), $period->is_available(), $period->get_period_id(), $period->get_price(), $period->get_currency_symbols(), $period->get_minimum_minutes(), $period->is_aggregate(), $period->get_asset_id(), $period->get_discount());
    }

    public function get_start()
    {
        return $this->_start();
    }

    public function get_end()
    {
        return $this->_end();
    }

    public function set_start($start)
    {
        return $this->_start($start, true);
    }

     public function set_end($end)
    {
        return $this->_end($end, true);
    }

    public function is_available()
    {
        return $this->_available();
    }

    public function get_period_id()
    {
        return $this->_period_id();
    }

    public function get_price()
    {
        return $this->_price();
    }

    public function get_currency_symbols()
    {
        return [
            'left' => $this->get('currency_symbol_left'),
            'right' => $this->get('currency_symbol_right')
        ];
    }

    protected function _set_currency_symbols($symbolArray = null)
    {
        if (is_array($symbolArray))
        {
            $this->set('currency_symbol_left', $symbolArray['left']);
            $this->set('currency_symbol_right', $symbolArray['right']);
        }
    }

    public function get_slot_length()
    {
        return $this->_slot_length();
    }

    public function get_minimum_minutes()
    {
        return $this->_minimum_minutes();
    }

    public function is_aggregate()
    {
        return $this->_aggregate();
    }

    public function get_asset_id()
    {
        return $this->_asset_id();
    }

    public function get_discount()
    {
        return $this->_discount();
    }

    public function as_slots()
    {
        $slots = new Slot___Collection();
        $start = $this->get_start();
        $totalPeriod = $this->get_end()-$start;
        $slotLength = $this->get_slot_length();
        $slotPrice = $slotLength * ($this->get_price() / 60);
        $periodId = $this->get_period_id();
        $discount = $this->get_discount();
        $currencySymbolArray = $this->get_currency_symbols();
        $numberOfSlots = floor($totalPeriod / $slotLength);
        for ($i = 0; $i < $numberOfSlots; ++$i)
        {
            $currentStart = ($start + ($i * $slotLength));
            $currentEnd = ($currentStart + $slotLength);
            $slot = new Slot();
            $slot->populate_slot($currentStart, $currentEnd, $periodId, $slotPrice, true, $currencySymbolArray, $discount);
            $slots->add_object($slot);
        }
        return $slots;
    }

    protected function _duration_minutes()
    {
        $end = $this->_end();
        $start = $this->_start();
        if (!($end === null || $start === null))
        {
            $retVal = $end-$start;
        }
        else
        {
            $retVal = null;
        }
        return $retVal;
    }

    protected function _duration_full_days()
    {
        return 0;
    }

    protected function _price($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('hourly_rate', $newValue, $setNullIfNull);
    }

    protected function _discount($newValue = null, $setNullIfNull = false)
    {
        return $this->_get_set('user_discount', $newValue, $setNullIfNull);
    }

    abstract protected function _available($newValue = null);
    abstract protected function _start($newValue = null, $setNullIfNull = false);
    abstract protected function _end($newValue = null, $setNullIfNull = false);
    abstract protected function _period_id($newValue = null, $setNullIfNull = false);
    abstract protected function _asset_id($newValue = null, $setNullIfNull = false);
    abstract protected function _slot_length($newValue = null, $setNullIfNull = false);
    abstract protected function _minimum_minutes($newValue = null, $setNullIfNull = false);
    abstract protected function _aggregate($newValue = null);
    abstract protected function _set_initial_availability();
}