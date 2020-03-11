<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Zipcube Home Controller Class
 *
 * Home page for customer and venue.
 *
 * @package		        Home
 * @subpackage          Controllers
 * @category            Referrals
 */

class Home extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
    }

    public function sitemaps($url = null)
    {
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $locations = $this->$modelLocations->get_human_sitemap_location_collection(config_item('locale_code'), urldecode($url));
        if ($locations->exists_in_db())
        {
            $this->data['locations'] = $locations->get_as_array()['objects'];
            $this->_get_columns($locations->get_count(), ['location_count', 'first_loc_loop', 'second_loc_loop', 'third_loc_loop']);
        }
        if ($url != null)
        {
            $modelLandingPages = Model__landing_pages::class;
            $this->load->model($modelLandingPages);
            $landings = $this->$modelLandingPages->get_human_sitemap_landing_collection(config_item('language_code'), config_item('locale_code'), urldecode($url));
            if (!$landings->exists_in_db())
            {
                redirect('/' . $this->data['country_lang_url']);
            }
            $this->data['landings'] = $landings->get_as_array()['objects'];
            $this->_get_columns($landings->get_count(), ['landing_count', 'first_land_loop', 'second_land_loop', 'third_land_loop']);
        }
        $this->_override_meta_tag('title', $this->lang->line('common_footer_sitemap'));
        $this->_override_meta_tag('meta_keyword', $this->lang->line('home_meta_keyword'));
        $this->_override_meta_tag('meta_desc', $this->lang->line('home_meta_desc'));
        $canonical_url = '/sitemaps';
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $canonical_url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($canonical_url);
        $this->_get_footer_locations(config_item('locale_code'));
        $this->_add_page_js_css();
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            $this->_add_css('<link href="' . auto_version('mobile_sitemap.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            //hack to turn mobile to responsive site for new urls
            $this->_set_display_type(Controller_Base__Page::PAGE);
        }
        $this->data['message_element'] = 'home/sitemaps';
        $this->_render();
    }

    private function _get_columns($count, $keyArr)
    {
        $this->data[$keyArr[0]] = $count;
        if ($this->data[$keyArr[0]] % 3 == 0)
        {
            $this->data[$keyArr[1]] = $this->data[$keyArr[0]] / 3;
            $this->data[$keyArr[2]] = 2 * $this->data[$keyArr[1]];
        }
        else
        {
            $this->data[$keyArr[1]] = ceil($this->data[$keyArr[0]] / 3);
            if (($this->data[$keyArr[0]] - $this->data[$keyArr[1]]) % 2 == 0)
            {
                $this->data[$keyArr[2]] = $this->data[$keyArr[1]] + (($this->data[$keyArr[0]] - $this->data[$keyArr[1]]) / 2);
            }
            else
            {
                $this->data[$keyArr[2]] = 2 * $this->data[$keyArr[1]];
            }
        }
        $this->data[$keyArr[3]] = $this->data[$keyArr[0]];
    }

    private function _add_page_js_css()
    {
        $this->_add_css('<link href="' . auto_version('home.css') . '" media="screen" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('landing_pages.css') . '" media="screen" rel="stylesheet" type="text/css" />');
        $this->_add_css('<link href="' . auto_version('landing_pages/landing_pages.css') . '" media="screen" rel="stylesheet" type="text/css" />');
    }
}
