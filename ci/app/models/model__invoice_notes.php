<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__invoice_notes extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Invoice_Note::class);
        parent::__construct();
    }

    public function get_invoice_note_object_by_ids($period_id, $entity_id, $country_code)
    {
        return new Invoice_Note($this->_get_invoice_note_object_by_ids($period_id, $entity_id, $country_code));
    }

    private function _get_invoice_note_object_by_ids($period_id, $entity_id, $country_code)
    {
        $this->db->where(Invoice_Note::column('period_id'), $period_id);
        $this->db->where(Invoice_Note::column('financial_entity_id'), $entity_id);
        $this->db->where(Invoice_Note::column('country_code'), $country_code);
        return $this->_query_init_and_run();
    }
}