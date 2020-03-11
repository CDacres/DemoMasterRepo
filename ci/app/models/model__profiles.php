<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__profiles extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Profile::class);
        parent::__construct();
    }

    public function get_profile_by_user_id($id)
    {
        return new Profile($this->_get_profile_by_user_id($id));
    }

    private function _get_profile_by_user_id($id)
    {
        $this->db->advanced_join(Profile::class, User::class, Profile::column('user_id', false), User::id_column(false));
        $this->db->where(User::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_profile_by_phone($phone_number)
    {
        return new Profile($this->_get_profile_by_phone($phone_number));
    }

    private function _get_profile_by_phone($phone_number)
    {
        $this->db->advanced_join(Profile::class, User::class, Profile::column('user_id', false), User::id_column(false));
        $this->db->start_group_where(Profile::column('phone_number'), $phone_number);
        $this->db->or_where(Profile::column('phone_number_search'), $phone_number);
        $this->db->close_group_where();
        return $this->_query_init_and_run();
    }
}