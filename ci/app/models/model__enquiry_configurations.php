<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__enquiry_configurations extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Enquiry_Configuration::class);
        parent::__construct();
    }

    public function get_enquiry_configuration_collection_by_id($id)
    {
        return new Runt_Enquiry_Configuration___Collection($this->_get_enquiry_configuration_collection_by_id($id));
    }

    private function _get_enquiry_configuration_collection_by_id($id)
    {
        $this->db->where(Runt_Enquiry_Configuration::column('enquiry_id'), $id);
        return $this->_query_init_and_run(false);
    }
}