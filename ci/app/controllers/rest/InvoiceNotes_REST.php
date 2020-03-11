<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class InvoiceNotes_REST extends REST_Controller
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
        if (!isset($put['period_id']) || !isset($put['entity_id']) || !isset($put['country_code']))
        {
            return $this->response(null, 400);
        }
        $modelPaymentPeriods = Model__payment_periods::class;
        $this->load->model($modelPaymentPeriods);
        $period = $this->$modelPaymentPeriods->get_base_object_by_id($put['period_id']);
        if (!$period->exists_in_db())
        {
            return $this->response('No payment period', 405);
        }
        $modelFinancialEntities = Model__financial_entities::class;
        $this->load->model($modelFinancialEntities);
        $entity = $this->$modelFinancialEntities->get_base_object_by_id($put['entity_id']);
        if (!$entity->exists_in_db())
        {
            return $this->response('No financial entity', 405);
        }
        $modelInvoiceNotes = Model__invoice_notes::class;
        $this->load->model($modelInvoiceNotes);
        $invoice_note = $this->$modelInvoiceNotes->get_invoice_note_object_by_ids($period->get_id(), $entity->get_id(), $put['country_code']);
        if (!$invoice_note->exists_in_db())
        {
            $invoice_note = new Invoice_Note();
            $invoice_note->set('period_id', $period->get_id());
            $invoice_note->set('financial_entity_id', $entity->get_id());
            $invoice_note->set('country_code', $put['country_code']);
            $invoice_note->set('created', date("Y-m-d H:i:s"));
        }
        if (isset($put['notes']))
        {
            $invoice_note->set('notes', $put['notes']);
            $this->$modelInvoiceNotes->insert_update($invoice_note);
        }
        return $this->response([], 200);
    }
}