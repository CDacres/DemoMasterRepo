<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Date_Time extends Base__Wrangler
{
    /*
     * data:
     *
     * date (yyyy-mm-dd)
     * time (minutes)
     * datetime (Y-m-d H:i:s)
     */

    protected static $_wranglers = [
        'date' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'date']
        ],
        'time' => [
            'object' => 'Wrangler__Time',
            'data_bindings' => ['time' => 'time']
        ]
    ];

    function _yield_wrangled_data()
    {
        $this->_populate_from_date_time();
        yield "_formatted" => $this->formatted();
    }

    function formatted($type = "generic")
    {
        $this->_populate_from_date_time();
        if (isset(config_item('languages')[config_item('language_code')]))
        {
            //make sure correct locale exists on server
            setlocale(LC_TIME, config_item('languages')[config_item('language_code')]['locale'], config_item('languages')[config_item('language_code')]['locale'] . '.utf8', config_item('languages')[config_item('language_code')]['locale'] . '.UTF-8');
        }
        switch ($type)
        {
            case "admin_full":

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%e %b %Y %k:%M (%a)", $dateTime->getTimestamp());
            break;

            case "admin_ref_date":

                $dateTime = $this->_get_date_time_object();
                $retString = $dateTime->format("dm");
            break;

            case 'inbox':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%d %B, %Y", $dateTime->getTimestamp());
            break;

            case 'inboxtime':

                $dateTime = $this->_get_date_time_object();
                $retString = $dateTime->format("H:i:s");
            break;

            case 'checkout':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%e %B", $dateTime->getTimestamp());
            break;

            case 'checkoutday':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%A", $dateTime->getTimestamp());
            break;

            case 'checkouttime':

                $dateTime = $this->_get_date_time_object();
                $retString = $dateTime->format("H:i");
            break;

            case 'date':

                $retString = $this->wrangle('date')->formatted();
            break;

            case 'time':

                $retString = $this->wrangle('time')->formatted();
            break;

            case 'checkoutfull':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%e %B %H:%M", $dateTime->getTimestamp());
            break;

            case 'expiry':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%B %d, %Y, %k:%M", $dateTime->getTimestamp());
            break;

            case 'venue_payment':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%b %d, %Y", $dateTime->getTimestamp());
            break;

            case 'invoice':

                $dateTime = $this->_get_date_time_object();
                $retString = strftime("%b %d, %H:%M", $dateTime->getTimestamp());
            break;

            default:

                $retString = $this->wrangle('date')->formatted() . " - " . $this->wrangle('time')->formatted();
            break;
        }
        return $retString;
    }

    function date_formatted($type = null)
    {
        $this->_populate_from_date_time();
        return $this->wrangle('date')->formatted($type);
    }

    function format_by_string($formatString = "Y-m-d H:i:s")
    {
        $this->_populate_from_date_time();
        $dtObject = $this->_get_date_time_object();
        $retString = $dtObject->format($formatString);
        return $retString;
    }

    function time_formatted($type = null)
    {
        $this->_populate_from_date_time();
        return $this->wrangle('time')->formatted($type);
    }

    private function _get_date_time_object()
    {
        $dateTime = new DateTime($this->get('date'));
        $dateTime->setTime(0, $this->get('time'), 0);
        return $dateTime;
    }

    private function _populate_from_date_time()
    {
        if (($this->get('date') === null || $this->get('time') === null) && $this->get('datetime') !== null)
        {
            $dateTime = new DateTime($this->get('datetime'));
            $this->set('date', $dateTime->format("Y-m-d"));
            $this->set('time', ($dateTime->format("G") * 60) + ($dateTime->format("i")));
        }
    }
}