<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Hubspot_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function deals_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
//        if (!isset($get['id']))
//        {
//            $deals_response = $this->_get_all_hubspot_contacts();
//            if (isset($deals_response->status) && $deals_response->status == 'error')
//            {
//                return $this->response(['message' => $deals_response->message], 200);
//            }
//            return $this->response($deals_response, 400);
//        }
        $this->load->library('HubspotAPI');
        $deal_response = $this->hubspotapi->get_deal($get['id']);
        if (!isset($deal_response['status']) || (isset($deal_response['status']) && $deal_response['status'] != 200))
        {
            error_log('Unable to get deal from Hubspot' . json_encode($deal_response), 0);
        }
        if (isset($deal_response['result']->status) && $deal_response['result']->status == 'error')
        {
            return $this->response(['message' => $deal_response['result']->message], 200);
        }
        return $this->response($deal_response['result'], 200);
    }

//    private function _get_all_hubspot_deals()
//    {
//        $this->load->library('HubspotAPI');
//        $deals_response = $this->hubspotapi->get_all_deals();
//        if (isset($deals_response->status) && $deals_response->status == 'error')
//        {
//            error_log('Unable to get deals from Hubspot' . json_encode($deals_response), 0);
//        }
//        return $deals_response;
//    }

    public function contacts_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
//        if (!isset($get['user_email']))
//        {
//            $contacts_response = $this->_get_all_hubspot_contacts();
//            if (isset($contacts_response->status) && $contacts_response->status == 'error')
//            {
//                return $this->response(['message' => $contacts_response->message], 200);
//            }
//            return $this->response($contacts_response, 400);
//        }
        $this->load->library('HubspotAPI');
        $contact_response = $this->hubspotapi->get_contact_by_email(strtolower($get['user_email']));
        if (!isset($contact_response['status']) || (isset($contact_response['status']) && $contact_response['status'] != 200))
        {
            error_log('Unable to get contact from Hubspot' . json_encode($contact_response), 0);
        }
        if (isset($contact_response['result']->status) && $contact_response['result']->status == 'error')
        {
            return $this->response(['message' => $contact_response['result']->message], 200);
        }
        return $this->response($contact_response['result'], 200);
    }

//    private function _get_all_hubspot_contacts()
//    {
//        $this->load->library('HubspotAPI');
//        $contacts_response = $this->hubspotapi->get_all_contacts();
//        if (isset($contacts_response->status) && $contacts_response->status == 'error')
//        {
//            error_log('Unable to get contacts from Hubspot' . json_encode($contacts_response), 0);
//        }
//        return $contacts_response;
//    }
}