<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Landing_Page_Similar_Tag_Label___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Landing_Page_Similar_Tag_Label::class;
}

class Runt_Landing_Page_Similar_Tag_Label extends Base__Item
{
    protected static $_tableName = 'landing_page_similar_tag_labels';
    protected static $_columns = [
        'tag_language_label_id' => [
            'pointer' => 'tag_language_label_id',
            'validations' => 'is_natural'
        ],
        'linked_tag_language_label_id' => [
            'pointer' => 'linked_tag_language_label_id',
            'validations' => 'is_natural'
        ],
        'search_volume' => [
            'pointer' => 'search_volume',
            'validations' => 'is_integer'
        ]
    ];
    protected static $_aliases = [
        'location_desc' => ['pointer' => 'location_desc'],
        'location_url' => ['pointer' => 'location_url'],
        'tag_slug' => ['pointer' => 'tag_slug'],
        'tag_label' => ['pointer' => 'tag_label'],
        'tag_name' => ['pointer' => 'tag_name'],
        'requires_determiner' => ['pointer' => 'requires_determiner'],
        'lp_link_label' => ['pointer' => 'lp_link_label']
    ];
}