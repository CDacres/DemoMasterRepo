<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__landing_page_similar_links extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Landing_Page_Similar_Link::class);
        parent::__construct();
    }

    public function get_landing_page_similar_link_collection_by_id_and_lang($lang_code, $landing_page_id)
    {
        return new Runt_Landing_Page_Similar_Link___Collection($this->_get_landing_page_similar_link_collection_by_id_and_lang($lang_code, $landing_page_id));
    }

    private function _get_landing_page_similar_link_collection_by_id_and_lang($lang_code, $landing_page_id)
    {
        $this->_get_landing_page($lang_code);
        $this->db->where(Runt_Landing_Page_Similar_Link::column('landing_page_id'), $landing_page_id);
        return $this->_query_init_and_run(false);
    }

    public function get_landing_page_similar_link_object_by_ids($landing_page_id, $linked_landing_page_id)
    {
        return new Runt_Landing_Page_Similar_Link($this->_get_landing_page_similar_link_object_by_ids($landing_page_id, $linked_landing_page_id));
    }

    private function _get_landing_page_similar_link_object_by_ids($landing_page_id, $linked_landing_page_id)
    {
        $this->db->where(Runt_Landing_Page_Similar_Link::column('landing_page_id'), $landing_page_id);
        $this->db->where(Runt_Landing_Page_Similar_Link::column('linked_landing_page_id'), $linked_landing_page_id);
        return $this->_query_init_and_run();
    }

    public function get_extended_landing_page_similar_link_by_id($id, $lang_code)
    {
        return new Runt_Landing_Page_Similar_Link($this->_get_extended_landing_page_similar_link_by_id($id, $lang_code));
    }

    private function _get_extended_landing_page_similar_link_by_id($id, $lang_code)
    {
        $this->_get_landing_page($lang_code);
        $this->db->where(Runt_Landing_Page_Similar_Link::id_column(), $id);
        return $this->_query_init_and_run();
    }

    public function get_landing_page_similar_link_by_id($id)
    {
        return new Runt_Landing_Page_Similar_Link($this->_get_landing_page_similar_link_by_id($id));
    }

    private function _get_landing_page_similar_link_by_id($id)
    {
        $this->db->where(Runt_Landing_Page_Similar_Link::id_column(), $id);
        return $this->_query_init_and_run();
    }

    private function _get_landing_page($lang_code)
    {
        $this->db->advanced_join(Runt_Landing_Page_Similar_Link::class, Landing_Page::class, Runt_Landing_Page_Similar_Link::column('linked_landing_page_id', false), Landing_Page::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Landing_Page_Language::class, Landing_Page::id_column(false), Landing_Page_Language::column('landing_page_id', false));
        $this->db->advanced_join(Landing_Page::class, Attribute_Type::class, Landing_Page::column('attribute_id', false), Attribute_Type::id_column(false));
        $this->db->advanced_join(Attribute_Type::class, Attribute_Language::class, Attribute_Type::id_column(false), Attribute_Language::column('attribute_id', false));
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false));
        $this->db->advanced_join(Landing_Page::class, Tag::class, Landing_Page::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Attribute_Type::id_column(), Runt_Landing_Page_Similar_Link::alias('attribute_id'));
        $this->db->select_alias(Attribute_Language::column('desc'), Runt_Landing_Page_Similar_Link::alias('attr_desc'));
        $this->db->select_alias(Attribute_Language::column('url'), Runt_Landing_Page_Similar_Link::alias('attr_url'));
        $this->db->select_alias(Location::column('human_desc'), Runt_Landing_Page_Similar_Link::alias('location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Runt_Landing_Page_Similar_Link::alias('location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Runt_Landing_Page_Similar_Link::alias('tag_slug'));
        $this->db->select_alias(Location::column('requires_determiner'), Runt_Landing_Page_Similar_Link::alias('requires_determiner'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Runt_Landing_Page_Similar_Link::alias('lp_link_label'));
        $this->db->nullable_where(Attribute_Language::column('lang_code'), $lang_code);
        $this->db->where(Landing_Page_Language::column('lang_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->group_by(Tag_Language_Label_Meta::column('slug'));
        $this->db->group_by(Location::column('url_desc'));
        $this->db->group_by(Attribute_Language::column('url'));
        $this->db->order_by(Attribute_Language::column('desc'), 'ASC');
        $this->db->order_by(Location::column('human_desc'), 'ASC');
        $this->db->order_by(Tag_Language_Label_Meta::column('lp_link_label'), 'ASC');
    }
}