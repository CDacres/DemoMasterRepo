<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_user_member extends Model__asset_member
{
    public function get_base_object_by_id($id, $userRequested = false)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($id);
        if ($user->exists_in_db())
        {
            if ($userRequested && !$this->_user_can_update($user))
            {
                $userUpdate = new Base__Null();
            }
            else
            {
                $userUpdate = new Asset_User_Member();
                $userUpdate->set('id', $user->get_id());
            }
        }
        return $userUpdate;
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelAssets = Model__assets::class;
        $this->load->model($modelAssets);
        $asset = $this->$modelAssets->get_asset_object_by_id($object->get('asset_id'));
        if ($asset->exists_in_db())
        {
            switch ($asset->get_asset_type())
            {
                case Asset_Type::COMPANY:

                    $modelCompanies = Model__companies::class;
                    $this->load->model($modelCompanies);
                    $assetObj = $this->$modelCompanies->get_company_object_by_asset_id($asset->get_id());
                break;

                case Asset_Type::VENUE:

                    $modelVenues = Model__venues::class;
                    $this->load->model($modelVenues);
                    $assetObj = $this->$modelVenues->get_venue_object_by_asset_id($asset->get_id(), true);
                break;

                case Asset_Type::ROOM:

                    $modelRooms = Model__room_skeletons::class;
                    $this->load->model($modelRooms);
                    $assetObj = $this->$modelRooms->get_room_object_by_asset_id($asset->get_id(), true, false);
                break;
            }
            if ($assetObj->exists_in_db())
            {
                if ($object->get('email') !== null)
                {
                    $modelUsers = Model__users::class;
                    $this->load->model($modelUsers);
                    $protouser = $this->$modelUsers->get_user_by_email($object->get('email'));
                    if ($protouser->exists_in_db())
                    {
                        $this->_set_user_asset_membership($asset, $protouser->get_id(), $object->get('discount'), Member_Type::EXISTINGMEMBER);
                    }
                    else
                    {
                        $newUser = new User();
                        $newUser->set('email', strtolower($object->get('email')));
                        if (!$object->is_null('never_bounce_status'))
                        {
                            $newUser->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
                        }
                        $newProfile = new Profile();
                        $newProfile->set('first_name', trim($object->get('first_name')));
                        $newProfile->set('last_name', trim($object->get('last_name')));
                        $newProfile->set('phone_number', $object->get('phone_number'));
                        $newProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $object->get('phone_number')));
                        $protouser = $this->$modelUsers->create_new_user_with_profile($newUser, $newProfile);
                        $this->_set_user_asset_membership($asset, $protouser->get_id(), $object->get('discount'), Member_Type::NEWMEMBER);
                        $modelComms = Model__comms::class;
                        $this->load->model($modelComms);
                        $this->$modelComms->asset_user_member_created($protouser, $assetObj, false);
                    }
                }
            }
        }
        return $object;
    }

    private function _set_user_asset_membership($asset, $user_id, $discount, $member_type)
    {
        $asset_id = $asset->get_asset_id();
        $modelUserAssetMembers = Model__user_asset_members::class;
        $this->load->model($modelUserAssetMembers);
        $asset_user = $this->$modelUserAssetMembers->get_user_by_asset_and_id($asset_id, $user_id);
        if (!$asset_user->exists_in_db())
        {
            $asset_user = new Runt_User_Asset_Member();
            $asset_user->set('user_id', $user_id);
            $asset_user->set('asset_id', $asset_id);
            $asset_user->set('discount', $discount);
            $asset_user->set('member_type', $member_type);
            $asset_user->set('created', date("Y-m-d H:i:s"));
            $this->$modelUserAssetMembers->insert_update($asset_user);
        }
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
                        $this->_set_user_asset_membership($venue, $user_id, $discount, $member_type);
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
                        $this->_set_user_asset_membership($room, $user_id, $discount, $member_type);
                    }
                }
            break;
        }
    }
}
