<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Image_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function index_post()
    {
        $post = $this->post();
        if (isset($post['id']))
        {
            return $this->response(null, 400);
        }
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $user = $this->$modelUsers->get_user_by_id($this->dx_auth->get_user_id());
        if (!$user->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_user'), 405);
        }
        if (isset($post['user']))
        {
            $user_id = $user->get_id();
            if ($post['user'] != $user_id)
            {
                return $this->response($this->lang->line('rest_wrong_perm'), 405);
            }
            $path = $user->wrangle('image')->get_path() . 'users/' . $user_id;
            if (isset($path))
            {
                if (!is_dir($path))
                {
                    mkdir($path, 0777, true);
                }
                elseif (isset($post['user']))
                {
                    foreach (array_diff(scandir($path), ['.', '..']) as $file)
                    {
                        unlink($path . '/' . $file);
                    }
                }
                $this->load->library('upload', ['max_size' => config_item('post_max_size'), 'allowed_types' => 'jpg|jpeg|gif|png', 'upload_path' => $path, 'encrypt_name' => true, 'remove_spaces' => true]);
                if ($this->upload->data() != null)
                {
                    if (!$this->upload->do_upload("upload_image"))
                    {
                        return $this->response($this->upload->display_errors('', ''), 424);
                    }
                    else
                    {
                        $this->load->helper('file');
                        $data = $this->upload->data();
                        if (isset($post['user']))
                        {
                            foreach ($user->wrangle('image')->get_profile_sizes() as $sizeKey => $size)
                            {
                                GenerateThumbFile($path . '/' . $data['file_name'], $path . '/userpic_' . $sizeKey . $data['file_ext'], $size[0], $size[1]);
                            }
                            rename($path . '/' . $data['file_name'], $path . '/userpic' . $data['file_ext']);
                            $returnUrl = $user->wrangle('image')->get_user_url('profile');
                            return $this->response($returnUrl, 201);
                        }
                    }
                }
            }
            else
            {
                return $this->response($this->lang->line('rest_file_too_large'), 413);
            }
        }
    }

    public function index_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $put = $this->put();
        $modelImages = Model__images::class;
        $this->load->model($modelImages);
        if (!isset($put['id']))
        {
            return $this->response(null, 400);
        }
        if (isset($put['venue_id']) && isset($put['room_id']))
        {
            return $this->response($this->lang->line('rest_both_room_venue'), 405);
        }
        if (isset($put['venue_id']))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $asset = $this->$modelVenues->get_venue_object_by_id($put['venue_id'], true);
            if (!$asset->exists_in_db())
            {
                return $this->response($this->lang->line('rest_no_room_venue'), 405);
            }
            $asset_id = $asset->get_asset_id();
        }
        elseif (isset($put['room_id']))
        {
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $asset = $this->$modelRooms->get_room_object_by_id($put['room_id'], true, false);
            if (!$asset->exists_in_db())
            {
                return $this->response($this->lang->line('rest_no_room_venue'), 405);
            }
            $asset_id = $asset->get_asset_id();
        }
        elseif (isset($put['asset_id']))
        {
            $modelAssets = Model__assets::class;
            $this->load->model($modelAssets);
            $asset = $this->$modelAssets->get_asset_object_by_id($put['asset_id']);
            if (!$asset->exists_in_db())
            {
                return $this->response($this->lang->line('rest_no_room_venue'), 405);
            }
            $asset_id = $asset->get_id();
        }
        $image = $this->$modelImages->get_image_object_by_asset_and_id($asset_id, $put['id']);
        if (!$image->exists_in_db())
        {
            return $this->response($this->lang->line('rest_no_image'), 405);
        }
        $dataToChange = false;
        $fieldArr = [
            'represents',
            'comments',
            'flagged',
            'cosmetic'
        ];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $image->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if (isset($put['configuration_id']))
        {
            if ($image->get('configuration_id') == $put['configuration_id'])
            {
                $image->set('configuration_id');
            }
            else
            {
                $image->set('configuration_id', $put['configuration_id']);
            }
            $dataToChange = true;
        }
        if ($dataToChange)
        {
            $this->$modelImages->insert_update($image);
        }
        return $this->response([], 200);
    }
}