<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__currency_change extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Currency_Change::class);
        parent::__construct();
    }

    public function get_currency_change_collection()
    {
        return new Currency_Change___Collection($this->_get_currency_change_collection());
    }

    private function _get_currency_change_collection()
    {
        return $this->_query_init_and_run(false);
    }
}