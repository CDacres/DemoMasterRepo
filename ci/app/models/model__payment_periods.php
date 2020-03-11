<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__payment_periods extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Payment_Period::class);
        parent::__construct();
    }

    public function get_payment_period_collection()
    {
        return new Payment_Period___Collection($this->_get_payment_period_collection());
    }

    private function _get_payment_period_collection()
    {
        $this->db->order_by(Payment_Period::column('period_year'), 'DESC');
        $this->db->order_by(Payment_Period::column('period_month'), 'DESC');
        return $this->_query_init_and_run(false);
    }
}