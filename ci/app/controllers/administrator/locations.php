<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Locations extends Controller_Base__Admin
{
    private $_location_fields = [
        'id' => 'ID',
        'human_desc' => 'Place',
        'parent_desc' => 'Parent',
        'url_desc' => 'Url',
        'category_desc' => 'Category',
        'lat' => 'Position',
        'approved_venue_count' => 'Venue Count',
        'approved_room_count' => 'Room Count',
        'is_crawlable' => 'Crawlable?'
    ];

    public function index($sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $limit = 20;
            $this->data['fields'] = $this->_location_fields;
            $this->data['locations'] = $this->$modelLocations->get_all_location_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->data['redirect_locations'] = $this->$modelLocations->get_location_objects_collection(true);
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/locations/index/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 7;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['message_element'] = 'administrator/locations/view_list_locations';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function locationkeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
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
                $modelLocations = Model__locations::class;
                $this->load->model($modelLocations);
                $limit = 20;
                $this->data['fields'] = $this->_location_fields;
                $this->data['locations'] = $this->$modelLocations->get_all_location_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->data['redirect_locations'] = $this->$modelLocations->get_location_objects_collection(true);
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/locations/locationkeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
                $p_config['uri_segment'] = 8;
                $p_config['num_links'] = 5;
                $p_config['total_rows'] = $num_results;
                $p_config['per_page'] = $limit;
                $this->pagination->initialize($p_config);
                $this->data['pagination'] = $this->pagination->create_links();
                $this->data['sort_order'] = $sort_order_cleaned;
                $this->data['sort_by'] = $sort_by;
                $this->data['keyword'] = $keyword_cleaned;
                $this->data['message_element'] = 'administrator/locations/view_list_locations';
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
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('modals/location_details.js'));
        $this->_add_js(auto_version('administrator/locations.js'));
        $this->add_switchery_plugin_files();
        $this->_add_css('<link href="' . auto_version('pac_container.css') . '" media="screen" rel="stylesheet" type="text/css" />');
    }
}