<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Redirects extends Controller_Base__Public
{
    public function top_page_redirect($url_desc, $type)
    {
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $location = $this->$modelLocations->get_location_from_url_desc($url_desc);
        if ($location->exists_in_db())
        {
            $typeStr = explode("--", $type);
            if (isset($typeStr[0]) && count($typeStr) == 2)
            {
                $typelocation = $this->$modelLocations->get_location_from_url_desc($typeStr[1]);
                redirect('/' . $this->data['country_lang_url'] . '/' . $typeStr[0] . '/' . $typelocation->get('url_desc'), 'location', 301);
            }
            else
            {
                redirect('/' . $this->data['country_lang_url'] . '/' . $location->get('url_desc'), 'location', 301);
            }
        }
        else
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function browse($country, $type, $booking_day = -1)
    {
        $retUrl = '';
        if ($booking_day == -1 && !empty($_GET))
        {
            $retUrl = "?" . http_build_query($_GET);
        }
        else
        {
            if ($booking_day == 0)
            {
                $retUrl = '?book-for-today';
            }
            elseif ($booking_day == 1)
            {
                $retUrl = '?book-for-tomorrow';
            }
            elseif ($booking_day == 7)
            {
                $retUrl = '?book-for-next-week';
            }
        }
        redirect('/' . $country . '/' . $type . $retUrl, 'location', 301);
    }

    public function location_landing($country, $type, $location)
    {
        redirect('/' . $country . '/' . $type . '/' . $location, 'location', 301);
    }

    public function location_redirect($location_desc, $room_type_desc, $parent_location_desc = null, $booking_day = -1)
    {
        $retUrl = '';
        if ($booking_day == -1 && !empty($_GET))
        {
            $retUrl = "?" . http_build_query($_GET);
        }
        else
        {
            if ($booking_day == 0)
            {
                $retUrl = '?book-for-today';
            }
            elseif ($booking_day == 1)
            {
                $retUrl = '?book-for-tomorrow';
            }
            elseif ($booking_day == 7)
            {
                $retUrl = '?book-for-next-week';
            }
        }
        if ($parent_location_desc == 'uk')
        {
            $parent_location_desc = 'united-kingdom'; //hack as country name has changed
        }
        $modelTags = Model__tags::class;
        $this->load->model($modelTags);
        $tag = $this->$modelTags->get_tag_meta_by_slug(config_item('language_code'), $room_type_desc);
        if (!(isset($tag) && $tag->exists_in_db() && $tag->is_enabled()))
        {
            redirect('/' . $this->data['country_lang_url'] . '/' . $this->data['default_tag_slug'] . '/' . $location_desc . $retUrl);
        }
        $modelLocations = Model__locations::class;
        $this->load->model($modelLocations);
        $location = $this->$modelLocations->get_location_from_url_desc(urldecode($location_desc), urldecode($parent_location_desc));
        $modelLandingPageLang = Model__landing_page_language::class;
        $this->load->model($modelLandingPageLang);
        $landing_page_lang = $this->$modelLandingPageLang->get_landing_page_lang_by_ids(config_item('language_code'), $tag->get('tag_id'), $location->get_id());
        if (!$location->exists_in_db() || !$location->is_enabled() || $landing_page_lang->get('landing_page_location_parent') == 0)
        {
            redirect('/' . $this->data['country_lang_url'] . '/' . $tag->get('slug') . $retUrl);
        }
        elseif (!$location->is_true('is_crawlable') && $landing_page_lang->is_null('landing_page_redirect_id') && !$landing_page_lang->is_true('landing_page_search_redirect'))
        {
            redirect('/' . $this->data['country_lang_url'] . '/' . $tag->get('slug') . '/' . $location->get('parent_url') . $retUrl);
        }
        elseif (!$landing_page_lang->is_null('landing_page_redirect_id') && !$landing_page_lang->is_true('landing_page_canonical'))
        {
            $redirect_landing_page_lang = $this->$modelLandingPageLang->get_landing_page_lang_by_ids(config_item('language_code'), $landing_page_lang->get('landing_page_redirect_tag_id'), $landing_page_lang->get('landing_page_redirect_loc_id'), $landing_page_lang->get('landing_page_redirect_attr_id'));
            if ($redirect_landing_page_lang->exists_in_db())
            {
                redirect(base_url() . $this->data['country_lang_url'] . '/' . landing_page_url($redirect_landing_page_lang->get('landing_page_tag_slug'), (($redirect_landing_page_lang->get('landing_page_location_parent') != 0)?$redirect_landing_page_lang->get('landing_page_location_url'):''), ((!$redirect_landing_page_lang->is_null('landing_page_attribute_url'))?$redirect_landing_page_lang->get('landing_page_attribute_url'):'')) . $retUrl);
            }
        }
        elseif ($landing_page_lang->is_true('landing_page_search_redirect'))
        {
            redirect('/' . $this->data['country_lang_url'] . '/s/' . $location->get('search_url'));
        }
        else
        {
            redirect('/' . $this->data['country_lang_url'] . '/' . landing_page_url($tag->get('slug'), $location->get('url_desc')) . $retUrl, 'location', 301);
        }
    }

    public function search($type = '', $location = '')
    {
        if ($location == '')
        {
            $location = $this->data['country_location']->get('location_search_url');
        }
        redirect('/' . $this->data['country_lang_url'] . '/s/' . (($type == '')?$this->data['default_tag_slug']:$type) . '/' . $location, 'location', 301);
    }

    public function write_review($id)
    {
        $path = $this->data['country_lang_url'] . '/write-review/' . $id;
        if (!empty($_GET))
        {
            $path .= "?" . http_build_query($_GET);
        }
        redirect($path, 'location', 301);
    }

    public function venue_listing($id, $page, $name = '')
    {
        redirect($this->data['country_lang_url'] . '/venues' . (($name != '')?'/' . $name:'') . '/' . $id . '/' . $page, 'location', 301);
    }

    public function room_listing($id, $page, $alias = '', $name = '')
    {
        redirect($this->data['country_lang_url'] . '/' . (($alias != '')?$alias . (($name != '')?'/' . $name:''):'rooms') . '/' . $id . '/' . $page, 'location', 301);
    }

    public function mobile_room($id, $alias = '', $city = '')
    {
        redirect($this->data['country_lang_url'] . '/rooms/index/' . $id . '/' . $alias . '/' . $city . '/book-room', 'location', 301);
    }

    public function generic($controller = '', $page = 'index')
    {
        redirect($this->data['country_lang_url'] . (($controller != '')?'/' . $controller:'') . (($page != 'index')?'/' . $page:''), 'location', 301);
    }

    public function generic_with_get($controller = '', $page = 'index')
    {
        $path = $this->data['country_lang_url'] . (($controller != '')?'/' . $controller:'') . (($page != 'index')?'/' . $page:'');
        if (!empty($_GET))
        {
            $path .= "?" . http_build_query($_GET);
        }
        redirect($path, 'location', 301);
    }

    public function generic_with_id($controller = '', $page = 'index', $id)
    {
        redirect($this->data['country_lang_url'] . (($controller != '')?'/' . $controller:'') . (($page != 'index')?'/' . $page:'') . '/' . $id, 'location', 301);
    }
}