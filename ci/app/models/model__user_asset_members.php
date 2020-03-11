<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__user_asset_members extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_User_Asset_Member::class);
        parent::__construct();
    }

    protected function _user_can_update($object)
    {
        $member = $this->get_base_object_by_id($object->get_id());
        if ($member->exists_in_db() && !$member->is_null_object())
        {
            $modelUserAsset = Model__user_asset_privileges::class;
            $this->load->model($modelUserAsset);
            if ($this->$modelUserAsset->check_your_privilege($member->get('asset_id'), $this->get_user_id(), Runt_User_Asset_Privilege::get_top_privilege()))
            {
                return true;
            }
            else
            {
                throw new Exception("You don't have access to change this user's details.");
            }
        }
    }

    protected function _user_can_select($object)
    {
        return true;
    }

    protected function _post_update($object)
    {
        $asset_id = $object->get('asset_id');
        $modelAssets = Model__assets::class;
        $this->load->model($modelAssets);
        $asset = $this->$modelAssets->get_asset_object_by_id($asset_id);
        switch ($asset->get_asset_type())
        {
            case Asset_Type::COMPANY:

                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $venues = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($asset_id, true);
                if ($venues->exists_in_db())
                {
                    foreach ($venues->object() as $venue)
                    {
                        $this->_update_child_assets($venue->get_asset_id(), $object);
                    }
                }
            break;

            case Asset_Type::VENUE:

                $modelRooms = Model__room_skeletons::class;
                $this->load->model($modelRooms);
                $rooms = $this->$modelRooms->get_room_object_collection_by_venue_asset_id($asset_id, true, false);
                if ($rooms->exists_in_db())
                {
                    foreach ($rooms->object() as $room)
                    {
                        $this->_update_child_assets($room->get_asset_id(), $object);
                    }
                }
            break;
        }
    }

    private function _update_child_assets($asset_id, $object)
    {
        $member = $this->get_user_by_asset_and_id($asset_id, $object->get('user_id'));
        if ($member->exists_in_db())
        {
            $member->set('discount', $object->get('discount'));
            $this->insert_update($member);
        }
    }

    public function get_all_users_by_asset_id($assetId, $ordering = [])
    {
        return new Runt_User_Asset_Member___Collection($this->_get_all_users_by_asset_id($assetId, $ordering));
    }

    private function _get_all_users_by_asset_id($assetId, $ordering)
    {
        $this->db->where(Runt_User_Asset_Member::column('asset_id'), $assetId);
        return $this->_query_launch(false, $ordering);
    }

    public function get_user_by_asset_and_id($assetId, $userId, $ordering = [])
    {
        return new Runt_User_Asset_Member($this->_get_user_by_asset_and_id($assetId, $userId, $ordering));
    }

    private function _get_user_by_asset_and_id($assetId, $userId, $ordering)
    {
        $this->db->where(Runt_User_Asset_Member::column('asset_id'), $assetId);
        $this->db->where(Runt_User_Asset_Member::column('user_id'), $userId);
        return $this->_query_launch(true, $ordering);
    }

    protected function _query_launch($justOne = true, $ordering)
    {
        $this->db->advanced_join(Runt_User_Asset_Member::class, User::class, Runt_User_Asset_Member::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Profile::column('first_name'), Runt_User_Asset_Member::alias('first_name'));
        $this->db->select_alias(Profile::column('last_name'), Runt_User_Asset_Member::alias('last_name'));
        $this->db->select_alias(Profile::column('phone_number'), Runt_User_Asset_Member::alias('phone_number'));
        $this->db->select_alias(User::column('email'), Runt_User_Asset_Member::alias('email'));
        if ($ordering != null)
        {
            $this->db->order_by(Runt_User_Asset_Member::sort_by_token($ordering['field']), ((!isset($ordering['direction'])?'ASC':$ordering['direction'])));
        }
        else
        {
            $this->db->order_by(Profile::column('first_name'), 'ASC');
            $this->db->order_by(Profile::column('last_name'), 'ASC');
        }
        return $this->_query_init_and_run($justOne);
    }
}