<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Tag_Language_Label_Meta_Keyword___Collection extends Base__Collection
{
    static protected $_staticObjectType = Tag_Language_Label_Meta_Keyword::class;
}

class Tag_Language_Label_Meta_Keyword extends Base__Item
{
    protected static $_tableName = 'tag_language_label_meta_keywords';
    protected static $_columns = [
        'tag_language_label_meta_id' => ['pointer' => 'tag_language_label_meta_id'],
        'keyword' => ['pointer' => 'keyword'],
        'search_volume' => ['pointer' => 'search_volume'],
        'browse' => ['pointer' => 'browse']
    ];
}