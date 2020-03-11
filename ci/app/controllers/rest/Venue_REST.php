<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Venue_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function index_get()
    {
        $get = $this->get();
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        if (isset($get['id']))
        {
            $venue = $this->$modelVenues->get_venue_object_by_id($get['id'], true);
            if (!$venue->exists_in_db())
            {
                return $this->response($this->lang->line('rest_no_venue'), 405);
            }
            return $this->response($venue->get_as_ajax_response(), 200);
        }
        else
        {
            $venues = $this->$modelVenues->get_user_venues_with_rooms_collection($this->dx_auth->get_user_id(), $this->session->userdata('user_lang'));
            $resultArr = [];
            foreach ($venues->object() as $venue)
            {
                $row = [];
                $row['id'] = $venue->get_id();
                $row['name'] = $venue->wrangle('defaulted_name')->value();
                $row['venue_url'] = get_venue_url($venue, true);
                $row['image'] = $venue->wrangle('image')->get_url('medium');
                $row['approved'] = $venue->get('approved');
                $row['rooms'] = [];
                foreach ($venue->get('rooms')->object() as $venue_room)
                {
                    $row['rooms'][] = [
                        'room_id' => $venue_room->get_id(),
                        'room_name' => $venue_room->wrangle('defaulted_name')->value(),
                        'image' => $venue_room->wrangle('image')->get_url('small'),
                        'room_url' => get_room_url($venue_room, '', true)
                    ];
                }
                $resultArr[] = $row;
            }
            return $this->response($resultArr, 200);
        }
    }

    public function index_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_id($put['id'], true);
        if (!$venue->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_venue'), 405);
        }
        $dataToChange = false;
        $fieldArr = [
            'uses_live_bookings',
            'agree_to_list',
            'non_original_desc',
            'description',
            'notes',
            'stage',
            'sponsored'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $venue->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if (isset($put['approved']))
        {
            if ($put['approved'] == 1)
            {
                if ($this->_ready_for_approval($venue))
                {
                    $venue->set('approved_datetime', date("Y-m-d H:i:s"));
                    $venue->set('approver', $this->dx_auth->get_user_id());
                }
                else
                {
                    return $this->response('This venue is not ready to be approved, please check name, cancellation terms and vat rate.', 403);
                }
            }
            $venue->set('approved', $put['approved']);
            $dataToChange = true;
        }
        if (!$venue->is_approved() && !$venue->is_true('ready_for_approval') && $this->_ready_for_approval($venue))
        {
            $venue->set('ready_for_approval', 1);
            $dataToChange = true;
        }
        if (isset($put['vat_rate_id']))
        {
            $modelVatRates = Model__vat_rates::class;
            $this->load->model($modelVatRates);
            $vat_rate = $this->$modelVatRates->get_vat_rate_by_id($put['vat_rate_id']);
            if ($vat_rate->exists_in_db())
            {
                $venue->set('vat_rate_id', $vat_rate->get_id());
                $dataToChange = true;
            }
            else
            {
                return $this->response('That vat rate is not valid.', 409);
            }
        }
        if (isset($put['assignedAdmin']))
        {
            if (!empty($put['assignedAdmin']))
            {
                $venue->set('assignedAdmin', $put['assignedAdmin']);
            }
            else
            {
                $venue->set('assignedAdmin');
            }
            $dataToChange = true;
        }
        if ($dataToChange)
        {
            $this->$modelVenues->insert_update($venue);
        }
        return $this->response($venue->get_as_ajax_response(), 200);
    }

    public function index_delete()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $delete = $this->delete();
        if (!isset($delete['id']))
        {
            return $this->response(null, 400);
        }
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_id($delete['id'], true);
        if (!$venue->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_venue'), 405);
        }
        $asset_id = $venue->get_asset_id();
        $modelAssets = Model__assets::class;
        $this->load->model($modelAssets);
        $modelImages = Model__images::class;
        $this->load->model($modelImages);
        $venueImgs = $this->$modelImages->get_images_object_collection_by_subject_id($asset_id);
        if ($venueImgs->exists_in_db())
        {
            foreach ($venueImgs as $venueImg)
            {
                $venueImg->set_enabled(false);
                $this->$modelImages->insert_update($venueImg);
            }
        }
        $modelRooms = Model__room_skeletons::class;
        $this->load->model($modelRooms);
        $rooms = $this->$modelRooms->get_room_object_collection_by_venue_id($venue->get_id(), true, false, true);
        foreach ($rooms->object() as $room)
        {
            $roomAsset_id = $room->get_asset_id();
            $roomAsset = $this->$modelAssets->get_asset_object_by_id($roomAsset_id);
            if ($roomAsset->exists_in_db())
            {
                $roomAsset->set_enabled(false);
                $roomAsset->set('deleted_at', date("Y-m-d H:i:s"));
                $this->$modelAssets->insert_update($roomAsset);
            }
            $roomImgs = $this->$modelImages->get_images_object_collection_by_subject_id($roomAsset_id);
            if ($roomImgs->exists_in_db())
            {
                foreach ($roomImgs as $roomImg)
                {
                    $roomImg->set_enabled(false);
                    $this->$modelImages->insert_update($roomImg);
                }
            }
            $room->set('approved', 0);
            $room->set_enabled(false);
            $this->$modelRooms->insert_update($room);
        }
        $venue->set('approved', 0);
        $venue->set_enabled(false);
        $this->$modelVenues->insert_update($venue);
        $asset = $this->$modelAssets->get_asset_object_by_id($asset_id);
        if ($asset->exists_in_db())
        {
            $asset->set_enabled(false);
            $asset->set('deleted_at', date("Y-m-d H:i:s"));
            $this->$modelAssets->insert_update($asset);
        }
        return $this->response([], 200);
    }

    public function contact_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['asset_id']))
        {
            return $this->response(null, 400);
        }
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_asset_id($put['asset_id'], true);
        if (!$venue->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_venue'), 405);
        }
        if (isset($put['main_contact']))
        {
            $venue->set('main_contact', $put['main_contact']);
            $this->$modelVenues->insert_update($venue);
        }
        return $this->response([], 200);
    }

    public function commission_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['id']) || !isset($put['commission_percentage']))
        {
            return $this->response(null, 400);
        }
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_id($put['id'], true);
        if (!$venue->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_venue'), 405);
        }
        $asset_id = $venue->get_asset_id();
        $modelAssetCommission = Model__asset_commissions::class;
        $this->load->model($modelAssetCommission);
        $frontendCommission = $this->$modelAssetCommission->get_commission_object_by_asset_and_channel($asset_id, Booking_Channel::FRONTEND);
        if ($frontendCommission->exists_in_db())
        {
            $frontendCommission->set('commission_percentage', $put['commission_percentage']);
            $this->$modelAssetCommission->insert_update($frontendCommission);
        }
        $widgetCommission = $this->$modelAssetCommission->get_commission_object_by_asset_and_channel($asset_id, Booking_Channel::WIDGET);
        if ($widgetCommission->exists_in_db())
        {
            $widgetCommission->set('commission_percentage', $put['commission_percentage']);
            $this->$modelAssetCommission->insert_update($widgetCommission);
        }
        $adminCommission = $this->$modelAssetCommission->get_commission_object_by_asset_and_channel($asset_id, Booking_Channel::ADMIN);
        if ($adminCommission->exists_in_db())
        {
            $adminCommission->set('commission_percentage', $put['commission_percentage']);
            $this->$modelAssetCommission->insert_update($adminCommission);
        }
        return $this->response([], 200);
    }

    private function _ready_for_approval($venue)
    {
        return ($venue->data_not_empty('name') && ($venue->data_not_empty('vat_rate_id') || !$venue->is_null('vat_rate_id')));
    }
}