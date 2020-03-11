<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__enquiries_audit extends Model_Base__Auditor
{
    public function __construct()
    {
        $this->_set_base_class(Enquiry_Audit::class);
        parent::__construct();
    }

    public function get_enquiry_audit_collection_by_id($enquiry_id)
    {
        return new Enquiry_Audit___Collection($this->_get_enquiry_audit_collection_by_id($enquiry_id));
    }

    private function _get_enquiry_audit_collection_by_id($enquiry_id)
    {
        $this->db->advanced_join(Enquiry_Audit::class, User::class, Enquiry_Audit::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(Enquiry_Audit::class, Enquiry_Status::class, Enquiry_Audit::column('enquiry_status_id', false), Enquiry_Status::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Enquiry_Status::column('name'), Enquiry_Audit::alias('status_name'));
        $this->db->select_alias(Profile::column('first_name'), Enquiry_Audit::alias('first_name'));
        $this->db->select_alias(Profile::column('last_name'), Enquiry_Audit::alias('last_name'));
        $this->db->select_alias(Profile::column('phone_number'), Enquiry_Audit::alias('phone_number'));
        $this->db->select_alias(Profile::column('phone_number_search'), Enquiry_Audit::alias('phone_number_search'));
        $this->db->select_alias(User::column('email'), Enquiry_Audit::alias('email'));
        $this->db->where(Enquiry_Audit::column('enquiry_id'), $enquiry_id);
        $this->db->order_by(Enquiry_Audit::column('date_time'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}