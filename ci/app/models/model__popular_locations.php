<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__popular_locations extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Popular_Location::class);
        parent::__construct();
    }

    public function get_popular_location_collection($lang_code, $tag_id, $location_id)
    {
        return new Popular_Location___Collection($this->_get_popular_location_collection($lang_code, $tag_id, $location_id));
    }

    private function _get_popular_location_collection($lang_code, $tag_id, $location_id)
    {
        $this->db->advanced_join(Popular_Location::class, Location::class, Popular_Location::column('child_location_id', false), Location::id_column(false));
        $this->db->advanced_join(Popular_Location::class, Tag::class, Popular_Location::column('tag_id', false), Tag::id_column(false));
        $this->db->advanced_join(Tag::class, Tag_Language_Label::class, Tag::id_column(false), Tag_Language_Label::column('tag_id', false));
        $this->db->advanced_join(Tag_Language_Label::class, Tag_Language_Label_Meta::class, Tag_Language_Label::id_column(false), Tag_Language_Label_Meta::column('tag_language_label_id', false));
        $this->db->select_alias(Location::column('category_type'), Popular_Location::alias('location_category'));
        $this->db->select_alias(Location::column('human_desc'), Popular_Location::alias('location_desc'));
        $this->db->select_alias(Location::column('search_url'), Popular_Location::alias('location_url'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('browse_link_label'), Popular_Location::alias('tag_link_label'));
        $this->db->select_alias(Tag_Language_Label_Meta::column('slug'), Popular_Location::alias('tag_slug'));
        $this->db->where(Popular_Location::column('lang_code'), $lang_code);
        $this->db->where(Popular_Location::column('tag_id'), $tag_id);
        $this->db->where(Tag_Language_Label::column('language_code'), $lang_code);
        $this->db->where(Tag_Language_Label::column('preferred'), 1);
        $this->db->where(Tag_Language_Label_Meta::column('preferred'), 1);
        $this->db->where(Popular_Location::column('location_id'), $location_id);
        $this->db->order_by(Popular_Location::column('ordering'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}