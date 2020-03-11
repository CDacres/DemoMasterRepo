<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Name extends Base__Wrangler
{
    /*
     * data:
     *
     * first_name   string
     * last_name    string
     */

    function _yield_wrangled_data()
    {
        yield null => null;
    }

    function formatted()
    {
        return ucfirst($this->get('first_name')) . " " . ucfirst($this->get('last_name'));
    }
}