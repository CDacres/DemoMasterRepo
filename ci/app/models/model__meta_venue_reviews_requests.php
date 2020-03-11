<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__meta_venue_reviews_requests extends Model_Base__Unbound
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        return new Base__Null();
    }

    protected function _user_can_insert($object)
    {
        return true;
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $modelVenueReviewsRequests = Model__venue_reviews_requests::class;
        $this->load->model($modelVenueReviewsRequests);
        $venueReviewRequestCollection = new Venue_Reviews_Request___Collection();
        $modelComms = Model__comms::class;
        $this->load->model($modelComms);
        $recipientCounter = 0;
        foreach ($object->get('users')->object() as $userObject)
        {
            if ($userObject->get('email') != null)
            {
                $user = $this->_create_user($userObject, $modelUsers);
                $existingReview = $this->$modelVenueReviewsRequests->get_venue_review_request_by_user_and_asset_ids($user->get_id(), $object->get('asset_id'));
                if (!$existingReview->exists_in_db())
                {
                    $venueReviewRequest = new Venue_Reviews_Request();
                    $venueReviewRequest->set('asset_id', $object->get('asset_id'));
                    $venueReviewRequest->set('user_id', $user->get_id());
                    $venueReviewRequest->set('created', date("Y-m-d H:i:s"));
                    srand((double) microtime() * 1000000);
                    $venueReviewRequest->set('review_token', md5(uniqid(rand(), true)));
                    $venueReviewRequestCollection->add_object($venueReviewRequest);
                    $this->$modelComms->venue_reviews_request($venueReviewRequest);
                    ++$recipientCounter;
                }
            }
        }
        $this->$modelVenueReviewsRequests->insert_update($venueReviewRequestCollection);
        $object->set('recipient_count', $recipientCounter);
        $object->set('existing_count', $object->get('users')->get_count(false) - $recipientCounter);
        return $object;
    }

    private function _create_user($object, $modelUsers)
    {
        $email = $object->get('email');
        $user = $this->$modelUsers->get_user_by_email($email);
        if (!$user->exists_in_db())
        {
            $protoUser = new User();
            $protoUser->set('email', strtolower($email));
            if (!$object->is_null('never_bounce_status'))
            {
                $protoUser->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
            }
            $protoProfile = new Profile();
            $protoProfile->set('first_name', trim($object->get('first_name')));
            $user = $this->$modelUsers->create_new_user_with_profile($protoUser, $protoProfile);
        }
        else
        {
            if (!$object->is_null('never_bounce_status'))
            {
                $user->set('email_status', neverBounceStatusToEmailStatus($object->get('never_bounce_status')));
                $this->$modelUsers->insert_update($user);
            }
        }
        return $user;
    }
}
