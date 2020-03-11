<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Review_Reply___Collection extends Base__Collection
{
    static protected $_staticObjectType = Review_Reply::class;
}

class Review_Reply extends Base__Item
{
    protected static $_modelName = Model__review_replies::class;
    protected static $_tableName = 'review_replies';
    protected static $_columns = [
        'author_id' => [
            'pointer' => 'userby',
            'validations' => 'required|is_natural'
        ],
        'review_id' => [
            'pointer' => 'review_id',
            'validations' => 'required|is_natural'
        ],
        'reply' => [
            'pointer' => 'reply',
            'validations' => 'required'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'required|is_date_time'
        ]
    ];
    protected static $_aliases = ['reply_author' => ['pointer' => 'reply_author']];
    protected static $_wranglers = [
        'created_date_time' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'created']
        ]
    ];
}