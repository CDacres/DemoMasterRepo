<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__landing_page_similar_tag_labels extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Landing_Page_Similar_Tag_Label::class);
        parent::__construct();
    }

    public function get_landing_page_similar_tag_label_collection_by_id_and_lang($lang_code, $landing_page_id, $location_id)
    {
        return new Runt_Landing_Page_Similar_Tag_Label___Collection($this->_get_landing_page_similar_tag_label_collection_by_id_and_lang($lang_code, $landing_page_id, $location_id));
    }

    private function _get_landing_page_similar_tag_label_collection_by_id_and_lang($lang_code, $landing_page_id, $location_id)
    {
        $linked_tag_label = "linked_tag_label_alias";
        $linked_tag = "linked_tag_alias";
        $linked_lp = "linked_lp_alias";
        $linked_lp_lang = "linked_lp_lang_alias";
        $this->db->advanced_join(Runt_Landing_Page_Similar_Tag_Label::class, Tag_Language_Label::class, Runt_Landing_Page_Similar_Tag_Label::column('tag_language_label_id', false), Tag_Language_Label::id_column(false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag::class, Tag_Language_Label::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Landing_Page::class, Tag::id_column(false), Landing_Page::column('tag_id', false));
        $this->db->advanced_join(Landing_Page::class, Landing_Page_Language::class, Landing_Page::id_column(false), Landing_Page_Language::column('landing_page_id', false));
        $this->db->advanced_join(Runt_Landing_Page_Similar_Tag_Label::class, Tag_Language_Label::class, Runt_Landing_Page_Similar_Tag_Label::column('linked_tag_language_label_id', false), Tag_Language_Label::id_column(false), "LEFT", null, $linked_tag_label);
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false), "LEFT", $linked_tag_label);
        $this->db->advanced_join(Tag_Language_Label::class, Tag::class, Tag_Language_Label::column('tag_id', false), Tag::id_column(false), "LEFT", $linked_tag_label, $linked_tag);
        $this->db->advanced_join(Tag::class, Landing_Page::class, Tag::id_column(false), Landing_Page::column('tag_id', false), "LEFT", $linked_tag, $linked_lp);
        $this->db->advanced_join(Landing_Page::class, Landing_Page_Language::class, Landing_Page::id_column(false), Landing_Page_Language::column('landing_page_id', false), "LEFT", $linked_lp, $linked_lp_lang);
        $this->db->advanced_join(Landing_Page::class, Location::class, Landing_Page::column('location_id', false), Location::id_column(false), "LEFT", $linked_lp);
        $this->db->select_alias(Location::column('human_desc'), Runt_Landing_Page_Similar_Tag_Label::alias('location_desc'));
        $this->db->select_alias(Location::column('url_desc'), Runt_Landing_Page_Similar_Tag_Label::alias('location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Runt_Landing_Page_Similar_Tag_Label::alias('tag_slug'));
        $this->db->select_alias(Location::column('requires_determiner'), Runt_Landing_Page_Similar_Tag_Label::alias('requires_determiner'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('lp_link_label'), Runt_Landing_Page_Similar_Tag_Label::alias('lp_link_label'));
        $this->db->where(Landing_Page::column('attribute_id', true, $linked_lp));
        $this->db->where(Landing_Page::column('location_id', true, $linked_lp), $location_id);
        $this->db->where(Landing_Page_Language::column('lang_code', true, $linked_lp_lang), $lang_code);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Landing_Page::id_column(), $landing_page_id);
        $this->db->where(Tag_Language_Label::column('language_code', true, $linked_tag_label), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred', true, $linked_tag_label), 1);
        $this->db->group_by(Tag_Language_Label_Meta::column('slug'));
        $this->db->group_by(Location::column('url_desc'));
        $this->db->order_by(Runt_Landing_Page_Similar_Tag_Label::column('search_volume'), 'DESC');
        $this->db->order_by(Tag_Language_Label_Meta::column('lp_link_label'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_landing_page_similar_tag_label_collection_by_vertical_id_and_lang($lang_code, $vertical_id)
    {
        return new Runt_Landing_Page_Similar_Tag_Label___Collection($this->_get_landing_page_similar_tag_label_collection_by_vertical_id_and_lang($lang_code, $vertical_id));
    }

    private function _get_landing_page_similar_tag_label_collection_by_vertical_id_and_lang($lang_code, $vertical_id)
    {
        $linked_tag_label = "linked_tag_label_alias";
        $this->db->advanced_join(Runt_Landing_Page_Similar_Tag_Label::class, Tag_Language_Label::class, Runt_Landing_Page_Similar_Tag_Label::column('tag_language_label_id', false), Tag_Language_Label::id_column(false));
        $this->db->advanced_join(Runt_Landing_Page_Similar_Tag_Label::class, Tag_Language_Label::class, Runt_Landing_Page_Similar_Tag_Label::column('linked_tag_language_label_id', false), Tag_Language_Label::id_column(false), "LEFT", null, $linked_tag_label);
        $this->db->select_alias(Tag_Language_Label::column('label', true, $linked_tag_label), Runt_Landing_Page_Similar_Tag_Label::alias('tag_label'));
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label::column('quick_vertical_id'), $vertical_id);
        $this->db->where(Tag_Language_Label::column('language_code', true, $linked_tag_label), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred', true, $linked_tag_label), 1);
        return $this->_query_init_and_run(false);
    }

    public function get_landing_page_similar_tag_label_collection_by_label_id_and_lang($lang_code, $label_id)
    {
        return new Runt_Landing_Page_Similar_Tag_Label___Collection($this->_get_landing_page_similar_tag_label_collection_by_label_id_and_lang($lang_code, $label_id));
    }

    private function _get_landing_page_similar_tag_label_collection_by_label_id_and_lang($lang_code, $label_id)
    {
        $this->db->advanced_join(Runt_Landing_Page_Similar_Tag_Label::class, Tag_Language_Label::class, Runt_Landing_Page_Similar_Tag_Label::column('linked_tag_language_label_id', false), Tag_Language_Label::id_column(false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag::class, Tag_Language_Label::column('tag_id', false), Tag::id_column(false));
        $this->db->select_alias(Tag_Language_Label::column('label'), Runt_Landing_Page_Similar_Tag_Label::alias('tag_label'));
        $this->db->select_alias(Tag::column('name'), Runt_Landing_Page_Similar_Tag_Label::alias('tag_name'));
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Runt_Landing_Page_Similar_Tag_Label::column('tag_language_label_id'), $label_id);
        $this->db->order_by(Tag_Language_Label::column('label'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}