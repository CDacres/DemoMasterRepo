<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Admin Room Controller Class
 *
 * @package		Zipcube
 * @subpackage	Controllers
 * @category	Admin Room
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com

 */
class Rooms extends Controller_Base__Admin
{
    private $_room_fields = [
        'id' => 'ID',
        'created' => 'Created',
        'asset_id' => 'Photo',
        'venue_name' => 'Venue',
        'title' => 'Room',
        'description' => 'Description',
        'office_size' => 'Other Details',
        'listing_hourly_rate' => 'Price',
        'price_control_percent' => 'Price Control (%)',
        'flexible_percent' => 'Flexible (%) (Enabled)',
        'page_views' => 'Views',
        'ranking' => 'Ranking',
        'approved' => 'Approved',
        'hidden' => 'Hidden'
    ];

    public function index($status = 'pending', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelRooms = Model__simple_rooms::class;
            $this->load->model($modelRooms);
            $limit = 20;
            $this->data['fields'] = $this->_room_fields;
            $rooms = $this->$modelRooms->get_all_rooms_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->data['rooms'] = $this->_get_rooms($rooms, $sort_by, $sort_order_cleaned, $modelRooms);
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/rooms/index/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = [
                'all' => 'All Rooms',
                'pending' => 'Pending',
                'live' => 'Live',
                'unapproved' => 'Unapproved',
                'banned' => 'Banned',
                'hourly' => 'Hourly',
                'daily' => 'Daily',
                'delegate' => 'Daily Delegate',
                'monthly' => 'Monthly'
            ];
            $this->data['status'] = $status;
            $this->data['message_element'] = 'administrator/rooms/view_list_rooms';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function roomkeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
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
                $modelRooms = Model__simple_rooms::class;
                $this->load->model($modelRooms);
                $limit = 20;
                $this->data['fields'] = $this->_room_fields;
                $rooms = $this->$modelRooms->get_all_rooms_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->data['rooms'] = $this->_get_rooms($rooms, $sort_by, $sort_order_cleaned, $modelRooms);
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/rooms/roomkeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
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
                $this->data['filters'] = ['all' => 'All Rooms'];
                $this->data['message_element'] = 'administrator/rooms/view_list_rooms';
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

    private function _get_rooms($rooms, $sort_by, $sort_order, $modelRooms)
    {
        $roomIdArr = [];
        foreach ($rooms->object() as $room)
        {
            $roomIdArr[] = $room->get_id();
        }
        return $this->$modelRooms->get_rooms_by_ids_with_set_order($roomIdArr, $sort_by, $sort_order);
    }

    private function _add_page_js_css()
    {
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('administrator/rooms.js'));
        $this->add_switchery_plugin_files();
    }
}