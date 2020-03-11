<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__enquiry_durations extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Enquiry_Duration::class);
        parent::__construct();
    }

    public function get_enquiry_duration_collection($admin_only = false)
    {
        return new Enquiry_Duration___Collection($this->_get_enquiry_duration_collection($admin_only));
    }

    private function _get_enquiry_duration_collection($admin_only)
    {
        if (!$admin_only)
        {
            $this->db->where(Enquiry_Duration::column('admin_only'), $admin_only);
        }
        return $this->_query_init_and_run(false);
    }
}