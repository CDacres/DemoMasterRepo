<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Photos extends Controller_Base__Admin
{
    private $_room_fields = [
        'room_name' => 'Room',
        'venue_name' => 'Venue',
        'image' => 'Image',
        'configuration_id' => 'Configuration',
        'flagged' => 'Flag',
        'cosmetic' => 'Cosmetic',
        'comments' => 'Comments'
    ];
    private $_venue_fields = [
        'venue_name' => 'Venue',
        'image' => 'Image',
        'flagged' => 'Flag',
        'cosmetic' => 'Cosmetic',
        'comments' => 'Comments'
    ];

    public function index($status = 'all', $sort_by = 'room_name', $sort_order = 'desc', $offset = 0)
    {
        return $this->rooms($status, $sort_by, $sort_order, $offset);
    }

    public function rooms($status = 'all', $sort_by = 'room_name', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelImages = Model__images::class;
            $this->load->model($modelImages);
            $limit = 20;
            $this->data['fields'] = $this->_room_fields;
            $this->data['images'] = $this->$modelImages->get_all_room_image_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $this->data['image_locations'] = $this->$modelVenues->get_venue_locations_for_flagged_images(Asset_Type::ROOM);
            $modelConfigurations = Model__configurations::class;
            $this->load->model($modelConfigurations);
            $this->data['configurations'] = $this->$modelConfigurations->get_configurations_objects_collection();
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/photos/rooms/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = [
                'all' => 'All Images',
                'live' => 'Live Images',
                'nonlive' => 'Non Live Images',
                'without_config' => 'Missing Configuration',
                'flagged' => 'Flagged',
                'cosmetic' => 'Cosmetic'
            ];
            $this->data['status'] = $status;
            $splitStatus = explode('_', $status);
            if (isset($splitStatus[0]) && ($splitStatus[0] == 'flagged' || $splitStatus[0] == 'cosmetic'))
            {
                if (isset($splitStatus[1]))
                {
                    $this->data['city_dropdown'] = urldecode($splitStatus[1]) . ' (' . $num_results . ')';
                }
            }
            $this->data['message_element'] = 'administrator/photos/view_room_photos';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function roomkeyword($keyword = '', $sort_by = 'room_name', $sort_order = 'desc', $offset = 0)
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
                $modelImages = Model__images::class;
                $this->load->model($modelImages);
                $limit = 20;
                $this->data['fields'] = $this->_room_fields;
                $this->data['images'] = $this->$modelImages->get_all_room_image_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $this->data['image_locations'] = $this->$modelVenues->get_venue_locations_for_flagged_images(Asset_Type::ROOM);
                $modelConfigurations = Model__configurations::class;
                $this->load->model($modelConfigurations);
                $this->data['configurations'] = $this->$modelConfigurations->get_configurations_objects_collection();
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/photos/roomkeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
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
                $this->data['filters'] = ['all' => 'All Images'];
                $this->data['message_element'] = 'administrator/photos/view_room_photos';
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

    public function venues($status = 'all', $sort_by = 'venue_name', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelImages = Model__images::class;
            $this->load->model($modelImages);
            $limit = 20;
            $this->data['fields'] = $this->_venue_fields;
            $this->data['images'] = $this->$modelImages->get_all_venue_image_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $this->data['image_locations'] = $this->$modelVenues->get_venue_locations_for_flagged_images(Asset_Type::VENUE);
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/photos/venues/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = [
                'all' => 'All Images',
                'live' => 'Live Images',
                'nonlive' => 'Non Live Images',
                'flagged' => 'Flagged',
                'cosmetic' => 'Cosmetic'
            ];
            $this->data['status'] = $status;
            $splitStatus = explode('_', $status);
            if (isset($splitStatus[0]) && ($splitStatus[0] == 'flagged' || $splitStatus[0] == 'cosmetic'))
            {
                if (isset($splitStatus[1]))
                {
                    $this->data['city_dropdown'] = urldecode($splitStatus[1]) . ' (' . $num_results . ')';
                }
            }
            $this->data['message_element'] = 'administrator/photos/view_venue_photos';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function venuekeyword($keyword = '', $sort_by = 'venue_name', $sort_order = 'desc', $offset = 0)
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
                $modelImages = Model__images::class;
                $this->load->model($modelImages);
                $limit = 20;
                $this->data['fields'] = $this->_venue_fields;
                $this->data['images'] = $this->$modelImages->get_all_venue_image_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $modelVenues = Model__venues::class;
                $this->load->model($modelVenues);
                $this->data['image_locations'] = $this->$modelVenues->get_venue_locations_for_flagged_images(Asset_Type::VENUE);
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/photos/venuekeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
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
                $this->data['filters'] = ['all' => 'All Images'];
                $this->data['message_element'] = 'administrator/photos/view_venue_photos';
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
        $this->_add_js(auto_version('modals/photos.js'));
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('administrator/photos.js'));
        $this->add_switchery_plugin_files();
    }
}