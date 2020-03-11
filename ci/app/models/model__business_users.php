<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__business_users extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Business_User::class);
        parent::__construct();
    }

    public function get_business_user_by_id($userId)
    {
        return new Runt_Business_User($this->_get_business_user_by_id($userId));
    }

    private function _get_business_user_by_id($userId)
    {
        $this->db->where(Runt_Business_User::column('user_id'), $userId);
        return $this->_query_init_and_run();
    }
}