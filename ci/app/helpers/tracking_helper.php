<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

use Jaybizzle\CrawlerDetect\CrawlerDetect;

class Tracking_Helper
{
    function __construct()
    {
        $this->CI = &get_instance();
        $tracking_model = Model__tracking_cookies::class;
        $this->CI->load->model($tracking_model);
        $this->tracking_model = $this->CI->$tracking_model;
    }

     /*
     * Ignore search robots and crawlers.
     */
    private $IGNORE_SEARCH_BOTS = true;

    /*
     * Ignore if the browser sends the DNT: 1 header.
     */
    private $HONOR_DO_NOT_TRACK = false;

    /*
     * Ignore controllers
     */

    private $DIRECTORY_IGNORE_LIST = [
        'administrator/'
    ];

    /*
     * Ignore controllers
     */
    private $CONTROLLER_IGNORE_LIST = [
        'adwords',
        'api_json',
        'asset',
        'auth',
        'common',
        'common_protected',
        'errors',
        'expire',
        'info',
        'location_venue_update',
        'messages',
        'redirects',
        'sitemap_dynamic',
        'upload'
    ];

    /*
     * Ignore methods
     */
    private $METHOD_IGNORE_LIST = [
        'remote_signin',
        'new_remote_signin',
        'token_login',
        'is_logged_in'
    ];

    /*
     * Ignore ip address
     */
    private $IP_IGNORE_LIST = [
    ];

    /*
     * Ignore urls in the array
     */
    private $URL_IGNORE_LIST = [
        'api'
    ];

    public function connect_user_to_specific_cookie($token_id, $user_id)
    {
        if (!$this->tracking_is_enabled())
        {
            return false;
        }
        $tracking_cookie = $this->tracking_model->get_by_token_id($token_id);
        if ($tracking_cookie->exists_in_db())
        {
            if ($this->_update_cookie_with_user_id($tracking_cookie, $user_id))
            {
                return true;
            }
        }
        else
        {
            error_log("Attempt made to assign user_id: " . $user_id . " to token with id: " . $token_id . " which failed because the token doesn't seem to exist. Investigate.");
        }
        return false;
    }

    public function connect_user_to_current_cookie_and_return_id($user_id)
    {
        $canonical_token_id = null;
        if (!$this->tracking_is_enabled())
        {
            return null;
        }
        elseif ($this->_has_spoofed_user())
        {
            $tracking_cookie = $this->get_canonical_cookie_by_user_id($user_id);
            $canonical_token_id = $tracking_cookie->get('id');
        }
        else
        {
            $tracking_cookie = $this->get_cookie();
            if ($this->_update_cookie_with_user_id($tracking_cookie, $user_id))
            {
                $canonical_token_id = $tracking_cookie->get('id');
            }
            else
            {
                $canonical_token_id = $this->get_cookie_id_and_send_cookie_to_browser(true);
            }
        }
        return $canonical_token_id;
    }

    public function get_cookie_token()
    {
        $this->CI->load->helper('cookie');
        $cookie = get_cookie('zc_tc');
        if (!$this->_is_valid_cookie($cookie) && isset($this->CI->cookie_token))
        {
            $cookie = $this->CI->cookie_token;
        }
        return $cookie;
    }

    public function get_cookie($forceNew = false)
    {
        if (!$this->tracking_is_enabled())
        {
            return new Base__Null();
        }
        $cookie_token = $this->get_cookie_token();
        if ($forceNew)
        {
            $tracking_cookie = $this->_handle_tracking_cookie();
        }
        elseif ($this->_is_valid_cookie($cookie_token))
        {
            $tracking_cookie = $this->_cookie_from_token_session_default($cookie_token);
        }
        else
        {
            $tracking_cookie = $this->_cookie_from_session_default();
        }
        return $tracking_cookie;
    }

    private function _cookie_from_token_session_default($cookie_token)
    {
        $tracking_cookie = $this->tracking_model->get_by_token($cookie_token);
        if (!$tracking_cookie->exists_in_db())
        {
            error_log(new Exception("Cookie token " . $cookie_token . " was seen but there is no related database entry. Substituted to new id: " . $tracking_cookie->get('id') . ". Please investigate."));
            $tracking_cookie = $this->_cookie_from_session_default();
        }
        else
        {
            $tracking_cookie = $this->_handle_tracking_cookie($tracking_cookie);
        }
        return $tracking_cookie;
    }

    private function _cookie_from_session_default()
    {
        $tracking_cookie = $this->tracking_model->get_by_session($this->CI->session->userdata('session_id'));
        if ($tracking_cookie->exists_in_db())
        {
            $tracking_cookie = $this->_handle_tracking_cookie($tracking_cookie);
        }
        else
        {
            $tracking_cookie = $this->_handle_tracking_cookie();
        }
        return $tracking_cookie;
    }

    private function _is_valid_cookie($cookie_token)
    {
        return !(is_null($cookie_token) || $cookie_token === '' || !$cookie_token);
    }

    public function get_cookie_id_and_send_cookie_to_browser($forceNew = false)
    {
        if ($this->bot_detected() || !$this->tracking_is_enabled())
        {
            return null;
        }
        $tracking_data = $this->get_cookie($forceNew);
        $this->_update_cookie_with_natural_user_id($tracking_data);
        $this->_set_tracking_cookie($tracking_data->get('token'));
        return $tracking_data->get('id');
    }

    public function get_cookie_id()
    {
        if ($this->bot_detected() || !$this->tracking_is_enabled())
        {
            return null;
        }
        $cookie = (($this->_has_spoofed_user())?$this->_get_spoofed_user_cookie():$this->get_cookie());
        return $cookie->get('id');
    }

    private function _get_spoofed_user_cookie()
    {
        $user_id = $this->_get_current_user_id();
        return $this->get_canonical_cookie_by_user_id($user_id);
    }

    private function _has_spoofed_user()
    {
        return $this->CI->dx_auth->is_spoof_mode() && $this->_get_current_user_id() !== false;
    }

    private function _get_current_user_id()
    {
        return $this->CI->dx_auth->get_user_id();
    }

    public function get_canonical_cookie_by_user_id($user_id)
    {
        if (!$this->tracking_is_enabled())
        {
            return new Base__Null();
        }
        $user = $this->_get_user($user_id);
        if ($user->exists_in_db())
        {
            if (!$user->is_null('canonical_cookie_id'))
            {
                $canon_cookie = $this->get_cookie_by_token_id($user->get('canonical_cookie_id'));
            }
            else
            {
                $canon_cookie = $this->get_cookie(true);
                $this->_update_cookie_with_user_id($canon_cookie, $user_id);
            }
        }
        else
        {
            error_log(new Exception("Attempted to get canonical cookie for non-existent user. User id: " . $user_id));
            $canon_cookie = new Base__Null();
        }
        return $canon_cookie;
    }

    public function get_cookie_by_token_id($token_id)
    {
        if (!$this->tracking_is_enabled())
        {
            return new Base__Null();
        }
        $cookie = $this->tracking_model->get_by_token_id($token_id);
        return $cookie;
    }

     public function get_cookie_by_token($token)
    {
        if (!$this->tracking_is_enabled())
        {
            return new Base__Null();
        }
        $cookie = $this->tracking_model->get_by_token($token);
        return $cookie;
    }

    /**
     * Generate random token
     *
     * @return alpha_numeric hash
     */
    private function _generate_token()
    {
        srand((double) microtime() * 1000000);
        return md5(uniqid(rand(), true));
    }

    private function _handle_tracking_cookie($tracking_data = null)
    {
        if ($tracking_data === null)
        {
            $tracking_data = new Tracking_Cookie();
        }
        $get = $this->CI->input->get();
        if ($tracking_data->exists_in_db())
        {
            $this->_update_tracking_data($tracking_data, $get);
        }
        else
        {
            $this->_create_tracking_data($tracking_data, $get);
        }
        $this->tracking_model->insert_update($tracking_data);
        return $tracking_data;
    }

    private function _update_cookie_with_natural_user_id($tracking_cookie)
    {
        if ($this->CI->dx_auth->is_spoof_mode())
        {
            $natural_user_id = $this->CI->session->userdata('spoof_admin_userid');
            $this->_update_cookie_with_user_id($tracking_cookie, $natural_user_id);
        }
        else
        {
            $this->_update_cookie_with_user_id($tracking_cookie, $this->_get_current_user_id());
        }
    }

    private function _update_cookie_with_user_id($tracking_cookie, $user_id)
    {
        if ($user_id === false || $user_id === null || $user_id === 'false')
        {
            return false;
        }
        $success = false;
        $user = $this->_get_user($user_id);
        if ($user->exists_in_db())
        {
            if ($tracking_cookie->is_null('user_id'))
            {
                $this->_update_cookie_and_user_relationship($tracking_cookie, $user);
                $tracking_cookie->set('user_id', $user_id);
                $tracking_cookie->set('is_admin', $user->has_admin_role());
                $this->tracking_model->insert_update($tracking_cookie);
                $success = true;
            }
            elseif ($tracking_cookie->get('user_id') !== $user_id)
            {
                $c_e_m = Model__cookie_assignation_exceptions::class;
                $this->CI->load->model($c_e_m);
                $triplet = [
                    'cookie_id' => $tracking_cookie->get('id'),
                    'current_user_id' => $tracking_cookie->get('user_id'),
                    'attempted_user_id' => $user_id,
                    'context' => 'URL: ' . $_SERVER['REQUEST_URI'] . ' ---- Spoof mode: ' . ($this->CI->dx_auth->is_spoof_mode()?'true':'false'),
                    'created_at' => date("Y-m-d H:i:s")
                ];
                if (!$this->CI->$c_e_m->triplet_exists($triplet))
                {
                    $cookie_ex = new Cookie_Assignation_Exception($triplet);
                    $this->CI->$c_e_m->insert_update($cookie_ex);
                }
            }
            else
            {
                $success = true;
            }
        }
        return $success;
    }

    private function _update_cookie_and_user_relationship($tracking_cookie, $user)
    {
        $user_id = $user->get('id');
        $tracking_cookie->set('user_id', $user_id);
        $tracking_cookie->set('is_admin', $user->has_admin_role());
        $this->tracking_model->insert_update($tracking_cookie);
        $tracking_cookie_id = $tracking_cookie->get('id');
        if (!$user->has_canonical_cookie())
        {
            $user->set('canonical_cookie_id', $tracking_cookie_id);
            $this->_update_user($user);
        }
        $this->_back_fill_user_steps($tracking_cookie_id, $user_id);
    }

    private function _back_fill_user_steps($tracking_cookie_id, $user_id)
    {
        $this->CI->load->helper('analytics');
        $analytics_helper = new Analytics_Helper();
        $analytics_helper->back_fill_user_steps($tracking_cookie_id, $user_id);
    }

    private function _get_user($user_id)
    {
        $users_model = Model__users::class;
        $this->CI->load->model($users_model);
        return $this->CI->$users_model->get_user_by_id($user_id);
    }

    private function _update_user($user)
    {
        $users_model = Model__users::class;
        $this->CI->load->model($users_model);
        return $this->CI->$users_model->insert_update($user);
    }

    private function _handle_user_data($tracking_data, $creation = false)
    {
        if ($this->CI->session->userdata('ip_address'))
        {
            if ($this->CI->session->userdata('ip_address') == '0.0.0.0')
            {
                $tracking_data->set('fi_ip_address', '127.0.0.1');
            }
            else
            {
                $tracking_data->set('fi_ip_address', $this->CI->session->userdata('ip_address'));
            }
            if ($this->CI->session->userdata('ga_client_id'))
            {
                $tracking_data->set('ga_client_id', $this->CI->session->userdata('ga_client_id'));
            }
        }
        if ($creation)
        {
            $tracking_data->set('fi_language', $this->CI->session->userdata('user_lang'));
            $tracking_data->set('fi_country', $this->CI->session->userdata('locale'));
            $tracking_data->set('fi_session_id', $this->CI->session->userdata('session_id'));
        }
        $tracking_data->set('li_session_id', $this->CI->session->userdata('session_id'));
    }

    private function _handle_date($tracking_data, $creation = false)
    {
        $date = date("Y-m-d H:i:s");
        $tracking_data->set('li_date', $date);
        if ($creation)
        {
            $tracking_data->set('created', $date);
            $tracking_data->set('fi_date', $date);
        }
    }

    private function _handle_source_and_medium($tracking_data, $get, $creation = false)
    {
        $this->CI->load->library('user_agent');
        // Check query string for 'source'
        if (isset($get['source']))
        {
            // Use 'source' as refferer
            if ($creation)
            {
                $tracking_data->set('fi_source', $get['source']);
            }
            $tracking_data->set('li_source', $get['source']);
        }
        elseif (isset($get['utm_source']))
        {
            if ($creation)
            {
                $tracking_data->set('fi_source', $get['utm_source']);
            }
            $tracking_data->set('li_source', $get['utm_source']);
        }
        elseif ($this->CI->agent->is_referral())
        {
            // Check user agent to see if log is a referral and attribute to fi_source and li_source
            $referrer_url = parse_url($this->CI->agent->referrer());
            if (isset($referrer_url['scheme']) && isset($referrer_url['host']))
            {
                $referrer = $referrer_url['scheme'] . '://' . $referrer_url['host'] . ((isset($referrer_url['path']))?$referrer_url['path']:'');
                if (strpos($referrer, 'googlesyndication.com/safeframe') !== false)
                {
                    $parsed_referrer = 'adwords_display';
                }
                elseif (strpos($referrer, 'google') !== false)
                {
                    $parsed_referrer = 'google';
                }
                elseif (strpos($referrer, 'bing') !== false)
                {
                    $parsed_referrer = 'bing';
                }
                elseif (strpos($referrer, 'yahoo') !== false)
                {
                    $parsed_referrer = 'yahoo';
                }
                elseif (strpos($referrer, 'facebook') !== false)
                {
                    $parsed_referrer = 'facebook';
                }
                elseif (strpos($referrer, 'twitter') !== false)
                {
                    $parsed_referrer = 'twitter';
                }
                elseif (strpos($referrer, 'zipcube') !== false)
                {
                    $parsed_referrer = 'zipcube';
                }
                elseif (strpos($referrer, 'yandex') !== false)
                {
                    $parsed_referrer = 'yandex';
                }
                elseif (strpos($referrer, 'linkedin') !== false)
                {
                    $parsed_referrer = 'linkedin';
                }
                else
                {
                    $parsed_referrer = 'other';
                }
                if ($creation)
                {
                    $tracking_data->set('fi_source_url', $referrer);
                    $tracking_data->set('fi_source', $parsed_referrer);
                }
                $tracking_data->set('li_source_url', $referrer);
                $tracking_data->set('li_source', $parsed_referrer);
            }
        }
        else
        {
            // Attribute source as 'direct'
            if ($creation)
            {
                $tracking_data->set('fi_source', 'direct');
            }
            $tracking_data->set('li_source', 'direct');
        }
        if (isset($get['medium']))
        {
            if ($creation)
            {
                $tracking_data->set('fi_medium', $get['medium']);
            }
            $tracking_data->set('li_medium', $get['medium']);
        }
        elseif (isset($get['utm_medium']))
        {
            if ($creation)
            {
                $tracking_data->set('fi_medium', $get['utm_medium']);
            }
            $tracking_data->set('li_medium', $get['utm_medium']);
        }
    }

    private function _handle_landing_page($tracking_data, $creation = false)
    {
        // Get uri string and attribute to fi_landing_page and li_landing_page
        $landing_page_url = $this->CI->uri->uri_string();
        $tracking_data->set('li_landing_page', $landing_page_url);
        if ($creation)
        {
            $tracking_data->set('fi_landing_page', $landing_page_url);
        }
    }

    private function _set_tracking_cookie($token)
    {
        $this->CI->load->helper('cookie');
        $cookie = [
            'name' => 'zc_tc',
            'value' => $token,
            'expire' => 30 * (24 * 60 * 60)
        ];
        $this->CI->cookie_token = $token;
        set_cookie($cookie);
    }

    private function _create_tracking_data($tracking_data, $get)
    {
        $token = $this->_generate_token();
        $tracking_data->set('token', $token);
        $this->_handle_user_data($tracking_data, true);
        $this->_handle_date($tracking_data, true);
        $this->_handle_source_and_medium($tracking_data, $get, true);
        $this->_handle_landing_page($tracking_data, true);
    }

    private function _update_tracking_data($tracking_data, $get)
    {
        $this->_handle_user_data($tracking_data);
        $this->_handle_date($tracking_data);
        $this->_handle_source_and_medium($tracking_data, $get);
    }

    public function bot_detected($log_bot = false)
    {
        // Check if visit is a search bot
        $CrawlerDetect = new CrawlerDetect();
        if ($CrawlerDetect->isCrawler())
        {
            if ($log_bot)
            {
                $this->CI->load->helper('analytics');
                $analytics_helper = new Analytics_Helper();
                $analytics_helper->increment_bot_visit($CrawlerDetect->getMatches());
            }
            return true;
        }
        return false;
    }

    public function tracking_is_enabled()
    {
        return config_item('user_tracking');
    }

    public function should_log_visit($log_bot = false)
    {
        if (!$this->tracking_is_enabled())
        {
            return false;
        }
        // Check if visitor asks to not be tracked - needs a function!
//        if ($this->HONOR_DO_NOT_TRACK && true)
//        {
//            return false;
//        }
        // Check if visit hits a controller in an ignored directory
        if (in_array($this->CI->router->fetch_directory(), $this->DIRECTORY_IGNORE_LIST))
        {
            return false;
        }
        // Check if visit hits a controller in the ignore list
        if (in_array($this->CI->router->fetch_class(), $this->CONTROLLER_IGNORE_LIST))
        {
            return false;
        }
        // Check if visit hits an ignored method
        if (in_array($this->CI->router->fetch_method(), $this->METHOD_IGNORE_LIST))
        {
            return false;
        }
        // Check if visit comes from an ignored ip address
        if (in_array($this->CI->input->server('REMOTE_ADDR'), $this->IP_IGNORE_LIST))
        {
            return false;
        }
        // Check if the visited url is in the ignore list
        foreach ($this->URL_IGNORE_LIST as $url)
        {
            if (!strpos($this->CI->input->server('REQUEST_URI'), $url) === false)
            {
                return false;
            }
        }
        if ($this->bot_detected($log_bot) && $this->IGNORE_SEARCH_BOTS)
        {
            return false;
        }
        return true;
    }
}