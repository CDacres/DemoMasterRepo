<?php

namespace App\Http\Controllers\VersionZero;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use App\Models\Enquiry;
use App\Models\EnquiryDuration;
use App\Models\User;
use App\Models\EnquiryStatus;
use App\Models\RoomAsset;
use App\Models\Configuration;
use App\Models\Booking\AssetCommission;
use App\Models\Booking\BookingChannel;

use App\Helpers\HubspotHelper;

class Enquiries extends Controller
{
    protected $defaultClass = Enquiry::class;

    public function create_enquiry(Request $request)
    {
        $hubspot_enquiry = [];
        $currentUser = $this->authority();
        $enquiry = new Enquiry();
        $enquiry->set_audit_user_id($request->user_id);
        $enquiry->set_enquiring_user($this->authority());
        if (!is_null($request->get('budget')) && $request->budget > 0)
        {
            $enquiry->budget = $request->budget;
            $hubspot_enquiry['budget'] = $request->budget;
        }
        if (!is_null($request->get('potentialValue')) && $request->potentialValue > 0)
        {
            $enquiry->potentialValue = $request->potentialValue;
            $hubspot_enquiry['potentialValue'] = $request->potentialValue;
        }
        if (!is_null($request->get('user_phone')))
        {
            $enquiry->user_phone = $request->user_phone;
        }
        if (!is_null($request->get('assignedAdmin')))
        {
            $enquiry->assignedAdmin = $request->assignedAdmin;
        }
        if (!is_null($request->get('description')))
        {
            $enquiry->description = $request->description;
            $hubspot_enquiry['description'] = $request->description;
        }
        if (!is_null($request->get('eventDate')))
        {
            $enquiry->eventDate = $request->eventDate;
            $hubspot_enquiry['eventDate'] = $request->eventDate;
        }
        if (!is_null($request->get('eventTime')))
        {
            $enquiry->eventTime = $request->eventTime;
            $hubspot_enquiry['eventTime'] = $request->eventTime;
        }
        if (!is_null($request->get('duration')))
        {
            $enquiry->duration = $request->duration;
            $chosenDuration = EnquiryDuration::where('admin_only', $this->user_is_admin())->find($request->duration);
            if (!is_null($chosenDuration))
            {
                $hubspot_enquiry['duration'] = $chosenDuration->desc;
            }
        }
        if (!is_null($request->get('location')))
        {
            $enquiry->location = $request->location;
            $hubspot_enquiry['location'] = $request->location;
        }
        if (!is_null($request->get('guests')))
        {
            $enquiry->guests = $request->guests;
            $hubspot_enquiry['guests'] = $request->guests;
        }
        if (!is_null($request->get('tourDate')))
        {
            $enquiry->tourDate = $request->tourDate;
        }
        if (!is_null($request->get('dateFlexible')))
        {
            $enquiry->dateFlexible = $request->dateFlexible;
            $hubspot_enquiry['dateFlexible'] = $request->dateFlexible;
        }
        if (!is_null($request->get('timeDurationFlexible')))
        {
            $enquiry->timeDurationFlexible = $request->timeDurationFlexible;
            $hubspot_enquiry['timeDurationFlexible'] = $request->timeDurationFlexible;
        }
        if (!is_null($request->get('locationFlexible')))
        {
            $enquiry->locationFlexible = $request->locationFlexible;
            $hubspot_enquiry['locationFlexible'] = $request->locationFlexible;
        }
        if (!is_null($request->get('multipleDates')))
        {
            $enquiry->multipleDates = $request->multipleDates;
            $hubspot_enquiry['multipleDates'] = $request->multipleDates;
        }
        if (!is_null($request->get('message')))
        {
            $enquiry->message = $request->message;
            $hubspot_enquiry['message'] = $request->message;
        }
        if (!is_null($request->get('deskCount')))
        {
            $enquiry->deskCount = $request->deskCount;
        }
        if (!is_null($request->get('roomsViewed')))
        {
            $enquiry->roomsViewed = $request->roomsViewed;
        }
        $hubspot_enquiry['user_email'] = '';
        $user = $this->_find_user($request);
        if (!is_null($user))
        {
            $enquiry->user_id = $user->id;
            $hubspot_enquiry['user_email'] = $user->email;
        }
        if ($this->user_is_admin())
        {
            $enquiry->creator = $currentUser->id;
        }
        elseif ($this->user_is_logged_in())
        {
            $enquiry->creator = $enquiry->user_id;
        }
        $enquiry->status = EnquiryStatus::PENDING;
        $enquiry->save();
        $hubspot_enquiry['id'] = $enquiry->id;
        $hubspot_rooms = $this->_handle_rooms($request, $enquiry, $chosenDuration);
        $hubspot_enquiry['room_urls'] = $hubspot_rooms['room_urls'];
        $hubspot_enquiry['room_ids'] = $hubspot_rooms['room_ids'];
        $hubspot_enquiry['configurations'] = $this->_handle_configs($request, $enquiry);
        if (isset($request->get('assignedAdmin')))
        {
            if (!is_null($request->get('assignedAdmin')))
            {
                $adminuser = User::find($request->get('assignedAdmin'));
                if (!is_null($adminuser))
                {
                    $hubspot_enquiry['hubspot_owner'] = $adminuser->hubspot_id;
                }
            }
            else
            {
                $hubspot_enquiry['hubspot_owner'] = '';
            }
        }
        if (!is_null($user) && isset($hubspot_enquiry['user_email']))
        {
            // Create hubspot deal, associated with beneficiary of the booking.
            try
            {
                $hubspotHelper = new HubspotHelper();
                $associatedVid = $hubspotHelper->get_create_hubspot_id($user);
                $properties = $this->_create_hubspot_properties($hubspot_enquiry, (!is_null($request->get('roomsViewed'))?$request->get('roomsViewed'):[]));
                $deal_response = $hubspotHelper->create_deal($associatedVid, $properties);
                if (isset($deal_response['result']->dealId))
                {
                    $enquiry->suppress_audit_on_update();
                    $enquiry->hubspot_id = $deal_response['result']->dealId;
                    $enquiry->save();
                }
                else
                {
                    error_log('Unable to send enquiry to Hubspot' . json_encode($deal_response), 0);
                }
                if (!is_null($request->get('user_phone')))
                {
                    $phoneresult = $hubspotHelper->update_user($associatedVid, [(object) ['property' => 'phone', 'value' => $request->get('user_phone')]]);
                    if (!isset($phoneresult['status']) || (isset($phoneresult['status']) && $phoneresult['status'] != 204))
                    {
                        Log::error('Unable to update user phone number: ' . $user->id);
                    }
                }
            }
            catch (Exception $exc)
            {
                error_log('Error trying to call hubspot: ' . $exc->message);
            }
        }
    }

    private function _find_user($request)
    {
        $user = null;
        if (!is_null($request->get('user_id')))
        {
            $user = User::find($request->get('user_id'));
        }
        elseif (!is_null($request->get('user_email')))
        {
            $user = User::where('email', $request->get('user_email'))->first();
        }
        elseif (!is_null($request->get('user_phone')))
        {
            $phone = $request->get('user_phone');
            $user = User::whereHas('profile', function($query) use ($phone) {
                $query->where('phone_number', $phone)->orWhere('phone_number_search', $phone);
            });
        }
        return $user;
    }

    private function _handle_rooms($request, $enquiry, $chosenDuration)
    {
        $hubspot_return = [
            'room_urls' => '',
            'room_ids' => ''
        ];
        if (!is_null($request->get('selectedRooms')) && count($request->get('selectedRooms')) > 0)
        {
            $selRooms = $request->get('selectedRooms');
            $rooms = RoomAsset::whereHas('details', function($query) use ($selRooms) {
                $query->whereIn('id', $selRooms);
            })->get();
            if (!is_null($rooms))
            {
                $enquiry->set_request_rooms($rooms);
                $room_urls = [];
                $venueArr = [];
                foreach ($rooms as $room)
                {
                    $room_urls[] = $room->details->url;
                    $venueArr[$room->parent->id][] = $room->id;
                }
                if (is_null($request->get('potentialValue')) || $request->get('potentialValue') == 0)
                {
                    $venue_commissions = AssetCommission::whereIn('asset_id', array_keys($venueArr))->where('bookingChannel_id', BookingChannel::FRONTEND)->get();
                    if (isset($chosenDuration) && !is_null($chosenDuration))
                    {
                        if (!is_null($venue_commissions))
                        {
                            foreach ($venue_commissions as $venue_commission)
                            {
                                if (isset($venueArr[$venue_commission->asset_id]))
                                {
                                    foreach ($venueArr[$venue_commission->asset_id] as $comm_room)
                                    {
                                        $price = '';
                                        $roomObj = $rooms->find($comm_room);
                                        if (!is_null($roomObj->hourlyprice) && $chosenDuration->hour_option)
                                        {
                                            $price = ($roomObj->hourlyprice * $chosenDuration->dur_value);
                                        }
                                        elseif ($chosenDuration->day_option)
                                        {
                                            if (!is_null($roomObj->day_rate_details) && !is_null($roomObj->day_rate_details->dailyprice))
                                            {
                                                $price = ($roomObj->day_rate_details->dailyprice * $chosenDuration->dur_value);
                                            }
                                            elseif (!is_null($roomObj->hourlyprice))
                                            {
                                                $price = ($roomObj->hourlyprice * 9 * $chosenDuration->dur_value);
                                            }
                                        }
                                        elseif (!is_null($roomObj->day_rate_details) && !is_null($roomObj->day_rate_details->monthly_price) && $chosenDuration->month_option)
                                        {
                                            $price = ($roomObj->day_rate_details->monthly_price * $chosenDuration->dur_value);
                                        }
                                        if ($price != '')
                                        {
                                            $enquiry->potentialValue = ceil(1000 * $price * $venue_commission->commissionPercentage) / 100000;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                $hubspot_return = [
                    'room_urls' => implode(',', $room_urls),
                    'room_ids' => implode(',', $request->get('selectedRooms'))
                ];
            }
        }
        return $hubspot_return;
    }

    private function _handle_configs($request, $enquiry)
    {
        $hubspot_return = '';
        if (!is_null($request->get('selectedConfigs')) && count($request->get('selectedConfigs')) > 0)
        {
            $configs = Configuration::whereIn('id', $request->get('selectedConfigs'))->get();
            if (!is_null($configs))
            {
                $enquiry->set_request_configs($configs);
                $hubspotConfigArr = [];
                foreach ($configs as $config)
                {
                    $hubspotConfigArr[] = $config->desc;
                }
                $hubspot_return = implode(',', $hubspotConfigArr);
            }
        }
        return $hubspot_return;
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
                $rooms = Room::whereIn('id', explode(',', $roomsViewed))->get();
                if (!is_null($rooms))
                {
                    $room_urls = '';
                    foreach ($rooms as $room)
                    {
                        $room_urls .= ((empty($room_urls))?$room->url:',' . $room->url);
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
        return $properties;
    }
}