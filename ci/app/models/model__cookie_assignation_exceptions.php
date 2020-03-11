<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__cookie_assignation_exceptions extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Cookie_Assignation_Exception::class);
        parent::__construct();
    }

    public function triplet_exists($triplet)
    {
        $this->db->where(Cookie_Assignation_Exception::column('cookie_id'), $triplet['cookie_id']);
        $this->db->where(Cookie_Assignation_Exception::column('current_user_id'), $triplet['current_user_id']);
        $this->db->where(Cookie_Assignation_Exception::column('attempted_user_id'), $triplet['attempted_user_id']);
        $triplet_object = new Cookie_Assignation_Exception($this->_query_init_and_run());
        return $triplet_object->exists_in_db();
    }
}