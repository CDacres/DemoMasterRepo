<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Duration extends Base__Wrangler
{
    /*
     * data:
     *
     * minutes (int) [from -1439 to +1439 - i.e. +- a day]
     * days (int)
     * start_date_time (datetime)
     * end_date_time (datetime)
     *
     *
     * private: post-populated
     *
     * adjusted_hours
     * adjusted_days
     */

    protected static $_wranglers = [
        'hours' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'adjusted_hours'],
            'hard_bindings' => [
                'singular' => 'common_hour',
                'plural' => 'common_hours'
            ]
        ],
        'days' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'adjusted_days'],
            'hard_bindings' => [
                'singular' => 'common_day',
                'plural' => 'common_days'
            ]
        ],
        'rounded_days' => [
            'object' => 'Wrangler__Plural',
            'method_bindings' => ['number' => ['method' => '_get_rounded_days']],
            'hard_bindings' => [
                'singular' => 'common_day',
                'plural' => 'common_days'
            ]
        ]
    ];

    public function _yield_wrangled_data()
    {
        yield "_formatted" => $this->formatted();
    }

    public function formatted()
    {
        if ($this->get('adjusted_days') != 0)
        {
            $returnString = $this->wrangle('rounded_days')->formatted();
        }
        else
        {
            $returnString = $this->wrangle('hours')->formatted();
        }
        return $returnString;
    }

    public function formatted_exact()
    {
        $returnString = '';
        if ($this->get('adjusted_days') != 0)
        {
            $returnString = $this->wrangle('days')->formatted() . ", ";
        }
        $returnString .= $this->wrangle('hours')->formatted();
        return $returnString;
    }

    public function get_hours()
    {
        return $this->get('adjusted_hours');
    }

    public function get_days()
    {
        return $this->_get_rounded_days();
    }

    protected function _get_rounded_days()
    {
        $days = $this->get('adjusted_days');
        if ($this->get('adjusted_hours') > 0)
        {
            ++$days;
        }
        return $days;
    }

    protected function _post_construction()
    {
        parent::_post_construction();
        $total_minutes = 0;
        if ($this->data_exists('days') || $this->data_exists('minutes'))
        {
            $total_minutes = (($this->get('days') * 1440) + $this->get('minutes'));
        }
        elseif ($this->data_exists('start_date_time') && $this->data_exists('end_date_time'))
        {
            $start = new DateTime($this->get('start_date_time'));
            $end = new DateTime($this->get('end_date_time'));
            $interval = $start->diff($end);
            $total_minutes = ($interval->i + ($interval->h * 60) + ($interval->days * 1440));
        }
        $leftover_minutes = ($total_minutes % 1440);
        $this->set('adjusted_hours', round(($leftover_minutes / 60), 1));
        $this->set('adjusted_days', (($total_minutes - $leftover_minutes) / 1440));
    }
}