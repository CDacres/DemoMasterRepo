<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__user_points extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(User_Point::class);
        parent::__construct();
    }

    public function get_user_points_collection($user_id)
    {
        return new User_Point___Collection($this->_get_user_points_collection($user_id));
    }

    private function _get_user_points_collection($user_id)
    {
        $this->db->where(User_Point::column('user_id'), $user_id);
        return $this->_query_init_and_run(false);
    }

    public function get_total_user_points($user_id)
    {
        return new User_Point($this->_get_total_user_points($user_id));
    }

    private function _get_total_user_points($user_id)
    {
        $this->db->select_sum(User_Point::column('amount'), User_Point::alias('total_amount'));
        $this->db->where(User_Point::column('user_id'), $user_id);
        return $this->_query_init_and_run();
    }
}