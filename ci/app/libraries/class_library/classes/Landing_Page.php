<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Landing_Page___Collection extends Base__Collection
{
    static protected $_staticObjectType = Landing_Page::class;
}

class Landing_Page extends Base__Item
{
    protected static $_modelName = Model__landing_pages::class;
    protected static $_tableName = 'landing_pages';
    protected static $_columns = [
        'attribute_id' => [
            'pointer' => 'attribute_id',
            'validations' => 'is_natural'
        ],
        'location_id' => [
            'pointer' => 'location_id',
            'validations' => 'is_natural'
        ],
        'tag_id' => [
            'pointer' => 'tag_id',
            'validations' => 'is_natural'
        ],
        'redirect_id' => [
            'pointer' => 'redirect_id',
            'validations' => 'is_natural'
        ],
        'canonical' => [
            'pointer' => 'canonical',
            'validations' => 'is_boolean'
        ],
        'search_redirect' => [
            'pointer' => 'search_redirect',
            'validations' => 'is_boolean'
        ]
    ];
    protected static $_aliases = [
        'attr_desc' => ['pointer' => 'attr_desc'],
        'attr_url' => ['pointer' => 'attr_url'],
        'location_desc' => ['pointer' => 'location_desc'],
        'location_url' => ['pointer' => 'location_url'],
        'tag_slug' => ['pointer' => 'tag_slug'],
        'requires_determiner' => ['pointer' => 'requires_determiner'],
        'lp_link_label' => ['pointer' => 'lp_link_label'],
        'redirect_url' => ['pointer' => 'redirect_url']
    ];
    protected static $_objects = [
        'landing_page_lang' => Landing_Page_Language___Collection::class,
        'tag' => Tag::class,
        'location' => Location::class,
        'attribute' => Attribute_Type::class
    ];
}