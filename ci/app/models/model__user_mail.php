<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__user_mail extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(User_Mail::class);
        parent::__construct();
    }

    public function get_by_clicked_token($click_token)
    {
        $this->db->where(User_Mail::column('clicked_token'), $click_token);
        return new User_Mail($this->_query_init_and_run());
    }
}