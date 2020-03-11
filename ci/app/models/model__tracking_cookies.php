<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__tracking_cookies extends Model_Base__Object
{
    public function __construct()
    {
        $this->_set_base_class(Tracking_Cookie::class);
        parent::__construct();
    }

    public function get_by_token($token)
    {
        $this->db->where(Tracking_Cookie::column('token'), $token);
        return new Tracking_Cookie($this->_query_init_and_run());
    }

    public function get_by_token_id($id)
    {
        $this->db->where(Tracking_Cookie::id_column(), $id);
        return new Tracking_Cookie($this->_query_init_and_run());
    }

    public function get_collection_by_user_id($user_id)
    {
        $this->db->where(Tracking_Cookie::column('user_id'), $user_id);
        return new Tracking_Cookie___Collection($this->_query_init_and_run(false));
    }

    public function get_by_session($session_id)
    {
        $this->db->where(Tracking_Cookie::column('fi_session_id'), $session_id);
        $this->db->or_where(Tracking_Cookie::column('li_session_id'), $session_id);
        $this->db->order_by(Tracking_Cookie::column('created'), 'ASC');
        return new Tracking_Cookie($this->_query_init_and_run());
    }
}