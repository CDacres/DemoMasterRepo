<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__user_info_update extends Model_Base__Unbound
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($id);
        if ($userRequested && !$this->_user_can_update($user))
        {
            $userUpdate = new Base__Null();
        }
        else
        {
            $userUpdate = new User_Info_Update();
            $userUpdate->set('id', $id);
        }
        return $userUpdate;
    }

    protected function _user_can_update($object)
    {
        if ($object->get('id') == $this->get_user_id() || $this->user_is_admin())
        {
            return true;
        }
        else
        {
            throw new Exception("You don't have access to change this user's profile information.");
        }
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($object->get('id'));
        if (!$user->exists_in_db())
        {
            $object = new Base__Null();
        }
        else
        {
            $personDetails = [
                (object) [
                    'property' => 'firstname',
                    'value' => $object->get('first_name')
                ],
                (object) [
                    'property' => 'lastname',
                    'value' => $object->get('last_name')
                ],
                (object) [
                    'property' => 'phone',
                    'value' => $object->get('phone_number')
                ],
//                (object) [
//                    'property' => 'type_client',
//                    'value' => $user->find_hubspot_type()
//                ]
            ];
            $hubspot_id = $user->get('hubspot_id');
            if ($hubspot_id != null && $hubspot_id > 0)
            {
                $this->_updateHubspotDetails($hubspot_id, $personDetails);
            }
            $existingUser = $this->$modelUsers->check_for_existing_user_by_email($object->get('email'), $object->get('id'));
            if (!$existingUser->exists_in_db())
            {
                if ($user->get('email') != $object->get('email'))
                {
                    $user->set('email', strtolower($object->get('email')));
                    if (!$object->is_null('never_bounce_status'))
                    {
                        $user->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
                    }
                    $this->$modelUsers->insert_update($user);
                }
                else
                {
                    if (!$object->is_null('never_bounce_status'))
                    {
                        $user->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
                        $this->$modelUsers->insert_update($user);
                    }
                }
                $modelProfiles = Model__profiles::class;
                $this->load->model($modelProfiles);
                $profile = $this->$modelProfiles->get_profile_by_user_id($object->get('id'));
                $profile->set('first_name', trim($object->get('first_name')));
                $profile->set('last_name', trim($object->get('last_name')));
                $profile->set('phone_number', $object->get('phone_number'));
                $profile->set('phone_number_search', preg_replace('/[\s\+]/', '', $object->get('phone_number')));
                $this->$modelProfiles->insert_update($profile);
                if ($hubspot_id != null && $hubspot_id > 0)
                {
                    $emailDetails = [
                        (object) [
                            'property' => 'email',
                            'value' => strtolower($object->get('email'))
                        ]
                    ];
                    if (!$object->is_null('never_bounce_status'))
                    {
                        $emailDetails[] = [
                            (object) [
                                'property' => 'neverbouncevalidationresult',
                                'value' => neverBounceStatusToHubspot($object->get('never_bounce_status'))
                            ]
                        ];
                    }
                    $this->_updateHubspotDetails($hubspot_id, $emailDetails);
                }
                else
                {
                    $this->$modelUsers->get_create_hubspot_id($user);
                }
            }
            else
            {
                throw new Exception("A user with that email address already exists.");
            }
        }
        return $object;
    }

    private function _updateHubspotDetails($hubspot_id, $userArr)
    {
        try
        {
            $this->load->library('HubspotAPI');
            $result = $this->hubspotapi->update_user($hubspot_id, $userArr);
            if (!isset($result['status']) || (isset($result['status']) && $result['status'] != 204))
            {
                error_log("Unable to update user account on Hubspot: " . json_encode($result), 0);
            }
        }
        catch (Exception $exc)
        {
            error_log("Unable to connect to Hubspot: " . $exc->getMessage());
        }
    }
}
