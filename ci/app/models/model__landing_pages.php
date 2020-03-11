<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__landing_pages extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Landing_Page::class);
        parent::__construct();
    }

    public function get_landing_pages_similar_parent($lang_code, $tag_id, $location_id)
    {
        return new Landing_Page($this->_get_landing_pages_similar_parent($lang_code, $tag_id, $location_id));
    }

    private function _get_landing_pages_similar_parent($lang_code, $tag_id, $location_id)
    {
        $this->db->advanced_join(Landing_Page::class, Landing_Page_Language::class, Landing_Page::id_column(false), Landing_Page_Language::column('landing_page_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Location::column('human_desc'), Landing_Page::alias('location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page::alias('location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page::alias('tag_slug'));
        $this->db->select_alias(Location::column('requires_determiner'), Landing_Page::alias('requires_determiner'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Landing_Page::alias('lp_link_label'));
        $this->db->where(Landing_Page::column('attribute_id'));
        $this->db->where(Landing_Page::column('location_id'), $location_id);
        $this->db->where(Landing_Page::column('tag_id'), $tag_id);
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        return $this->_query_init_and_run();
    }

    public function get_landing_pages_similar_to_location_collection($lang_code, $landing_id, $tag_id, $location_id)
    {
        return new Landing_Page___Collection($this->_get_landing_pages_similar_to_location_collection($lang_code, $landing_id, $tag_id, $location_id));
    }

    private function _get_landing_pages_similar_to_location_collection($lang_code, $landing_id, $tag_id, $location_id)
    {
        $this->db->advanced_join(Landing_Page::class, Landing_Page_Language::class, Landing_Page::id_column(false), Landing_Page_Language::column('landing_page_id', false));
        $this->db->advanced_join(Landing_Page::class, Attribute_Type::class, Landing_Page::column('attribute_id', false), Attribute_Type::id_column(false));
        $this->db->advanced_join(Attribute_Type::class, Attribute_Language::class, Attribute_Type::id_column(false), Attribute_Language::column('attribute_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Attribute_Language::column('desc'), Landing_Page::alias('attr_desc'));
        $this->db->select_alias(Attribute_Language::column('url'), Landing_Page::alias('attr_url'));
        $this->db->select_alias(Location::column('human_desc'), Landing_Page::alias('location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page::alias('location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page::alias('tag_slug'));
        $this->db->select_alias(Location::column('requires_determiner'), Landing_Page::alias('requires_determiner'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Landing_Page::alias('lp_link_label'));
        $this->db->where(Landing_Page::id_column() . ' <> ' . $landing_id);
        $this->db->where(Landing_Page::column('attribute_id') . ' IS NOT NULL');
        $this->db->where(Attribute_Language::column('lang_code'), $lang_code);
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Landing_Page::column('location_id'), $location_id);
        $this->db->where(Landing_Page::column('tag_id'), $tag_id);
        $this->db->group_by(Tag_Language_Label_Meta::column('slug'));
        $this->db->group_by(Location::column('url_desc'));
        $this->db->group_by(Attribute_Language::column('url'));
        $this->db->order_by(Attribute_Language::column('desc'), 'ASC');
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        $this->db->order_by(Tag_Language_Label_Meta::column('lp_link_label'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_human_sitemap_landing_collection($lang_code, $country_code, $url)
    {
        return new Landing_Page___Collection($this->_get_human_sitemap_landing_collection($lang_code, $country_code, $url));
    }

    private function _get_human_sitemap_landing_collection($lang_code, $country_code, $url)
    {
        $this->db->advanced_join(Landing_Page::class, Landing_Page_Language::class, Landing_Page::id_column(false), Landing_Page_Language::column('landing_page_id', false));
        $this->db->advanced_join(Landing_Page::class, Attribute_Type::class, Landing_Page::column('attribute_id', false), Attribute_Type::id_column(false));
        $this->db->advanced_join(Attribute_Type::class, Attribute_Language::class, Attribute_Type::id_column(false), Attribute_Language::column('attribute_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Attribute_Language::column('desc'), Landing_Page::alias('attr_desc'));
        $this->db->select_alias(Attribute_Language::column('url'), Landing_Page::alias('attr_url'));
        $this->db->select_alias(Location::column('human_desc'), Landing_Page::alias('location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page::alias('location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page::alias('tag_slug'));
        $this->db->select_alias(Location::column('requires_determiner'), Landing_Page::alias('requires_determiner'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Landing_Page::alias('lp_link_label'));
        $this->db->nullable_where(Attribute_Language::column('lang_code'), $lang_code);
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Location::column('parent_id') . ' <> 0');
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Location::column('country'), $country_code);
        $this->db->where(Location::column('url_desc'), $url);
        $this->db->group_by(Landing_Page::column('location_id'));
        $this->db->group_by(Landing_Page::column('tag_id'));
        $this->db->group_by(Landing_Page::column('attribute_id'));
        $this->db->order_by(Tag_Language_Label_Meta::column('lp_link_label'), 'ASC');
        $this->db->order_by(Attribute_Language::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_alt_landing_pages_by_id($lang_code, $id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'landing_pages/' . $id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_alt_landing_pages_by_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Landing_Page($json);
    }

    public function get_alt_browse_pages_by_tag_id($lang_code, $tag_id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'landing_pages/by_tag_id/' . $tag_id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_alt_browse_pages_by_tag_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Landing_Page___Collection($json);
    }

    public function get_landing_pages_by_tag_label_id($lang_code, $tag_label_id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'landing_pages/by_tag_label_id/' . $tag_label_id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_landing_pages_by_tag_label_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Landing_Page___Collection($json);
    }

    public function get_landing_pages_by_location_id($lang_code, $location_id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'landing_pages/by_location_id/' . $location_id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_landing_pages_by_location_id failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Landing_Page___Collection($json);
    }

    public function get_landing_pages_by_tag_label_and_location_ids($lang_code, $tag_label_id, $location_id)
    {
        try
        {
            $response = $this->dataapiwrapper->standard_request('GET', 'landing_pages/by_tag_label_and_location_ids/' . $tag_label_id . '/' . $location_id, $lang_code);
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 300)
            {
                throw new Exception('Server error: ' . $statusCode. '. Error message:' . $response->getReasonPhrase());
            }
        }
        catch (Exception $ex)
        {
            error_log(new Exception('Request get_landing_pages_by_tag_label_and_location_ids failed with the following message: ' . $ex->getMessage()));
            return json_decode('');
        }
        $json = json_decode($response->getBody(), true);
        return new Landing_Page___Collection($json);
    }

    public function get_landing_page_object_by_id($id)
    {
        return new Landing_Page($this->_get_landing_page_object_by_id($id));
    }

    private function _get_landing_page_object_by_id($id)
    {
        $this->db->where(Landing_Page::id_column(), $id);
        return $this->_query_init_and_run();
    }
}