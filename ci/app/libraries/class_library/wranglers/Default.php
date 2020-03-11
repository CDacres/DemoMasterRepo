<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Default extends Base__Wrangler
{
    /*
     * data:
     *
     * data (mixed)
     * default (mixed)
     */

    function _yield_wrangled_data()
    {
        yield "" => $this->value();
    }

    function value()
    {
        $CI = &get_instance();
        $data = $this->get('data');
        if ($data === null)
        {
            $data = $CI->lang->line($this->get('default'));
        }
        return trim($data);
    }
}