<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__currency extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Currency::class);
        parent::__construct();
    }

    public function get_default_currency_object()
    {
        return new Currency($this->_get_default_currency_object());
    }

    private function _get_default_currency_object()
    {
        $this->db->where(Currency::column('default'), 1);
        return $this->_query_init_and_run();
    }

    public function get_currency_object_from_code($code)
    {
        return new Currency($this->_get_currency_object_from_code($code));
    }

    private function _get_currency_object_from_code($code)
    {
        $this->db->where(Currency::column('code'), $code);
        return $this->_query_init_and_run();
    }

    public function get_currency_object_collection()
    {
        return new Currency___Collection($this->_get_currency_object_collection());
    }

    private function _get_currency_object_collection()
    {
        $this->db->order_by(Currency::column('code'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_currency_object_by_country_code($country_code)
    {
        return new Currency($this->_get_currency_object_by_country_code($country_code));
    }

    private function _get_currency_object_by_country_code($country_code)
    {
        $this->db->advanced_join(Currency::class, Runt_Currency_Location::class, Currency::column('code', false), Runt_Currency_Location::column('currency_code', false));
        $this->db->where(Runt_Currency_Location::column('country_code'), $country_code);
        return $this->_query_init_and_run();
    }
}