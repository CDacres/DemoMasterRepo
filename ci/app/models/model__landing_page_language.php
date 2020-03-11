<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__landing_page_language extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Landing_Page_Language::class);
        parent::__construct();
    }

    public function get_landing_page_by_url($lang_code, $url)
    {
        return new Landing_Page_Language($this->_get_landing_page_by_url($lang_code, $url));
    }

    private function _get_landing_page_by_url($lang_code, $url)
    {
        $redirect_landing = 'redirect_landing';
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page::class, Landing_Page_Language::column('landing_page_id', false), Landing_Page::id_column(false));
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page_Url::class, Landing_Page_Language::id_column(false), Landing_Page_Url::column('landing_page_language_id', false));
        $this->db->advanced_join(Landing_Page::class, Landing_Page::class, Landing_Page::column('redirect_id', false), Landing_Page::id_column(false), "LEFT", null, $redirect_landing);
        $this->db->advanced_join(Landing_Page::class, Attribute_Type::class, Landing_Page::column('attribute_id', false), Attribute_Type::id_column(false));
        $this->db->advanced_join(Attribute_Type::class, Attribute_Language::class, Attribute_Type::id_column(false), Attribute_Language::column('attribute_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Attribute_Type::id_column(), Landing_Page_Language::alias('landing_page_attribute_id'));
        $this->db->select_alias(Attribute_Language::column('desc'), Landing_Page_Language::alias('landing_page_attribute_desc'));
        $this->db->select_alias(Attribute_Language::column('url'), Landing_Page_Language::alias('landing_page_attribute_url'));
        $this->db->select_alias(Location::id_column(), Landing_Page_Language::alias('landing_page_location_id'));
        $this->db->select_alias(Location::column('parent_id'), Landing_Page_Language::alias('landing_page_location_parent'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page_Language::alias('landing_page_location_url'));
        $this->db->select_alias(Tag::id_column(), Landing_Page_Language::alias('landing_page_tag_id'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page_Language::alias('landing_page_tag_slug'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Landing_Page_Language::alias('landing_page_tag_link_label'));
        $this->db->select_alias(Landing_Page::column('redirect_id'), Landing_Page_Language::alias('landing_page_redirect_id'));
        $this->db->select_alias(Landing_Page::column('canonical'), Landing_Page_Language::alias('landing_page_canonical'));
        $this->db->select_alias(Landing_Page::column('tag_id', true, $redirect_landing), Landing_Page_Language::alias('landing_page_redirect_tag_id'));
        $this->db->select_alias(Landing_Page::column('location_id', true, $redirect_landing), Landing_Page_Language::alias('landing_page_redirect_loc_id'));
        $this->db->select_alias(Landing_Page::column('attribute_id', true, $redirect_landing), Landing_Page_Language::alias('landing_page_redirect_attr_id'));
        $this->db->select_alias(Landing_Page::column('search_redirect'), Landing_Page_Language::alias('landing_page_search_redirect'));
        $this->db->select_alias(Landing_Page_Url::column('preferred'), Landing_Page_Language::alias('preferred_url'));
        $this->db->nullable_where(Attribute_Language::column('lang_code'), $lang_code);
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Landing_Page_Url::column('url'), $url);
        return $this->_query_init_and_run();
    }

    public function get_landing_page_lang_by_ids($lang_code, $tag_id, $location_id, $attribute_id = null)
    {
        return new Landing_Page_Language($this->_get_landing_page_lang_by_ids($lang_code, $tag_id, $location_id, $attribute_id));
    }

    private function _get_landing_page_lang_by_ids($lang_code, $tag_id, $location_id, $attribute_id)
    {
        $redirect_landing = 'redirect_landing';
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page::class, Landing_Page_Language::column('landing_page_id', false), Landing_Page::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Landing_Page::class, Landing_Page::column('redirect_id', false), Landing_Page::id_column(false), "LEFT", null, $redirect_landing);
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        if ($attribute_id != null)
        {
            $this->db->advanced_join(Landing_Page::class, Attribute_Type::class, Landing_Page::column('attribute_id', false), Attribute_Type::id_column(false));
            $this->db->advanced_join(Attribute_Type::class, Attribute_Language::class, Attribute_Type::id_column(false), Attribute_Language::column('attribute_id', false));
            $this->db->select_alias(Attribute_Language::column('url'), Landing_Page_Language::alias('landing_page_attribute_url'));
            $this->db->where(Attribute_Language::column('lang_code'), $lang_code);
            $this->db->where(Attribute_Type::id_column(), $attribute_id);
        }
        else
        {
            $this->db->where(Landing_Page::column('attribute_id'));
        }
        $this->db->select_alias(Location::column('parent_id'), Landing_Page_Language::alias('landing_page_location_parent'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page_Language::alias('landing_page_location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page_Language::alias('landing_page_tag_slug'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Landing_Page_Language::alias('landing_page_tag_link_label'));
        $this->db->select_alias(Landing_Page::column('redirect_id'), Landing_Page_Language::alias('landing_page_redirect_id'));
        $this->db->select_alias(Landing_Page::column('canonical'), Landing_Page_Language::alias('landing_page_canonical'));
        $this->db->select_alias(Landing_Page::column('tag_id', true, $redirect_landing), Landing_Page_Language::alias('landing_page_redirect_tag_id'));
        $this->db->select_alias(Landing_Page::column('location_id', true, $redirect_landing), Landing_Page_Language::alias('landing_page_redirect_loc_id'));
        $this->db->select_alias(Landing_Page::column('attribute_id', true, $redirect_landing), Landing_Page_Language::alias('landing_page_redirect_attr_id'));
        $this->db->select_alias(Landing_Page::column('search_redirect'), Landing_Page_Language::alias('landing_page_search_redirect'));
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag::id_column(), $tag_id);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Location::id_column(), $location_id);
        return $this->_query_init_and_run();
    }

    public function get_all_landing_pages_by_lang($lang_code, $vertical_id)
    {
        return new Landing_Page_Language___Collection($this->_get_all_landing_pages_by_lang($lang_code, $vertical_id));
    }

    private function _get_all_landing_pages_by_lang($lang_code, $vertical_id)
    {
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page::class, Landing_Page_Language::column('landing_page_id', false), Landing_Page::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Attribute_Type::class, Landing_Page::column('attribute_id', false), Attribute_Type::id_column(false));
        $this->db->advanced_join(Attribute_Type::class, Attribute_Language::class, Attribute_Type::id_column(false), Attribute_Language::column('attribute_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Attribute_Language::column('desc'), Landing_Page_Language::alias('landing_page_attribute_desc'));
        $this->db->select_alias(Attribute_Language::column('url'), Landing_Page_Language::alias('landing_page_attribute_url'));
        $this->db->select_alias(Location::column('human_desc'), Landing_Page_Language::alias('landing_page_location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page_Language::alias('landing_page_location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page_Language::alias('landing_page_tag_slug'));
        $this->db->nullable_where(Attribute_Language::column('lang_code'), $lang_code);
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Tag_Language_Label::column('quick_vertical_id'), $vertical_id);
        $this->db->group_by(Landing_Page::column('location_id'));
        $this->db->group_by(Landing_Page::column('tag_id'));
        $this->db->group_by(Landing_Page::column('attribute_id'));
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        $this->db->order_by(Tag_Language_Label_Meta::column('lp_link_label'), 'ASC');
        $this->db->order_by(Attribute_Language::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_landing_page_lang_by_id($id)
    {
        return new Landing_Page_Language($this->_get_landing_page_lang_by_id($id));
    }

    private function _get_landing_page_lang_by_id($id)
    {
        $this->db->where(Landing_Page_Language::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_sitemap_landing_page_collection($page = '')
    {
        return new Landing_Page_Language___Collection($this->_get_sitemap_landing_page_collection($page));
    }

    private function _get_sitemap_landing_page_collection($page)
    {
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page::class, Landing_Page_Language::column('landing_page_id', false), Landing_Page::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Location::class, Runt_Location_Asset::class, Location::id_column(false), Runt_Location_Asset::column('location_id', false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->join(Tag_Language_Label::tableName(), Tag::id_column() . "=" . Tag_Language_Label::column('tag_id') . " AND " . Tag_Language_Label::column('language_code') . "=" . Landing_Page_Language::column('lang_code'));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Location::column('country'), Landing_Page_Language::alias('landing_page_location_country'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page_Language::alias('landing_page_location_url'));
        $this->db->select_alias(Location::column('search_url'), Landing_Page_Language::alias('landing_page_location_search_url'));
        $this->db->select_alias(Location::column('parent_id'), Landing_Page_Language::alias('landing_page_location_parent'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page_Language::alias('landing_page_tag_slug'));
        $this->db->select_alias(Tag_Language_Label::column('quick_vertical_id'), Landing_Page_Language::alias('landing_page_tag_vertical'));
        if ($page == 'browse')
        {
            $this->db->where(Location::column('parent_id'), 0);
        }
        else
        {
            $this->db->where(Location::column('parent_id') . ' <> 0');
            $this->db->where(Location::column('is_crawlable'), 1);
            $this->db->where(Runt_Location_Asset::column('approved_venue_count') . ' > 0');
        }
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->group_by(Landing_Page::column('location_id'));
        $this->db->group_by(Landing_Page::column('tag_id'));
        $this->db->order_by(Location::column('country'), 'ASC');
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        $this->db->order_by(Tag_Language_Label_Meta::column('lp_link_label'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_home_nearby_locations($lang_code, $country_code)
    {
        return new Landing_Page_Language___Collection($this->_get_home_nearby_locations($lang_code, $country_code));
    }

    private function _get_home_nearby_locations($lang_code, $country_code)
    {
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page::class, Landing_Page_Language::column('landing_page_id', false), Landing_Page::id_column(false));
        $this->db->advanced_join(Landing_Page_Language::class, Landing_Page_Url::class, Landing_Page_Language::id_column(false), Landing_Page_Url::column('landing_page_language_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->join(Runt_Location_Room::tableName(), Location::id_column() . "=" . Runt_Location_Room::column('location_id') . " AND " . Runt_Location_Room::column('tag_id') . " = " . Tag::id_column(), "LEFT");
        $this->db->select_alias(Landing_Page::column('search_redirect'), Landing_Page_Language::alias('landing_page_search_redirect'));
        $this->db->select_alias(Location::id_column(), Landing_Page_Language::alias('landing_page_location_id'));
        $this->db->select_alias(Location::column('human_desc'), Landing_Page_Language::alias('landing_page_location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Landing_Page_Language::alias('landing_page_location_url'));
        $this->db->select_alias(Location::column('search_url'), Landing_Page_Language::alias('landing_page_location_search_url'));
        $this->db->select_alias(Location::column('category_type'), Landing_Page_Language::alias('landing_page_location_category'));
        $this->db->select_alias(Tag::id_column(), Landing_Page_Language::alias('landing_page_tag_id'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Landing_Page_Language::alias('landing_page_tag_slug'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('browse_link_label'), Landing_Page_Language::alias('landing_page_tag_link_label'));
        $this->db->select_alias(Runt_Location_Room::column('approved_room_count'), Landing_Page_Language::alias('room_count'));
        $this->db->where(Landing_Page::column('attribute_id'));
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Location::column('country'), $country_code);
        $this->db->where(Location::column('category_type'), Location_Category::CITY);
        $this->db->where(Location::column('is_crawlable'), 1);
        $this->db->where(Runt_Location_Room::column('approved_room_count') . ' > 0');
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Landing_Page_Url::column('preferred'), 1);
        $this->db->order_by(Runt_Location_Room::column('approved_room_count'), 'DESC');
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}
