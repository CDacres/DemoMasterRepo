<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__password_update extends Model_Base__Unbound
{
    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($id);
        if ($userRequested && !$this->_user_can_update($user))
        {
            $passwordUpdate = new Base__Null();
        }
        else
        {
            $passwordUpdate = new Password_Update();
            $passwordUpdate->set('id', $id);
        }
        return $passwordUpdate;
    }

    protected function _user_can_update($object)
    {
        if ($object->data_exists('token'))
        {
            return true;
        }
        elseif ($object->get('id') == $this->get_user_id())
        {
            return true;
        }
        else
        {
            throw new Exception("You don't have access to change this user's password.");
        }
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        if (!$object->passwords_match())
        {
            throw new Exception("Please ensure both password fields match.");
        }
        $user = $this->_get_secured_user($object);
        if ($user->exists_in_db())
        {
            if ($object->data_exists('password'))
            {
                $user->set_password($object->get('password'));
                $this->$modelUsers->insert_update($user);
            }
        }
        return $object;
    }

    private function _get_secured_user($object)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($object->get('id'));
        $success = false;
        if ($object->data_exists('old_password'))
        {
            if ($user->check_password($object->get('old_password')))
            {
                $success = true;
            }
            else
            {
                throw new Exception("Sorry - your current password is incorrect.");
            }
        }
        if ($user->data_exists('token'))
        {
            if ($user->check_token($object->get('token')))
            {
                $success = true;
            }
            else
            {
                throw new Exception("Sorry - that token is not valid.");
            }
        }
        if ($success)
        {
            $retObj = $user;
        }
        else
        {
            $retObj = new Base__Null();
        }
        return $retObj;
    }
}