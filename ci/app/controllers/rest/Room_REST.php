<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Room_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    private function _find_room_by_id($id, $simple = true)
    {
        if ($simple)
        {
            $modelRooms = Model__simple_rooms::class;
        }
        else
        {
            $modelRooms = Model__room_skeletons::class;
        }
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($id, true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        return $room;
    }

    public function rates_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['id']) || !isset($get['bookingChannel_id']))
        {
            return $this->response(null, 400);
        }
        $room = $this->_find_room_by_id($get['id']);
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_room_id($room->get_id());
        if (!$venue->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_venue'), 405);
        }
        $priceArr = [
            'room_id' => $room->get_id(),
            'currency' => $room->get('currency_code'),
            'hour' => $room->get('hourly_rate'),
            'day' => $room->get('daily_rate'),
            'daily_delegate' => $room->get('daily_delegate_rate'),
            'month' => $room->get('monthly_rate'),
            'commission_rate' => $this->$modelVenues->get_asset_commission_percentage($venue, $get['bookingChannel_id'])
        ];
        return $this->response($priceArr, 200);
    }

    public function availabilities_put()
    {
        $put = $this->put();
        if (!isset($put['asset_id']))
        {
            return $this->response(null, 400);
        }
        $modelAvailabilities = Model__availabilities::class;
        $this->load->model($modelAvailabilities);
        $this->$modelAvailabilities->update_availabilities($put['asset_id'], new Base__Null());
        return $this->response([], 200);
    }

    public function availabilities_get()
    {
        $get = $this->get();
        if (!isset($get['assetId']) || !isset($get['date']))
        {
            return $this->response(null, 400);
        }
        $modelAvailabilities = Model__availabilities::class;
        $this->load->model($modelAvailabilities);
        $availabilities = $this->$modelAvailabilities->get_daily_availability($get['assetId'], $get['date'], true);
        return $this->response($availabilities->get_slots_as_json('No available slots for this date. Please select another date.'), 200);
    }

    public function configurations_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']))
        {
            return $this->response(null, 400);
        }
        $room = $this->_find_room_by_id($get['room_id'], false);
        $modelConfigurations = Model__configurations::class;
        $this->load->model($modelConfigurations);
        $configurations = $this->$modelConfigurations->get_config_object_collection_by_asset_id($room->get_asset_id());
        if (!$configurations->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_configurations'), 405);
        }
        return $this->response($configurations->get_as_ajax_response(), 200);
    }

    public function vatrate_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']))
        {
            return $this->response(null, 400);
        }
        $venue_vat_rate = 0;
        $room = $this->_find_room_by_id($get['room_id'], false);
        if (!$room->is_null('venue_vat_rate'))
        {
            $venue_vat_rate = $room->get('venue_vat_rate');
        }
        return $this->response(json_encode(['error' => ['occurred' => false], 'data' => $venue_vat_rate]), 200);
    }

    public function flexiblepercent_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']))
        {
            return $this->response(null, 400);
        }
        $flexible_percent = 0;
        $room = $this->_find_room_by_id($get['room_id'], false);
        if (!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))
        {
            $flexible_percent = $room->get('flexible_percent');
        }
        return $this->response(json_encode(['error' => ['occurred' => false], 'data' => $flexible_percent]), 200);
    }

    public function pricecontrolpercent_get()
    {
        if (!$this->dx_auth->is_logged_in())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['room_id']))
        {
            return $this->response(null, 400);
        }
        $price_control_percent = 0;
        $room = $this->_find_room_by_id($get['room_id'], false);
        if (!$room->is_null('price_control_percent'))
        {
            $price_control_percent = $room->get('price_control_percent');
        }
        return $this->response(json_encode(['error' => ['occurred' => false], 'data' => $price_control_percent]), 200);
    }

    public function allfavourites_get()
    {
        $get = $this->get();
        if (!isset($get['room_id']))
        {
            return $this->response(null, 400);
        }
        $room = $this->_find_room_by_id($get['room_id']);
        $modelAssetFavourite = Model__asset_favourites::class;
        $this->load->model($modelAssetFavourite);
        $favourites = $this->$modelAssetFavourite->get_asset_favourites_collection_by_asset($room->get_asset_id());
        return $this->response($favourites->get_count(), 200);
    }

    public function attribute_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['asset_id']))
        {
            return $this->response(null, 400);
        }
        $modelAssetAttributes = Model__asset_attributes::class;
        $this->load->model($modelAssetAttributes);
        $room_attributes = $this->$modelAssetAttributes->get_attribute_collection_by_id($get['asset_id']);
        $retArr = [];
        if ($room_attributes->exists_in_db())
        {
            $retArr['room_attributes'] = $room_attributes->get_as_array()['objects'];
        }
        $retArr['asset_id'] = $get['asset_id'];
        $retArr['attribute_id'] = $get['attribute_id'];
        return $this->response($retArr, 200);
    }

    public function attribute_post()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $post = $this->post();
        if (!isset($post['asset_id']) || !isset($post['attribute_id']))
        {
            return $this->response(null, 400);
        }
        $modelAssetAttributes = Model__asset_attributes::class;
        $this->load->model($modelAssetAttributes);
        $existingAttribute = $this->$modelAssetAttributes->get_attribute_object_by_asset_and_attribute($post['asset_id'], $post['attribute_id']);
        if ($existingAttribute->exists_in_db())
        {
            return $this->response('The attribute already exists for that room', 405);
        }
        $attribute = new Runt_Asset_Attribute();
        $attribute->set('asset_id', $post['asset_id']);
        $attribute->set('attribute_id', $post['attribute_id']);
        $this->$modelAssetAttributes->insert_update($attribute);
        return $this->response([], 201);
    }

    public function attribute_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        if (!isset($put['asset_id']) || !isset($put['attribute_id']))
        {
            return $this->response(null, 400);
        }
        $modelAssetAttributes = Model__asset_attributes::class;
        $this->load->model($modelAssetAttributes);
        $existingAttribute = $this->$modelAssetAttributes->get_attribute_object_by_asset_and_attribute($put['asset_id'], $put['attribute_id']);
        if ($existingAttribute->exists_in_db())
        {
            $this->$modelAssetAttributes->delete($existingAttribute);
        }
        return $this->response([], 200);
    }

    public function favourite_get()
    {
        $currentUser = $this->dx_auth->get_user_id();
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($currentUser);
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $this->_find_user_room_favourites($currentUser);
    }

    public function favourite_post()
    {
        $post = $this->post();
        if (!isset($post['room_id']))
        {
            return $this->response(null, 400);
        }
        $currentUser = $this->dx_auth->get_user_id();
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($currentUser);
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $room = $this->_find_room_by_id($post['room_id']);
        $modelAssetFavourite = Model__asset_favourites::class;
        $this->load->model($modelAssetFavourite);
        $existingFav = $this->$modelAssetFavourite->get_asset_favourite_object_by_user_and_asset($currentUser, $room->get_asset_id());
        if ($existingFav->exists_in_db())
        {
            return $this->response(null, 400);
        }
        $favourite = new Runt_Asset_Favourite();
        $favourite->set('asset_id', $room->get_asset_id());
        $favourite->set('user_id', $currentUser);
        $favourite->set('created', date("Y-m-d H:i:s"));
        $this->$modelAssetFavourite->insert_update($favourite);
        $this->_find_user_room_favourites($currentUser, $room->get_asset_id());
    }

    private function _find_user_room_favourites($user_id, $asset_id = false)
    {
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        if ($asset_id != false)
        {
            $rooms = $this->$modelRooms->get_user_favourited_room_object_by_asset_id($user_id, $asset_id);
            if (!$rooms->exists_in_db())
            {
                return $this->response([], 409);
            }
        }
        else
        {
            $rooms = $this->$modelRooms->get_user_favourited_rooms($user_id);
            if (!$rooms->exists_in_db())
            {
                return $this->response([], 200);
            }
        }
        $ret_rooms = [];
        foreach ($rooms->object() as $room)
        {
            $ret = [];
            $ret['id'] = $room->get_id();
            $ret['title'] = $room->get('title');
            $ret['image'] = $room->wrangle('image')->get_url('medium');
            $ret['room_url'] = get_room_url($room);
            $ret_rooms[] = $ret;
        }
        if ($asset_id != false)
        {
            return $this->response($ret_rooms, 201);
        }
        else
        {
            return $this->response($ret_rooms, 200);
        }
    }

    public function favourite_put()
    {
        $put = $this->put();
        if (!isset($put['room_id']))
        {
            return $this->response(null, 400);
        }
        $currentUser = $this->dx_auth->get_user_id();
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($currentUser);
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        $room = $this->_find_room_by_id($put['room_id']);
        $modelAssetFavourite = Model__asset_favourites::class;
        $this->load->model($modelAssetFavourite);
        $existingFav = $this->$modelAssetFavourite->get_asset_favourite_object_by_user_and_asset($currentUser, $room->get_asset_id());
        if ($existingFav->exists_in_db())
        {
            $this->$modelAssetFavourite->delete($existingFav);
        }
        return $this->response(['room_id' => $put['room_id']], 200);
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
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($put['id'], true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $dataToChange = false;
        $fieldArr = [
            'ranking',
            'non_original_desc',
            'sponsored',
            'price_control_percent',
            'flexible_percent',
            'flexible_enabled',
            'description',
            'hidden'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $room->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if (isset($put['approved']))
        {
            if ($put['approved'] == 1)
            {
                if ($this->_ready_for_approval($room))
                {
                    $room->set('approved_datetime', date("Y-m-d H:i:s"));
                    $room->set('approver', $this->dx_auth->get_user_id());
                }
                else
                {
                    return $this->response('This room is not ready to be approved, please check name and configurations.', 403);
                }
            }
            $room->set('approved', $put['approved']);
            $dataToChange = true;
        }
        if (!$room->is_approved() && !$room->is_true('ready_for_approval') && $this->_ready_for_approval($room))
        {
            $room->set('ready_for_approval', 1);
            $dataToChange = true;
        }
        if ($dataToChange)
        {
            $this->$modelRooms->insert_update($room);
        }
        return $this->response($room->get_as_ajax_response(), 200);
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
        $modelRooms = Model__room_skeletons::class;
        $this->load->model($modelRooms);
        $room = $this->$modelRooms->get_room_object_by_id($delete['id'], true, false);
        if (!$room->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_room'), 405);
        }
        $asset_id = $room->get_asset_id();
        $modelImages = Model__images::class;
        $this->load->model($modelImages);
        $roomImgs = $this->$modelImages->get_images_object_collection_by_subject_id($asset_id);
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
        $modelAssets = Model__assets::class;
        $this->load->model($modelAssets);
        $asset = $this->$modelAssets->get_asset_object_by_id($asset_id);
        if ($asset->exists_in_db())
        {
            $asset->set_enabled(false);
            $asset->set('deleted_at', date("Y-m-d H:i:s"));
            $this->$modelAssets->insert_update($asset);
        }
        return $this->response([], 200);
    }

    private function _ready_for_approval($room)
    {
        if (!$room->data_not_empty('title'))
        {
            return false;
        }
        if ($room->get('primary_vertical_id') == Vertical::OFFICE)
        {
            return true;
        }
        $modelConfigurations = Model__room_configurations::class;
        $this->load->model($modelConfigurations);
        $configs = $this->$modelConfigurations->get_configurations_object_collection_by_asset_id($room->get_asset_id());
        if ($configs->get_count() > 0)
        {
            return true;
        }
        return false;
    }

    public function catalogue_get()
    {
        $get = $this->get();
        if (!isset($get['hash']) || $this->config->item('room_catalogue_access_hash') != $get['hash'])
        {
            // restrict access unless hash is known
            return $this->response(null, 400);
        }
        $path = $_SERVER["DOCUMENT_ROOT"] . $this->config->item('room_catalogue_dir');
        if (!file_exists($path) || filemtime($path) < time() - $this->config->item('room_catalogue_cache_seconds'))
        {
            $modelRooms = Model__simple_rooms::class;
            $this->load->model($modelRooms);
            $rooms = $this->$modelRooms->get_room_catalogue_collection();
            if ($rooms->exists_in_db())
            {
                $fp = fopen($path, 'w');
                fputcsv($fp, ['id', 'availability', 'condition', 'description', 'image_link', 'link', 'title', 'price', 'brand']);
                foreach ($rooms->object() as $room)
                {
                    fputcsv($fp, [
                        $room->get_id(),
                        'in stock', //availability
                        'new', // condition
                        mb_substr(strip_tags($room->get('description')), 0, 5000, 'UTF-8'),
                        $room->wrangle('image')->get_url('large'),
                        get_room_url($room),
                        $room->get('title'),
                        floatval($room->get('hourly_rate')) ?: floatval($room->get('daily_rate')) ?: floatval($room->get('daily_delegate_rate')) ?: floatval($room->get('monthly_rate')),
                        $room->get('venue_name')
                    ]);
                }
                fclose($fp);
            }
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=room_catalogue_cache.csv');
            readfile($path);
            exit;
        }
    }
}