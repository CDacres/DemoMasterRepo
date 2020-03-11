<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class LinkedInAPI
{
    protected $app_id = '';
    protected $app_secret = '';
    protected $domain = 'https://api.linkedin.com/v1';
    protected $oauth_domain = 'https://www.linkedin.com/oauth/v2';

    public function __construct()
    {
        $this->app_id = getenv('LINKEDIN_APP_ID');
        $this->app_secret = getenv('LINKEDIN_APP_SECRET');
        $this->scope = 'r_basicprofile%20r_emailaddress';
    }

    public function get_login_link_url()
    {
        $CI =& get_instance();
        $redirect_uri = $CI->config->item('base_url') . 'auth/linkedin/login/callback';
        return $this->oauth_domain . '/authorization?response_type=code&client_id=' . $this->app_id . '&redirect_uri=' . $redirect_uri . '&scope=' . $this->scope;
    }

    public function get_signup_link_url()
    {
        $CI =& get_instance();
        $redirect_uri = $CI->config->item('base_url') . 'auth/linkedin/signup/callback';
        return $this->oauth_domain . '/authorization?response_type=code&client_id=' . $this->app_id . '&redirect_uri=' . $redirect_uri . '&scope=' . $this->scope;
    }

    private function json_get($url, $access_token)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        $authorization = 'Authorization: Bearer ' . $access_token;
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    private function json_post($url, $params)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    public function get_access_token($auth_code, $action)
    {
        $CI =& get_instance();
        $redirect_uri = $CI->config->item('base_url') . 'auth/linkedin/' . $action . '/callback';
        $url = $this->oauth_domain . '/accessToken';
        $params = 'grant_type=authorization_code&code=' . $auth_code . '&redirect_uri=' . $redirect_uri . '&client_id=' . $this->app_id . '&client_secret=' . $this->app_secret;
        return $this->json_post($url, $params);
    }

    public function get_user_profile($access_token)
    {
        $url = $this->domain . '/people/~:(id,first-name,last-name,email-address)?format=json';
        return $this->json_get($url, $access_token);
    }
}
