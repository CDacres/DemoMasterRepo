<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Adopt_Profile extends Controller_Base__Admin
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('DX_Auth');
        $this->load->library('session');
        $this->load->model('model__users');
        $this->load->model('dx_auth/user_temp', 'user_temp');
    }

    public function index($parameter = null)
    {
        global $IN;
        if (is_numeric($parameter))
        {
            $usersModel = Model__users::class;
            $this->load->model($usersModel);
            $user = $this->$usersModel->get_user_by_id($parameter, true);
            $lang = $user->get('language_pref');
            $IN->set_cookie('user_lang', $lang, $this->config->item('sess_expiration'));
            $IN->set_cookie('just_logged', "true", $this->config->item('sess_expiration'));
            if ($user->get('role_id') != User::ADMINUSER)
            {
                $this->dx_auth->set_spoof_mode(true);
                $this->dx_auth->login($user->get('email'), 'spam', false, true);
                redirect('/' . $this->data['country_lang_url'] . '/dashboard/');
            }
            else
            {
                redirect('/' . $this->data['country_lang_url'] . '/administrator');
            }
        }
        else
        {
            redirect('/' . $this->data['country_lang_url'] . '/administrator');
        }
    }
}