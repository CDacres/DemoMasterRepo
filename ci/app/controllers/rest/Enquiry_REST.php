<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Enquiry_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function durations_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $modelEnquiryDurations = Model__enquiry_durations::class;
        $this->load->model($modelEnquiryDurations);
        $durations = $this->$modelEnquiryDurations->get_enquiry_duration_collection(true);
        return $this->response($durations->get_as_ajax_response(), 200);
    }

    public function closepastpending_put()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $modelEnquiries = Model__enquiries::class;
        $this->load->model($modelEnquiries);
        $enquiries = $this->$modelEnquiries->get_past_pending_enquiry_collection();
        if ($enquiries->exists_in_db())
        {
            foreach ($enquiries->object() as $enquiry)
            {
                $enquiry->set('status', Enquiry_Status::LOST);
                $enquiry->set('lost_notes', 'Bulk lost update due to date in the past');
            }
            $this->$modelEnquiries->insert_update($enquiries);
        }
        return $this->response([], 200);
    }

    public function index_get()
    {
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
        $get = $this->get();
        if (!isset($get['id']))
        {
            return $this->response('No enquiry ID provided', 400);
        }
        $modelEnquiries = Model__enquiries::class;
        $this->load->model($modelEnquiries);
        $enquiry = $this->$modelEnquiries->get_enquiry_by_id($get['id']);
        if (!$enquiry->exists_in_db())
        {
            return $this->response('No enquiry matching the provided ID was found', 400);
        }
        $return_enquiry = $enquiry->get_as_array();
        $selected_rooms = [];
        if ($enquiry->get('rooms')->get_count() > 0)
        {
            foreach ($enquiry->get('rooms')->object() as $enq_room)
            {
                $selected_rooms[] = $enq_room->get('room_id');
            }
        }
        $return_enquiry['selectedRooms'] = $selected_rooms;
        $selected_configs = [];
        if ($enquiry->get('configurations')->get_count() > 0)
        {
            foreach ($enquiry->get('configurations')->object() as $enq_config)
            {
                $selected_configs[] = $enq_config->get('configuration_id');
            }
        }
        $return_enquiry['selectedConfigs'] = $selected_configs;
        return $this->response($return_enquiry, 200);
    }

    public function index_post()
    {
        try
        {
            $post = $this->post();
            $modelEnquiries = Model__enquiries::class;
            $this->load->model($modelEnquiries);
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $hubspot_enquiry = [];
            $enquiry = new Enquiry();
            if (!empty($post['budget']) && $post['budget'] > 0)
            {
                $enquiry->set('budget', $post['budget']);
            }
            if (!empty($post['potentialValue']) && $post['potentialValue'] > 0)
            {
                $enquiry->set('potentialValue', $post['potentialValue']);
            }
            if (!empty($post['user_phone']))
            {
                $enquiry->set('user_phone', $post['user_phone']);
            }
            if (isset($post['assignedAdmin']))
            {
                if (!empty($post['assignedAdmin']))
                {
                    $enquiry->set('assignedAdmin', $post['assignedAdmin']);
                }
                else
                {
                    $enquiry->set('assignedAdmin');
                }
            }
            if (!empty($post['source']))
            {
                $enquiry->set('source', $post['source']);
            }
            if (!empty($post['description']))
            {
                $enquiry->set('description', $post['description']);
            }
            if (!empty($post['eventDate']))
            {
                $enquiry->set('eventDate', $post['eventDate']);
            }
            if (!empty($post['eventTime']))
            {
                $enquiry->set('eventTime', $post['eventTime']);
            }
            if (!empty($post['duration']))
            {
                $enquiry->set('duration', $post['duration']);
                $modelEnquiryDurations = Model__enquiry_durations::class;
                $this->load->model($modelEnquiryDurations);
                $durations = $this->$modelEnquiryDurations->get_enquiry_duration_collection($this->dx_auth->is_admin());
                if ($durations->exists_in_db())
                {
                    $chosenDuration = $durations->get_object_by_id($enquiry->get('duration'));
                }
            }
            if (!empty($post['location']))
            {
                $enquiry->set('location', $post['location']);
            }
            if (!empty($post['guests']))
            {
                $enquiry->set('guests', $post['guests']);
            }
            if (!empty($post['tourDate']))
            {
                $enquiry->set('tourDate', $post['tourDate']);
            }
            if (!empty($post['dateFlexible']))
            {
                $enquiry->set('dateFlexible', $post['dateFlexible']);
            }
            if (!empty($post['timeDurationFlexible']))
            {
                $enquiry->set('timeDurationFlexible', $post['timeDurationFlexible']);
            }
            if (!empty($post['locationFlexible']))
            {
                $enquiry->set('locationFlexible', $post['locationFlexible']);
            }
            if (!empty($post['multipleDates']))
            {
                $enquiry->set('multipleDates', $post['multipleDates']);
            }
            if (!empty($post['message']))
            {
                $enquiry->set('message', $post['message']);
            }
            if (!empty($post['deskCount']))
            {
                $enquiry->set('deskCount', $post['deskCount']);
            }
            if (!empty($post['roomsViewed']))
            {
                $enquiry->set('roomsViewed', $post['roomsViewed']);
            }
            $hubspot_enquiry['user_email'] = '';
            if (isset($post['user_id']) && !empty($post['user_id']))
            {
                $user = $this->$modelUsers->get_user_by_id($post['user_id']);
            }
            elseif (isset($post['user_email']) && !empty($post['user_email']))
            {
                $user = $this->$modelUsers->get_user_by_email($post['user_email']);
            }
            elseif (isset($post['user_phone']) && !empty($post['user_phone']))
            {
                $modelProfiles = Model__profiles::class;
                $this->load->model($modelProfiles);
                $profile = $this->$modelProfiles->get_profile_by_phone($post['user_phone']);
                if ($profile->exists_in_db())
                {
                    $user = $this->$modelUsers->get_user_by_id($profile->get('user_id'));
                }
            }
            else
            {
                $user = new Base__Null();
            }
            if ($user->exists_in_db())
            {
                $enquiry->set('user_id', $user->get_id());
                $hubspot_enquiry['user_email'] = $user->get('email');
            }
            if ($this->dx_auth->is_admin())
            {
                $enquiry->set('creator', $this->dx_auth->get_user_id());
            }
            elseif ($this->dx_auth->is_logged_in())
            {
                $enquiry->set('creator', $enquiry->get('user_id'));
            }
            $enquiry->set('status', Enquiry_Status::PENDING);
            $this->$modelEnquiries->insert_update($enquiry);
            if ($user->exists_in_db())
            {
                $this->$modelUsers->set_user_enquirer_state($user);
                $this->load->helper('analytics');
                $analytics_helper = new Analytics_Helper();
                $analytics_helper->register_enquiry($enquiry->get_id(), $user);
            }
            $hubspot_enquiry['id'] = $enquiry->get_id();
            $hubspot_enquiry['budget'] = $enquiry->get('budget');
            $hubspot_enquiry['description'] = $enquiry->get('description');
            $hubspot_enquiry['message'] = $enquiry->get('message');
            $hubspot_enquiry['dateFlexible'] = $enquiry->get('dateFlexible');
            $hubspot_enquiry['timeDurationFlexible'] = $enquiry->get('timeDurationFlexible');
            $hubspot_enquiry['locationFlexible'] = $enquiry->get('locationFlexible');
            $hubspot_enquiry['multipleDates'] = $enquiry->get('multipleDates');
            $hubspot_enquiry['eventDate'] = $enquiry->get('eventDate');
            $hubspot_enquiry['eventTime'] = $enquiry->get('eventTime');
            $hubspot_enquiry['location'] = $enquiry->get('location');
            $hubspot_enquiry['guests'] = $enquiry->get('guests');
            if (isset($chosenDuration) && !$chosenDuration->is_null_object())
            {
                $hubspot_enquiry['duration'] = $chosenDuration->get('desc');
            }
            if (isset($post['assignedAdmin']))
            {
                if (!empty($post['assignedAdmin']))
                {
                    $adminuser = $this->$modelUsers->get_user_by_id($post['assignedAdmin']);
                    if ($adminuser->exists_in_db())
                    {
                        $hubspot_enquiry['hubspot_owner'] = $adminuser->get('hubspot_id');
                    }
                }
                else
                {
                    $hubspot_enquiry['hubspot_owner'] = '';
                }
            }
            if (isset($post['selectedRooms']))
            {
                $hubspot_enquiry['room_urls'] = '';
                $hubspot_enquiry['room_ids'] = '';
                $room_urls = [];
                $venueArr = [];
                $modelRooms = Model__simple_rooms::class;
                $this->load->model($modelRooms);
                $rooms = $this->$modelRooms->get_rooms_by_ids($post['selectedRooms']);
                if ($rooms->exists_in_db())
                {
                    $modelEnquiryRooms = Model__enquiry_rooms::class;
                    $this->load->model($modelEnquiryRooms);
                    foreach ($rooms->object() as $room)
                    {
                        $room_urls[] = get_room_url($room);
                        $venueArr[$room->get('venue_asset_id')][] = $room->get_id();
                        $enquiry_room = new Runt_Enquiry_Room();
                        $enquiry_room->set('enquiry_id', $enquiry->get_id());
                        $enquiry_room->set('room_id', $room->get_id());
                        $this->$modelEnquiryRooms->insert_update($enquiry_room);
                    }
                }
                if (empty($post['potentialValue']) || $post['potentialValue'] == 0)
                {
                    $modelAssetCommission = Model__asset_commissions::class;
                    $this->load->model($modelAssetCommission);
                    $venue_commissions = $this->$modelAssetCommission->get_commission_collection_by_asset_array_and_channel(array_keys($venueArr), Booking_Channel::FRONTEND);
                    if (isset($chosenDuration) && !$chosenDuration->is_null_object() && $venue_commissions->exists_in_db())
                    {
                        foreach ($venue_commissions->object() as $venue_commission)
                        {
                            if (isset($venueArr[$venue_commission->get('asset_id')]))
                            {
                                foreach ($venueArr[$venue_commission->get('asset_id')] as $comm_room)
                                {
                                    $price = '';
                                    $roomObj = $rooms->get_object_by_id($comm_room);
                                    if (!$roomObj->is_null('hourly_rate') && $chosenDuration->is_true('hour_option'))
                                    {
                                        $price = ($roomObj->get('hourly_rate') * $chosenDuration->get('dur_value'));
                                    }
                                    elseif ($chosenDuration->is_true('day_option'))
                                    {
                                        if (!$roomObj->is_null('daily_rate'))
                                        {
                                            $price = ($roomObj->get('daily_rate') * $chosenDuration->get('dur_value'));
                                        }
                                        elseif (!$roomObj->is_null('hourly_rate'))
                                        {
                                            $price = ($roomObj->get('hourly_rate') * 9 * $chosenDuration->get('dur_value'));
                                        }
                                    }
                                    elseif ($chosenDuration->is_true('week_option'))
                                    {
                                        if (!$roomObj->is_null('daily_rate'))
                                        {
                                            $price = ($roomObj->get('daily_rate') * 7 * $chosenDuration->get('dur_value'));
                                        }
                                        elseif (!$roomObj->is_null('hourly_rate'))
                                        {
                                            $price = ($roomObj->get('hourly_rate') * 9 * 7 * $chosenDuration->get('dur_value'));
                                        }
                                    }
                                    elseif (!$roomObj->is_null('monthly_rate') && $chosenDuration->is_true('month_option'))
                                    {
                                        $price = ($roomObj->get('monthly_rate') * $chosenDuration->get('dur_value'));
                                    }
                                    if ($price != '')
                                    {
                                        $enquiry->set('potentialValue', ceil(1000 * $price * $venue_commission->get('commission_percentage')) / 100000);
                                    }
                                }
                            }
                        }
                    }
                }
                $hubspot_enquiry['room_urls'] = implode(',', $room_urls);
                $hubspot_enquiry['room_ids'] = implode(',', $post['selectedRooms']);
            }
            $hubspot_enquiry['potentialValue'] = $enquiry->get('potentialValue');
            if (isset($post['selectedConfigs']))
            {
                $hubspot_enquiry['configurations'] = '';
                $hubspotConfigArr = [];
                $modelConfigs = Model__configurations::class;
                $this->load->model($modelConfigs);
                $configurations = $this->$modelConfigs->get_configurations_by_ids($post['selectedConfigs']);
                if ($configurations->exists_in_db())
                {
                    foreach ($configurations->object() as $config)
                    {
                        $hubspotConfigArr[] = $config->get('desc');
                    }
                }
                $modelEnquiryConfigs = Model__enquiry_configurations::class;
                $this->load->model($modelEnquiryConfigs);
                foreach ($post['selectedConfigs'] as $config_id)
                {
                    $enquiry_configuration = new Runt_Enquiry_Configuration();
                    $enquiry_configuration->set('enquiry_id', $enquiry->get_id());
                    $enquiry_configuration->set('configuration_id', $config_id);
                    $this->$modelEnquiryConfigs->insert_update($enquiry_configuration);
                }
                $hubspot_enquiry['configurations'] = implode(',', $hubspotConfigArr);
            }
        }
        catch (Exception $ex)
        {
            return $this->response($ex->getMessage(), 400);
        }
        if (isset($user) && isset($hubspot_enquiry['user_email']))
        {
            try
            {
                $associatedVid = $this->$modelUsers->get_create_hubspot_id($user);
                $contact_properties = [];
                $this->load->library('HubspotAPI');
                if (isset($post['user_phone']))
                {
                    $contact_properties[] = (object) [
                        'property' => 'phone',
                        'value' => $post['user_phone']
                    ];
                }
                if (isset($hubspot_enquiry['hubspot_owner']) && $hubspot_enquiry['hubspot_owner'] != '')
                {
                    $contact_properties[] = (object) [
                        'property' => 'hubspot_owner_id',
                        'value' => $hubspot_enquiry['hubspot_owner']
                    ];
                }
                if (count($contact_properties) > 0)
                {
                    $contact_response = $this->hubspotapi->update_user($associatedVid, $contact_properties);
                    if (!isset($contact_response['status']) || (isset($contact_response['status']) && $contact_response['status'] != 204))
                    {
                        error_log("Unable to update user phone number: " . $user->get('id'));
                    }
                }
                $properties = $this->_create_hubspot_properties($hubspot_enquiry, (!empty($post['roomsViewed'])?$post['roomsViewed']:[]));
                $associations['associatedVids'] = [$associatedVid];
                $deal_response = $this->hubspotapi->create_deal(config_item('hubspot_enquiry_portal_id'), config_item('hubspot_enquiry_pipeline_id'), config_item('hubspot_enquiry_stage_id'), $properties, $associations);
                if (isset($deal_response['result']->dealId))
                {
                    $enquiry->suppress_audit_on_update();
                    $enquiry->set('hubspot_id', $deal_response['result']->dealId);
                    $this->$modelEnquiries->insert_update($enquiry);
                }
                else
                {
                    error_log('Unable to send enquiry to Hubspot' . json_encode($deal_response));
                }
            }
            catch (Exception $exc)
            {
                error_log('Error trying to call hubspot: ' . $exc->message);
            }
        }
        $enquiryEmail = $this->$modelEnquiries->get_enquiry_by_id($enquiry->get_id());
        if ($enquiryEmail->exists_in_db() && $enquiryEmail->get('rooms')->get_count() > 0)
        {
            $modelComms = Model__comms::class;
            $this->load->model($modelComms);
            $this->$modelComms->enquiry($enquiryEmail);
        }
        return $this->response($enquiry->get_as_ajax_response(), 201);
    }

    public function index_put()
    {
        try
        {
            $put = $this->put();
            if (!isset($put['id']))
            {
                return $this->response(null, 400);
            }
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $modelEnquiries = Model__enquiries::class;
            $this->load->model($modelEnquiries);
            $enquiry = $this->$modelEnquiries->get_enquiry_by_id($put['id']);
            if (!$enquiry->exists_in_db())
            {
                return $this->response($this->lang->line('rest_no_enquiry'), 405);
            }
            $hubspot_enquiry = [];
            $enquiry->set('budget', trim($enquiry->get('budget')));
            if (!is_numeric($enquiry->get('budget')) || empty($enquiry->get('budget')))
            {
                $enquiry->set('budget');
            }
            $enquiry->set('potentialValue', trim($enquiry->get('potentialValue')));
            if (!is_numeric($enquiry->get('potentialValue')) || empty($enquiry->get('potentialValue')))
            {
                $enquiry->set('potentialValue');
            }
            if (isset($put['reservation_id']) && $enquiry->get('reservation_id') != $put['reservation_id'])
            {
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $reservation = $this->$modelReservations->get_extended_reservation_by_id($put['reservation_id']);
                if ($reservation->exists_in_db())
                {
                    $enquiry->set('reservation_id', $reservation->get_id());
                }
            }
            if (isset($put['notes']))
            {
                $enquiry->set('notes', $put['notes']);
                $hubspot_enquiry['notes'] = $put['notes'];
            }
            if (isset($put['status']) && $enquiry->get('status') != $put['status'])
            {
                $enquiry->set('status', $put['status']);
                if ($put['status'] == Enquiry_Status::WON)
                {
                    $hubspot_enquiry['dealstage'] = config_item('hubspot_enquiry_closedwon_stage_id');
                }
                elseif ($put['status'] == Enquiry_Status::LOST)
                {
                    $hubspot_enquiry['dealstage'] = config_item('hubspot_enquiry_closedlost_stage_id');
                }
                elseif ($put['status'] == Enquiry_Status::ALTERNATIVE || $put['status'] == Enquiry_Status::VIEWING || $put['status'] == Enquiry_Status::SALVAGE || $put['status'] == Enquiry_Status::OFFER)
                {
                    $hubspot_enquiry['dealstage'] = config_item('hubspot_enquiry_offer_stage_id');
                }
            }
            else
            {
                $enquiry->suppress_audit_on_update();
            }
            if (isset($put['lost_notes']))
            {
                $enquiry->set('lost_notes', $put['lost_notes']);
            }
            if (!empty($put['user_phone']))
            {
                $enquiry->set('user_phone', $put['user_phone']);
            }
            if (isset($put['assignedAdmin']))
            {
                if (!empty($put['assignedAdmin']))
                {
                    $enquiry->set('assignedAdmin', $put['assignedAdmin']);
                }
                else
                {
                    $enquiry->set('assignedAdmin');
                }
            }
            if (!empty($put['source']))
            {
                $enquiry->set('source', $put['source']);
            }
            if (!empty($put['quality_score']))
            {
                $enquiry->set('quality_score', $put['quality_score']);
                if ($put['quality_score'] > 0 && $enquiry->get('status') == Enquiry_Status::PENDING)
                {
                    $hubspot_enquiry['dealstage'] = config_item('hubspot_enquiry_qualified_stage_id');
                }
            }
            if (!empty($put['description']))
            {
                $enquiry->set('description', $put['description']);
            }
            if (!empty($put['eventDate']))
            {
                $enquiry->set('eventDate', $put['eventDate']);
            }
            if (!empty($put['eventTime']))
            {
                $enquiry->set('eventTime', $put['eventTime']);
            }
            if (!empty($put['duration']))
            {
                $enquiry->set('duration', $put['duration']);
                $modelEnquiryDurations = Model__enquiry_durations::class;
                $this->load->model($modelEnquiryDurations);
                $durations = $this->$modelEnquiryDurations->get_enquiry_duration_collection($this->dx_auth->is_admin());
                if ($durations->exists_in_db())
                {
                    $chosenDuration = $durations->get_object_by_id($enquiry->get('duration'));
                }
            }
            if (!empty($put['location']))
            {
                $enquiry->set('location', $put['location']);
            }
            if (!empty($put['guests']))
            {
                $enquiry->set('guests', $put['guests']);
            }
            if (!empty($put['tourDate']))
            {
                $enquiry->set('tourDate', $put['tourDate']);
            }
            if (!empty($put['dateFlexible']))
            {
                $enquiry->set('dateFlexible', $put['dateFlexible']);
            }
            if (!empty($put['timeDurationFlexible']))
            {
                $enquiry->set('timeDurationFlexible', $put['timeDurationFlexible']);
            }
            if (!empty($put['timeDurationFlexible']))
            {
                $enquiry->set('locationFlexible', $put['locationFlexible']);
            }
            if (!empty($put['multipleDates']))
            {
                $enquiry->set('multipleDates', $put['multipleDates']);
            }
            if (!empty($put['message']))
            {
                $enquiry->set('message', $put['message']);
            }
            if (!empty($put['deskCount']))
            {
                $enquiry->set('deskCount', $put['deskCount']);
            }
            if (!empty($put['roomsViewed']))
            {
                $enquiry->set('roomsViewed', $put['roomsViewed']);
            }
            $hubspot_enquiry['user_email'] = '';
            $user_id = null;
            $old_user_id = $enquiry->get('user_id');
            if (isset($put['user_id']) && !empty($put['user_id']))
            {
                $user = $this->$modelUsers->get_user_by_id($put['user_id']);
                if ($user->exists_in_db())
                {
                    $user_id = $user->get_id();
                    $enquiry->set('user_id', $user->get_id());
                    $hubspot_enquiry['user_email'] = $user->get('email');
                }
            }
            elseif (isset($put['user_email']) && !empty($put['user_email']))
            {
                $user = $this->$modelUsers->get_user_by_email($put['user_email']);
                if ($user->exists_in_db())
                {
                    $user_id = $user->get_id();
                    $enquiry->set('user_id', $user->get_id());
                    $hubspot_enquiry['user_email'] = $user->get('email');
                }
            }
            elseif (isset($put['user_phone']) && !empty($put['user_phone']))
            {
                $modelProfiles = Model__profiles::class;
                $this->load->model($modelProfiles);
                $profile = $this->$modelProfiles->get_profile_by_phone($put['user_phone']);
                if ($profile->exists_in_db())
                {
                    $user_id = $profile->get('user_id');
                    $enquiry->set('user_id', $profile->get('user_id'));
                    $hubspot_enquiry['user_email'] = $profile->get('email');
                }
            }
            elseif (!$enquiry->is_null('user_id'))
            {
                $user = $this->$modelUsers->get_user_by_id($enquiry->get('user_id'));
                if ($user->exists_in_db())
                {
                    $hubspot_enquiry['user_email'] = $user->get('email');
                }
            }
            $this->$modelEnquiries->insert_update($enquiry);
            if (!is_null($user_id))
            {
                $this->$modelUsers->set_user_enquirer_state_by_id($user_id);
            }
            if (!is_null($old_user_id) && $old_user_id !== $user_id)
            {
                $this->$modelUsers->set_user_enquirer_state_by_id($old_user_id);
            }
            $hubspot_enquiry['id'] = $enquiry->get_id();
            $hubspot_enquiry['potentialValue'] = $enquiry->get('potentialValue');
            $hubspot_enquiry['budget'] = $enquiry->get('budget');
            $hubspot_enquiry['description'] = $enquiry->get('description');
            $hubspot_enquiry['message'] = $enquiry->get('message');
            $hubspot_enquiry['dateFlexible'] = $enquiry->get('dateFlexible');
            $hubspot_enquiry['timeDurationFlexible'] = $enquiry->get('timeDurationFlexible');
            $hubspot_enquiry['locationFlexible'] = $enquiry->get('locationFlexible');
            $hubspot_enquiry['multipleDates'] = $enquiry->get('multipleDates');
            $hubspot_enquiry['eventDate'] = $enquiry->get('eventDate');
            $hubspot_enquiry['eventTime'] = $enquiry->get('eventTime');
            $hubspot_enquiry['location'] = $enquiry->get('location');
            $hubspot_enquiry['guests'] = $enquiry->get('guests');
            $hubspot_enquiry['quality_score'] = $enquiry->get('quality_score');
            if (isset($chosenDuration) && !$chosenDuration->is_null_object())
            {
                $hubspot_enquiry['duration'] = $chosenDuration->get('desc');
            }
            $hubspot_enquiry['hubspot_id'] = $enquiry->get('hubspot_id');
            if (isset($put['assignedAdmin']))
            {
                if (!empty($put['assignedAdmin']))
                {
                    $adminuser = $this->$modelUsers->get_user_by_id($put['assignedAdmin']);
                    if ($adminuser->exists_in_db())
                    {
                        $hubspot_enquiry['hubspot_owner'] = $adminuser->get('hubspot_id');
                    }
                }
                else
                {
                    $hubspot_enquiry['hubspot_owner'] = '';
                }
            }
            if (isset($put['selectedRooms']))
            {
                $hubspot_enquiry['room_urls'] = '';
                $hubspot_enquiry['room_ids'] = '';
                $modelEnquiryRooms = Model__enquiry_rooms::class;
                $this->load->model($modelEnquiryRooms);
                $existing_rooms = $this->$modelEnquiryRooms->get_enquiry_room_collection_by_id($enquiry->get_id());
                if ($existing_rooms->exists_in_db())
                {
                    $this->$modelEnquiryRooms->delete($existing_rooms);
                }
                $room_urls = [];
                $modelRooms = Model__room_skeletons::class;
                $this->load->model($modelRooms);
                $rooms = $this->$modelRooms->get_rooms_by_ids($put['selectedRooms']);
                if ($rooms->exists_in_db())
                {
                    foreach ($rooms->object() as $room)
                    {
                        $room_urls[] = get_room_url($room);
                        $enquiry_room = new Runt_Enquiry_Room();
                        $enquiry_room->set('enquiry_id', $enquiry->get_id());
                        $enquiry_room->set('room_id', $room->get_id());
                        $this->$modelEnquiryRooms->insert_update($enquiry_room);
                    }
                }
                $hubspot_enquiry['room_urls'] = implode(',', $room_urls);
                $hubspot_enquiry['room_ids'] = implode(',', $put['selectedRooms']);
            }
            if (isset($put['selectedConfigs']))
            {
                $hubspot_enquiry['configurations'] = '';
                $hubspotConfigArr = [];
                $modelConfigs = Model__configurations::class;
                $this->load->model($modelConfigs);
                $configurations = $this->$modelConfigs->get_configurations_by_ids($put['selectedConfigs']);
                if ($configurations->exists_in_db())
                {
                    foreach ($configurations->object() as $config)
                    {
                        $hubspotConfigArr[] = $config->get('desc');
                    }
                }
                $modelEnquiryConfigs = Model__enquiry_configurations::class;
                $this->load->model($modelEnquiryConfigs);
                $existing_configurations = $this->$modelEnquiryConfigs->get_enquiry_configuration_collection_by_id($enquiry->get_id());
                if ($existing_configurations->exists_in_db())
                {
                    $this->$modelEnquiryConfigs->delete($existing_configurations);
                }
                foreach ($put['selectedConfigs'] as $config_id)
                {
                    $enquiry_configuration = new Runt_Enquiry_Configuration();
                    $enquiry_configuration->set('enquiry_id', $enquiry->get_id());
                    $enquiry_configuration->set('configuration_id', $config_id);
                    $this->$modelEnquiryConfigs->insert_update($enquiry_configuration);
                }
                $hubspot_enquiry['configurations'] = implode(',', $hubspotConfigArr);
            }
        }
        catch (Exception $ex)
        {
            return $this->response($ex->getMessage(), 400);
        }
        if (isset($hubspot_enquiry['hubspot_id']))
        {
            try
            {
                $this->load->library('HubspotAPI');
                $properties = $this->_create_hubspot_properties($hubspot_enquiry, (!empty($put['roomsViewed'])?$put['roomsViewed']:[]));
                $deal_response = $this->hubspotapi->update_deal($hubspot_enquiry['hubspot_id'], $properties);
                if (!isset($deal_response['status']) || (isset($deal_response['status']) && $deal_response['status'] != 200))
                {
                    error_log('Unable to update enquiry with Hubspot' . json_encode($deal_response));
                }
                if (isset($hubspot_enquiry['notes']))
                {
                    $current_user = $this->$modelUsers->get_user_by_id($this->dx_auth->get_user_id());
                    if (!$current_user->is_null('hubspot_id'))
                    {
                        $properties = (object) ['body' => $hubspot_enquiry['notes']];
                        $engagement_response = $this->hubspotapi->create_note_engagement($hubspot_enquiry['hubspot_id'], $current_user->get('hubspot_id'), $properties);
                        if (!isset($engagement_response['status']) || (isset($engagement_response['status']) && $engagement_response['status'] != 200))
                        {
                            error_log('Unable to add engagement to enquiry with Hubspot' . json_encode($engagement_response));
                        }
                    }
                }
                if (isset($hubspot_enquiry['hubspot_owner']) && $hubspot_enquiry['hubspot_owner'] != '')
                {
                    $contact_properties[] = (object) [
                        'property' => 'hubspot_owner_id',
                        'value' => $hubspot_enquiry['hubspot_owner']
                    ];
                    $contact_response = $this->hubspotapi->update_user($enquiry->get('user_hubspot_id'), $contact_properties);
                    if (!isset($contact_response['status']) || (isset($contact_response['status']) && $contact_response['status'] != 200))
                    {
                        error_log("Unable to update contact (" . $enquiry->get('user_hubspot_id') . ") on Hubspot: " . json_encode($contact_response));
                    }
                }
            }
            catch (Exception $exc)
            {
                error_log("Unable to connect to Hubspot (" . $hubspot_enquiry['hubspot_id'] . ") status: " . $exc->getMessage());
            }
        }
        return $this->response($enquiry->get_as_ajax_response(), 200);
    }

    private function _create_hubspot_properties($enquiry, $roomsViewed)
    {
        $properties = [
            (object) [
                'name' => 'enquiry_id',
                'value' => $enquiry['id']
            ],
            (object) [
                'name' => 'amount',
                'value' => $enquiry['potentialValue']
            ],
            (object) [
                'name' => 'budget',
                'value' => $enquiry['budget']
            ],
            (object) [
                'name' => 'dealname',
                'value' => $enquiry['user_email']
            ],
            (object) [
                'name' => 'enquiry_description',
                'value' => $enquiry['description']
            ],
            (object) [
                'name' => 'message',
                'value' => $enquiry['message']
            ],
            (object) [
                'name' => 'dateflexible',
                'value' => (($enquiry['dateFlexible'] == '1')?'true':'false')
            ],
            (object) [
                'name' => 'timedurationflexible',
                'value' => (($enquiry['timeDurationFlexible'] == '1')?'true':'false')
            ],
            (object) [
                'name' => 'locationflexible',
                'value' => (($enquiry['locationFlexible'] == '1')?'true':'false')
            ],
            (object) [
                'name' => 'multipledates',
                'value' => (($enquiry['multipleDates'] == '1')?'true':'false')
            ],
            (object) [
                'name' => 'enquiry_event_date',
                'value' => $enquiry['eventDate']
            ],
            (object) [
                'name' => 'enquiry_event_time',
                'value' => $enquiry['eventTime']
            ],
            (object) [
                'name' => 'enquiry_location',
                'value' => $enquiry['location']
            ],
            (object) [
                'name' => 'enquiry_guests',
                'value' => $enquiry['guests']
            ],
            (object) [
                'name' => 'first_interaction',
                'value' => 'Website'
            ],
            (object) [
                'name' => 'closedate',
                'value' => strtotime($enquiry['eventDate']) * 1000
            ]
        ];
        if (isset($enquiry['room_ids']))
        {
            $properties[] = (object) [
                'name' => 'room_ids',
                'value' => $enquiry['room_ids']
            ];
        }
        if (isset($enquiry['configurations']))
        {
            $properties[] = (object) [
                'name' => 'room_configurations',
                'value' => $enquiry['configurations']
            ];
        }
        if (isset($enquiry['room_urls']))
        {
            if ($enquiry['room_urls'] == '' && count($roomsViewed) > 0)
            {
                $modelRooms = Model__room_skeletons::class;
                $this->load->model($modelRooms);
                $rooms = $this->$modelRooms->get_rooms_by_ids(explode(',', $roomsViewed));
                if ($rooms->exists_in_db())
                {
                    $room_urls = '';
                    foreach ($rooms->object() as $room)
                    {
                        $room_urls .= ((empty($room_urls))?get_room_url($room):',' . get_room_url($room));
                    }
                    $properties[] = (object) [
                        'name' => 'room_url',
                        'value' => $room_urls
                    ];
                }
            }
            else
            {
                $properties[] = (object) [
                    'name' => 'room_url',
                    'value' => $enquiry['room_urls']
                ];
            }
        }
        if (isset($enquiry['hubspot_owner']))
        {
            $properties[] = (object) [
                'name' => 'hubspot_owner_id',
                'value' => $enquiry['hubspot_owner']
            ];
        }
        if (isset($enquiry['duration']))
        {
            $properties[] = (object) [
                'name' => 'enquiry_duration',
                'value' => $enquiry['duration']
            ];
        }
        if (isset($enquiry['dealstage']))
        {
            $properties[] = (object) [
                'name' => 'dealstage',
                'value' => $enquiry['dealstage']
            ];
        }
        if (isset($enquiry['quality_score']) && $enquiry['quality_score'] > 0)
        {
            $properties[] = (object) [
                'name' => 'quality_score',
                'value' => $enquiry['quality_score']
            ];
        }
        return $properties;
    }
}