<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

use GuzzleHttp\Client;

class Analytics_Helper
{
    private $_user = null;

    function __construct()
    {
        $this->CI = &get_instance();
        $this->CI->load->helper('tracking');
        $this->tracking = new Tracking_Helper();
    }

    function get_room_events_by_tracking_cookie(Tracking_Cookie $tracking_cookie)
    {
        if ($tracking_cookie->has_user_id())
        {
            $endpoint = "/user_journeys/stories/" . $tracking_cookie->get('user_id') . "/ROOM_VIEW/ASC";
        }
        else
        {
            $endpoint = "/token_journeys/stories/" . $tracking_cookie->get('id') . "/ROOM_VIEW/ASC";
        }
        $body = ['query' => ['api_token' => getenv('ANALYTICS_API_KEY')]];
        return $this->_ping_api('GET', $endpoint, $body);
    }

    public function register_checkout($dataArrRaw)
    {
        $dataArr = $this->_convert_checkout_slots($dataArrRaw);
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $dataArr['tracking_cookie_id'] = $this->_get_tcid();
        $dataArr['language'] = $this->_get_user_lang();
        $dataArr['admin_id'] = $this->_get_admin_id();
        $endpoint = "/checkout";
        $body = ['json' => $dataArr];
        $return_data = $this->_ping_api('POST', $endpoint, $body);
        return $return_data->checkout_id;
    }

    private function _convert_checkout_slots($dataArrRaw)
    {
        $slotsCollection = $dataArrRaw['slots'];
        $slotsArray = [];
        foreach ($slotsCollection->object() as $slot)
        {
            $slotData = [];
            $slotData['start'] = $slot->get('start');
            $slotData['end'] = $slot->get('end');
            $slotData['period_id'] = $slot->get('period_id');
            $slotsArray[] = $slotData;
        }
        $dataArrRaw['slots'] = $slotsArray;
        return $dataArrRaw;
    }

    public function register_had_meeting($reservation_id, $user_id)
    {
        $user = $this->_get_user_by_id($user_id);
        return $this->_register_event_on_behalf_of_user($user, 'HAD_MEETING', [$reservation_id]);
    }

    private function _register_potentially_on_behalf_of_user($user, $event, $cfv = [])
    {
        if (!is_null($event))
        {
            if ($this->_get_passivity())
            {
                return $this->_register_event_on_behalf_of_user($user, $event, $cfv);
            }
            else
            {
                return $this->register_tracking_event($event, $cfv);
            }
        }
    }

    public function register_tracking_event($event, $cfv = [])
    {
        return $this->_register_event($event, $this->_get_tcid(), $this->_get_user_lang(), $this->_get_admin_id(), $cfv);
    }

    private function _register_event($event, $tc, $lang, $admin_id, $cfv = [], $passive = false)
    {
        $endpoint = "/user_journeys/events/" . $event;
        $json = [
            'api_token' => getenv('ANALYTICS_API_KEY'),
            'tracking_cookie_id' => $tc,
            'language' => $lang,
            'admin_id' => $admin_id,
            'passive' => $passive
        ];
        for ($i = 0; $i < count($cfv); ++$i)
        {
            $field_id = ($i + 1);
            $json['context_field_' . $field_id . '_value'] = $cfv[$i];
        }
        $body = ['json' => $json];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    private function _register_event_on_behalf_of_user($user, $event, $cfv = [])
    {
        $tc = $this->tracking->get_canonical_cookie_by_user_id($user->get('id'));
        return $this->_register_event($event, $tc->get('id'), $user->get('language_pref'), $this->_get_admin_id(true), $cfv, $this->_get_passivity());
    }

    public function register_enquiry($enquiry_id, $user)
    {
        return $this->_register_potentially_on_behalf_of_user($user, 'MAKE_ENQUIRY', [$enquiry_id]);
    }

    public function register_deal_opened($user)
    {
        return $this->_register_deal($user, 'OPENED');
    }

    public function register_deal_closed($user)
    {
        return $this->_register_deal($user, 'CLOSED');
    }

    private function _register_deal($user, $type)
    {
        $event = null;
        switch ($type)
        {
            case 'OPENED':
                $event = "DEAL_OPENED";
            break;

            case 'CLOSED':
                $event = "DEAL_CLOSED";
            break;

            default:
            break;
        }
        return $this->_register_potentially_on_behalf_of_user($user, $event);
    }

    public function register_search($dataArr)
    {
        try
        {
            $this->CI->load->library('GoogleGeocodeAPI');
            $response = $this->CI->googlegeocodeapi->latlng_geocode($dataArr['lat'], $dataArr['lon']);
        }
        catch (Exception $ex)
        {
            error_log('GoogleGeocodeAPI failed in analytics_helper with lat: ' . $dataArr['lat'] . ' and long: ' . $dataArr['lon'] . " and error: " . $ex->getMessage());
        }
        $fields = [
            'locality',
            'country',
            'street_number',
            'route',
            'postal_town',
            'administrative_area_level_1',
            'administrative_area_level_2',
            'administrative_area_level_3',
            'administrative_area_level_4',
            'administrative_area_level_5',
            'neighborhood',
            'premise',
            'subpremise',
            'airport',
            'point_of_interest',
            'bus_station',
            'train_station',
            'transit_station',
            'postal_code',
            'sublocality',
            'sublocality_level_1',
            'sublocality_level_2',
            'sublocality_level_3',
            'sublocality_level_4',
            'sublocality_level_5',
            'political'
        ];
        if (isset($response['results']) && count($response['results']) > 0)
        {
            $location = $response['results'][0];
            if (isset($location['address_components']))
            {
                foreach ($location['address_components'] as $address_component)
                {
                    $types = $address_component['types'];
                    foreach ($fields as $field)
                    {
                        if (in_array($field, $types))
                        {
                            $dataArr[$field] = utf8_encode($address_component['long_name']);
                        }
                    }
                }
            }
            $dataArr['geocoded'] = 1;
        }
        else
        {
            $dataArr['geocoded'] = 0;
        }
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $dataArr['tracking_cookie_id'] = $this->_get_tcid();
        $dataArr['language'] = $this->_get_user_lang();
        $dataArr['admin_id'] = $this->_get_admin_id();
        $endpoint = "/search";
        $body = ['json' => $dataArr];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    public function canonicalize_cookies($non_canon_id, $canon_id)
    {
        $endpoint = "/user_journeys/canonicalize/" . $non_canon_id;
        $body = [
            'json' => ['api_token' => getenv('ANALYTICS_API_KEY'),
                'canon_id' => $canon_id
                ]
        ];
        return $this->_ping_api('PUT', $endpoint, $body);
    }

    public function back_fill_user_steps($tracking_cookie_id, $user_id)
    {
        $endpoint = "/user_journeys/back_fill/" . $tracking_cookie_id;
        $body = [
            'json' => ['api_token' => getenv('ANALYTICS_API_KEY'),
                'user_id' => $user_id
                ]
        ];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    public function log_url()
    {
        if (!$this->tracking->should_log_visit(true))
        {
            return false;
        }
        $this->CI->load->library('user_agent');
        $get = $this->CI->input->get();
        $tracking_cookie_id = $this->_get_tcid();
        $endpoint = "/log/url";
        $body = [
            'json' => ['api_token' => getenv('ANALYTICS_API_KEY'),
                'session_id' => $this->CI->session->userdata['session_id'],
                'tracking_cookie_id' => $tracking_cookie_id,
                'admin_id' => $this->_get_admin_id(),
                'referring_url' => utf8_encode($this->CI->agent->referrer()),
                'landing_url' => utf8_encode($_SERVER['REQUEST_URI'])
                ]
        ];
        $this->_fire_relevant_source_analytics($get, $tracking_cookie_id);
        return $this->_ping_api('POST', $endpoint, $body);
    }

    private function _fire_relevant_source_analytics($get, $tracking_cookie_id)
    {
        if (isset($get['source']))
        {
            if ($get['source'] == 'adwords')
            {
                $this->_log_adwords($get, $tracking_cookie_id);
            }
            elseif ($get['source'] == 'facebook')
            {
                $this->_log_facebook($get, $tracking_cookie_id);
            }
            elseif ($get['source'] == 'zipcube')
            {
                $this->_log_zipcube($get, $tracking_cookie_id);
            }
        }
        elseif (isset($get['utm_source']))
        {
            if (isset($get['ct']))
            {
                // Most likely Mailchimp
                $this->_log_email_campaign($get, $tracking_cookie_id);
            }
        }
    }

    public function increment_bot_visit($bot_name)
    {
        $endpoint = "/log/bots/" . $bot_name;
        $body = ['json' => ['api_token' => getenv('ANALYTICS_API_KEY')]];
        return $this->_ping_api('PUT', $endpoint, $body, true);
    }

    private function _get_tcid()
    {
        return $this->tracking->get_cookie_id();
    }

    private function _get_admin_id($for_passive = false)
    {
        $user_id = null;
        if ($for_passive)
        {
            if ($this->_get_passivity())
            {
                $user_id = $this->CI->dx_auth->get_user_id();
            }
        }
        elseif ($this->CI->dx_auth->is_spoof_mode())
        {
            $user_id = $this->CI->session->userdata('spoof_admin_userid');
        }
        return $user_id;
    }

    private function _get_passivity()
    {
        return $this->CI->dx_auth->is_admin();
    }

    private function _get_user_lang()
    {
        if ($this->CI->dx_auth->is_spoof_mode())
        {
            $user = $this->_get_user_by_id($this->CI->dx_auth->get_user_id());
            $retLang = $user->get('language_pref');
        }
        else
        {
            $retLang = $this->CI->session->userdata('user_lang');
        }
        return $retLang;
    }

    private function _get_user_by_id($id)
    {
        if (!(isset($this->_user) && ($this->_user->get('id') == $id)))
        {
            $modelUsers = Model__users::class;
            $this->CI->load->model($modelUsers);
            $this->_user = $this->CI->$modelUsers->get_user_by_id($id);
        }
        return $this->_user;
    }

    private function _ping_api($type, $endpoint, $body, $allow_bots = false)
    {
        if (!$this->tracking->tracking_is_enabled() || (!$allow_bots && $this->tracking->bot_detected()))
        {
            return json_decode('');
        }
        try
        {
            $options = [];
            if (ENVIRONMENT !== 'production')
            {
                $options['verify'] = false;
            }
            $client = new Client($options);
            $response = $client->request($type, getenv('ANALYTICS_API_URL') . $endpoint, $body);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('The analytics API request failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        return json_decode($response->getBody());
    }

    private function _log_adwords($get, $tracking_cookie_id)
    {
        $dataArr = [];
        if (isset($get['campaignid']))
        {
            $dataArr['campaign_id'] = $get['campaignid'];
        }
        if (isset($get['adgroupid']))
        {
            $dataArr['ad_group_id'] = $get['adgroupid'];
        }
        if (isset($get['creative']))
        {
            $dataArr['creative'] = $get['creative'];
        }
        if (isset($get['keyword']))
        {
            $dataArr['keyword'] = $get['keyword'];
        }
        if (isset($get['targetId']))
        {
            $dataArr['target_id'] = $get['targetId']; // adwords tracking url contains "targetId" but db expects target_id
        }
        if (isset($get['loc_interest_ms']))
        {
            $dataArr['loc_interest_ms'] = $get['loc_interest_ms'];
        }
        if (isset($get['loc_physical_ms']))
        {
            $dataArr['loc_physical_ms'] = $get['loc_physical_ms'];
        }
        if (isset($get['matchtype']))
        {
            $dataArr['match_type'] = $get['matchtype']; // adwords tracking url contains "matchtype" but db expects match_type
        }
        if (isset($get['network']))
        {
            $dataArr['network'] = $get['network'];
        }
        if (isset($get['placement']))
        {
            $dataArr['placement'] = $get['placement'];
        }
        if (isset($get['adposition']))
        {
            $dataArr['ad_position'] = $get['adposition']; // adwords tracking url contains "adposition" but db expects ad_position
        }
        if (isset($get['gclid']))
        {
            $dataArr['gclid'] = $get['gclid'];
        }
        $endpoint = "/log/adwords";
        $dataArr['tracking_cookie_id'] = $tracking_cookie_id;
        $dataArr['session_id'] = $this->CI->session->userdata['session_id'];
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $body = ['json' => $dataArr];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    private function _log_facebook($get, $tracking_cookie_id)
    {
        $dataArr = [];
        if (isset($get['utm_source']))
        {
            $dataArr['utm_source'] = $get['utm_source'];
        }
        if (isset($get['utm_campaign']))
        {
            $dataArr['utm_campaign'] = $get['utm_campaign'];
        }
        if (isset($get['utm_medium']))
        {
            $dataArr['utm_medium'] = $get['utm_medium'];
        }
        if (isset($get['utm_content']))
        {
            $dataArr['utm_content'] = $get['utm_content'];
        }
        $endpoint = "/log/facebook";
        $dataArr['tracking_cookie_id'] = $tracking_cookie_id;
        $dataArr['session_id'] = $this->CI->session->userdata['session_id'];
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $body = ['json' => $dataArr];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    private function _log_email_campaign($get, $tracking_cookie_id)
    {
        $dataArr = [];
        if (isset($get['utm_source']))
        {
            $dataArr['utm_source'] = $get['utm_source'];
        }
        if (isset($get['utm_campaign']))
        {
            $dataArr['utm_campaign'] = $get['utm_campaign'];
        }
        if (isset($get['utm_medium']))
        {
            $dataArr['utm_medium'] = $get['utm_medium'];
        }
        if (isset($get['utm_term']))
        {
            $dataArr['utm_term'] = $get['utm_term'];
        }
        if (isset($get['ct']))
        {
            $dataArr['ct'] = $get['ct'];
        }
        if (isset($get['goal']))
        {
            $dataArr['goal'] = $get['goal'];
        }
        $endpoint = "/log/email_campaign";
        $dataArr['tracking_cookie_id'] = $tracking_cookie_id;
        $dataArr['session_id'] = $this->CI->session->userdata['session_id'];
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $body = ['json' => $dataArr];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    private function _log_zipcube($get, $tracking_cookie_id)
    {
        if (isset($get['medium']))
        {
            if ($get['medium'] == 'email')
            {
                $this->_log_email($get, $tracking_cookie_id);
            }
            elseif ($get['medium'] == 'shared_link')
            {
                $this->_log_shared_link($get, $tracking_cookie_id);
            }
        }
    }

    private function _log_email($get, $tracking_cookie_id)
    {
        if (isset($get['type']))
        {
            switch ($get['type'])
            {
                case 'sys':

                    $this->_log_system_email($get, $tracking_cookie_id);
                break;

//                case 'marketing':
//
//                    $this->_log_marketing_email($get);
//                break;

                case 'rm':

                    $this->_log_remarketing_email($get, $tracking_cookie_id);
                break;

                default: //backwards compatibility for old email links. Can probably be removed at some point (Will - 24/07/2017)

                    $this->_log_system_email($get, $tracking_cookie_id);
                break;
            }
        }
    }

    private function _log_remarketing_email($get)
    {
        $modelUserMail = Model__user_mail::class;
        $this->CI->load->model($modelUserMail);
        $userMail = $this->CI->$modelUserMail->get_by_clicked_token($get['ct']);
        if ($userMail->exists_in_db())
        {
            if ($userMail->get('clicked') == 0)
            {
                $userMail->set('clicked', 1);
                $userMail->set('first_clicked', date("Y-m-d H:i:s"));
            }
            $userMail->set('last_clicked', date("Y-m-d H:i:s"));
            $this->CI->$modelUserMail->insert_update($userMail);
        }
        $this->register_tracking_event('EMAIL_CLICKED', [$userMail->get('id')]);
        $this->tracking->connect_user_to_current_cookie_and_return_id($userMail->get('user_id'));
        //TODO: Analytics needs to ping api with info on user clicking in from remarketing email - automatically assign user_id to new token and connect all dots.
    }

    private function _log_system_email($get, $tracking_cookie_id)
    {
        $dataArr = [];
        if (isset($get['detail']))
        {
            $dataArr['type'] = $get['detail'];
        }
        else
        {
            $dataArr['type'] = $get['type']; //backwards compatibility for old email links. Can probably be removed at some point. (Will - 24/07/2017)
        }
        $endpoint = "/log/system_email";
        $dataArr['tracking_cookie_id'] = $tracking_cookie_id;
        $dataArr['session_id'] = $this->CI->session->userdata['session_id'];
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $body = ['json' => $dataArr];
        return $this->_ping_api('POST', $endpoint, $body);
    }

    private function _log_shared_link($get, $tracking_cookie_id)
    {
        $dataArr = [];
        if (isset($get['admin_id']))
        {
            $dataArr['sharing_admin_id'] = $get['admin_id'];
        }
        $endpoint = "/log/shared_link";
        $dataArr['link'] = $this->CI->uri->uri_string();
        $dataArr['tracking_cookie_id'] = $tracking_cookie_id;
        $dataArr['session_id'] = $this->CI->session->userdata['session_id'];
        $dataArr['api_token'] = getenv('ANALYTICS_API_KEY');
        $body = ['json' => $dataArr];
        return $this->_ping_api('POST', $endpoint, $body);
    }
}