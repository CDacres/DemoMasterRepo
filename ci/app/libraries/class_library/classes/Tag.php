<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Tag___Collection extends Base__Collection
{
    static protected $_staticObjectType = Tag::class;
}

class Tag extends Base__Item
{
    const MEETING = 152;
    const CONFERENCE = 84;
    const TRAINING = 271;
    const DESK = 305;
    const EVENTFUNCTION = 121;
    const OFFICE = 2;

    protected static $_tableName = 'tags';
    protected static $_columns = [
        'parent_id' => ['pointer' => 'parent_id'],
        'lft' => ['pointer' => 'lft'],
        'rgt' => ['pointer' => 'rgt'],
        'depth' => ['pointer' => 'depth'],
        'name' => ['pointer' => 'name'],
        'high_level_landers' => ['pointer' => 'high_level_landers'],
        'low_level_landers' => ['pointer' => 'low_level_landers'],
        'search_falls_back' => ['pointer' => 'search_falls_back']
    ];
    protected static $_aliases = [
        'slug' => ['pointer' => 'slug'],
        'quick_slug' => ['pointer' => 'quick_slug'],
        'search_title' => ['pointer' => 'search_title'],
        'search_meta' => ['pointer' => 'search_meta'],
        'canonical_slug' => ['pointer' => 'canonical_slug'],
        'label' => ['pointer' => 'label'],
        'tag_id' => ['pointer' => 'tag_id'],
        'home_label' => ['pointer' => 'home_label'],
        'home_label_order' => ['pointer' => 'home_label_order'],
        'quick_vertical_id' => ['pointer' => 'quick_vertical_id'],
        'has_browse' => ['pointer' => 'has_browse'],
        'browse_link_label' => ['pointer' => 'browse_link_label'],
        'browse_title' => ['pointer' => 'browse_title'],
        'browse_meta_desc' => ['pointer' => 'browse_meta_desc'],
        'browse_carousel_title' => ['pointer' => 'browse_carousel_title'],
        'browse_h1_title' => ['pointer' => 'browse_h1_title'],
        'browse_h2_title' => ['pointer' => 'browse_h2_title'],
        'has_lp' => ['pointer' => 'has_lp'],
        'has_lp_sub_loc' => ['pointer' => 'has_lp_sub_loc'],
        'lp_title' => ['pointer' => 'lp_title'],
        'lp_meta_desc' => ['pointer' => 'lp_meta_desc'],
        'lp_carousel_title' => ['pointer' => 'lp_carousel_title'],
        'lp_h1_title' => ['pointer' => 'lp_h1_title'],
        'lp_h2_title' => ['pointer' => 'lp_h2_title']
    ];
    protected static $_objects = [
        'metas' => Tag_Language_Label_Meta___Collection::class,
        'labels' => Tag_Language_Label___Collection::class,
        'keywords' => Tag_Language_Label_Meta_Keyword___Collection::class
    ];
}