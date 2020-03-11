<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Tag_Language_Label_Meta___Collection extends Base__Collection
{
    static protected $_staticObjectType = Tag_Language_Label_Meta::class;
}

class Tag_Language_Label_Meta extends Base__Item
{
    protected static $_tableName = 'tag_language_label_meta';
    protected static $_columns = [
        'tag_language_label_id' => ['pointer' => 'tag_language_label_id'],
        'slug' => ['pointer' => 'slug'],
        'preferred' => ['pointer' => 'preferred'],
        'search_title' => ['pointer' => 'search_title'],
        'search_meta' => ['pointer' => 'search_meta'],
        'has_browse' => ['pointer' => 'has_browse'],
        'browse_link_label' => ['pointer' => 'browse_link_label'],
        'browse_title' => ['pointer' => 'browse_title'],
        'browse_meta_desc' => ['pointer' => 'browse_meta_desc'],
        'browse_carousel_title' => ['pointer' => 'browse_carousel_title'],
        'browse_h1_title' => ['pointer' => 'browse_h1_title'],
        'browse_h2_title' => ['pointer' => 'browse_h2_title'],
        'has_lp' => ['pointer' => 'has_lp'],
        'has_lp_sub_loc' => ['pointer' => 'has_lp_sub_loc'],
        'lp_link_label' => ['pointer' => 'lp_link_label'],
        'lp_title' => ['pointer' => 'lp_title'],
        'lp_meta_desc' => ['pointer' => 'lp_meta_desc'],
        'lp_carousel_title' => ['pointer' => 'lp_carousel_title'],
        'lp_h1_title' => ['pointer' => 'lp_h1_title'],
        'lp_h2_title' => ['pointer' => 'lp_h2_title']
    ];
    protected static $_objects = ['keywords' => Tag_Language_Label_Meta_Keyword___Collection::class];
}