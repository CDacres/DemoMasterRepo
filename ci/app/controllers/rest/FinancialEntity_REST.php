<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class FinancialEntity_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function index_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        $modelFinancialEntities = Model__financial_entities::class;
        $this->load->model($modelFinancialEntities);
        $entity = $this->$modelFinancialEntities->get_base_object_by_id($put['id']);
        if (!$entity->exists_in_db())
        {
            return $this->response('No financial entity', 405);
        }
        $dataToChange = false;
        if (isset($put['account_user']))
        {
            $entity->set('account_user', $put['account_user']);
            $dataToChange = true;
        }
        $financialData = [];
        if (isset($put['account_code']) && $put['account_code'] != '')
        {
            $financialData['account_code'] = $put['account_code'];
        }
        if (isset($put['sort_routing_code']) && $put['sort_routing_code'] != '')
        {
            $financialData['sort_code'] = $put['sort_routing_code'];
        }
        if (isset($put['iban']) && $put['iban'] != '')
        {
            $financialData['iban'] = $put['iban'];
        }
        if (isset($put['bic']) && $put['bic'] != '')
        {
            $financialData['bic'] = $put['bic'];
        }
        if (count($financialData) > 0)
        {
            $entity->set('financial_data', json_encode($financialData));
            $dataToChange = true;
        }
        if ($dataToChange)
        {
            $this->$modelFinancialEntities->insert_update($entity);
        }
        return $this->response([], 200);
    }
}