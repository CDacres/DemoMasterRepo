<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Spoof extends Controller_Base__Page
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('DX_Auth');
        $this->load->library('session');
        $this->load->model('model__users');
        $this->load->model('dx_auth/user_temp', 'user_temp');
    }

    public function index()
    {
        redirect('/' . $this->data['country_lang_url']);
    }

    public function engage()
    {
        if ($this->dx_auth->is_admin())
        {
            $this->dx_auth->set_spoof_mode(true);
            redirect('users/signin');
        }
        else
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function disengage()
    {
        global $IN;
        if ($this->dx_auth->is_spoof_mode())
        {
            $this->dx_auth->set_spoof_mode(false);
        }
        if ($this->dx_auth->is_logged_in())
        {
            $usersModel = Model__users::class;
            $this->load->model($usersModel);
            $user = $this->$usersModel->get_user_by_id($this->dx_auth->get_user_id());
            $lang = $user->get('language_pref');
            $IN->set_cookie('user_lang', $lang, $this->config->item('sess_expiration'));
            $IN->set_cookie('just_logged', "true", $this->config->item('sess_expiration'));
        }
        redirect('/' . $this->data['country_lang_url'] . '/administrator/payments/bookings/1');
    }
}