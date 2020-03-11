<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**

 * Zipcube Venue Controller Class
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            Venues
 * @author		Ally
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class Venues extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
        $this->lang->load('rooms', config_item('language_code'));
        $this->data['userId'] = $this->get_user_id();
    }

    public function index($venueId = '', $name = '')
    {
        if ($venueId !== '' && is_numeric($venueId))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $isAdmin = $this->dx_auth->is_admin();
            if ($isAdmin)
            {
                $venue = $this->$modelVenues->get_venue_object_by_id($venueId, true);
            }
            else
            {
                $venue = $this->$modelVenues->get_venue_object_by_id($venueId);
            }
            if ($venue->exists_in_db())
            {
                if ($name == '' || seo_url($venue->get('name')) !== seo_url(urldecode($name)))
                {
                    redirect(get_venue_url($venue));
                }
                $this->data['venue'] = $venue;
                $modelFullRoom = Model__full_rooms::class;
                $this->load->model($modelFullRoom);
                if ($isAdmin)
                {
                    $roomsCollection = $this->$modelFullRoom->get_room_object_collection_by_venue_id($venueId, true, false, true);
                }
                else
                {
                    $roomsCollection = $this->$modelFullRoom->get_room_object_collection_by_venue_id($venueId, false, true, true);
                }
                $this->data['rooms'] = $roomsCollection;
                $this->data['room_count'] = $roomsCollection->get_count();
                $usages = [];
                foreach ($this->data['rooms']->object() as $room)
                {
                    $usages[$room->get('usage_superset')] = $room->get('usage_superset_short_desc');
                }
                $seo_title = generate_seo_title($venue->get('name'), $usages);
                $this->data['seo_title'] = $seo_title;
                $this->_override_meta_tag('title', $seo_title);
                $this->_override_meta_tag('meta_description', $seo_title . ' - ' . $this->lang->line('Book Now'));
                $this->_override_meta_tag('meta_og_url', get_venue_url($venue));
                $this->data['reserved_sticky_menu'] = true;
                $this->_add_js(manifest_item('venues.js'));
                $this->_add_js(auto_version('venues/venues.js'));
                $this->_add_js(auto_version('jquery_plugins/jquery.rating.pack.js'));
                $this->_add_js(auto_version('venues/write_review.js'));
                $this->_add_css('<link href="' . auto_version('plugins/jquery.rating.css') . '" media="screen" rel="stylesheet" type="text/css" />');
                $this->_add_css('<link href="' . auto_version('venues.css') . '" media="all" rel="stylesheet" type="text/css" />');
                if ($isAdmin)
                {
                    $this->add_switchery_plugin_files();
                    $this->add_froala_files();
                    $this->_add_js(auto_version('modals/hubspot.js'));
                    $this->_add_js(auto_version('administrator/admin.js'));
                    $this->_add_js(auto_version('administrator/venues.js'));
                    $this->data['reserved_full_dimension_modal'] = true;
                }
                $this->data['reserved_canonical'] = get_venue_url($venue);
                $this->data['alternate_url'] = $this->_get_alternate_urls('/venues/' . seo_url($venue->get('name')) . '/' . $venueId);
                $this->data['message_element'] = "venues/view_venue";
                $this->_get_footer_locations($venue->get('country_code'));
                if ($this->_is_widget_mode())
                {
                    $this->data['widget_back_link'] = '/' . $this->data['country_lang_url'] . '/widget?token=' . $venue->get('company_token');
                    $this->data['company_name'] = $venue->get('company_name');
                }
                $this->_add_js_variable('isLoggedIn', $this->dx_auth->is_logged_in());
                $this->_add_js_variable('isMobileVariable', false);
                $this->_add_js_variable('isAdmin', $isAdmin);
                $this->_add_js_variable('dynx_itemid', $venueId);
                $this->_add_js_variable('dynx_pagetype', 'offerdetail');
                $this->_add_js_variable('zc_venue_name', htmlentities($venue->get('name'), ENT_QUOTES, 'UTF-8'));
                $this->_add_js_variable('zc_address', htmlentities($venue->get_venue_address(), ENT_QUOTES, 'UTF-8'));
                if ($isAdmin)
                {
                    $this->_add_js_variable('adminId', $this->dx_auth->get_user_id());
                }
                if ($this->dx_auth->is_logged_in())
                {
                    $this->_add_js_variable('userId', $this->data['userId']);
                }
                $this->add_email_js_variable();
                $this->_render();
                $this->load->helper('analytics');
                $analytics_helper = new Analytics_Helper();
                $analytics_helper->register_tracking_event('VENUE_VIEW', [$venue->get_asset_id()]);
            }
            else
            {
                $venue = $this->$modelVenues->get_venue_object_by_id($venueId, true);
                if ($venue->exists_in_db() && $venue->data_not_empty('city') && $venue->data_not_empty('country'))
                {
                    redirect('/' . $this->data['country_lang_url'] . '/s/' . $this->data['default_tag_slug'] . '/' . $venue->get('city') . '--' . $venue->get('country'), 'location', 301);
                }
                else
                {
                    return $this->_page_404();
                }
            }
        }
        else
        {
            return $this->_page_404();
        }
    }

    public function venue_listing($venueId = '', $step = '', $name = '')
    {
        if ($venueId !== '' && is_numeric($venueId))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_asset_id($venueId, true);
            if ($venue->exists_in_db())
            {
                redirect(get_venue_url($venue, true));
            }
        }
    }
}