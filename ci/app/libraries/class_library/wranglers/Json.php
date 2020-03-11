<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Json extends Base__Wrangler
{
    /*
     * data:
     *
     * data   json
     */

    function _yield_wrangled_data()
    {
        yield null => null;
    }

    function formatted($column)
    {
        $data = json_decode($this->get('data'));
        if (!is_null($data))
        {
            $value = '';
            if (isset($data->$column))
            {
                $value = $data->$column;
            }
            return $value;
        }
    }
}