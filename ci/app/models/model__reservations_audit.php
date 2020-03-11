<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservations_audit extends Model_Base__Auditor
{
    function __construct()
    {
        $this->_set_base_class(Reservation_Audit::class);
        parent::__construct();
    }

    public function get_reservation_audit_collection_by_id($reservation_id)
    {
        return new Reservation_Audit___Collection($this->_get_reservation_audit_collection_by_id($reservation_id));
    }

    private function _get_reservation_audit_collection_by_id($reservation_id)
    {
        $this->db->advanced_join(Reservation_Audit::class, User::class, Reservation_Audit::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(Reservation_Audit::class, Reservation_Status::class, Reservation_Audit::column('reservation_status_id', false), Reservation_Status::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Reservation_Status::column('name'), Reservation_Audit::alias('status_name'));
        $this->db->select_alias(Profile::column('first_name'), Reservation_Audit::alias('first_name'));
        $this->db->select_alias(Profile::column('last_name'), Reservation_Audit::alias('last_name'));
        $this->db->select_alias(Profile::column('phone_number'), Reservation_Audit::alias('phone_number'));
        $this->db->select_alias(Profile::column('phone_number_search'), Reservation_Audit::alias('phone_number_search'));
        $this->db->select_alias(User::column('email'), Reservation_Audit::alias('email'));
        $this->db->where(Reservation_Audit::column('reservation_id'), $reservation_id);
        $this->db->order_by(Reservation_Audit::column('date_time'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}