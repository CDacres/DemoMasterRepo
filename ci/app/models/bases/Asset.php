<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model_Base__Asset extends Model_Base__Object
{
    private $_assetUserAlias = "reserved_asset_user_asset_privileges";
    private $_assetAlias = "reserved_asset";

    public function get_asset_commission_percentage(Abstract__Asset $asset, $bookingChannelId)
    {
        $commissionModel = Model__asset_commissions::class;
        $this->load->model($commissionModel);
        $retObj = $this->$commissionModel->get_commission_object_by_asset_and_channel($asset->get_asset_id(), $bookingChannelId);
        if (!$retObj->exists_in_db())
        {
            $parentClass = $asset->get_parent_class();
            if ($parentClass === null)
            {
                throw new Exception('Cannot determine the correct commission rate for this asset.');
            }
            $modelName = $parentClass::modelName();
            $this->load->model($modelName);
            $retVal = $this->get_asset_commission_percentage($this->$modelName->get_base_object_by_id($asset->get('parent_id')), $bookingChannelId);
        }
        else
        {
            $retVal = $retObj->get('commission_percentage');
        }
        return $retVal;
    }

    protected function _query_init()
    {
        parent::_query_init();
        $user = $this->get_user();
        if ($user !== null && !$user->is_null('id'))
        {
            $baseClass = $this->_get_base_class();
            $this->db->join(Runt_User_Asset_Privilege::tableName() . ' AS ' . $this->_assetUserAlias, $baseClass::asset_id_column() . "=" . Runt_User_Asset_Privilege::column('asset_id', false, $this->_assetUserAlias) . " AND " . Runt_User_Asset_Privilege::column('user_id', false, $this->_assetUserAlias) . "=" . $user->get_id(), 'LEFT' , NULL, $this->_assetUserAlias);
            $this->db->select_alias(Runt_User_Asset_Privilege::column('privileges_mask', false, $this->_assetUserAlias), $baseClass::alias('privileges_mask'));
            $this->db->advanced_join($baseClass, Asset_Audit::class, $baseClass::asset_id_column(false), Asset_Audit::id_column(false), "INNER", NULL, $this->_assetAlias);
            $this->db->select_alias(Asset_Audit::column('token', false, $this->_assetAlias), $baseClass::alias('token'));
        }
    }

    protected function _filter_on_privilege($privilegeConst = null)
    {
        $user = $this->get_user();
        if ($user !== null)
        {
            if ($privilegeConst !== null)
            {
                $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask',false, $this->_assetUserAlias) . " & " . $privilegeConst . "=", $privilegeConst);
            }
            else
            {
                $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask', false, $this->_assetUserAlias) . " >", 0);
            }
        }
        else
        {
            $this->db->where("1=",0,false);
        }
    }

    protected function _filter_on_user_id($userId)
    {
        $user = $this->get_user();
        if ($user !== null)
        {
            $this->db->where(Runt_User_Asset_Privilege::column('user_id', false, $this->_assetUserAlias), $userId);
        }
        else
        {
            $this->db->where("1=",0,false);
        }
    }

    protected function _user_can_insert($object)
    {
        $retVal = false;
        $user = $this->get_user();
        if ($user !== null)
        {
            if ($user->is_unspoofed_admin())
            {
                $retVal = false;
            }
            else
            {
                $parentClass = $object->get_parent_class();
                if ($parentClass !== null)
                {
                    $modelName = $parentClass::modelName();
                    $this->load->model($modelName);
                    $parent = $this->$modelName->get_base_object_by_id($object->get('parent_id'));
                    $retVal = (($parent->wrangle('privileges_mask')->value() & Runt_User_Asset_Privilege::INSERTCHILD) == Runt_User_Asset_Privilege::INSERTCHILD);
                }
                else
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
                $privilegesMask = $object->wrangle('privileges_mask')->value();
                $retVal = (($privilegesMask & Runt_User_Asset_Privilege::UPDATE) == Runt_User_Asset_Privilege::UPDATE);
            }
        }
        return $retVal;
    }

    protected function _user_can_select($object)
    {
        return true;
    }
}