<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Analytics_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function index_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['user_id']))
        {
            return $this->response('No user id provided', 400);
        }
        $modelTrackingCookies = Model__tracking_cookies::class;
        $this->load->model($modelTrackingCookies);
        $tracking_data = $this->$modelTrackingCookies->get_by_user_id($get['user_id']);
        if (!$tracking_data->exists_in_db())
        {
            return $this->response('No log entries found matching the provided user id', 400);
        }
        return $this->response($tracking_data->get_as_array(), 200);
    }

    public function userdata_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $this->load->helper('tracking');
        $tracking_helper = new Tracking_Helper();
        $get = $this->get();
        if (isset($get['token_id']))
        {
            $tracking_cookie = $tracking_helper->get_cookie_by_token_id($get['token_id']);
        }
        elseif (isset($get['user_id']))
        {
            $tracking_cookie = $tracking_helper->get_canonical_cookie_by_user_id($get['user_id']);
        }
        else
        {
            return $this->response('No token id or user id provided with request', 400);
        }
        if (!$tracking_cookie->exists_in_db())
        {
            return $this->response('No tracking cookie found with provided Token ID', 204);
        }
        $tracking_cookie_id = $tracking_cookie->get('id');
        $retArr = [];
        if ($tracking_cookie->has_user_id())
        {
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $user_id = $tracking_cookie->get('user_id');
            $user = $this->$modelUsers->get_user_by_id($user_id);
            if ($user->exists_in_db())
            {
                $retArr = $this->_get_user_activities($user_id);
                $retArr['user'][0] = [
                    'user_id' => $user->get_id(),
                    'user_email' => $user->get('email'),
                    'Fname' => $user->get('first_name'),
                    'Lname' => $user->get('last_name'),
                    'phnum' => $user->get('phone_number'),
                    'phnum_search' => $user->get('phone_number_search'),
                    'token_id' => $tracking_cookie_id
                ];
            }
        }
        $this->load->helper('analytics');
        $helper = new Analytics_Helper();
        $rawActivities = $helper->get_room_events_by_tracking_cookie($tracking_cookie);
//        $modelRooms = Model__room_skeletons::class;
//        $this->load->model($modelRooms);
//        $all_rooms = $this->$modelRooms->get_room_collection();
        $activities = [];
        if (isset($rawActivities))
        {
            foreach ($rawActivities as $activity)
            {
//                $room = $all_rooms->get_object_by_id($activity->context_field_1_value);
//                if (!$room->is_null_object())
//                {
//                    $activities[] = [
//                      'room_id' => $room->get_id(),
//                      'title' => $room->get('title'),
//                      'created' => $activity->created
//                    ];
//                }
                $activities[] = [
                    'room_id' => $activity->context_field_1_value,
                    'created' => $activity->created
                ];
            }
        }
        $retArr['activities'] = $activities;
        return $this->response($retArr, 200);
    }

    private function _get_user_activities($user_id)
    {
        $reservationsArr = [];
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservations = $this->$modelReservations->get_extended_reservation_collection_by_user($user_id);
        if ($reservations->exists_in_db())
        {
            foreach ($reservations->object() as $reservation)
            {
                $reservationsArr[] = [
                    'id' => $reservation->get_id(),
                    'room_id' => $reservation->get('room_id'),
                    'room_name' => $reservation->get('room_name'),
                    'room_url' => get_room_url($reservation),
                    'created' => $reservation->get('created'),
                    'status' => $reservation->get_status_label_colour()['value']
                ];
            }
        }
        $enquiriesArr = [];
        $modelEnquiries = Model__enquiries::class;
        $this->load->model($modelEnquiries);
        $enquiries = $this->$modelEnquiries->get_enquiry_collection_by_user($user_id);
        if ($enquiries->exists_in_db())
        {
            $enqArr = $enquiries->get_ids();
            foreach ($enqArr as $key => $enqId)
            {
                $enquiry = $enquiries->get_object_by_id($enqId);
                $enquiriesArr[$key]['assignedAdmin'] = $enquiry->get('assignedAdmin');
                $enquiriesArr[$key]['budget'] = $enquiry->get('budget');
                $enquiriesArr[$key]['created'] = $enquiry->get('created');
                $enquiriesArr[$key]['creator'] = $enquiry->get('creator');
                $enquiriesArr[$key]['dateFlexible'] = $enquiry->get('dateFlexible');
                $enquiriesArr[$key]['description'] = $enquiry->get('description');
                $enquiriesArr[$key]['deskCount'] = $enquiry->get('deskCount');
                $enquiriesArr[$key]['duration'] = $enquiry->get('duration');
                $enquiriesArr[$key]['eventDate'] = $enquiry->get('eventDate');
                $enquiriesArr[$key]['eventTime'] = $enquiry->get('eventTime');
                $enquiriesArr[$key]['flexible'] = $enquiry->get('flexible');
                $enquiriesArr[$key]['guests'] = $enquiry->get('guests');
                $enquiriesArr[$key]['hubspot_id'] = $enquiry->get('hubspot_id');
                $enquiriesArr[$key]['id'] = $enquiry->get_id();
                $enquiriesArr[$key]['location'] = $enquiry->get('location');
                $enquiriesArr[$key]['locationFlexible'] = $enquiry->get('locationFlexible');
                $enquiriesArr[$key]['message'] = $enquiry->get('message');
                $enquiriesArr[$key]['multipleDates'] = $enquiry->get('multipleDates');
                $enquiriesArr[$key]['potentialValue'] = $enquiry->get('potentialValue');
                $enquiriesArr[$key]['reservation_id'] = $enquiry->get('reservation_id');
                $enquiriesArr[$key]['roomsViewed'] = $enquiry->get('roomsViewed');
                $enquiriesArr[$key]['status'] = $enquiry->get('status');
                $enquiriesArr[$key]['timeDurationFlexible'] = $enquiry->get('timeDurationFlexible');
                $enquiriesArr[$key]['tourDate'] = $enquiry->get('tourDate');
                $enquiriesArr[$key]['tracking_cookie_id'] = $enquiry->get('tracking_cookie_id');
                $enquiriesArr[$key]['user_id'] = $enquiry->get('user_id');
                $enquiriesArr[$key]['user_phone'] = $enquiry->get('user_phone');
                $enq_roomsArr = [];
                if ($enquiry->get('rooms')->get_count() > 0)
                {
                    foreach ($enquiry->get('rooms')->object() as $enq_rooms)
                    {
                        $enq_roomsArr[] = [
                            'id' => $enq_rooms->get('room_id'),
                            'title' => $enq_rooms->get('title')
                        ];
                    }
                }
                $enquiriesArr[$key]['selectedRooms'] = $enq_roomsArr;
            }
        }
        $retArr = [
            'enquiries' => $enquiriesArr,
            'bookings' => $reservationsArr
        ];
        return $retArr;
    }
}