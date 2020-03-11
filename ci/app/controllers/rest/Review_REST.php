<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Review_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
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
        $modelReviews = Model__reviews::class;
        $this->load->model($modelReviews);
        $review = $this->$modelReviews->get_base_object_by_id($put['id']);
        if (!$review->exists_in_db())
        {
            return $this->response('No review', 405);
        }
        $dataToChange = false;
        $fieldArr = ['review'];
        foreach ($fieldArr as $field)
        {
            if (isset($put[$field]))
            {
                $review->set($field, $put[$field]);
                $dataToChange = true;
            }
        }
        if ($dataToChange)
        {
            $this->$modelReviews->insert_update($review);
        }
        return $this->response([], 200);
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
        $modelReviews = Model__reviews::class;
        $this->load->model($modelReviews);
        $review = $this->$modelReviews->get_base_object_by_id($delete['id']);
        if (!$review->exists_in_db())
        {
            return $this->response('Unknown review', 405);
        }
        $asset_id = $review->get('subject_id');
        $review->set_enabled(false);
        $this->$modelReviews->insert_update($review);
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($asset_id);
        if ($venue->exists_in_db())
        {
            $modelFullRoom = Model__full_rooms::class;
            $this->load->model($modelFullRoom);
            $rooms = $this->$modelFullRoom->get_room_object_collection_by_venue_id($venue->get_id(), false, true, true);
            $venue->set('review_count', $venue->get('review_count') - 1);
            $venue->set('review_score', $rooms->get_overall_score());
            $this->$modelVenues->insert_update($venue);
        }
        return $this->response([], 200);
    }
}