<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__user_asset_privileges extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_User_Asset_Privilege::class);
        parent::__construct();
    }

    public function get_other_privileged_users_by_asset($assetId, $userId)
    {
        return new Runt_User_Asset_Privilege___Collection($this->_get_other_privileged_users_by_asset($assetId, $userId));
    }

    private function _get_other_privileged_users_by_asset($assetId, $userId)
    {
        $this->db->where(Runt_User_Asset_Privilege::column('asset_id'), $assetId);
        $this->db->where(Runt_User_Asset_Privilege::column('user_id') . ' <>', $userId);
        return $this->_query_init_and_run(false);
    }

    public function get_privilege_by_asset_and_user($assetId, $userId)
    {
        return new Runt_User_Asset_Privilege($this->_get_privilege_by_asset_and_user($assetId, $userId));
    }

    private function _get_privilege_by_asset_and_user($assetId, $userId)
    {
        $this->db->where(Runt_User_Asset_Privilege::column('asset_id'), $assetId);
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        return $this->_query_init_and_run();
    }

    public function check_your_privilege($assetId, $userId, $privilegeConst = null)
    {
        if ($this->user_is_admin())
        {
            $retVal = true;
        }
        else
        {
            $this->db->where(Runt_User_Asset_Privilege::column('asset_id'), $assetId);
            $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
            if ($privilegeConst !== null)
            {
                $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask') . " & " . $privilegeConst . "=", $privilegeConst);
            }
            else
            {
                $this->db->where(Runt_User_Asset_Privilege::column('privileges_mask') . " >", 0);
            }
            $result = $this->_query_init_and_run();
            $retVal = !empty($result);
        }
        return $retVal;
    }
}