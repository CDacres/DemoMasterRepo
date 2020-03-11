<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__promotions extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Promotion::class);
        parent::__construct();
    }

    public function get_current_promotions()
    {
        return new Promotion___Collection($this->_get_current_promotions());
    }

    private function _get_current_promotions()
    {
        return $this->_query_init_and_run(false);
    }
}