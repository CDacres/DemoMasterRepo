<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Abstract__Dated_Period___Collection extends Abstract__Period___Collection
{
    static protected $_staticObjectType = Abstract__Dated_Period::class;
}

abstract class Abstract__Dated_Period extends Abstract__Period
{
    protected static $_formatString = "Y-m-d H:i:s";
    protected static $_wranglers = [
        'start_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'method_bindings' => [
                'date' => ['method' => 'get_start_date'],
                'time' => ['method' => 'get_start']
            ]
        ],
        'end_date_time' => [
            'object' => 'Wrangler__Date_Time',
            'method_bindings' => [
                'date' => ['method' => 'get_end_date'],
                'time' => ['method' => 'get_end']
            ]
        ]
    ];

    static public function format_string()
    {
        return static::$_formatString;
    }

    public function get_start_date($confirmed = true)
    {
        $dateTime = new DateTime($this->_get_start_date_time_confirmed($confirmed));
        return $dateTime->format("Y-m-d");
    }

    public function get_end_date($confirmed = true)
    {
        $dateTime = new DateTime($this->_get_end_date_time_confirmed($confirmed));
        return $dateTime->format("Y-m-d");
    }

    public function set_start_date($date)
    {
        if (is_string($date) || $date === null)
        {
            $date = new DateTime($date);
        }
        $this->_set_start_date_time($date->format($this->format_string()));
    }

    public function set_end_date($date)
    {
        if (is_string($date) || $date === null)
        {
            $date = new DateTime($date);
        }
        $this->_set_end_date_time($date->format($this->format_string()));
    }

    protected function _start($newValue = null, $setNullIfNull = false)
    {
        if ($newValue === null && !$setNullIfNull)
        {
            return $this->_get_start_time();
        }
        else
        {
            return $this->_set_start_time($newValue);
        }
    }

    protected function _end($newValue = null, $setNullIfNull = false)
    {
        if ($newValue === null && !$setNullIfNull)
        {
            return $this->_get_end_time();
        }
        else
        {
            return $this->_set_end_time($newValue);
        }
    }

    protected function _get_start_time()
    {
        $dateTime = new DateTime($this->_get_start_date_time_confirmed());
        $minutes = (int)$dateTime->format('i');
        $hours = (int)$dateTime->format('G');
        return ((60 * $hours) + $minutes);
    }

    protected function _get_end_time()
    {
        $dateTime = new DateTime($this->_get_end_date_time_confirmed());
        $minutes = (int)$dateTime->format('i');
        $hours = (int)$dateTime->format('G');
        return ((60 * $hours) + $minutes);
    }

    protected function _set_start_time($newStart)
    {
        $dateTime = new DateTime($this->_get_start_date_time_confirmed());
        $dateTime->setTime(0, $newStart, 0);
        $this->_set_start_date_time($dateTime->format($this->format_string()));
    }

    protected function _set_end_time($newStart)
    {
        $dateTime = new DateTime($this->_get_end_date_time_confirmed());
        $dateTime->setTime(0, $newStart, 0);
        $this->_set_end_date_time($dateTime->format($this->format_string()));
    }

    protected function _get_start_date_time_confirmed($confirmed = true)
    {
        $dateTime = $this->_get_start_date_time();
        if ($confirmed && $dateTime === null)
        {
            throw new Exception("No date set for this reservation. Please try again. If the problem persists, please report it to the Zipcube Team.");
        }
        return $dateTime;
    }

    protected function _get_end_date_time_confirmed($confirmed = true)
    {
        $dateTime = $this->_get_end_date_time();
        if ($confirmed && $dateTime === null)
        {
            throw new Exception("No date set for this reservation. Please try again. If the problem persists, please report it to the Zipcube Team.");
        }
        return $dateTime;
    }

    public function set_start($minutes = 0)
    {
        $this->_set_start_time($minutes);
    }

    public function set_end($minutes = 0)
    {
        $this->_set_end_time($minutes);
    }

    abstract protected function _get_start_date_time();
    abstract protected function _set_start_date_time($newStart);
    abstract protected function _get_end_date_time();
    abstract protected function _set_end_date_time($newStart);
}