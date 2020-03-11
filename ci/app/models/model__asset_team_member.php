<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_team_member extends Model__asset_member
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
                $userUpdate = new Asset_Team_Member();
                $userUpdate->set('id', $user->get_id());
            }
        }
        return $userUpdate;
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelCompanies = Model__companies::class;
        $this->load->model($modelCompanies);
        $company = $this->$modelCompanies->get_company_object_by_asset_id($object->get('asset_id'));
        if ($company->exists_in_db())
        {
            if (!$object->is_null('password') && !$object->is_null('password_confirmation') && !$object->passwords_match())
            {
                throw new Exception("Please ensure both password fields match.");
            }
            else
            {
                $company_asset_id = $company->get_asset_id();
                $modelUserAsset = Model__user_asset_privileges::class;
                $this->load->model($modelUserAsset);
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $modelRooms = Model__room_skeletons::class;
                $this->load->model($modelRooms);
                $modelComms = Model__comms::class;
                $this->load->model($modelComms);
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $user = $this->$modelUsers->get_user_by_id($object->get('id'));
                if ($user->exists_in_db())
                {
                    $userId = $user->get_id();
                    $company_user = $this->$modelUserAsset->get_privilege_by_asset_and_user($company_asset_id, $userId);
                    $user->set('email', strtolower($object->get('email')));
                    if (!$object->is_null('never_bounce_status'))
                    {
                        $user->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
                    }
                    $user->set('user_type_id', User::ASSETOWNER);
                    $this->$modelUsers->insert_update($user);
                    $modelProfiles = Model__profiles::class;
                    $this->load->model($modelProfiles);
                    $user_profile = $this->$modelProfiles->get_profile_by_user_id($userId);
                    $user_profile->set('first_name', trim($object->get('first_name')));
                    $user_profile->set('last_name', trim($object->get('last_name')));
                    $user_profile->set('phone_number', $object->get('phone_number'));
                    $user_profile->set('phone_number_search', preg_replace('/[\s\+]/', '', $object->get('phone_number')));
                    $this->$modelProfiles->insert_update($user_profile);
                    if ($this->get_user_id() == $userId)
                    {
                        if (!$object->is_null('old_password') && !$object->is_null('password') && !$object->is_null('password_confirmation'))
                        {
                            $modelPasswordUpdate = Model__password_update::class;
                            $this->load->model($modelPasswordUpdate);
                            $userPasswordUpdate = $this->$modelPasswordUpdate->get_base_object_by_id($userId);
                            $userPasswordUpdate->set('old_password', $object->get('old_password'));
                            $userPasswordUpdate->set('password', $object->get('password'));
                            $userPasswordUpdate->set('password_confirmation', $object->get('password_confirmation'));
                            $this->$modelPasswordUpdate->insert_update($userPasswordUpdate);
                        }
                    }
                    else
                    {
                        if ($object->is_true('generate_password'))
                        {
                            $userPassword = $user->set_password();
                        }
                        elseif ($object->data_exists('password'))
                        {
                            $userPassword = $user->set_password($object->get('password'));
                        }
                        if (isset($userPassword))
                        {
                            $this->$modelUsers->insert_update($user);
                            $this->$modelComms->asset_member_updated_password($user, $userPassword, $company);
                        }
                    }
                    if ($object->is_true('venue_admin') && $this->input->post('venues') != null)
                    {
                        if ($company_user->exists_in_db())
                        {
                            $this->$modelUserAsset->delete($company_user);
                        }
                        $venues = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($company_asset_id, true);
                        if ($venues->exists_in_db())
                        {
                            foreach ($venues->object() as $venue)
                            {
                                $venue_asset_id = $venue->get_asset_id();
                                $venue_user = $this->$modelUserAsset->get_privilege_by_asset_and_user($venue_asset_id, $userId);
                                if ($venue_user->exists_in_db())
                                {
                                    $this->$modelUserAsset->delete($venue_user);
                                    $rooms = $this->$modelRooms->get_room_object_collection_by_venue_asset_id($venue_asset_id, true, false);
                                    if ($rooms->exists_in_db())
                                    {
                                        foreach ($rooms->object() as $room)
                                        {
                                            $room_user = $this->$modelUserAsset->get_privilege_by_asset_and_user($room->get_asset_id(), $userId);
                                            if ($room_user->exists_in_db())
                                            {
                                                $this->$modelUserAsset->delete($room_user);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $this->_set_venue_privileges($company, $userId, $modelUserAsset, $modelVenues, $modelRooms);
                    }
                    elseif ($object->is_true('company_admin') && !$company_user->exists_in_db())
                    {
                        $this->_set_user_company_privilege($company, $userId, $modelUserAsset, $modelVenues, $modelRooms);
                    }
                }
                else
                {
                    if ($object->get('email') !== null)
                    {
                        $protouser = $this->$modelUsers->get_user_by_email($object->get('email'));
                        if (!$protouser->exists_in_db())
                        {
                            $newUser = new User();
                            $newUser->set('email', strtolower($object->get('email')));
                            $newUser->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
                            $newUser->set('user_type_id', User::ASSETOWNER);
                            $newProfile = new Profile();
                            $newProfile->set('first_name', trim($object->get('first_name')));
                            $newProfile->set('last_name', trim($object->get('last_name')));
                            $newProfile->set('phone_number', $object->get('phone_number'));
                            $newProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $object->get('phone_number')));
                            if ($object->is_true('generate_password'))
                            {
                                $userPassword = $newUser->set_password();
                            }
                            elseif ($object->data_exists('password'))
                            {
                                $userPassword = $newUser->set_password($object->get('password'));
                            }
                            $protouser = $this->$modelUsers->create_new_user_with_profile($newUser, $newProfile, $userPassword);
                            $protouserId = $protouser->get_id();
                            if ($object->is_true('company_admin'))
                            {
                                $this->_set_user_company_privilege($company, $protouserId, $modelUserAsset, $modelVenues, $modelRooms);
                                $this->$modelComms->asset_team_member_created($protouser, $userPassword, $company, $object);
                            }
                            elseif ($object->is_true('venue_admin') && $this->input->post('venues') != null)
                            {
                                $this->_set_venue_privileges($company, $protouserId, $modelUserAsset, $modelVenues, $modelRooms);
                                $this->$modelComms->asset_team_member_created($protouser, $userPassword, $company, $object);
                            }
                            else
                            {
                                throw new Exception("There are no venues chosen.");
                            }
                        }
                        else
                        {
                            throw new Exception("The email address is already in use by another user.");
                        }
                    }
                }
            }
        }
        return $object;
    }

    private function _set_user_company_privilege($company, $user_id, $modelUserAsset, $modelVenues, $modelRooms)
    {
        $company_asset_id = $company->get_asset_id();
        $asset_user = new Runt_User_Asset_Privilege();
        $asset_user->set('user_id', $user_id);
        $asset_user->set('asset_id', $company_asset_id);
        $asset_user->set('privileges_mask', $asset_user::get_top_privilege());
        $this->$modelUserAsset->insert_update($asset_user);
        $venues = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($company_asset_id, true);
        if ($venues->exists_in_db())
        {
            foreach ($venues->object() as $venue)
            {
                $this->_set_user_venue_privilege($company, $venue, $user_id, $modelUserAsset, $modelRooms);
            }
        }
    }

    private function _set_venue_privileges($company, $userId, $modelUserAsset, $modelVenues, $modelRooms)
    {
        foreach ($this->input->post('venues') as $venue)
        {
            $user_venue = $this->$modelVenues->get_venue_object_by_id($venue, true);
            if ($user_venue->exists_in_db())
            {
                $this->_set_user_venue_privilege($company, $user_venue, $userId, $modelUserAsset, $modelRooms);
            }
            else
            {
                throw new Exception("A chosen venue doesn't exist.");
            }
        }
    }

    private function _set_user_venue_privilege($company, $venue, $user_id, $modelUserAsset, $modelRooms)
    {
        $venue_asset_id = $venue->get_asset_id();
        $this->_set_child_asset_privileges($company, $venue_asset_id, $user_id, $modelUserAsset);
        $rooms = $this->$modelRooms->get_room_object_collection_by_venue_asset_id($venue_asset_id, true, false);
        if ($rooms->exists_in_db())
        {
            foreach ($rooms->object() as $room)
            {
                $this->_set_child_asset_privileges($venue, $room->get_asset_id(), $user_id, $modelUserAsset);
            }
        }
    }

    private function _set_child_asset_privileges($parent, $asset_id, $user_id, $modelUserAsset)
    {
        $asset_user = $this->$modelUserAsset->get_privilege_by_asset_and_user($asset_id, $user_id);
        if (!$asset_user->exists_in_db())
        {
            $asset_user = new Runt_User_Asset_Privilege();
            $asset_user->set('user_id', $user_id);
            $asset_user->set('asset_id', $asset_id);
        }
        $asset_user->set('privileges_mask', $parent->wrangle('privileges_mask')->value());
        $this->$modelUserAsset->insert_update($asset_user);
    }
}
