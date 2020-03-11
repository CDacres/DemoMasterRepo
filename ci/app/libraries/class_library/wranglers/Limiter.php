<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Limiter extends Base__Wrangler
{
    /*
     * data:
     *
     * data (string)
     */

    function _yield_wrangled_data()
    {
        yield null => null;
    }

    function limited($length = 20)
    {
        $string = $this->get('data');
        if (strlen($string) > $length)
        {
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
    }
}