<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Plural extends Base__Wrangler
{
    /*
     * data:
     *
     * number   int
     * singular string
     * plural   string
     */

    function _yield_wrangled_data()
    {
        yield null => null;
    }

    function number()
    {
        $retNum = 0;
        if (!$this->is_null('number'))
        {
            $retNum = $this->get('number');
        }
        return $retNum;
    }

    function appropriate_term()
    {
        $CI = &get_instance();
        $number = $this->number();
        $returnValue = '';
        if ($number == 1)
        {
            $returnValue = $CI->lang->line($this->get('singular'));
        }
        else
        {
            $returnValue = $CI->lang->line($this->get('plural'));
        }
        return $returnValue;
    }

    function formatted()
    {
        return $this->number() . " " . $this->appropriate_term();
    }
}