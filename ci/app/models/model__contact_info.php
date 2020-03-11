<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__contact_info extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Contact_Info::class);
        parent::__construct();
    }

    public function get_contact_info_collection()
    {
        return new Contact_Info___Collection($this->_get_contact_info_collection());
    }

    private function _get_contact_info_collection()
    {
        $this->db->order_by(Contact_Info::column('country'));
        return $this->_query_init_and_run(false);
    }

    public function get_default_contact_info_object()
    {
        return new Contact_Info($this->_get_default_contact_info_object());
    }

    private function _get_default_contact_info_object()
    {
        $this->db->where(Contact_Info::column('default'), 1);
        return $this->_query_init_and_run();
    }

    public function get_contact_info_object_from_locale($locale)
    {
        return new Contact_Info($this->_get_contact_info_object_from_locale($locale));
    }

    private function _get_contact_info_object_from_locale($locale)
    {
        $this->db->where(Contact_Info::column('locale'), $locale);
        return $this->_query_init_and_run();
    }
}