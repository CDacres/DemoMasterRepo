<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__hourly_price extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Hourly_Price::class);
        parent::__construct();
    }

    public function get_hourly_price_object_by_opening_period_id($id)
    {
        return new Hourly_Price($this->_get_hourly_price_object_by_opening_period_id($id));
    }

    private function _get_hourly_price_object_by_opening_period_id($id)
    {
        $this->db->where(Hourly_Price::column('period_id'), $id);
        return $this->_query_init_and_run();
    }
}