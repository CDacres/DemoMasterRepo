<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Controller_Base__Protected extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if (!$this->dx_auth->is_logged_in())
        {
            redirect($this->data['country_lang_url'] . '/users/signup','refresh');
        }
    }
}