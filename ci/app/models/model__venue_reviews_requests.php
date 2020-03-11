<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__venue_reviews_requests extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Venue_Reviews_Request::class);
        parent::__construct();
    }

    protected function _user_can_insert($object)
    {
        $retVal = false;
        if ($object->data_exists('asset_id'))
        {
            $venuesModel = Model__venues::class;
            $this->load->model($venuesModel);
            $venue = $this->$venuesModel->get_venue_object_by_id($object->get('asset_id'));
            if ($venue->exists_in_db())
            {
                $usersModel = Model__users::class;
                $this->load->model($usersModel);
                $user = $this->$usersModel->get_user_by_id($object->get('user_id'));
                if ($user->exists_in_db())
                {
                    $retVal = true;
                }
            }
        }
        return $retVal;
    }

    public function get_venue_review_request_by_user_and_asset_ids($userId, $assetId)
    {
        return new Venue_Reviews_Request($this->_get_venue_review_request_by_user_and_asset_ids($userId, $assetId));
    }

    private function _get_venue_review_request_by_user_and_asset_ids($userId, $assetId)
    {
        $this->db->where(Venue_Reviews_Request::column('user_id'), $userId);
        $this->db->where(Venue_Reviews_Request::column('asset_id'), $assetId);
        return $this->_query_init_and_run();
    }

    public function get_review_audit_by_token($token)
    {
        return new Venue_Reviews_Request($this->_get_review_audit_by_token($token));
    }

    private function _get_review_audit_by_token($token)
    {
        $this->db->advanced_join(Venue_Reviews_Request::class, User::class, Venue_Reviews_Request::column('user_id', false), User::id_column(false), "INNER");
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT");
        $this->db->select_alias(Profile::column('first_name'), Venue_Reviews_Request::alias('first_name'));
        $this->db->select_alias(Profile::column('last_name'), Venue_Reviews_Request::alias('last_name'));
        $this->db->select_alias(User::column('email'), Venue_Reviews_Request::alias('email'));
        $this->db->where(Venue_Reviews_Request::column('review_token'), $token);
        return $this->_query_init_and_run();
    }

    public function remove_review_audit_token($reviewAudit)
    {
        $reviewAudit->set('review_token', null);
        $this->insert_update($reviewAudit);
    }

    public function get_review_audit_collection_by_user_asset_privileges($userId, $ordering = [])
    {
        return new Venue_Reviews_Request___Collection($this->_get_review_audit_collection_by_user_asset_privileges($userId, $ordering));
    }

    private function _get_review_audit_collection_by_user_asset_privileges($userId, $ordering)
    {
        $this->db->advanced_join(Venue_Reviews_Request::class, Runt_User_Asset_Privilege::class, Venue_Reviews_Request::column('asset_id', false), Runt_User_Asset_Privilege::column('asset_id', false), "INNER");
        $this->db->advanced_join(Venue_Reviews_Request::class, User::class, Venue_Reviews_Request::column('user_id', false), User::id_column(false), "INNER");
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT");
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Venue_Reviews_Request::class, Venue::class, Venue_Reviews_Request::column('asset_id', false), Venue::asset_id_column(false), "INNER");
        $this->db->disallow_join_disabled();
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        if ($ordering != null)
        {
            $this->db->order_by(Venue_Reviews_Request::sort_by_token($ordering['field']), ((!isset($ordering['direction'])?'ASC':$ordering['direction'])));
        }
        else
        {
            $this->db->order_by(Venue_Reviews_Request::column('created'), 'DESC');
        }
        $this->db->select_alias(Profile::column('first_name'), Venue_Reviews_Request::alias('first_name'));
        $this->db->select_alias(User::column('email'), Venue_Reviews_Request::alias('email'));
        $this->db->select_alias(Venue::column('name'), Venue_Reviews_Request::alias('venue_name'));
        return $this->_query_init_and_run(false);
    }
}