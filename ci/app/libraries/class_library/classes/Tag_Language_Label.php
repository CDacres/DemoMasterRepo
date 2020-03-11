<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Tag_Language_Label___Collection extends Base__Collection
{
    static protected $_staticObjectType = Tag_Language_Label::class;
}

class Tag_Language_Label extends Base__Item
{
    protected static $_tableName = 'tag_language_labels';
    protected static $_columns = [
        'tag_id' => ['pointer' => 'tag_id'],
        'language_code' => ['pointer' => 'language_code'],
        'label' => ['pointer' => 'label'],
        'home_label' => ['pointer' => 'home_label'],
        'home_label_order' => ['pointer' => 'home_label_order'],
        'quick_slug' => ['pointer' => 'quick_slug'],
        'quick_vertical_id' => ['pointer' => 'quick_vertical_id'],
        'preferred' => ['pointer' => 'preferred'],
        'default_order' => ['pointer' => 'default_order']
    ];
    protected static $_objects = ['metas' => Tag_Language_Label_Meta___Collection::class];
}