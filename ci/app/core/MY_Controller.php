<?php
use Detection\MobileDetect;

class MY_Controller extends CI_Controller
{
    private $_user;
    private $_phoneNumber;
    private $_phoneNumberDisplay;
    private $_userCountry;
    private $_userLocale;

    function __construct()
    {
        parent::__construct();
        if (isset($_REQUEST['gclid']))
        {
            // google click id
            $this->session->set_userdata('gclid', $_REQUEST['gclid']);
        }
        if (isset($this->session))
        {
//            if ($this->session->userdata('locale') == '')
//            {
//                try
//                {
//                    $ctx = stream_context_create(['http' => ['timeout' => 4]]);
//                    $content = file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $_SERVER['REMOTE_ADDR'], false, $ctx);
//                    if ($content !== false)
//                    {
//                        $user_ip = unserialize($content);
//                        $country_code = strtolower($user_ip["geoplugin_countryCode"]);
//                        $this->session->set_userdata('locale', $country_code);
//                    }
//                }
//                catch (Exception $exc)
//                {
//                    $this->session->set_userdata('locale', config_item('default_locale'));
//                }
//            }
            //localhost error
            if ($this->session->userdata('locale') == '')
            {
                $this->session->set_userdata('locale', config_item('default_locale'));
            }
            $modelContactInfo = Model__contact_info::class;
            $this->load->model($modelContactInfo);
            $contact = $this->$modelContactInfo->get_contact_info_object_from_locale($this->session->userdata('locale'));
            if ($contact->exists_in_db())
            {
                $this->_phoneNumberDisplay = $contact->get('phone');
                $this->_phoneNumber = $contact->get('phone_clean');
                $this->_userCountry = $contact->get('country');
                $this->_userLocale = $contact->get('locale');
            }
        }
        if (isset($this->dx_auth) && $this->dx_auth->is_logged_in())
        {
            $modelUsers = Model__Users::class;
            $this->load->model($modelUsers);
            $this->_user = $this->$modelUsers->get_user_by_id($this->dx_auth->get_user_id());
        }
    }

    public function get_user()
    {
        return $this->_user;
    }

    public function get_user_id()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->get('id');
        }
        return $retVal;
    }

    public function user_is_admin()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->is_admin();
        }
        return $retVal;
    }

    public function user_is_logged_in()
    {
        $user = $this->get_user();
        $retVal = 0;
        if (!($user === null || $user->is_null_object()))
        {
            $retVal = $user->exists_in_db();
        }
        return $retVal;
    }

    public function get_phone_number()
    {
        return $this->_phoneNumber;
    }

    public function get_phone_number_display()
    {
        return $this->_phoneNumberDisplay;
    }

    public function get_country()
    {
        return $this->_userCountry;
    }

    public function get_locale()
    {
        return $this->_userLocale;
    }

    public function _page_404()
    {
        $this->output->set_status_header('404');
        $detect = new MobileDetect;
        if ($detect->isMobile() && !$detect->isTablet())
        {
            $this->load->view(MOBILE_THEME_FOLDER . '/errors/view_404', $this->data);
        }
        else
        {
            $this->data['main_script'] = node_server_main_bundle();
            $this->data['nav_component'] = $this->_render_navigation();
            $this->load->view(THEME_FOLDER . '/errors/view_404', $this->data);
        }
    }

    private function _render_navigation()
    {
        $query['lang'] = config_item('language_code');
        $query['phone_number'] = $this->get_phone_number();
        $query['phone_number_display'] = $this->get_phone_number_display();
        $user = $this->get_user();
        $user_id = (($user)?$user->get_id():null);
        $component = render_page_component($_SERVER['REQUEST_URI'], $query, $this->_tracking_helper->get_cookie_id_and_send_cookie_to_browser(), $user_id, $this->dx_auth->is_admin(), $this->dx_auth->is_spoof_mode());
        return $component;
    }
}
