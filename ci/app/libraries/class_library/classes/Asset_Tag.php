<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_Tag extends Base__Item
{
    protected static $_tableName = 'asset_tag';
    protected static $_columns = [
        'tag_id' => [
            'pointer' => 'tag_id',
            'validations' => 'is_natural'
        ],
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'ranking' => [
            'pointer' => 'ranking',
            'validations' => 'is_natural'
        ]
    ];
}