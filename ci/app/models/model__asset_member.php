<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_member extends Model_Base__Unbound
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
    }

    protected function _user_can_update($user)
    {
        if ($this->get_user_id() == $user->get('id'))
        {
            return true;
        }
        elseif ($this->input->post('asset_id'))
        {
            $asset_id = $this->input->post('asset_id');
            $modelUserAsset = Model__user_asset_privileges::class;
            $this->load->model($modelUserAsset);
            if ($this->$modelUserAsset->check_your_privilege($asset_id, $this->get_user_id(), Runt_User_Asset_Privilege::get_top_privilege()))
            {
                return true;
            }
            else
            {
                throw new Exception("You don't have access to change this user's details.");
            }
        }
        else
        {
            throw new Exception("You don't have access to change this user's details.");
        }
    }

    public function insert_update($object, $userRequested = false)
    {
    }
}