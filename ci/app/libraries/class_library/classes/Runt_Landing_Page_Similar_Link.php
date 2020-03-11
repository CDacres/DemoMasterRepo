<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Landing_Page_Similar_Link___Collection extends Base__Collection
{
    static protected $_staticObjectType = Runt_Landing_Page_Similar_Link::class;
}

class Runt_Landing_Page_Similar_Link extends Base__Item
{
    protected static $_modelName = Model__landing_page_similar_links::class;
    protected static $_tableName = 'landing_page_similar_links';
    protected static $_columns = [
        'landing_page_id' => [
            'pointer' => 'landing_page_id',
            'validations' => 'is_natural'
        ],
        'linked_landing_page_id' => [
            'pointer' => 'linked_landing_page_id',
            'validations' => 'is_natural'
        ]
    ];
    protected static $_aliases = [
        'attribute_id' => ['pointer' => 'attribute_id'],
        'attr_desc' => ['pointer' => 'attr_desc'],
        'attr_url' => ['pointer' => 'attr_url'],
        'location_desc' => ['pointer' => 'location_desc'],
        'location_url' => ['pointer' => 'location_url'],
        'tag_slug' => ['pointer' => 'tag_slug'],
        'requires_determiner' => ['pointer' => 'requires_determiner'],
        'lp_link_label' => ['pointer' => 'lp_link_label']
    ];
}