<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Popular_Location___Collection extends Base__Collection
{
    static protected $_staticObjectType = Popular_Location::class;
}

class Popular_Location extends Base__Item
{
    protected static $_tableName = 'popularlocations';
    protected static $_columns = [
        'tag_id' => [
            'pointer' => 'tag_id',
            'validations' => 'is_natural|required'
        ],
        'location_id' => [
            'pointer' => 'location_id',
            'validations' => 'is_natural|required'
        ],
        'child_location_id' => [
            'pointer' => 'child_location_id',
            'validations' => 'is_natural|required'
        ],
        'lang_code' => [
            'pointer' => 'lang_code',
            'validations' => 'required'
        ],
        'desc_text' => [
            'pointer' => 'desc_text',
            'validations' => 'required'
        ],
        'img' => [
            'pointer' => 'img',
            'validations' => 'empty_null'
        ],
        'ordering' => [
            'pointer' => 'ordering',
            'validations' => 'is_natural|empty_null'
        ]
    ];
    protected static $_aliases = [
        'location_category' => ['pointer' => 'location_category'],
        'location_desc' => ['pointer' => 'location_desc'],
        'location_url' => ['pointer' => 'location_url'],
        'tag_link_label' => ['pointer' => 'tag_link_label'],
        'tag_slug' => ['pointer' => 'tag_slug']
    ];
}