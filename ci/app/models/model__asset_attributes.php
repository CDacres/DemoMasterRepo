<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_attributes extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Asset_Attribute::class);
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

    public function get_attribute_collection_by_id($assetId)
    {
        return new Runt_Asset_Attribute___Collection($this->_get_attribute_collection_by_id($assetId));
    }

    private function _get_attribute_collection_by_id($assetId)
    {
        $this->db->where(Runt_Asset_Attribute::column('asset_id'), $assetId);
        return $this->_query_init_and_run(false);
    }

    public function get_attribute_object_by_asset_and_attribute($assetId, $attributeId)
    {
        return new Runt_Asset_Attribute($this->_get_attribute_object_by_asset_and_attribute($assetId, $attributeId));
    }

    private function _get_attribute_object_by_asset_and_attribute($assetId, $attributeId)
    {
        $this->db->where(Runt_Asset_Attribute::column('asset_id'), $assetId);
        $this->db->where(Runt_Asset_Attribute::column('attribute_id'), $attributeId);
        return $this->_query_init_and_run();
    }
}