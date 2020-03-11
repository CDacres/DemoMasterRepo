<?php

class MY_Model extends CI_Model
{
    private $_currentUser;

    public function get_user()
    {
        return $this->_currentUser;
    }

    public function get_user_id()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->get('id');
        }
        return $retVal;
    }

    public function user_is_admin()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->is_admin();
        }
        return $retVal;
    }

    public function user_is_admin_in_spoofmode()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->is_admin_in_spoofmode();
        }
        return $retVal;
    }

    public function user_is_logged_in()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->exists_in_db();
        }
        return $retVal;
    }

    public function set_user(User $user = null)
    {
        $this->_currentUser = $user;
    }

    public function set_environment(User $user = null)
    {
        $this->set_user($user);
    }
}