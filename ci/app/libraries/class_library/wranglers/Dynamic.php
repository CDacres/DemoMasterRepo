<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Dynamic extends Base__Wrangler
{
    /*
     * data:
     *
     * data   multi
     */

    function _yield_wrangled_data()
    {
        yield '' => $this->get_data();
    }

    function get_data()
    {
        return $this->get('data');
    }
}