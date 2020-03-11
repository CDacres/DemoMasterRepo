<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Members extends Controller_Base__Admin
{
    private $_venue_fields = [
        'id' => 'ID',
        'created' => 'Created',
        'name' => 'Venue',
        'address' => 'Address',
        'contacts' => 'Contacts',
        'sponsored' => 'Sponsored',
        'source' => 'Source',
        'finance' => 'Finance',
        'agree_to_list' => 'Agree to List',
        'uses_live_bookings' => 'Live Bookings',
        'status' => 'Completion Steps',
        'approved' => 'Approved',
        'notes' => 'Notes',
        'stage' => 'Stage',
        'assignedAdmin' => 'Admin'
    ];
    private $_user_fields = [
        'id' => 'ID',
        'first_name' => 'Name', //needs a way of getting last name in sort
        'email' => 'Contacts' //needs a way of getting phone num in sort
    ];

    private $_stage_values = [
        Venue::PROSPECT,
        Venue::NEWLISTING,
        Venue::PENDING,
        Venue::PICTURE,
        Venue::SALVAGE,
        Venue::PREAPPROVED,
        Venue::LIVE,
        Venue::REJECTED
    ];

    private $_source_stage_filters = [
        Venue::PROSPECTURL => Venue::PROSPECT,
        Venue::NEWLISTINGURL => Venue::NEWLISTING,
        Venue::PENDINGURL => Venue::PENDING,
        Venue::PICTUREURL => Venue::PICTURE,
        Venue::SALVAGEURL => Venue::SALVAGE,
        Venue::PREAPPROVEDURL => Venue::PREAPPROVED,
        Venue::LIVEURL => Venue::LIVE,
        Venue::REJECTEDURL => Venue::REJECTED
    ];

    public function index()
    {
        redirect($this->data['country_lang_url'] . '/administrator');
    }

    public function venues($status = 'all', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $limit = 20;
            $this->data['fields'] = $this->_venue_fields;
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $this->data['admin_users'] = $this->$modelUsers->get_admin_users();
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venues = $this->$modelVenues->get_all_venues_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->data['venues'] = $this->_get_venues($venues, $sort_by, $sort_order_cleaned, $modelVenues);
            $this->data['stages'] = $this->_stage_values;
            $this->data['source_stage_filters'] = $this->_source_stage_filters;
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/members/venues/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = array_merge(['all' => 'All Venues'], $this->_source_stage_filters);
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
                    if (isset($this->_source_stage_filters[$splitStatus[1]]))
                    {
                        $this->data['assign_dropdown'] .= ' - ' . $this->_source_stage_filters[$splitStatus[1]];
                    }
                }
            }
            $this->data['message_element'] = 'administrator/members/view_list_venues';
            $this->_add_page_js_css();
            $this->_add_user_token();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function venuekeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
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
                $limit = 20;
                $this->data['fields'] = $this->_venue_fields;
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $this->data['admin_users'] = $this->$modelUsers->get_admin_users();
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $venues = $this->$modelVenues->get_all_venues_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->data['venues'] = $this->_get_venues($venues, $sort_by, $sort_order_cleaned, $modelVenues);
                $this->data['stages'] = $this->_stage_values;
                $this->data['source_stage_filters'] = $this->_source_stage_filters;
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/members/venuekeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
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
                $this->data['filters'] = ['all' => 'All Venues'];
                $this->data['message_element'] = 'administrator/members/view_list_venues';
                $this->_add_page_js_css();
                $this->_add_user_token();
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

    private function _get_venues($venues, $sort_by, $sort_order, $modelVenues)
    {
        $venueIdArr = [];
        foreach ($venues->object() as $venue)
        {
            $venueIdArr[] = $venue->get_id();
        }
        return $this->$modelVenues->get_venues_by_ids($venueIdArr, $sort_by, $sort_order);
    }

    private function _add_page_js_css()
    {
        $this->_add_admin_js();
        $this->_add_js(auto_version('modals/venues.js'));
        $this->_add_js(auto_version('administrator/venues.js'));
        $this->add_switchery_plugin_files();
    }

    private function _add_admin_js()
    {
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
    }

    public function users($sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $limit = 20;
            $this->data['fields'] = $this->_user_fields;
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $this->data['users'] = $this->$modelUsers->get_all_users_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/members/users/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 7;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['message_element'] = 'administrator/members/view_list_clients';
            $this->_add_admin_js();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function userkeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
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
                $limit = 20;
                $this->data['fields'] = $this->_user_fields;
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $this->data['users'] = $this->$modelUsers->get_all_users_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/members/userkeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
                $p_config['uri_segment'] = 8;
                $p_config['num_links'] = 5;
                $p_config['total_rows'] = $num_results;
                $p_config['per_page'] = $limit;
                $this->pagination->initialize($p_config);
                $this->data['pagination'] = $this->pagination->create_links();
                $this->data['sort_order'] = $sort_order_cleaned;
                $this->data['sort_by'] = $sort_by;
                $this->data['keyword'] = $keyword_cleaned;
                $this->data['message_element'] = 'administrator/members/view_list_clients';
                $this->_add_admin_js();
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
}