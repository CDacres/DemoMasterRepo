<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__daily_price extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Daily_Price::class);
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

    public function get_price_by_asset_id($assetId)
    {
        $object = $this->get_price_object_by_asset_id($assetId);
        return $object->get('daily_rate');
    }

    public function get_price_object_by_asset_id($assetId)
    {
        return new Daily_Price($this->_get_price_object_by_asset_id($assetId));
    }

    private function _get_price_object_by_asset_id($assetId)
    {
        $this->db->where(Daily_Price::column('asset_id'), $assetId);
        return $this->_query_init_and_run();
    }
}