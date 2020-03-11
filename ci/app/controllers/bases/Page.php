<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Basic extension of standard controller to hold site wide details - user name,
 * is_logged_in, meta tags, locale, standard js and css.
 *
 */

use Detection\MobileDetect;

class Controller_Base__Page extends MY_Controller
{
    private $_displayType = self::PAGE;
    protected $data = [
        'reserved_css' => [],
        'reserved_js_pre' => [],
        'reserved_js_post' => [],
        'reserved_js_variables' => [],
        'reserved_title' => 0,
        'remove_legacy_assets' => false
    ];
    protected $template = '';
    protected $_tracking_helper;

    const PAGE = 1;
    const MODAL = 2;
    const ADMIN_PAGE = 4;
    const MODAL_FULLPAGE = 5;
    const MODAL_FRONTEND = 6;
    const MOBILE = 7;

    protected static $_page_types_with_menu = [
        self::PAGE,
        self::ADMIN_PAGE
    ];

    function __construct()
    {
        parent::__construct();
        if ($this->uri->segment(1) == null)
        {
            if (isset(config_item('supported_locales')[$this->session->userdata('locale')]))
            {
                redirect($this->_generate_path(config_item('supported_locales')[$this->session->userdata('locale')]), 'location', 302);
            }
            else
            {
                redirect($this->_generate_path('uk'), 'location', 302);
            }
        }
        elseif (strlen($this->uri->segment(1)) != 2 || !ctype_alpha($this->uri->segment(1)) || $this->uri->segment(1) == 'en' || $this->uri->segment(1) == 'gb')
        {
            $country = 'uk';
        }
        else
        {
            $country = $this->uri->segment(1);
        }
        $this->load->helper('tracking');
        $this->_tracking_helper = new Tracking_Helper();
        $modelContactInfo = Model__contact_info::class;
        $this->load->model($modelContactInfo);
        $cctlds = config_item('supported_cctlds');
        if (isset($cctlds[$country]))
        {
            // set locale
            $this->data['phone_number'] = $this->get_phone_number();
            $this->data['phone_number_display'] = $this->get_phone_number_display();
            $this->data['language_select'] = [];
            $language = $cctlds[$country]['lang'];
            $locale = $cctlds[$country]['locale'];
            $this->data['country_lang_url'] = $country;
            $languages = config_item('languages');
            if (isset($languages[$language]))
            {
                $this->data['reserved_meta_og_locale'] = $languages[$language]['locale'];
            }
            if ($locale != $this->session->userdata('locale'))
            {
                $contact = $this->$modelContactInfo->get_contact_info_object_from_locale($locale);
                if ($contact->exists_in_db())
                {
                    $this->data['phone_number'] = $contact->get('phone_clean');
                    $this->data['phone_number_display'] = $contact->get('phone');
                    $this->data['user_country'] = $contact->get('country');
                    $this->data['user_locale'] = $contact->get('locale');
                }
                $this->session->set_userdata('locale', $locale);
            }
        }
        else
        {
            redirect('/uk');
        }
        // load language files
        if (file_exists(APPPATH . 'language/' . $language . '/common_lang.php'))
        {
            $this->lang->load('common', $language);
        }
        $controller = $this->router->fetch_class();
        if (file_exists(APPPATH . 'language/' . $language . '/' . $controller . '_lang.php'))
        {
            $this->lang->load($controller, $language);
        }
        $this->data['lang'] = $this->lang;
        $this->_set_cookies($language, $country);
        $this->config->set_item('language_code', $language);
        $this->config->set_item('language', $language);
        $this->config->set_item('locale_code', $locale);
        $this->_add_js_variable('language_code', $language);
        $this->_add_js_variable('locale_code', $locale);
        $this->_add_js_variable('country_lang_url', $this->data['country_lang_url']);
        $this->_add_js_variable('zc_analytics_url', getenv('ANALYTICS_API_URL'));
        $this->_add_js_variable('zc_api_url', getenv('DATA_API_URL'));
        $this->_add_js_variable('zc_site_url', getenv('SITE_URL'));
        if (config_item('maintenance') == 1 && $this->router->fetch_class() != 'maintenance')
        {
            //needs to be after language setting to allow a translated maintenance page!
            redirect($this->data['country_lang_url'] . '/maintenance');
        }
        $this->data['country_select'] = $this->$modelContactInfo->get_contact_info_collection();
        $modelLocationPlaces = Model__location_country_places::class;
        $this->load->model($modelLocationPlaces);
        $this->data['country_location'] = $this->$modelLocationPlaces->get_main_location_object(config_item('supported_cctlds')[$country]['locale']);
        $modelTags = Model__tags::class;
        $this->load->model($modelTags);
        $default_tags_coll = $this->$modelTags->get_home_sub_tags_by_lang($language);
        if ($default_tags_coll->exists_in_db())
        {
            foreach ($default_tags_coll->object() as $default_tags)
            {
                foreach ($default_tags->object() as $default_tag)
                {
                    $this->data['default_tags'][$default_tag->get('tag_id')] = $default_tag;
                }
            }
            reset($this->data['default_tags']);
            $defaultTag = $this->data['default_tags'][key($this->data['default_tags'])];
            $this->data['default_tag'] = $defaultTag;
            $this->data['default_tag_slug'] = $defaultTag->get('quick_slug');
        }
        // setup userdetails
        $user = $this->get_user();
        $username = false;
        if (isset($user))
        {
            $username = $user->wrangle('full_name_length_limited')->limited(20);
            $this->data['reserved_asset_user'] = $user->has_assets();
            // $modelUserPoints = Model__user_points::class;
            // $this->load->model($modelUserPoints);
            // $this->data['user_points'] = $this->$modelUserPoints->get_total_user_points($user->get_id());
        }
        $this->data['reserved_username'] = $username;
        $this->data['user'] = $user;
        // add js variables for tags
        // $this->_add_js_variable('zc_controller', $this->router->fetch_class());
        $this->_add_js_variable('zc_action', $this->router->fetch_class() . '-' . $this->router->fetch_method());
        // set mobile display type, if required
        $detect = new MobileDetect();
        if ($detect->isMobile() && !$detect->isTablet())
        {
            $this->_set_display_type(SELF::MOBILE);
        }
        $this->data['reserved_tag_slug'] = '';
        $this->data['reserved_no_index'] = false;
        $this->data['reserved_canon_link'] = false;
        $this->data['reserved_show_footer'] = true;
        $this->data['reserved_show_menu'] = true;
        $this->data['reserved_full_modal'] = false;
        $this->data['reserved_full_dimension_modal'] = false;
        $this->data['reserved_widget_mode'] = false;
        // populate_meta_tags
        $metaModel = Model__metas::class;
        $this->load->model($metaModel);
        $metaArr = $this->$metaModel->get_meta_details($language);
        foreach ($metaArr as $key => $value)
        {
            $this->data['reserved_' . $key] = $value;
        }
        $this->data['reserved_meta_og_type'] = 'website';
        $this->data['reserved_meta_og_url'] = 'https://www.zipcube.com/' . $this->data['country_lang_url'];
        // GA Client
        $this->data['ga_client_id'] = $this->session->userdata('ga_client_id');
        $tracking_cookie_id = $this->_tracking_helper->get_cookie_id_and_send_cookie_to_browser();
        $this->data['tracking_cookie_id'] = $tracking_cookie_id;
        $this->_add_js_variable('tracking_cookie_id', $tracking_cookie_id);
        $this->load->helper('analytics');
        $analytics_helper = new Analytics_Helper();
        $analytics_helper->log_url($tracking_cookie_id);
        // setup widget
        if ($this->input->get('widget') && ($this->input->get('widget','is_boolean') === true))
        {
            $this->_set_widget_mode();
        }
        // css
        $this->_define_body_class();
    }

    private function _set_cookies($lang, $country)
    {
        $this->input->set_cookie('user_lang', $lang, config_item('sess_expiration'));
        $this->input->set_cookie('user_cctld', $country, config_item('sess_expiration'));
        $this->session->set_userdata('user_lang', $lang);
        $this->session->set_userdata('user_cctld', $country);
        $this->session->set_userdata('user_country_lang_url', $this->data['country_lang_url']);
    }

    protected function _get_footer_locations($country = '', $tag = null)
    {
        if ($this->get_display_type() != Controller_Base__Page::MOBILE)
        {
            if ($country == '')
            {
                $country = config_item('supported_cctlds')[$this->session->userdata('user_cctld')]['locale'];
            }
            if ($tag == null)
            {
                $tag = $this->data['default_tag'];
                $modelTags = Model__tags::class;
                $this->load->model($modelTags);
                $this->data['footer_tag'] = $this->$modelTags->get_tag_meta_by_id(config_item('language_code'), $tag->get('tag_id'));
            }
            else
            {
                $this->data['footer_tag'] = $tag;
            }
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $this->data['footer_locations'] = $this->$modelLocations->get_footer_locations_by_country_and_tag($country, $tag->get('tag_id'));
        }
    }

    private function _generate_path($country)
    {
        $path = $country . '/' . $this->uri->uri_string;
        if (!empty($_GET))
        {
            $path .= "?" . http_build_query($_GET);
        }
        return $path;
    }

    protected function render_navigation()
    {
        $query['lang'] = config_item('language_code');
        $query['phone_number'] = $this->get_phone_number();
        $query['phone_number_display'] = $this->get_phone_number_display();
        $user_id = $this->get_user_id();
        return render_page_component($_SERVER['REQUEST_URI'], $query, $this->_tracking_helper->get_cookie_id_and_send_cookie_to_browser(), (($user_id)?$user_id:null), $this->dx_auth->is_admin(), $this->dx_auth->is_spoof_mode());
    }

    protected function _get_alternate_urls($url = '')
    {
        $urls = [];
        foreach (config_item('supported_cctlds') as $countryKey => $values)
        {
            $urls[$values['hreflang']] = base_url() . $countryKey . $url;
        }
        foreach (config_item('languages') as $langKey => $langValues)
        {
            if ($langValues['alt_url'] && isset($langValues['alt_country']))
            {
                $urls[$langKey] = base_url() . $langValues['alt_country'] . $url;
            }
        }
        return $urls;
    }

    protected function _suppress_footer()
    {
        $this->data['reserved_show_footer'] = false;
    }

    protected function _set_widget_mode()
    {
        $this->data['reserved_widget_mode'] = true;
    }

    protected function _is_widget_mode()
    {
        return $this->data['reserved_widget_mode'];
    }

    protected function _needs_menu()
    {
        return in_array($this->_displayType, self::$_page_types_with_menu);
    }

    protected function _set_display_type($typeId)
    {
        $this->_displayType = $typeId;
    }

    public function get_display_type()
    {
        return $this->_displayType;
    }

    public function add_email_js_variable()
    {
        if ($this->dx_auth->is_logged_in())
        {
            $this->_add_js_variable('zc_email', $this->dx_auth->get_emailId());
        }
    }

    protected function _validate_model_input($baseClass, $identifier, $data = null)
    {
        if (is_array($identifier))
        {
            foreach ($identifier as $key => $value)
            {
                $this->_validate_model_input_datum($baseClass, $key, $value);
            }
        }
        else
        {
            $this->_validate_model_input_datum($baseClass, $identifier, $data);
        }
    }

    private function _validate_model_input_datum($baseClass, $identifier, $data)
    {
        $validationsString = $baseClass::get_validation_string($identifier);
        $validator = new Helper__Validator();
        $validator->validate($data, $validationsString);
        if ($validator->error_occurred())
        {
            $errorMessage = "Sorry - that is not a valid input for this object.";
            if (defined('ENVIRONMENT') && ENVIRONMENT === 'development')
            {
                $errorMessage .= " " . $validator->get_error_string();
            }
            throw new Exception($errorMessage);
        }
    }

    protected function _generate_ajax_error($errorMessage)
    {
        $null = new Base__Null();
        return $null->get_as_ajax_response($errorMessage);
    }

    protected function _generate_ajax_success($successMessage = false)
    {
        $null = new Base__Null();
        return $null->get_as_ajax_response($successMessage, true);
    }

    protected function _add_css($script)
    {
        $this->data['reserved_css'][] = $script;
    }

    protected function _add_js($script, $post = true)
    {
        if (!$post)
        {
            $this->data['reserved_js_pre'][] = $script;
        }
        else
        {
            $this->data['reserved_js_post'][] = $script;
        }
    }

    protected function _add_js_variable($key, $value)
    {
        $this->data['reserved_js_variables'][$key] = $value;
    }

    public function add_phone_plugin_files()
    {
        $this->_add_js('//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/13.0.3/js/intlTelInput.min.js');
        $this->_add_js('//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/13.0.3/js/utils.js');
        $this->_add_css('<link href="//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/13.0.3/css/intlTelInput.css" media="screen" rel="stylesheet" type="text/css" />');
    }

    public function add_switchery_plugin_files()
    {
        $this->_add_js(auto_version('switchery/switchery.0.8.2.min.js'));
        $this->_add_css('<link href="' . auto_version('vendor/switchery.0.8.2.min.css') . '" media="screen" rel="stylesheet" type="text/css" />');
    }

    public function add_datepicker_files()
    {
        $this->_add_js(auto_version('jquery_plugins/jquery-ui.1.12.1.min.js'));
        $this->_add_js(auto_version('jquery_plugins/jquery.ui.datepicker-fr.js'));
        $this->_add_js(auto_version('jquery_plugins/jquery.ui.datepicker-de.js'));
        $this->_add_js(auto_version('jquery_plugins/jquery.ui.datepicker-en.js'));
        $this->_add_css('<link href="' . auto_version('datepicker.css') . '" media="all" rel="stylesheet" type="text/css" />');
    }

    public function add_froala_files()
    {
        if ($this->dx_auth->is_admin())
        {
            $this->_add_js('//cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.4/js/froala_editor.pkgd.min.js');
            $this->_add_css('<link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.4/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" />');
            $this->_add_css('<link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.4/css/froala_style.min.css" rel="stylesheet" type="text/css" />');
        }
    }

    protected function _override_meta_tag($metaName, $metaValue)
    {
        $this->data['reserved_' . $metaName] = htmlspecialchars(strip_tags($metaValue));
    }

    protected function _array_to_page_data($dataArray = [])
    {
        foreach ($dataArray as $key => $value)
        {
            $this->data[$key] = $value;
        }
    }

    // still being used ...
    private function _define_body_class()
    {
        $this->data['reserved_body_class'] = $this->router->fetch_class() . ' ' . $this->router->fetch_class() ."-". $this->router->fetch_method() . " bg-blue page-home with-new-header zc-nav-overlap";
    }

    protected function _is_indexable($indexable = true)
    {
        $this->data['reserved_no_index'] = !$indexable;
    }

    protected function _set_canon_link($relLink)
    {
        $this->data['reserved_canon_link'] = $relLink;
    }

    protected function _set_apple_touch_icon($relLink)
    {
        $this->data['reserved_apple_touch_icon'] = $relLink;
    }

    protected function _hide_menu()
    {
        $this->data['reserved_show_menu'] = false;
    }

    protected function _remove_legacy_assets()
    {
        $this->data['remove_legacy_assets'] = true;
    }

    protected function _render()
    {
        if (defined('ENVIRONMENT') && ENVIRONMENT === 'development')
        {
            //$this->data['debugOutput']=explode("\n", print_r($this->data, true));
        }
        $this->_add_js_variable('base_url', base_url());
        $this->_add_js_variable('isWidget', $this->_is_widget_mode());
        if (!$this->_needs_menu() || $this->_is_widget_mode())
        {
            $this->_hide_menu();
            $this->_suppress_footer();
            $this->_add_css('<link href="' . auto_version('widget.css') . '" media="all" rel="stylesheet" type="text/css" />');
        }
        else if ($this->data['reserved_show_menu'])
        {
            $this->_add_js(node_server_main_bundle());
            $this->data['nav_component'] = $this->render_navigation();
        }
        $this->load->view($this->_get_template(), $this->data);
    }

    private function _get_template()
    {
        switch ($this->_displayType)
        {
            case 2:

                $template = 'templates/desktop/modals/template';
            break;

            case 5:

                $template = 'templates/desktop/modals/fullpage_template';
            break;

            case 6:

                $template = 'templates/desktop/modals/frontend_template';
            break;

            case 7:

                $template = 'mob_template';
            break;

            case 1:
            default:

                $template = 'page_template';
            break;
        }
        return $template;
    }
}