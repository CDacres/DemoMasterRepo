<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__vat_rates extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Vat_Rate::class);
        parent::__construct();
    }

    public function get_default_vat_rate_by_country($country_code)
    {
        return new Vat_Rate($this->_get_default_vat_rate_by_country($country_code));
    }

    private function _get_default_vat_rate_by_country($country_code)
    {
        $currentDateTime = new DateTime();
        $this->db->where(Vat_Rate::column('country_code'), $country_code);
        $this->db->where(Vat_Rate::column('rate_type'), 'Default');
        $this->db->where(Vat_Rate::column('valid_from') . ' <= ', $currentDateTime->format('Y-m-d H:i:s'));
        $this->db->start_group_where(Vat_Rate::column('valid_to') . ' >= ', $currentDateTime->format('Y-m-d H:i:s'));
        $this->db->or_where(Vat_Rate::column('valid_to'));
        $this->db->close_group_where();
        return $this->_query_init_and_run();
    }

    public function get_vat_rate_by_id($id)
    {
        return new Vat_Rate($this->_get_vat_rate_by_id($id));
    }

    private function _get_vat_rate_by_id($id)
    {
        $currentDateTime = new DateTime();
        $this->db->where(Vat_Rate::id_column(), $id);
        $this->db->where(Vat_Rate::column('valid_from') . ' <= ', $currentDateTime->format('Y-m-d H:i:s'));
        $this->db->start_group_where(Vat_Rate::column('valid_to') . ' >= ', $currentDateTime->format('Y-m-d H:i:s'));
        $this->db->or_where(Vat_Rate::column('valid_to'));
        $this->db->close_group_where();
        return $this->_query_init_and_run();
    }

    public function get_vate_rate_collection()
    {
        return new Vat_Rate___Collection($this->_get_vate_rate_collection());
    }

    private function _get_vate_rate_collection()
    {
        $currentDateTime = new DateTime();
        $this->db->where(Vat_Rate::column('valid_from') . ' <= ', $currentDateTime->format('Y-m-d H:i:s'));
        $this->db->start_group_where(Vat_Rate::column('valid_to') . ' >= ', $currentDateTime->format('Y-m-d H:i:s'));
        $this->db->or_where(Vat_Rate::column('valid_to'));
        $this->db->close_group_where();
        return $this->_query_init_and_run(false);
    }
}