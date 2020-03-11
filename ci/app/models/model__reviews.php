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
class Model__reviews extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Review::class);
        parent::__construct();
    }

    protected function _user_can_insert($object)
    {
        $retVal = false;
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($object->get('reservation_id'));
        if ($reservation->exists_in_db())
        {
            $previousReview = $this->get_review_by_reservation_id($reservation->get_id());
            if (!$previousReview->exists_in_db())
            {
                if (!$reservation->is_null('review_token'))
                {
                    $retVal = true;
                }
                elseif ($this->dx_auth->is_logged_in())
                {
                    $retVal = ($reservation->get('client_id') == $this->get_user_id());
                }
            }
        }
        elseif ($object->data_exists('subject_id'))
        {
            $modelRooms = Model__room_skeletons::class;
            $this->load->model($modelRooms);
            $room = $this->$modelRooms->get_room_object_by_asset_id($object->get('subject_id'));
            $retVal = $room->exists_in_db();
        }
        return $retVal;
    }

    protected function _user_can_select($object)
    {
        return true;
    }

    protected function _user_can_update($object)
    {
        return false;
    }

    protected function _pre_insert($object)
    {
        $object->set('created', date("Y-m-d H:i:s"));
    }

    protected function _post_insert($object)
    {
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($object->get('subject_id'));
        if ($object->data_exists('reservation_id'))
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_base_object_by_id($object->get('reservation_id'));
            try
            {
                $this->$modelReservations->update_reservation_status($reservation, Reservation_Status::COMPLETED);
            }
            catch (Exception $exc)
            {
                error_log("Unable to update reservation status: " . $exc->getMessage());
            }
            if (!$reservation->is_null('review_token'))
            {
                $this->$modelReservations->update_review_token($reservation);
            }
        }
        else
        {
            $modelVenueReviewsRequest = Model__venue_reviews_requests::class;
            $this->load->model($modelVenueReviewsRequest);
            $reviewAudit = $this->$modelVenueReviewsRequest->get_venue_review_request_by_user_and_asset_ids($object->get('author_id'), $venue->get_asset_id());
            if ($reviewAudit->exists_in_db())
            {
                $this->$modelVenueReviewsRequest->remove_review_audit_token($reviewAudit);
            }
        }
        if ($venue->exists_in_db())
        {
            $modelFullRoom = Model__full_rooms::class;
            $this->load->model($modelFullRoom);
            $rooms = $this->$modelFullRoom->get_room_object_collection_by_venue_id($venue->get_id(), false, true, true);
            $venue->set('review_count', $venue->get('review_count') + 1);
            $venue->set('review_score', $rooms->get_overall_score());
            $this->$modelVenues->insert_update($venue);
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user = $this->$modelUsers->get_user_by_id($object->get('author_id'));
            if ($user->exists_in_db())
            {
                $modelComms = Model__comms::class;
                $this->load->model($modelComms);
                $this->$modelComms->new_review_recieved($object);
                $this->$modelComms->thank_reviewer($user, $venue);
            }
        }
        $this->load->helper('analytics');
        $analytics_helper = new Analytics_Helper();
        $analytics_helper->register_tracking_event('VOLUNTARY_INTERACTION', ['User added review']);
    }

    public function get_review_by_reservation_id($reservationid)
    {
        return new Review($this->_get_review_by_reservation_id($reservationid));
    }

    private function _get_review_by_reservation_id($reservationid)
    {
        $this->db->where(Review::column('reservation_id'), $reservationid);
        return $this->_query_init_and_run();
    }

    public function get_reviews_object_collection_by_subject_id($room_assetId)
    {
        return new Review___Collection($this->_get_reviews_object_collection_by_subject_id($room_assetId));
    }

    private function _get_reviews_object_collection_by_subject_id($room_assetId)
    {
        $this->_add_users();
        $this->_add_assets();
        $this->_add_replies();
        $this->db->where(Review::column('subject_id'), $room_assetId);
        $this->db->order_by(Review::column('created'), 'DESC');
        return $this->_query_init_and_run(false);
    }

    public function get_reviews_object_collection_by_author_id($authorId)
    {
        return new Review___Collection($this->_get_reviews_object_collection_by_author_id($authorId));
    }

    private function _get_reviews_object_collection_by_author_id($authorId)
    {
        $this->_add_users();
        $this->_add_assets();
        $this->_add_replies();
        $this->db->where(Review::column('author_id'), $authorId);
        $this->db->where(Venue::column('approved'), 1);
        $this->db->where(Room_Skeleton::column('approved'), 1);
        $this->db->order_by(Review::column('created'), 'DESC');
        return $this->_query_init_and_run(false);
    }

    public function get_reviews_object_collection_by_asset_privileges($userId)
    {
        return new Review___Collection($this->_get_reviews_object_collection_by_asset_privileges($userId));
    }

    private function _get_reviews_object_collection_by_asset_privileges($userId)
    {
        $this->_add_users();
        $this->_add_assets();
        $this->_add_replies();
        $this->db->advanced_join(Room_Skeleton::class, Runt_User_Asset_Privilege::class, Room_Skeleton::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->where(Runt_User_Asset_Privilege::column('user_id'), $userId);
        $this->db->where(Venue::column('approved'), 1);
        $this->db->where(Room_Skeleton::column('approved'), 1);
        $this->db->order_by(Review::column('created'), 'DESC');
        return $this->_query_init_and_run(false);
    }

    public function get_review_and_asset_owner_by_id($reviewId, $userId)
    {
        return new Review($this->_get_review_and_asset_owner_by_id($reviewId, $userId));
    }

    private function _get_review_and_asset_owner_by_id($reviewId, $userId)
    {
        $this->_add_assets();
        $this->db->advanced_join(Room_Skeleton::class, Runt_User_Asset_Privilege::class, Room_Skeleton::asset_id_column(false), Runt_User_Asset_Privilege::column('asset_id', false));
        $this->db->advanced_join(Runt_User_Asset_Privilege::class, User::class, Runt_User_Asset_Privilege::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->where(Review::id_column(), $reviewId);
        $this->db->where(User::id_column(), $userId);
        return $this->_query_init_and_run();
    }

    private function _add_users()
    {
        $this->db->advanced_join(Review::class, User::class, Review::column('author_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Profile::column('first_name'), Review::alias('author_name'));
    }

    private function _add_assets()
    {
        $this->db->allow_join_disabled();
        $this->db->advanced_join(Review::class, Room_Skeleton::class, Review::column('subject_id', false), Room_Skeleton::asset_id_column(false));
        $this->db->advanced_join(Room_Skeleton::class, Venue::class, Room_Skeleton::column('venue_id', false), Venue::id_column(false));
        $this->db->disallow_join_disabled();
        $this->db->select_alias(Room_Skeleton::column('title'), Review::alias('room_name'));
        $this->db->select_alias(Venue::column('name'), Review::alias('venue_name'));
    }

    private function _add_replies()
    {
        $reviewUserTableAlias = "review_reply_user";
        $reviewProfileTableAlias = "review_reply_user_profile";
        $this->db->advanced_join(Review::class, Review_Reply::class, Review::id_column(false), Review_Reply::column('review_id', false));
        $this->db->advanced_join(Review_Reply::class, User::class, Review_Reply::column('author_id', false), User::id_column(false), "LEFT", NULL, $reviewUserTableAlias);
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false), "LEFT", $reviewUserTableAlias, $reviewProfileTableAlias);
        $this->_select_sub_collection(Review_Reply::class, 'replies');
        $this->_set_sub_collection_ordering(Review_Reply::column('created'), 'replies', 'DESC');
        $this->_select_sub_collection_alias(Review_Reply::column('reply'), 'replies', Review::alias('reply'));
        $this->_select_sub_collection_alias(Profile::column('first_name', true, $reviewProfileTableAlias), 'replies', Review::alias('reply_author'));
    }
}