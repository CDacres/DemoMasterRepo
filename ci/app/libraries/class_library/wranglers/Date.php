<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Date extends Base__Wrangler
{
    /*
     * data:
     *
     * date (yyyy-mm-dd)
     */

    static private $_formatString = "d/m/Y";
    static private $_formatDatepickerString = "dd/mm/yy";

    function _yield_wrangled_data()
    {
        yield "_formatted" => $this->formatted();
    }

    function formatted($type = 'generic')
    {
        $date = new DateTime($this->get('date'));
        if (isset(config_item('languages')[config_item('language_code')]))
        {
            //make sure correct locale exists on server
            setlocale(LC_TIME, config_item('languages')[config_item('language_code')]['locale'], config_item('languages')[config_item('language_code')]['locale'] . '.utf8', config_item('languages')[config_item('language_code')]['locale'] . '.UTF-8');
        }
        switch ($type)
        {
            case "month_year":

                $retString = strftime("%B %Y", $date->getTimestamp());
            break;

            case "admin_full":

                $retString = strftime("%e %b %Y (%a)", $date->getTimestamp());
            break;

            default:

                $retString = $date->format(static::$_formatString);
            break;
        }
        return $retString;
    }

    public static function get_format_string()
    {
        return static::$_formatString;
    }

    public static function get_format_datepicker_string()
    {
        return static::$_formatDatepickerString;
    }
}