<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__signup extends Model_Base__Unbound
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
        return new Base__Null();
    }

    public function insert_update($object, $userRequested = false)
    {
        $protouser = new Base__Null();
        if ($object->get('email') !== null)
        {
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $protouser = $this->$modelUsers->get_user_by_email($object->get('email'));
            if (!$protouser->exists_in_db())
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
                if (!$object->is_null('send_token_email') && $object->is_true('send_token_email'))
                {
                    $modelComms = Model__comms::class;
                    $this->load->model($modelComms);
                    $this->$modelComms->signup_token($protouser);
                }
            }
            else
            {
                throw new Exception("The email address is already in use by another user.");
            }
        }
        return $protouser;
    }
}
