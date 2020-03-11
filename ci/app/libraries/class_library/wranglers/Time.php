<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Time extends Base__Wrangler
{
    /*
     * data:
     *
     * time (in minutes)
     */

    function _yield_wrangled_data()
    {
        yield "_formatted" => $this->formatted();
    }

    function formatted()
    {
        return date('H:i', mktime(0, 0, $this->get('time')*60));
    }
}