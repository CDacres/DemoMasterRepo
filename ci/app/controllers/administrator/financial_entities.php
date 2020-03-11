<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Financial_Entities extends Controller_Base__Admin
{
    private $_entity_fields = [
        'id' => 'ID',
        'name' => 'Name',
        'address' => 'Address',
        'financial_data' => 'Bank Details',
        'vat_number' => 'VAT Number',
        'account_user' => 'Contact'
    ];

    public function index($status = 'all', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelFinancialEntities = Model__financial_entities::class;
            $this->load->model($modelFinancialEntities);
            $limit = 20;
            $this->data['fields'] = $this->_entity_fields;
            $this->data['entities'] = $this->$modelFinancialEntities->get_all_financial_entity_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/financial_entities/index/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = [
                'all' => 'All Financial Entities',
                'missing_address' => 'Missing Address',
                'missing_financial_data' => 'Missing Bank Details',
                'missing_vat' => 'Missing VAT',
                'missing_user' => 'Missing Contact'
            ];
            $this->data['status'] = $status;
            $this->data['message_element'] = 'administrator/invoices/view_financial_entities';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function entitykeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        if ($this->input->post() || $keyword != '')
        {
            try
            {
                $validator = new Helper__Validator();
                $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
                $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
                if ($this->input->post())
                {
                    $keyword_cleaned = trim($this->input->post('q'));
                    $keyword_query = trim($this->input->post('q', 'db_safe_for_like'));
                }
                else
                {
                    $keyword_cleaned = trim($keyword);
                    $keyword_query = trim($validator->validate($keyword, 'db_safe_for_like'));
                }
                $modelFinancialEntities = Model__financial_entities::class;
                $this->load->model($modelFinancialEntities);
                $limit = 20;
                $this->data['fields'] = $this->_entity_fields;
                $this->data['entities'] = $this->$modelFinancialEntities->get_all_financial_entity_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/financial_entities/entitykeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
                $p_config['uri_segment'] = 8;
                $p_config['num_links'] = 5;
                $p_config['total_rows'] = $num_results;
                $p_config['per_page'] = $limit;
                $this->pagination->initialize($p_config);
                $this->data['pagination'] = $this->pagination->create_links();
                $this->data['sort_order'] = $sort_order_cleaned;
                $this->data['sort_by'] = $sort_by;
                $this->data['keyword'] = $keyword_cleaned;
                $this->data['status'] = 'all';
                $this->data['filters'] = ['all' => 'All Financial Entities'];
                $this->data['message_element'] = 'administrator/invoices/view_financial_entities';
                $this->_add_page_js_css();
                $this->_render();
            }
            catch (Exception $ex)
            {
                redirect('errors/page_missing');
            }
        }
        else
        {
            redirect($this->data['country_lang_url'] . '/administrator');
        }
    }

    private function _add_page_js_css()
    {
        $this->_add_js(auto_version('modals/entities.js'));
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('administrator/entities.js'));
    }
}