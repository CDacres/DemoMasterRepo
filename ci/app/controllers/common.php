<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**

 * Zipcube Common Modal Controller Class
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            Modals
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class Common extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->_set_display_type(self::MODAL_FRONTEND);
        $this->data['reserved_false_modal_footer'] = true;
    }

    public function modal_terms()
    {
        $this->lang->load('pages', config_item('language_code'));
        $this->data['message_element'] = "common/terms_and_conditions";
        $this->_render();
    }

    public function modal_forgot_password()
    {
        $this->lang->load('users', config_item('language_code'));
        $this->data['buttons']['submit_email'] = [
            'label' => $this->lang->line('users_request_password'),
            'class' => 'btn-primary'
        ];
        $this->data['message_element'] = "common/forgot_password";
        $this->_add_js(auto_version('users/forgot_password.js'));
        $this->_set_display_type(self::MODAL);
        $this->_render();
    }

    public function modal_review()
    {
        $this->data['message_element'] = "common/review";
        $this->_render();
    }

    public function modal_advert()
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->data['message_element'] = "common/modal_advert";
        $this->_render();
    }

    public function modal_error()
    {
        $this->data['message_element'] = "common/error";
        $this->_render();
    }

    public function write_review($assetId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->lang->load('reviews', config_item('language_code'));
        $this->lang->load('users', config_item('language_code'));
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_asset_id($assetId);
        if ($venue->exists_in_db())
        {
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $rooms = $this->$modelRooms->get_room_object_collection_by_venue_asset_id($assetId);
            if ($rooms->exists_in_db())
            {
                $this->data['review'] = new Review();
                $this->data['title'] = $this->lang->line('modals_review_add_title');
                $this->data['user_id'] = $this->get_user_id();
                $this->data['venue'] = $venue;
                $this->data['rooms'] = $rooms;
                $this->data['message_element'] = "common/write_review";
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function enquire_now($roomId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->lang->load('users', config_item('language_code'));
        $this->lang->load('rooms', config_item('language_code'));
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($roomId);
        if ($room->exists_in_db())
        {
            if ($this->dx_auth->is_logged_in())
            {
                $this->data['user'] = $this->get_user();
            }
            else
            {
                $this->data['user'] = new User();
            }
            if ($room->get('primary_vertical_id') == Vertical::OFFICE || $room->get('primary_vertical_id') == Vertical::PARTY)
            {
                $this->data['title'] = $this->lang->line('rooms_index_book_a_viewing');
                $this->data['request_desc'] = 'Book A Viewing';
            }
            else
            {
                $this->data['title'] = $this->lang->line('rooms_index_enquire_now');
                $this->data['request_desc'] = 'Enquiry';
            }
            $this->data['room'] = $room;
            $modelEnquiryDurations = Model__enquiry_durations::class;
            $this->load->model($modelEnquiryDurations);
            $this->data['enquiry_durations'] = $this->$modelEnquiryDurations->get_enquiry_duration_collection();
            $this->data['buttons']['send'] = [
                'label' => $this->lang->line('modals_enquiry_send_enquiry'),
                'class' => 'btn-primary'
            ];
            $this->data['reserved_false_modal_footer'] = false;
            $this->data['message_element'] = "common/modal_enquire_now";
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function request_to_book($roomId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->lang->load('users', config_item('language_code'));
        $this->lang->load('rooms', config_item('language_code'));
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($roomId);
        if ($room->exists_in_db())
        {
            if ($this->dx_auth->is_logged_in())
            {
                $this->data['user'] = $this->get_user();
            }
            else
            {
                $this->data['user'] = new User();
            }
            $this->data['title'] = $this->lang->line('rooms_index_request_to_book');
            $this->data['request_desc'] = 'Request to book';
            $this->data['room'] = $room;
            $modelEnquiryDurations = Model__enquiry_durations::class;
            $this->load->model($modelEnquiryDurations);
            $this->data['enquiry_durations'] = $this->$modelEnquiryDurations->get_enquiry_duration_collection();
            $this->data['buttons']['send'] = [
                'label' => $this->lang->line('modals_enquiry_send_request'),
                'class' => 'btn-primary'
            ];
            $this->data['reserved_false_modal_footer'] = false;
            $this->data['message_element'] = "common/modal_request_to_book";
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
   }

    public function message_host($roomId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->lang->load('users', config_item('language_code'));
        $this->lang->load('rooms', config_item('language_code'));
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($roomId);
        if ($room->exists_in_db())
        {
            $this->data['title'] = $this->lang->line('rooms_index_message_host');
            if ($this->dx_auth->is_logged_in())
            {
                $this->data['user'] = $this->get_user();
            }
            else
            {
                $this->data['user'] = new User();
            }
            $this->data['request_desc'] = 'Message the Host';
            $this->data['room'] = $room;
            $modelEnquiryDurations = Model__enquiry_durations::class;
            $this->load->model($modelEnquiryDurations);
            $this->data['enquiry_durations'] = $this->$modelEnquiryDurations->get_enquiry_duration_collection();
            $this->data['buttons']['send'] = [
                'label' => $this->lang->line('modals_enquiry_send_request'),
                'class' => 'btn-primary'
            ];
            $this->data['reserved_false_modal_footer'] = false;
            $this->data['message_element'] = "common/modal_message_host";
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function sign_in()
    {
        $this->lang->load('users', config_item('language_code'));
        $this->data['buttons']['sign_in'] = [
            'label' => $this->lang->line('common_sign_in'),
            'class' => 'btn-primary'
        ];
        $this->data['buttons']['cancel'] = [
            'label' => $this->lang->line('common_cancel'),
            'class' => 'btn-default'
        ];
        $this->data['reserved_false_modal_footer'] = false;
        $this->data['message_element'] = "common/sign_in";
        $this->_render();
    }

    public function no_data()
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->data['message_element'] = "common/no_data";
        $this->_render();
    }
}