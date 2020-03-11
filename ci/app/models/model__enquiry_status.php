<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__enquiry_status extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Enquiry_Status::class);
        parent::__construct();
    }

    public function get_enquiry_status_collection()
    {
        return new Enquiry_Status___Collection($this->_get_enquiry_status_collection());
    }

    private function _get_enquiry_status_collection()
    {
        $this->db->order_by(Enquiry_Status::column('ordering'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}