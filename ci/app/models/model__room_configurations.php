<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__room_configurations extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Room_Configuration::class);
        parent::__construct();
    }

    protected function _user_can_select($object)
    {
        return true;
    }

    protected function _user_can_insert($object)
    {
        $retVal = false;
        $user = $this->get_user();
        if ($user !== null)
        {
            if ($user->is_admin())
            {
                $retVal = true;
            }
            else
            {
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                if ($this->$modelUserAsset->check_your_privilege($object->get('asset_id'), $this->get_user_id(), Runt_User_Asset_Privilege::INSERTCHILD))
                {
                    $retVal = true;
                }
            }
        }
        return $retVal;
    }

    protected function _user_can_update($object)
    {
        $retVal = false;
        $user = $this->get_user();
        if ($user !== null)
        {
            if ($user->is_admin())
            {
                $retVal = true;
            }
            else
            {
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                if ($this->$modelUserAsset->check_your_privilege($object->get('asset_id'), $this->get_user_id(), Runt_User_Asset_Privilege::UPDATE))
                {
                    $retVal = true;
                }
            }
        }
        return $retVal;
    }

    public function get_configurations_object_collection_by_asset_id($assetId)
    {
        return new Runt_Room_Configuration___Collection($this->_get_configurations_object_collection_by_asset_id($assetId));
    }

    private function _get_configurations_object_collection_by_asset_id($assetId)
    {
        $this->db->where(Runt_Room_Configuration::column('asset_id'), $assetId);
        return $this->_query_init_and_run(false);
    }
}