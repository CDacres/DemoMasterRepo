<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**

 * Zipcube Auth Controller Class
 * @package		Zipcube
 * @subpackage  Controllers
 * @category    Auth
 * @author		Andrew
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class Auth extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function facebook_login_callback()
    {
        $get = $this->input->get();
        if (isset($get['code']))
        {
            $this->_verify_access_token($get['code']);
            return;
        }
        $redirect_to = '/' . $this->data['country_lang_url'] . '/users/signin';
        redirect($redirect_to, 'refresh');
    }

    public function facebook_signup_callback()
    {
        $get = $this->input->get();
        if (isset($get['code']))
        {
            $this->_verify_facebook_access_token($get['code']);
            return;
        }
        $redirect_to = '/' . $this->data['country_lang_url'] . '/users/signup';
        redirect($redirect_to, 'refresh');
    }

    private function _verify_facebook_access_token($accessToken)
    {
        $this->load->library('FacebookAPI');
        $data = $this->_convert_graph_object_to_stdClass($this->facebookapi->get_user_profile($accessToken));
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_facebook_user($data->email, $data->id);
        if ($user->exists_in_db())
        {
            return $this->_login_with_facebook($user, $data, $modelUsers);
        }
        return $this->_signup_with_facebook($data, $modelUsers);
    }

    private function _login_with_facebook($user, $data, $modelUsers)
    {
        if ($user->get('fb_id') !== $data->fb_id)
        {
            $user->set('fb_id', $data->fb_id);
            $this->$modelUsers->insert_update($user);
        }
        $this->dx_auth->login($user->get('email'), null, false, false, true);
        $redirect_to = '/' . $this->data['country_lang_url'] . '/dashboard';
        redirect($redirect_to, 'refresh');
    }

    private function _signup_with_facebook($data, $modelUsers)
    {
        $user = $this->$modelUsers->get_user_by_email($data->email);
        if ($user->exists_in_db())
        {
            return error_log('A user already exists with that email address');
        }
        $user->set('fb_id', $data->fb_id);
        $signup_response = $this->_social_signup($user, $data, $modelUsers);
        if ($signup_response['status'])
        {
            return $this->_login_with_facebook($signup_response['user'], $signup_response['data']);
        }
        $redirect_to = '/' . $this->data['country_lang_url'] . '/users/signup';
        redirect($redirect_to, 'refresh');
    }

    private function _convert_graph_object_to_stdClass($fb_user_profile)
    {
        $data = new stdClass();
        $data->fb_id = $fb_user_profile->getProperty('id');
        $data->email = strtolower($fb_user_profile->getProperty('email'));
        $data->first_name = $fb_user_profile->getProperty('first_name');
        $data->last_name = $fb_user_profile->getProperty('last_name');
        return $data;
    }

    private function _social_signup($user, $data, $modelUsers)
    {
        $user->set('email', strtolower($data->email));
        $user->set('email_status', User::EMAILVALID);
        $newProfile = new Profile();
        $newProfile->set('first_name', trim($data->first_name));
        $newProfile->set('last_name', trim($data->last_name));
        $newUser = $this->$modelUsers->create_new_user_with_profile($user, $newProfile);
        if ($newUser->exists_in_db() && $this->dx_auth->login($user->get('email'), null, false, false, true))
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->signup_token($user);
        }
        $this->load->helper('tracking');
        $tracking_helper = new Tracking_Helper();
        $tracking_helper->connect_user_to_current_cookie_and_return_id($user->get_id());
        return [
            'status' => true,
            'user' => $user,
            'data' => $data
        ];
    }

    public function linkedin_login_callback()
    {
        $get = $this->input->get();
        if (isset($get['code']))
        {
            return $this->_verify_linkedin_access_token($get['code'], 'login');
        }
    }

    public function linkedin_signup_callback()
    {
        $get = $this->input->get();
        if (isset($get['code']))
        {
            return $this->_verify_linkedin_access_token($get['code'], 'signup');
        }
    }

    private function _verify_linkedin_access_token($auth_code, $action)
    {
        $this->load->library('LinkedInAPI');
        $response = $this->linkedinapi->get_access_token($auth_code, $action);
        $linkedin_profile = $this->linkedinapi->get_user_profile($response->access_token);
        $data = $this->_convert_linkedin_data($linkedin_profile);
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_linkedin_user($data->email, $data->linkedin_id);
        if ($user->exists_in_db())
        {
            return $this->_login_with_linkedin($user, $data, $modelUsers);
        }
        return $this->_signup_with_linkedin($data, $modelUsers);
    }

    private function _convert_linkedin_data($linkedin_profile)
    {
        $data = new stdClass();
        $data->linkedin_id = $linkedin_profile->id;
        $data->email = strtolower($linkedin_profile->emailAddress);
        $data->first_name = $linkedin_profile->firstName;
        $data->last_name = $linkedin_profile->lastName;
        return $data;
    }

    private function _login_with_linkedin($user, $data, $modelUsers)
    {
        if ($user->get('linkedin_id') !== $data->linkedin_id)
        {
            $user->set('linkedin_id', $data->linkedin_id);
            $this->$modelUsers->insert_update($user);
        }
        $this->dx_auth->login($user->get('email'), null, false, false, true);
        $redirect_to = '/auth/close';
        redirect($redirect_to, 'refresh');
    }

    private function _signup_with_linkedin($data, $modelUsers)
    {
        $user = $this->$modelUsers->get_user_by_email($data->email);
        if ($user->exists_in_db())
        {
            return error_log('A user already exists with that email address');
        }
        $user->set('linkedin_id', $data->linkedin_id);
        $signup_response = $this->_social_signup($user, $data, $modelUsers);
        if ($signup_response['status'])
        {
            return $this->_login_with_linkedin($signup_response['user'], $signup_response['data']);
        }
        $redirect_to = '/' . $this->data['country_lang_url'] . '/users/signup';
        redirect($redirect_to, 'refresh');
    }

    public function close()
    {
        echo "<script type='text/javascript'>";
        echo "window.close();";
        echo "window.onunload = refreshParent;";
        echo "function refreshParent() { window.opener.location.reload();}";
        echo "</script>";
    }
}