<?php
/**
 * Zipcube Users Controller Class
 *
 * It helps to control the users profile
 *
 * @package		Zipcube
 * @subpackage	Controllers
 * @category	Users
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com

 */

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Users extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->lang->load('users', config_item('language_code'));
        $this->_get_footer_locations();
        $this->_add_js_variable('dynx_pagetype', 'other');
        $this->load->helper('email_helper');
    }

    public function remote_signin()
    {
        $success = false;
        $this->load->library('Form_validation');
        $this->form_validation->set_rules('zc_login_user_name', 'zc_login_user_name', 'required|trim|strtolower|xss_clean');
        $this->form_validation->set_rules('zc_login_password', 'zc_login_password', 'required|trim|xss_clean');
        if ($this->form_validation->run())
        {
            $username = $this->input->post("zc_login_user_name");
            $password = $this->input->post("zc_login_password");
            if ($this->dx_auth->login($username, $password, $this->form_validation->set_value('TRUE')))
            {
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $user = $this->$modelUsers->get_user_by_id($this->dx_auth->get_user_id());
//                if ($this->input->post('remember_me'))
//                {
//                    $this->_set_remember_me_token($user, $modelUsers);
//                }
                $this->load->helper('tracking');
                $tracking_helper = new Tracking_Helper();
                $tracking_helper->connect_user_to_current_cookie_and_return_id($user->get_id());
                $success = true;
                echo $user->get_as_ajax_response();
            }
        }
        if (!$success)
        {
            echo json_encode([
                'error' => [
                    'occurred' => true,
                    'message' => 'Incorrect Username/Password Combination. Please try again.'
                ],
                'data' => []
            ]);
        }
    }

    public function new_remote_signin()
    {
        $success = false;
        $this->load->library('Form_validation');
        $this->form_validation->set_rules('email', 'email', 'required|trim|strtolower|xss_clean');
        $this->form_validation->set_rules('password', 'password', 'required|trim|xss_clean');
        if ($this->form_validation->run())
        {
            $email = $this->input->post("email");
            $password = $this->input->post("password");
            if ($this->dx_auth->login($email, $password, $this->form_validation->set_value('TRUE')))
            {
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $user = $this->$modelUsers->get_user_by_id($this->dx_auth->get_user_id(), true);
//                if ($this->input->post('remember_me'))
//                {
//                    $this->_set_remember_me_token($user, $modelUsers);
//                }
                $this->load->helper('tracking');
                $tracking_helper = new Tracking_Helper();
                $tracking_helper->connect_user_to_current_cookie_and_return_id($user->get_id());
                $success = true;
                echo $user->get_as_ajax_response();
            }
        }
        if (!$success)
        {
            echo json_encode(['error' => ['occurred' => true, 'message' => 'Incorrect Username/Password Combination. Please try again.'], 'data' => []]);
        }
    }

//    private function _set_remember_me_token($user, $modelUsers)
//    {
//        $this->load->helper('cookie');
//        $token = md5(uniqid(rand(), true));
//        $cookie = [
//            'name' => 'zc_rm',
//            'value' => $token,
//            'expire' => 30 * (24 * 60 * 60 * 1000)
//        ];
//        set_cookie($cookie);
//        $user->set('remember_me_token', $token);
//        $this->$modelUsers->insert_update($user);
//    }

    public function new_signin()
    {
        global $IN;
        if ($this->dx_auth->is_logged_in())
        {
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->get_user();
            $lang = $user->get('language_pref');
            $IN->set_cookie('user_lang', $lang, $this->config->item('sess_expiration'));
            $IN->set_cookie('just_logged', "true", $this->config->item('sess_expiration'));
            if ($this->get_display_type() == Controller_Base__Page::MOBILE)
            {
                redirect('/' . $this->data['country_lang_url']);
            }
            else
            {
                if ($this->dx_auth->is_admin())
                {
                    redirect('/' . $this->data['country_lang_url'] . '/administrator/payments/bookings/1', 'refresh');
                }
                else
                {
                    if ($this->session->userdata('redirect_to') !== false)
                    {
                        $redirect_to = $this->session->userdata('redirect_to');
                    }
                    else
                    {
                        $redirect_to = '/' . $this->data['country_lang_url'] . '/dashboard';
                    }
                    redirect($redirect_to, 'refresh');
                }
            }
        }
        $this->load->library('Form_validation');
        $this->load->model('Common_model');
        if ($this->input->post())
        {
            if ($this->dx_auth->is_spoof_mode())
            {
                $usersModel = Model__users::class;
                $this->load->model($usersModel);
                $user = $this->$usersModel->get_user_by_email($this->input->post("username"));
                if ($user->get('role_id') != User::ADMINUSER)
                {
                    $this->_login();
                }
                else
                {
                    $this->dx_auth->set_spoof_mode(false);
                    redirect('/' . $this->data['country_lang_url'] . '/administrator');
                }
            }
            else
            {
                $this->_login();
            }
        }
        if ($this->dx_auth->is_logged_in())
        {
            echo json_encode(['error' => ['occurred' => false], 'data' => []]);
        }
    }

    private function _login()
    {
        if ($this->_check_valid_login())
        {
            $newdata = [
                'user' => $this->dx_auth->get_user_id(),
                'username' => $this->dx_auth->get_username(),
                'logged_in' => TRUE
            ];
            $this->session->set_userdata($newdata);
//            $this->session->set_flashdata('flash_message', $this->Common_model->flash_message('success', 'Logged in successfully.'));
            $this->load->helper('tracking');
            $tracking_helper = new Tracking_Helper();
            $tracking_helper->connect_user_to_current_cookie_and_return_id($this->dx_auth->get_user_id());
//            if ($this->get_display_type() == Controller_Base__Page::MOBILE)
//            {
//                redirect('/' . $this->data['country_lang_url']);
//            }
//            else
//            {
//                if ($this->dx_auth->is_admin())
//                {
//                    redirect('/' . $this->data['country_lang_url'] . '/administrator', 'refresh');
//                }
//                else
//                {
//                    $redirect_to = '/' . $this->data['country_lang_url'] . '/dashboard';
//                    redirect($redirect_to, 'refresh');
//                }
//            }
        }
        else
        {
            echo json_encode(['error' => ['occurred' => true, 'message' => 'Either the username or password is wrong. Please try again!'], 'data' => []]);
//            $this->session->set_flashdata('flash_message', $this->Common_model->flash_message('error', 'Either the username or password is wrong. Please try again!'));
//            redirect($this->data['country_lang_url'] . '/users/signin');
        }
    }

    private function _check_valid_login()
    {
        $this->form_validation->set_error_delimiters($this->config->item('field_error_start_tag'), $this->config->item('field_error_end_tag'));
        $this->form_validation->set_rules('username', 'username', 'required|trim|strtolower|xss_clean');
        $this->form_validation->set_rules('password', 'password', 'required|trim|xss_clean');
        $this->form_validation->set_rules('remember', 'Remember me', 'integer');
        $success = false;
        if ($this->form_validation->run())
        {
            $username = $this->input->post("username");
            $password = $this->input->post("password");
            if ($this->dx_auth->login($username, $password, $this->form_validation->set_value('TRUE')))
            {
                $success = true;
            }
        }
        return $success;
    }

    public function logout()
    {
        $this->dx_auth->logout();
        redirect('/' . $this->data['country_lang_url']);
    }

    public function forgot_password()
    {
        try
        {
            try
            {
                $email = $this->input->post("email", 'is_email');
            }
            catch (Exception $ex)
            {
                throw new Exception("that is not a valid email address");
            }
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->$modelUsers->get_user_by_email($email);
            if (!$user->exists_in_db())
            {
                throw new Exception("we have no record of that email address");
            }
            try
            {
                $plainTextPassword = $user->set_password();
                $this->$modelUsers->insert_update($user);
                $modelComms = Model__comms::class;
                $this->load->model($modelComms);
                $this->$modelComms->password_update($user, $plainTextPassword, $this->data['country_lang_url']);
            }
            catch (Exception $ex)
            {
                throw new Exception("that user account seems to have become corrupted");
            }
            echo $this->_generate_ajax_success("An email has been sent to your email with instructions with how to activate your new password.");
        }
        catch (Exception $ex)
        {
            $errorMessage = "Sorry, we couldn't send a reset email because " . $ex->getMessage() . ". Please check and try again.";
            echo $this->_generate_ajax_error($errorMessage);
        }
    }

    public function token_login()
    {
        try
        {
            $token = $this->input->get('token', 'alpha_numeric|required');
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->$modelUsers->get_user_by_token($token);
            if ($user->exists_in_db())
            {
                $url = '/set-new-password';
                $this->data['user'] = $user;
                $this->_add_js_variable('token', $token);
                $this->_add_js_variable('userId', $user->get_id());
                $this->_add_css('<link href="' . auto_version('checkout.css') . '" media="all" rel="stylesheet" type="text/css" />');
                $this->_add_css('<link href="' . auto_version('save_details.css') . '" media="all" rel="stylesheet" type="text/css" />');
                $this->_add_js(auto_version('users/token_password.js'));
                $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
                $this->data['alternate_url'] = $this->_get_alternate_urls($url);
                $this->data['message_element'] = "users/view_token";
                $this->_add_js_variable('zc_email', $user->get('email'));
                $this->_render();
            }
            else
            {
                redirect('errors/page_missing');
            }
        }
        catch (Exception $ex)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function unsubscribe()
    {
        try
        {
            $token = $this->input->get('_mut', 'alpha_numeric|required');
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->$modelUsers->get_user_by_unsubscribe_token($token, true);
            if ($user->exists_in_db())
            {
                $url = '/unsubscribe';
                $this->_add_css('<link href="' . auto_version('checkout.css') . '" media="all" rel="stylesheet" type="text/css" />');
                $this->_add_css('<link href="' . auto_version('save_details.css') . '" media="all" rel="stylesheet" type="text/css" />');
                $this->data['token'] = $token;
                $this->data['user'] = $user;
                $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
                $this->data['alternate_url'] = $this->_get_alternate_urls($url);
                $confirm = $this->input->get('confirm', 'is_boolean');
                if (isset($confirm) && $confirm)
                {
                    $user->set('marketing_subscribed', 0);
                    $this->$modelUsers->insert_update($user);
                    $this->data['confirmed'] = true;
                    $this->load->helper('analytics');
                    $analytics_helper = new Analytics_Helper();
                    $analytics_helper->register_tracking_event('MARKETING_UNSUBSCRIBE');
                }
                $this->_add_js_variable('zc_email', $user->get('email'));
                $this->data['message_element'] = "users/view_unsubscribe";
                $this->_render();
            }
            else
            {
                redirect('/' . $this->data['country_lang_url']);
            }
        }
        catch (Exception $ex)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function new_signup()
    {
        $this->load->library('Form_validation');
        $this->load->helper('form_helper');
        $this->form_validation->set_rules('first_name', 'First Name', 'required|trim|xss_clean');
        $this->form_validation->set_rules('last_name', 'Last Name', 'required|trim|xss_clean');
        $this->form_validation->set_rules('email','Email','required|trim|strtolower|valid_email|xss_clean|callback__check_user_email');
        $this->form_validation->set_rules('password','Password','required|trim|min_length[8]|max_length[16]|xss_clean|matches[confirmpassword]');
        $this->form_validation->set_rules('confirmpassword','Confirm Password','required|trim|min_length[8]|max_length[16]|xss_clean');
        if ($this->form_validation->run())
        {
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $previousUser = $this->$modelUsers->get_user_by_email($this->input->post('email'));
            if ($previousUser->exists_in_db())
            {
                echo json_encode(['error' => ['occurred' => true, 'message' => 'A user with this email address already exists.'], 'data' => []]);
                return false;
            }
            $first_name = $this->input->post('first_name');
            $last_name = $this->input->post('last_name');
            $email = strtolower($this->input->post('email'));
            $password = $this->input->post('password');
            $phone_number = $this->input->post('phone_number');
            if ($this->input->post('never_bounce_status') != null)
            {
                $never_bounce_status = $this->input->post('never_bounce_status');
            }

            $newUser = new User();
            $newUser->set('email', $email);
            if (isset($never_bounce_status))
            {
                $newUser->set('email_status', neverBounceStatusToEmailStatus($never_bounce_status));
            }
            $newProfile = new Profile();
            $newProfile->set('first_name', $first_name);
            $newProfile->set('last_name', $last_name);
            $newProfile->set('phone_number', $phone_number);
            $newProfile->set('phone_number_search', preg_replace('/[\s\+]/', '', $phone_number));
            $protouser = $this->$modelUsers->create_new_user_with_profile($newUser, $newProfile, $password);
            if ($protouser->exists_in_db() && $this->dx_auth->login($email, $password, 'TRUE'))
            {
                $this->load->helper('tracking');
                $tracking_helper = new Tracking_Helper();
                $tracking_cookie_id = $tracking_helper->connect_user_to_current_cookie_and_return_id($protouser->get_id());
                $protouser->set('tracking_cookie_id', $tracking_cookie_id);
                echo $protouser->get_as_ajax_response();
                return true;
            }
        }
        else
        {
            $this->form_validation->set_error_delimiters('', '');
            echo json_encode(['error' => ['occurred' => true, 'message' => $this->form_validation->error_string()], 'data' => []]);
            return false;
        }
    }

    public function check_for_user()
    {
        try
        {
            $userEmail = $this->input->post('email', 'is_email');
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->$modelUsers->get_user_by_email($userEmail);
            echo json_encode(['data' => ['exists' => $user->exists_in_db(), 'userId' => $user->get_id()]]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function is_logged_in()
    {
        echo json_encode(['data' => $this->dx_auth->is_logged_in()]);
    }
}