<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**

 * Zipcube Search Controller Class
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            Search
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class Search extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->lang->load('users', config_item('language_code'));
    }

    private function _redirect_to_default($location)
    {
        redirect('/' . $this->data['country_lang_url'] . '/s/' . $this->data['default_tag_slug'] . '/' . $location);
    }

    public function index($tag_slug = '', $location = '')
    {
        $modelTag = Model__tags::class;
        $this->load->model($modelTag);
        $tag = $this->$modelTag->get_tag_meta_by_slug(config_item('language_code'), $tag_slug);
        if (!(isset($tag) && $tag->exists_in_db() && $tag->is_enabled()))
        {
            $this->_redirect_to_default($location);
        }
        $this->data['guest_number_options'] = (new Wrangler__Guest())->supply_guest_option_collection();
        $locationModel = Model__locations::class;
        $this->load->model($locationModel);
        if ($location == '')
        {
            $locObj = $this->$locationModel->get_default_location();
            $loc_id = $locObj->get_id();
            $metaLocation = $locObj->get('human_desc');
            $metaLoc_parent = $locObj->get('parent_desc');
            $metaLoc_type = $this->lang->line($locObj->get('category_desc'));
            $metaVenue_count = $locObj->get('approved_venue_count');
            $metaLoc_currency = $locObj->get('currency_symbol_left');
            $canonical = $locObj->get('search_url');
            $menu_search = search_url_decode($locObj->get('search_url'));
        }
        else
        {
            $locObj = $this->$locationModel->get_location_from_search_url(urldecode($location));
            if ($locObj->exists_in_db())
            {
                $loc_id = $locObj->get_id();
                $metaLocation = $locObj->get('human_desc');
                $metaLoc_parent = $locObj->get('parent_desc');
                $metaLoc_type = $this->lang->line($locObj->get('category_desc'));
                $metaVenue_count = $locObj->get('approved_venue_count');
                $metaLoc_currency = $locObj->get('currency_symbol_left');
                $canonical = $locObj->get('search_url');
                $menu_search = search_url_decode($locObj->get('search_url'));
            }
            else
            {
                $loc_id = '';
                $metaLocation = search_url_decode($location);
                $metaLoc_parent = '';
                $metaLoc_type = '';
                $metaVenue_count = '';
                $metaLoc_currency = '&pound;';
                $canonical = $location;
                $menu_search = search_url_decode($location);
                $this->load->library('GoogleGeocodeAPI');
                $response = $this->googlegeocodeapi->address_geocode(urldecode($location));
                if (isset($response['results']) && count($response['results']) > 0)
                {
                    $geolocation = $response['results'][0];
                    if (isset($geolocation['address_components']))
                    {
                        $country_code = '';
                        foreach ($geolocation['address_components'] as $address_component)
                        {
                            if (in_array('country', $address_component['types']))
                            {
                                $country_code = $address_component['short_name'];
                            }
                        }
                        if ($country_code != '')
                        {
                            $modelCurrency = Model__currency::class;
                            $this->load->model($modelCurrency);
                            $currency = $this->$modelCurrency->get_currency_object_by_country_code($country_code);
                            if (!$currency->exists_in_db())
                            {
                                $currency = $this->$modelCurrency->get_default_currency_object();
                            }
                            $metaLoc_currency = $currency->get('left_symbol');
                        }
                    }
                }
            }
        }
        $this->data['location'] = $metaLocation;
        $this->data['currency_symbol'] = $metaLoc_currency;
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . '/s/' . $tag->get('canonical_slug') . '/' . $canonical;
        $this->_override_meta_tag('title', $this->lang->bespoke_line($tag->get('search_title'), $metaLocation));
        $this->_override_meta_tag('meta_description', $this->lang->bespoke_line($tag->get('search_meta'), $metaLocation, (($metaLoc_parent != '')?', ' . $metaLoc_parent:'')));
        //$this->_override_meta_tag('meta_keywords', $this->lang->line('search_meta_keyword_' . $tag->get_id(), $metaLocation));
        //$this->_override_meta_tag('meta_twitter_title', $this->lang->line('search_meta_twitter_title_' . $tag->get_id(), $metaLocation));
        //$this->_override_meta_tag('meta_twitter_card', $this->lang->line('search_meta_twitter_card_' . $tag->get_id(), $metaLocation));
        //$this->_override_meta_tag('meta_og_title', $this->lang->line('search_meta_og_title_' . $tag->get_id(), $metaLocation));
        //$this->_override_meta_tag('meta_og_description', $this->lang->line('search_meta_og_description_' . $tag->get_id(), $metaLocation));
        if ($metaLoc_type != '')
        {
            $this->_override_meta_tag('meta_og_type', $metaLoc_type);
        }
        $this->_override_meta_tag('content_style_type', "text/css");
        $this->_override_meta_tag('content_script_type', "text/javascript");
        $this->_override_meta_tag('window_target', "_top");
        $this->add_datepicker_files();
        $this->_add_css('<link href="' . node_module('react-toggle-switch/src/css/switch.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('new/search/search.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->_add_js(auto_version('jquery_plugins/jquery.flip.min.js'));
        if (!$this->dx_auth->is_logged_in())
        {
            $this->add_phone_plugin_files();
        }
        $this->_add_js('https://www.gstatic.com/charts/loader.js');
        if ($this->dx_auth->is_admin())
        {
            $this->add_switchery_plugin_files();
        }
        $this->data['is_logged_in'] = $this->dx_auth->is_logged_in();
        $this->data['new_css'] = true;
        $this->_add_js_variable('isMobileVariable', 0);
        $this->_add_js_variable('isLoggedIn', $this->dx_auth->is_logged_in());
        $this->_is_indexable(false);
        $this->_add_js(node_server_search_bundle());
        $query = $this->input->get();
        $query['currency_symbol_left'] = $metaLoc_currency;
        $query['lang'] = config_item('language_code');
        $query['phone_number'] = $this->data['phone_number'];
        $query['phone_number_display'] = $this->data['phone_number_display'];
        $user_id = $this->dx_auth->get_user_id();
        $component = render_page_component($_SERVER['REQUEST_URI'], $query, $this->data['tracking_cookie_id'], (($user_id)?$user_id:null), $this->dx_auth->is_admin(), $this->dx_auth->is_spoof_mode());
        if (is_null($component))
        {
            $this->_redirect_to_default($location);
        }
        $this->data['root_component'] = $component;
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            //hack to turn mobile to responsive site for new urls
            $this->_set_display_type(Controller_Base__Page::PAGE);
        }
        $this->data['message_element'] = 'search/search_listing';
        $this->_hide_menu();
        $this->_suppress_footer();
        $this->_add_js_variable('dynx_itemid', $loc_id);
        $this->_add_js_variable('dynx_pagetype', 'searchresults');
        $this->_add_js_variable('zc_booking_type', $tag->get('browse_link_label'));
        $this->add_email_js_variable();
        $this->_render();
    }
}
