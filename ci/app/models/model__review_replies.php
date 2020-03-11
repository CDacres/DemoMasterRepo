<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Reviews Model
 *
 * Reviews in database
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */
class Model__review_replies extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Review_Reply::class);
        parent::__construct();
    }

    protected function _user_can_insert($object)
    {
        $retVal = false;
        $reviewsModel = Model__reviews::class;
        $this->load->model($reviewsModel);
        $review = $this->$reviewsModel->get_review_and_asset_owner_by_id($object->get('review_id'), $object->get('author_id'));
        if ($review->exists_in_db())
        {
            $retVal = true;
        }
        return $retVal;
    }

    protected function _user_can_select($object)
    {
        return true;
    }

    protected function _pre_insert($object)
    {
        $object->set('created', date("Y-m-d H:i:s"));
    }

    protected function _post_insert($object)
    {
        $reviewsModel = Model__reviews::class;
        $this->load->model($reviewsModel);
        $review = $this->$reviewsModel->get_review_and_asset_owner_by_id($object->get('review_id'), $object->get('author_id'));
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $receiver = $this->$modelUsers->get_user_by_id($review->get('author_id'));
        if ($receiver->exists_in_db())
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->review_reply_notification($object, $review);
        }
    }
}