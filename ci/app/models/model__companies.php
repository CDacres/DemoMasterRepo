<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Companies Class
 *
 * Company information in database
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */
class Model__companies extends Model_Base__Asset
{
    function __construct()
    {
        $this->_set_base_class(Company::class);
        parent::__construct();
    }

    public function get_company_object_by_user_id($userId)
    {
        return new Company($this->_get_company_object_by_user_id($userId));
    }

    private function _get_company_object_by_user_id($userId)
    {
        $this->_add_users();
        $this->db->where(Company::column('approved'), 1);
        $this->db->where(User::id_column(), $userId);
        return $this->_query_init_and_run();
    }

    public function get_company_object_by_asset_id($asset_id)
    {
        return new Company($this->_get_company_object_by_asset_id($asset_id));
    }

    private function _get_company_object_by_asset_id($asset_id)
    {
        $this->db->where(Company::column('approved'), 1);
        $this->db->where(Company::asset_id_column(), $asset_id);
        return $this->_query_init_and_run();
    }

    public function get_company_object_by_token($token)
    {
        return new Company($this->_get_company_object_by_token($token));
    }

    private function _get_company_object_by_token($token)
    {
        $this->_query_join_venues();
        $this->_select_sub_collection(Venue::class, 'venues');
        $this->_set_sub_collection_ordering(Venue::column('name'), 'venues', 'ASC');
        $this->db->advanced_join(Company::class, Asset_Audit::class, Company::asset_id_column(false), Asset_Audit::id_column(false));
        $this->db->where(Asset_Audit::column('token'), $token);
        $this->db->where(Company::column('approved'), 1);
        return $this->_query_init_and_run();
    }

//    public function get_company_venue_count_by_id($id, $showAll = false)
//    {
//        $this->db->count_rows(true);
//        $this->_query_join_venues();
//        $this->db->where(Company::id_column(), $id);
//        if (!$showAll)
//        {
//            $this->db->where(Venue::column('approved'), 1);
//            $this->db->where(Company::column('approved'), 1);
//        }
//        return $this->_query_init_and_run();
//    }

    protected function _query_join_venues()
    {
        $this->db->advanced_join(Company::class, Venue::class, Company::id_column(false), Venue::column('company_id', false), "INNER");
        $this->db->where(Venue::column('approved'), 1);
    }

    private function _add_users()
    {
        $this->db->advanced_join(Company::class, Runt_User_Asset_Privilege::class, Company::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
    }
}