<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Landing_Page_Language___Collection extends Base__Collection
{
    static protected $_staticObjectType = Landing_Page_Language::class;
}

class Landing_Page_Language extends Base__Item
{
    protected static $_tableName = 'landing_page_language';
    protected static $_columns = [
        'landing_page_id' => [
            'pointer' => 'landing_page_id',
            'validations' => 'is_natural|required'
        ],
        'lang_code' => [
            'pointer' => 'lang_code',
            'validations' => 'required'
        ],
        'desc_text' => [
            'pointer' => 'desc_text',
            'validations' => ''
        ],
        'desc_text_top' => [
            'pointer' => 'desc_text_top',
            'validations' => ''
        ],
        'h1' => [
            'pointer' => 'h1',
            'validations' => ''
        ],
        'h2' => [
            'pointer' => 'h2',
            'validations' => ''
        ],
        'carousel_title' => [
            'pointer' => 'carousel_title',
            'validations' => ''
        ],
        'meta_title' => [
            'pointer' => 'meta_title',
            'validations' => ''
        ],
        'meta_desc' => [
            'pointer' => 'meta_desc',
            'validations' => ''
        ],
        'meta_keyword' => [
            'pointer' => 'meta_keyword',
            'validations' => ''
        ]
    ];
    protected static $_aliases = [
        'landing_page_location_id' => ['pointer' => 'landing_page_location_id'],
        'landing_page_location_country' => ['pointer' => 'landing_page_location_country'],
        'landing_page_location_parent' => ['pointer' => 'landing_page_location_parent'],
        'landing_page_location_desc' => ['pointer' => 'landing_page_location_desc'],
        'landing_page_location_url' => ['pointer' => 'landing_page_location_url'],
        'landing_page_location_search_url' => ['pointer' => 'landing_page_location_search_url'],
        'landing_page_location_category' => ['pointer' => 'landing_page_location_category'],
        'landing_page_location_requires_determiner' => ['pointer' => 'landing_page_location_requires_determiner'],
        'landing_page_tag_id' => ['pointer' => 'landing_page_tag_id'],
        'landing_page_tag_link_label' => ['pointer' => 'landing_page_tag_link_label'],
        'landing_page_tag_slug' => ['pointer' => 'landing_page_tag_slug'],
        'landing_page_tag_vertical' => ['pointer' => 'landing_page_tag_vertical'],
        'landing_page_attribute_id' => ['pointer' => 'landing_page_attribute_id'],
        'landing_page_attribute_desc' => ['pointer' => 'landing_page_attribute_desc'],
        'landing_page_attribute_url' => ['pointer' => 'landing_page_attribute_url'],
        'landing_page_redirect_id' => ['pointer' => 'landing_page_redirect_id'],
        'landing_page_canonical' => ['pointer' => 'landing_page_canonical'],
        'landing_page_redirect_tag_id' => ['pointer' => 'landing_page_redirect_tag_id'],
        'landing_page_redirect_loc_id' => ['pointer' => 'landing_page_redirect_loc_id'],
        'landing_page_redirect_attr_id' => ['pointer' => 'landing_page_redirect_attr_id'],
        'landing_page_search_redirect' => ['pointer' => 'landing_page_search_redirect'],
        'preferred_url' => ['pointer' => 'preferred_url'],
        'room_count' => ['pointer' => 'room_count']
    ];
    protected static $_objects = ['landing_page_url' => Landing_Page_Url___Collection::class];
}