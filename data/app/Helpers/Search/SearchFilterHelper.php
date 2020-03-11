<?php

namespace App\Helpers\Search;

class SearchFilterHelper
{
    private $_request;
    private $_suppress_filters = false;

    public function __construct($request)
    {
        $this->_request = $request;
    }

    public function get_amenities($removeFakes = true)
    {
        $potential = (($this->_suppress_filters)?null:$this->_request->query('amenities', []));
        $raw_array = ((is_array($potential))?$potential:[]);
        if ($removeFakes)
        {
            $callback = function($var)
            {
                return $var > 0;
            };
            $ret_array = array_filter($raw_array, $callback);
        }
        else
        {
            $ret_array = $raw_array;
        }
        return $ret_array;
    }

    public function has_amenities()
    {
        return (count($this->get_amenities()) > 0);
    }

    public function suppress_filters()
    {
        $this->_suppress_filters = true;
    }

    public function has_suppressed_filters()
    {
        return $this->_suppress_filters;
    }

    public function get_configurations()
    {
        $potential = $this->_request->query('configurations', []);
        return ((is_array($potential))?$potential:[]);
    }

    public function has_atts()
    {
        return (count($this->get_atts()) > 0);
    }

    public function get_atts()
    {
        $potential = (($this->_suppress_filters)?null:$this->_request->query('atts', []));
        return ((is_array($potential))?$potential:[]);
    }

    public function has_max_capacity()
    {
        $max_cap = $this->get_min_capacity();
        return (!is_null($max_cap) && is_numeric($max_cap));
    }

    public function get_min_capacity()
    {
        return $this->_request->query('guests', null);
    }

    public function has_prices()
    {
        return (!is_null($this->_request->query('min_price', null)) || !is_null($this->_request->query('max_price', null)));
    }

    public function get_prices()
    {
        $ret_arr = [];
        $min_amount = $this->_request->query('min_price', null);
        if (!is_null($min_amount))
        {
            $min = new \stdClass();
            $min->type = 'min';
            $min->amount = $min_amount;
            $ret_arr[] = $min;
        }
        $max_amount = $this->_request->query('max_price', null);
        if (!is_null($max_amount))
        {
            $max = new \stdClass();
            $max->type = 'max';
            $max->amount = $max_amount;
            $ret_arr[] = $max;
        }
        return $ret_arr;
    }

    public function has_time_date_or_duration()
    {
        return $this->has_time() || $this->has_date() || $this->has_duration();
    }

    public function has_time()
    {
        return !is_null($this->get_time());
    }

    public function get_time()
    {
        $time = $this->_request->query('time', null);
        return (($this->_check_valid_minutes($time))?$time:null);
    }

    public function has_date()
    {
        return !is_null($this->get_date());
    }

    public function get_date()
    {
        $date = $this->_request->query('date', null);
        return ((!is_null($date) && (date("d-m-Y", strtotime($date)) == $date))?$date:null);
    }

    public function has_duration()
    {
        return !is_null($this->get_duration());
    }

    public function get_duration()
    {
        $duration = 60 * $this->_request->query('duration', null);
        return (($this->_check_valid_minutes($duration))?$duration:null);
    }

    private function _check_valid_minutes($minutes)
    {
        return
            !is_null($minutes)
            && is_numeric($minutes)
            && $minutes < 24*60 // minutes in a day
            && $minutes > 0;
    }
}