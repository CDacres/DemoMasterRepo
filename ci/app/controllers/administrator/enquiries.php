<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Enquiries extends Controller_Base__Admin
{
    private $_enquiry_fields = [
        'id' => 'ID',
        'created' => 'Created',
        'eventDate' => 'Date',
        'potentialValue' => 'Revenue / Budget',
        'user_id' => 'Client',
        'title' => 'Room(s) / Venue(s)',
        'message' => 'Description',
        'quality_score' => 'Quality Score',
        'notes' => 'Notes',
        'options' => 'Status / Options',
        'source' => 'Source',
        'assignedAdmin' => 'Assigned User'
    ];

    private $_source_values = [
        'Website',
        'Call',
        'Email',
        'Chat'
    ];

    private $_status_urls = [
        Enquiry_Status::PENDINGURL => Enquiry_Status::PENDINGVALUE,
        Enquiry_Status::ALTERNATIVEURL => Enquiry_Status::ALTERNATIVEVALUE,
        Enquiry_Status::OFFERURL => Enquiry_Status::OFFERVALUE,
        Enquiry_Status::VIEWINGURL => Enquiry_Status::VIEWINGVALUE,
        Enquiry_Status::SALVAGEURL => Enquiry_Status::SALVAGEVALUE,
        Enquiry_Status::WONURL => Enquiry_Status::WONVALUE,
        Enquiry_Status::LOSTURL => Enquiry_Status::LOSTVALUE
    ];

    public function index($status = 'all', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        if (!$this->_tracking_helper->tracking_is_enabled())
        {
            redirect('errors/page_missing');
        }
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelEnquiries = Model__enquiries::class;
            $this->load->model($modelEnquiries);
            $limit = 100;
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $this->data['admin_users'] = $this->$modelUsers->get_admin_users();
            $this->data['fields'] = $this->_enquiry_fields;
            $this->data['enquiries'] = $this->$modelEnquiries->get_all_enquiry_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['potential_revenue'] = $this->$modelEnquiries->get_total_potential_revenue($status);
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->data['sources'] = $this->_source_values;
            $this->data['status_urls'] = $this->_status_urls;
            $modelEnquiryStatuses = Model__enquiry_status::class;
            $this->load->model($modelEnquiryStatuses);
            $this->data['enquiry_statuses'] = $this->$modelEnquiryStatuses->get_enquiry_status_collection();
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/enquiries/index/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = array_merge(['all' => 'All'], $this->_status_urls);
            $this->data['procs'] = [
                'close_past_pending' => [
                    'text' => 'Close Past Pending Enquiries',
                    'classname' => 'btn-danger'
                ]
            ];
            $this->data['status'] = $status;
            $splitStatus = explode('_', $status);
            if (isset($splitStatus[0]) && is_numeric($splitStatus[0]))
            {
                $admin_user = $this->data['admin_users']->get_object_by_id($splitStatus[0]);
                if (!$admin_user->is_null_object())
                {
                    $this->data['assign_dropdown'] = ucfirst($admin_user->get('first_name'));
                }
                if (isset($this->data['assign_dropdown']) && isset($splitStatus[1]))
                {
                    if (isset($this->_status_urls[$splitStatus[1]]))
                    {
                        $this->data['assign_dropdown'] .= ' - ' . $this->_status_urls[$splitStatus[1]];
                    }
                }
            }
            $this->data['message_element'] = 'administrator/enquiries/view_list_enquiries';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function enquirykeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
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
                $modelEnquiries = Model__enquiries::class;
                $this->load->model($modelEnquiries);
                $limit = 100;
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $this->data['admin_users'] = $this->$modelUsers->get_admin_users();
                $this->data['fields'] = $this->_enquiry_fields;
                $this->data['enquiries'] = $this->$modelEnquiries->get_all_enquiry_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['potential_revenue'] = $this->$modelEnquiries->get_total_potential_revenue('all', $keyword_cleaned);
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->data['sources'] = $this->_source_values;
                $this->data['status_urls'] = $this->_status_urls;
                $modelEnquiryStatuses = Model__enquiry_status::class;
                $this->load->model($modelEnquiryStatuses);
                $this->data['enquiry_statuses'] = $this->$modelEnquiryStatuses->get_enquiry_status_collection();
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/enquiries/enquirykeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
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
                $this->data['filters'] = ['all' => 'All Enquiries'];
                $this->data['procs'] = [];
                $this->data['message_element'] = 'administrator/enquiries/view_list_enquiries';
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
        $this->_add_js(auto_version('modals/enquiry_audit.js'));
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('administrator/enquiries.js'));
        $this->add_switchery_plugin_files();
    }
}