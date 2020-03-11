<?php
/**
 * Zipcube Pages Controller Class
 *
 * It helps shows the Static pages.
 *
 * @package		Users
 * @subpackage	Controllers
 * @category	Referrals
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com
 */

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Pages extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            $this->_add_js(manifest_item('pages.js'));
        }
        $this->_get_footer_locations();
        $this->_add_js_variable('dynx_pagetype', 'other');
        $this->add_email_js_variable();
    }

    public function get_started()
    {
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
        if ($this->dx_auth->is_logged_in())
        {
            redirect($this->data['country_lang_url'] . '/dashboard/listings');
        }
        $url = '/get-started';
        $this->_add_css('<link href="' . auto_version('get_started.css') . '" media="all" rel="stylesheet" type="text/css" />');
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($url);
        $this->data['message_element'] = "pages/view_get_started";
        $this->_render();
    }

    public function how_it_works()
    {
        $url = '/how-it-works';
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($url);
        $this->data['message_element'] = "pages/view_how_it_works";
        $this->_render();
    }

    public function how_to_share()
    {
        $url = '/how-to-share';
        $this->_add_css('<link href="' . auto_version('how_to_share.css') . '" media="screen" rel="stylesheet" type="text/css" />');
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($url);
        $this->data['message_element'] = "pages/view_how_to_share";
        $this->_render();
    }

    public function survey_ts_and_cs()
    {
        $url = '/survey-terms-and-conditions';
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($url);
        $this->data['message_element'] = "pages/view_survey_ts_and_cs";
        $this->_render();
    }
}
