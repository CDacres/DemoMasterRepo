<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Configuration_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function index_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $modelConfigs = Model__configurations::class;
        $this->load->model($modelConfigs);
        $configs = $this->$modelConfigs->get_configurations_objects_collection();
        if (!$configs->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_configurations'), 405);
        }
        return $this->response($configs->get_as_ajax_response(), 200);
    }
}